// All the task are completed at Date 15-12-2025, All the code here
import { useState, useEffect } from "react";
import styles from "./EmpForm.module.css";
function EmployeeInfoForm() {
  const [employees, setEmployees] = useState([]);
  const [userinfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    country: "",
    mobile: "",
    project: "",
    salary: "",
  });
  const [showTable, setShow_Table] = useState(false);
  const [searchresult, setSearchReasult] = useState(false);
  const [editindex, setEditIndex] = useState("");
  // ---- HIDE BTNS FUNCTIONALITY
  const obj_Btns = {
    FORM: "FORM",
    EDIT: "EDIT",
    TABLE: "TABLE",
    SEARCH: "SEARCH",
  };
  const [actBtns, setActBtns] = useState(obj_Btns.FORM);
  const btns_Mode = {
    [obj_Btns.FORM]: {
      add: true,
      update: false,
      display: true,
      search: true,
      back: false,
    },
    [obj_Btns.EDIT]: {
      add: false,
      update: true,
      display: false,
      search: false,
      back: true,
    },
    [obj_Btns.TABLE]: {
      add: true,
      update: false,
      display: false,
      search: true,
      back: true,
    },
    [obj_Btns.SEARCH]: {
      add: false,
      update: false,
      display: false,
      search: true,
      back: true,
    },
  };
  const btns_State = btns_Mode[actBtns];
  // ----RESET BTN SHOW WHEN INPUT IS NOT EMPTY
  const [show_ResetBtn, setSHOW_Reset_Btn] = useState(false);
  // ---- INPUT HIGHLIGHTED WHEN ONCLICK ON EDIT BUTTON
  const [Input_highlighted, setInput_Highlighted] = useState(false);
  // ---- POPUP MESSAGE WHEN SUBMIT, DELETE, UPDATE THE DATA
  const [successMsg, setSuccessMsg] = useState(false);
  // ---- SORT BY NAME & SORT BY SALARY
  const [hidesortIcon, setHideSortIcon] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [ShowSortedTable, setShowSortedTable] = useState(false);
  // ---------------------------- ONCHANGE_EVENT_FUNCTION
  function handleChangeEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
    if (!(value.length === 0)) {
      setSHOW_Reset_Btn(true);
    } else {
      setSHOW_Reset_Btn(false);
    }
  }
  //--------- ResetFrom Root function
  const resetFrom = () => {
    setUserInfo({
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      mobile: "",
      project: "",
      salary: "",
    });
  };
  //* --------------------------------< ADD userInformission To state of useState >--------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userinfo.firstname ||
      !userinfo.lastname ||
      !userinfo.dob ||
      !userinfo.country ||
      !userinfo.mobile ||
      !userinfo.project ||
      !userinfo.salary
    ) {
      alert("Please fill the all detalis");
      return;
    }
    if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
      //not operator is use to if match fails the alert meggage
      alert("Only letters allowed in firstname");
      return;
    }
    if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {
      alert("Only letters allowed in lastname");
      return;
    }
    if (userinfo.mobile.length > 12 || userinfo.mobile.length < 10) {
      alert("Mobile Number must be 10 to 12 digites");
      return;
    }
    if (!(Number(userinfo.salary) >= 8000)) {
      alert("Salary Minimum less then equal to '8000'");
      return;
    }
    if (employees.find((item) => item.mobile === userinfo.mobile)) {
      alert("data alredy Exists please try diffence number");
      return;
    }
    const res = await fetch("http://localhost:5000/api/empform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });
    const newEmp = await res.json();
    setEmployees(prev => [...prev, newEmp]);
    handleDisplay();
    setSuccessMsg(`'${userinfo.firstname}' added successfully!`);
    setActBtns(obj_Btns.FORM);
    setSHOW_Reset_Btn(false); // after add the details reset btn hide
    setInput_Highlighted(false);
    setHideSortIcon(false);
    resetFrom();
    console.log(employees);
  };
  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 10000);
    return () => clearTimeout(timer);
  }, [successMsg]);
  //* -------------------------------------< DisplayTable Section >------------------------------------------
  const handleDisplay = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/empform"); 
      const data = await res.json();
      if (data.length === 0) {
        alert("No data to display");
        return;
      }
      setEmployees(data);
      setActBtns(obj_Btns.TABLE);
      setSearchReasult(false);
      setShow_Table(true);
      setHideSortIcon(true);
      setShowSortedTable(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    }
  };

  //* -------------------------------------< DelTableRow Section >------------------------------------------
  function handleDel(mobile) {
    const userDel = employees.find(
      //>> find()- The value of the first element that passes a test
      (emp) => emp.mobile === mobile,
    ); //>> find() hamesha array ka matching element (object) return karta hai, index nahi.
    if (
      window.confirm(
        `Want to delete employee ‟${userDel.mobile}” Id, name of ‟${userDel.firstname}”`,
      )
    ) {
      setEmployees((prev) => prev.filter((emp) => emp.mobile !== mobile));
      setSuccessMsg(`'${userDel.mobile}'s data  deleted  successfully!`);
      resetFrom();
      // console.log(employees.length);
      return;
    }
  }
  //* -------------------------------------< EditTabeRow Section >------------------------------------------
  function handleEdit(mobile) {
    //* findIndex() array me search karta hai aur matching element ka index (number) return karta hai
    const editEmpIndex = employees.findIndex((emp) => emp.mobile === mobile);
    setUserInfo(employees[editEmpIndex]); // setuserinfo me employees ka find index employees[empIndex] data put kardiya
    setEditIndex(editEmpIndex); // or usse save kardiya editindex se state me
    setSHOW_Reset_Btn(true);
    setActBtns(obj_Btns.EDIT);
    setInput_Highlighted(true);
  }
  //* -------------------------------------< Update EditTabeRow Section  >-----------------------
  const handleUpdate= ()=> {
    // after Update table not show and resetbtn active
    if (
      userinfo.firstname === "" ||
      userinfo.lastname === "" ||
      userinfo.dob === "" ||
      userinfo.country === "" ||
      userinfo.mobile === "" ||
      userinfo.project === "" ||
      userinfo.salary === ""
    ) {
      alert("Please fill the all detalis to be edit.");
      return false;
    }
    if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
      alert("Only letter allowed in firstname");
      return;
    }
    if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {
      alert("Only letter allowed in lastname");
      return;
    }
    if (userinfo.mobile.length > 12 || userinfo.mobile.length < 10) {
      alert("Mobile Number must be 10 to 12 digites");
      return;
    }
    if (!(Number(userinfo.salary) >= 8000)) {
      alert("Salary Minimum less then equal to '8000'");
      return;
    }
    //--- Update logic -------
    const updated = [...employees];
    updated[editindex] = userinfo;
    setEmployees(updated); // replace row  editindex = userinfo
    //--------------------------------------------------------------------
    setEmployees(employees); // Save updated list
    setEditIndex(null); // reset edit
    setSHOW_Reset_Btn(false);
    setShow_Table(true);
    setActBtns(obj_Btns.EDIT);
    resetFrom();
    setSuccessMsg(`Your '${updated}' Id Updated successfully!`);
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return;
  }
  //* --------------------------------------< Search >----------------------------------
  const handleSearch = () => {
    if (!(employees.length > 0)) {
      // not list is less 0
      alert("Employee Data Table is empty, please add employee data");
      return;
    }
    if (!(userinfo.firstname.length > 0)) {
      alert("Please write first name in the firstname input box ");
      return;
    }
    const match = employees.filter(
      (
        item, // Enter name to search the name its case-in-sensitive if match firstname = employeesfirst filter return ture result in table
      ) =>
        item.firstname.toLowerCase().charAt(0) ===
        userinfo.firstname.toLowerCase().charAt(0),
    );
    console.log(match);
    if (match.length > 0) {
      alert(`Employee '${userinfo.firstname}' found successfully.`);
      setSearchReasult(true);
      setActBtns(obj_Btns.SEARCH);
      setSHOW_Reset_Btn(true);
      return;
    } else {
      alert(`Employee '${userinfo.firstname}'  not found in Database`);
    }
  };
  useEffect(() => {
    if (searchresult) {
      setShow_Table(false);
      setInput_Highlighted(false);
    }
  }, [searchresult]);
  // * ----------------------------------------< Back >--------------------------------
  function handleBack() {
    setActBtns(obj_Btns.FORM);
    setShow_Table(false);
    setSearchReasult(false);
    setHideSortIcon(false);
    setShowSortedTable(false);
    setSHOW_Reset_Btn(false);
    setInput_Highlighted(false);
    resetFrom();
  }

  // * ----------------------------------------< reset >--------------------------------
  function handleReset() {
    resetFrom();
    setSHOW_Reset_Btn(false);
    setInput_Highlighted(false);
  }
  //* ----> Sorting Order <----
  //here we get parameter type from onclick to get data in Ordertype
  function handleSort(OrderType) {
    setSortType(OrderType); //here we set in the state of type
    setShowSortedTable(true);
  }
  let preSortEmp = [...employees];
  if (sortType) {
    preSortEmp.filter((emp) => emp.firstname === sortType);
  }
  // ---- Sorting Ascending Order By Name
  if (sortType === "Name_Asc") {
    preSortEmp.sort((a, b) =>
      (a.firstname || "").localeCompare(b.firstname || ""),
    );
  }
  // ---- Sorting Descending Order By Name
  if (sortType === "Name_Desc") {
    preSortEmp.sort((a, b) =>
      (b.firstname || "").localeCompare(a.firstname || ""),
    );
  }
  //  ----Sorting Ascending Order By Salary
  if (sortType === "Salary_Asc") {
    preSortEmp.sort((a, b) => a.salary - b.salary);
  }
  // ---- Sorting Descending Order By Salary
  if (sortType === "Salary_Desc") {
    preSortEmp.sort((a, b) => b.salary - a.salary);
  }
  useEffect(() => {
    if (ShowSortedTable) setShow_Table(false);
  }, [ShowSortedTable]);
  return (
    <>
      {" "}
      <div>
        {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </div>
      <div className={styles.Form_Container}>
        <form
          id="form-section"
          className={styles.form_section}
          action="#"
          onSubmit={handleSubmit}
        >
          <div className={styles.input_container}>
            <h1 id="heading" className={styles.heading}>
              Employee Details
            </h1>
            {/* <h2>A simple React-based form application that stores user details in a state array and displays them in a dynamic table.</h2> */}
            <input
              className={`${styles.form_input} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="text"
              name="firstname"
              value={userinfo.firstname}
              onChange={handleChangeEvent}
              placeholder="Enter firstname"
            />
            <input
              className={`${styles.form_input} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="text"
              name="lastname"
              value={userinfo.lastname}
              onChange={handleChangeEvent}
              placeholder="Enter lastname"
            />
            <input
              className={`${styles.form_input} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="date"
              name="dob"
              value={userinfo.dob}
              onChange={handleChangeEvent}
            />
            <select
              className={`${styles.select_optn} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="select"
              name="country"
              value={userinfo.country}
              onChange={handleChangeEvent}
            >
              <option className={styles.Options} value="">
                Select country
              </option>
              <option className={styles.Options} value="India">
                India
              </option>
              <option className={styles.Options} value="Englend">
                Englend
              </option>
              <option className={styles.Options} value="France">
                France
              </option>
              <option className={styles.Options} value="Spain">
                Spain
              </option>
              <option className={styles.Options} value="Russia">
                Russia
              </option>
              <option className={styles.Options} value="China">
                China
              </option>
              <option className={styles.Options} value="Japan">
                Japan
              </option>
              <option className={styles.Options} value="Australia">
                Australia
              </option>
              <option className={styles.Options} value="South Korea">
                South Korea
              </option>
              <option className={styles.Options} value="United States">
                United States
              </option>
              <option className={styles.Options} value="United Kingdom">
                United Kingdom
              </option>
              <option className={styles.Options} value="South Africa">
                South Africa
              </option>
            </select>
            <input
              className={`${styles.form_input} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="number"
              name="mobile"
              value={userinfo.mobile}
              onChange={handleChangeEvent}
              placeholder="Enter Mobile"
            />
            <select
              className={`${styles.select_optn} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="select"
              name="project"
              value={userinfo.project}
              onChange={handleChangeEvent}
            >
              <option className={styles.Options} value="">
                Select Project
              </option>
              <option className={styles.Options} value="WebCore">
                WebCore
              </option>
              <option className={styles.Options} value="WebNova">
                WebNova
              </option>
              <option className={styles.Options} value="SiteOps">
                SiteOps
              </option>
              <option className={styles.Options} value="Cloudix">
                Cloudix
              </option>
              <option className={styles.Options} value="CloudHub">
                CloudHub
              </option>
            </select>
            <input
              className={`${styles.form_input} ${
                Input_highlighted ? styles.Input_highlighted : ""
              }`}
              type="number"
              name="salary"
              value={userinfo.salary}
              onChange={handleChangeEvent}
              placeholder="Enter salary"
            />
            <div id="btn-section" className={styles.btn_section}>
              {btns_State.update && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
              {btns_State.add && (
                <input id="btn" className={styles.btn_feature} type="submit" />
              )}
              {show_ResetBtn && (
                <input
                  type="reset"
                  className={styles.btn_feature}
                  onClick={handleReset}
                />
              )}
              {btns_State.display && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleDisplay}
                >
                  Display
                </button>
              )}
              {btns_State.search && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              )}
              {btns_State.back && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* CONDITIONAL OPERATOR { && <> </>}  */}
      {employees.length > 0 && hidesortIcon && (
        <div className={styles.sort_icon_grid_box}>
          <div className={styles.sort_icon_name}>
            <span className={styles.icon_title}>Sort By Name</span>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleSort("Name_Asc");
              }}
            >
              <i className="fa-solid fa-chevron-up" />
            </button>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleSort("Name_Desc");
              }}
            >
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>
          <div className={styles.sort_icon_salary}>
            <span className={styles.icon_title}>Sort By Salary</span>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleSort("Salary_Asc");
              }}
            >
              <i className="fa-solid fa-chevron-up" />
            </button>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleSort("Salary_Desc");
              }}
            >
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>
        </div>
      )}
      {employees.length > 0 && showTable && (
        <div className={styles.display_table} id="display-info">
          <table className={styles.table_list} id="table-list">
            <thead className={styles.thead}>
              <tr className={styles.thead_tr}>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DOB</th>
                <th>Country</th>
                <th>mobile</th>
                <th>project</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {employees.map((item, index) => (
                <tr key={index} className={styles.tbody_tr}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.dob?.split("T")[0]}</td>
                  <td>{item.country}</td>
                  <td>{item.mobile}</td>
                  <td>{item.project}</td>
                  <td>{item.salary}</td>
                  <td className={styles.tbody_btns}>
                    <button
                      type="button"
                      className={styles.Del_user}
                      onClick={() => {
                        handleDel(item.mobile);
                      }}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                    <button
                      type="button"
                      className={styles.Edit_user}
                      onClick={() => {
                        handleEdit(item.mobile);
                      }}
                    >
                      <i className="fa-solid fa-edit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && ShowSortedTable && (
        <div className={styles.display_table} id="display-info">
          <table className={styles.table_list} id="table-list">
            <thead className={styles.thead}>
              <tr className={styles.thead_tr}>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DOB</th>
                <th>Country</th>
                <th>mobile</th>
                <th>project</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {preSortEmp.map((item, index) => (
                <tr key={index} className={styles.tbody_tr}>
                  <td className={styles.firstname_sort_HighLight}>
                    {item.firstname}
                  </td>
                  <td>{item.lastname}</td>
                  <td>{item.dob?.split("T")[0]}</td>
                  <td>{item.country}</td>
                  <td>{item.mobile}</td>
                  <td>{item.project}</td>
                  <td className={styles.salary_sort_HighLight}>
                    {item.salary}
                  </td>
                  <td className={styles.tbody_btns}>
                    <button
                      type="button"
                      className={styles.Del_user}
                      onClick={() => {
                        handleDel(item.mobile);
                      }}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                    <button
                      type="button"
                      className={styles.Edit_user}
                      onClick={() => {
                        handleEdit(item.mobile);
                      }}
                    >
                      <i className="fa-solid fa-edit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && searchresult && (
        <div className={styles.display_table} id="display-info">
          <table className={styles.table_list} id="table-list">
            <thead className={styles.thead}>
              <tr className={styles.thead_tr}>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DOB</th>
                <th>Country</th>
                <th>mobile</th>
                <th>project</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {employees
                .filter(
                  (item) =>
                    item.firstname.toLowerCase().charAt(0) ===
                    userinfo.firstname.toLowerCase().charAt(0),
                )
                .map((item, index) => (
                  <tr key={index} className={styles.tbody_tr}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.dob?.split("T")[0]}</td>
                    <td>{item.country}</td>
                    <td>{item.mobile}</td>
                    <td>{item.project}</td>
                    <td>{item.salary}</td>
                    <td className={styles.tbody_btns}>
                      <button
                        type="button"
                        className={styles.Del_user}
                        onClick={() => {
                          handleDel(item.mobile);
                        }}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                      <button
                        type="button"
                        className={styles.Edit_user}
                        onClick={() => {
                          handleEdit(item.mobile);
                        }}
                      >
                        <i className="fa-solid fa-edit" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default EmployeeInfoForm;
