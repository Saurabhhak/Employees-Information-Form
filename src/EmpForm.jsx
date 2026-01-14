// All the task are completed at Date 15-12-2025, All the code here
import { useState } from "react";
import styles from "./EmpForm.module.css";

function EmployeeInfoForm({ employees, setEmployees }) {
  const [userinfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    country: "",
    mobile: "",
    project: "",
    salary: "",
  });
  //conditional oprator { &&<></>}
  // const [employees, setemployees] = useState([]);
  const [showtable, setShowTable] = useState(false);
  const [searchresult, setSearchReasult] = useState(false);
  const [editindex, setEditIndex] = useState("");
  // Edit btn onclick "ADD" btn hide
  const [addhidebtn, setAddHideBtn] = useState(true);
  //update btn show onclick to "edit" btn
  const [updateshowbtn, setUpdateShowBtn] = useState(false);
  //Display btn onclick to hide "search" btn
  const [hidesearchbtn, setHideSearchBtn] = useState(true);
  //Back btn hide only display,search or update btn onclick to view
  const [hidebackbtn, setHideBackbtn] = useState(false);
  //Reset btn hide only show when type input box onclcik search btn
  const [hideresetbtn, setHideResetBtn] = useState(false);
  //Display btn hide when click edit btn
  const [hidedisplaybtn, setHideDisplayBtn] = useState(true);
  // popup successfully message
  const [successMsg, setSuccessMsg] = useState(false);
  // highlight the edit section
  const [highlight, setHighlight] = useState(false);
  // sort by name
  const [ascsorted, setAscSorted] = useState(false);
  const [descsorted, setDescSorted] = useState(false);
  // sort by salary
  const [ascsalary, setAscSalary] = useState(false);
  const [descsalary, setDescSalary] = useState(false);
  const [hidesortIcon, setHideSortIcon] = useState(false);
  function handleChangeEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
    // if (!userinfo.length > 0) {
    //   setHideResetBtn(true);
    //   return;
    // }
    // --> If you read Solve it ?? input box is clear by press back key on laptop, check the leangth user.info===0 then reset btn hide
    // if (userinfo.length===0) {
    //   setHideResetBtn(false);
    //   return;
    // }
    //  input box is clear by keyboard , check the leangth user.info===0 then reset btn hide
    if (!(value.length === 0)) {
      setHideResetBtn(true);
    } else {
      setHideResetBtn(false);
    }
  }
  //* --------------------------------< ADD userInformission To state of useState >--------
  function handleBtnAdd() {
    if (
      userinfo.firstname === "" ||
      userinfo.lastname === "" ||
      userinfo.dob === "" ||
      userinfo.country === "" ||
      userinfo.mobile === "" ||
      userinfo.project === "" ||
      userinfo.salary === ""
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
    setEmployees((employees) => [...employees, userinfo]); // ye prev ek spread method h jsme old value store hoti or new value userinfo se get hoti h
    // alert the message if infomation add successfully
    const checkadduser = [...employees];
    if (!(employees > checkadduser)) {
      // alert(`'${userinfo.firstname}' '${userinfo.lastname}' Your data Add successfully As primary Number ${userinfo.mobile}`);
      setSuccessMsg(`'${userinfo.firstname}' added successfully!`);
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      setUserInfo({
        firstname: "",
        lastname: "",
        dob: "",
        country: "",
        mobile: "",
        project: "",
        salary: "",
      });
      setHideResetBtn(false); // after add the details reset btn hide
      setHighlight(false);
      // setHideSortIcon(false);
      console.log("userinfo:", userinfo);
      return;
    }
  }
  const tablerow = employees.map((item, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
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
  ));
  //* -------------------------------------< DisplayTable Section >------------------------------------------
  function handleDisplay() {
    if (employees.length > 0) {
      setSearchReasult(false);
      setShowTable(true);
      setHideSearchBtn(false);
      setHideBackbtn(true);
      setAscSorted(false);
      setAscSalary(false);
      setDescSorted(false);
      setDescSalary(false);
      setHideSortIcon(true);
    } else {
      alert("No data to Display please add infomation");
      setShowTable(false);
      return;
    }
  }

  //* -------------------------------------< DelTableRow Section >------------------------------------------
  function handleDel(mobile) {
    const userDel = employees.find(
      //>> find()- The value of the first element that passes a test
      (emp) => emp.mobile === mobile
    ); //>> find() hamesha array ka matching element (object) return karta hai, index nahi.
    if (
      window.confirm(
        `Want to delete employee ‟${userDel.mobile}” Id, name of ‟${userDel.firstname}”`
      )
    ) {
      setEmployees((prev) => prev.filter((emp) => emp.mobile !== mobile));
      setSuccessMsg(`'${userDel.mobile}'s data  deleted  successfully!`);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      setUserInfo({
        firstname: "",
        lastname: "",
        dob: "",
        country: "",
        mobile: "",
        salary: "",
      });
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
    // if Onclick edit btn then show the update btn and hide Add btn
    setUpdateShowBtn(true);
    setAddHideBtn(false);
    setHideResetBtn(true);
    setHideSearchBtn(false);
    setHideDisplayBtn(false);
    // Highlight the edit section
    // const highlight = employees[index].firstname;
    setHighlight(true);
  }
  //* -------------------------------------< Update EditTabeRow Section  >-----------------------
  function handleUpdate() {
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
    const updateid = employees[editindex].mobile;
    employees[editindex] = userinfo; // replace row  editindex = userinfo
    //--------------------------------------------------------------------
    setEmployees(employees); // Save updated list
    setEditIndex(null); // reset edit
    setUpdateShowBtn(false);
    setHideResetBtn(false);
    setHideBackbtn(true);
    setShowTable(true);
    setAscSorted(false);
    setAscSalary(false);
    setDescSorted(false);
    setDescSalary(false);
    setUserInfo({
      // Clear input fields
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      mobile: "",
      salary: "",
    });

    // highlisht updatemSuccessMsg
    setSuccessMsg(`Your '${updateid}' Id Updated successfully!`);
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    setUserInfo({
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      mobile: "",
      project: "",
      salary: "",
    });
    // highlisht property updateed in table
    alert("Edit information updated successfully");
    return;
  }
  //* --------------------------------------< Search >----------------------------------
  // Q. search the firstname of first input area from employees and print the firstname in table
  // step1: search name in [input text area in first name] is check employees table == [first name]
  // step2: fist add the employee table then link the search btn to [input area]
  // step3: type search the name is match that table fistname
  // step4: if matched then print the matches name only in table
  function handleSearch() {
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
        item // Enter name to search the name its case-in-sensitive if match firstname = employeesfirst filter return ture result in table
      ) =>
        item.firstname.toLowerCase().charAt(0) ===
        userinfo.firstname.toLowerCase().charAt(0)
    );
    console.log(match);
    if (match.length > 0) {
      alert(`Employee '${userinfo.firstname}' found successfully.`);
      setAddHideBtn(false);
      setSearchReasult(true);
      setHideBackbtn(true);
      setHideResetBtn(true);
      setHighlight(false);
      return;
    } else {
      alert(`Employee '${userinfo.firstname}'  not found in Database`);
    }
  }
  const match = employees
    .filter(
      (item) =>
        item.firstname.toLowerCase().charAt(0) ===
        userinfo.firstname.toLowerCase().charAt(0)
    )
    .map((item, index) => (
      <tr key={index} className={styles.tbody_tr}>
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.dob}</td>
        <td>{item.country}</td>
        <td>{item.mobile}</td>
        <td>{item.project}</td>
        <td>{item.salary}</td>
        <div className="tbody-icons-btn">
          <button
            type="button"
            className={styles.Del_user}
            onClick={() => {
              handleDel(item.mobile);
            }}
          >
            <i className="fa-solid fa-close" />
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
        </div>
      </tr>
    ));
  // * ----------------------------------------< Back >--------------------------------
  function handleBack() {
    if (!setShowTable(true) && !setSearchReasult(true)) {
      setShowTable(false);
      setSearchReasult(false);
      setHideSearchBtn(true);
      setAddHideBtn(true);
      setUpdateShowBtn(false);
      setHideBackbtn(false);
      setHideResetBtn(false);
      setHideDisplayBtn(true);
      setAscSorted(false);
      setDescSorted(false);
      setDescSalary(false);
      setAscSalary(false);
      setHideSortIcon(false);
      setUserInfo({
        // Clear input fields
        firstname: "",
        lastname: "",
        dob: "",
        country: "",
        mobile: "",
        project: "",
        salary: "",
      });
      setHighlight(false);
      return;
    }
  }
  // * ----------------------------------------< reset >--------------------------------
  function handleReset() {
    setUserInfo({
      // Clear input fields
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      mobile: "",
      project: "",
      salary: "",
    });
    setHideResetBtn(false);
    setHighlight(false);
  }

  //* -----------------------------------< sorting Ascending  Order Name >---------------------------
  function handleAscName() {
    if (!setShowTable(true)) {
      setAscSorted(true);
      setShowTable(false);
      setSearchReasult(false);
      setDescSorted(false);
      setAscSalary(false);
      setDescSalary(false);
      return;
    }
  }
  const AscendingName = [...employees];
  for (let i = 0; i < AscendingName.length; i++) {
    for (let j = 0; j < AscendingName.length - 1; j++) {
      if (
        AscendingName[j].firstname.localeCompare(
          AscendingName[j + 1].firstname
        ) > 0
      ) {
        let temp = 0;
        temp = AscendingName[j];
        AscendingName[j] = AscendingName[j + 1];
        AscendingName[j + 1] = temp;
      }
    }
  }
  const AscendingName1 = AscendingName.map((item, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td className={styles.firstname_sort_highlight}>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
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
  ));
  //* -------------------------------------< sorting Descending Order Name  >-------------------------
  function handleDescName() {
    if (!setShowTable(true)) {
      setDescSorted(true);
      setAscSorted(false);
      setAscSalary(false);
      setDescSalary(false);
      setShowTable(false);
      setSearchReasult(false);
      return;
    }
  }
  const DescendingName = [...employees];
  for (let i = 0; i < DescendingName.length; i++) {
    for (let j = 0; j < DescendingName.length - 1; j++) {
      if (
        DescendingName[j].firstname.localeCompare(
          DescendingName[j + 1].firstname
        ) < 0
      ) {
        let temp = 0;
        temp = DescendingName[j];
        DescendingName[j] = DescendingName[j + 1];
        DescendingName[j + 1] = temp;
      }
    }
  }
  const DescendingName1 = DescendingName.map((item, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td className={styles.firstname_sort_highlight}>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
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
  ));
  // * ---------------------------------------< sorting Ascending Order salary >---------------------------
  function handleAscSalary() {
    if (!setShowTable(true)) {
      setAscSalary(true);
      setDescSalary(false);
      setAscSorted(false);
      setDescSorted(false);
      setShowTable(false);
      setSearchReasult(false);
      return;
    }
  }
  const acesalarysort = [...employees];
  for (let i = 0; i < acesalarysort.length; i++) {
    for (let j = 0; j < acesalarysort.length - 1; j++) {
      if (acesalarysort[j].salary > acesalarysort[j + 1].salary) {
        let temp = 0;
        temp = acesalarysort[j];
        acesalarysort[j] = acesalarysort[j + 1];
        acesalarysort[j + 1] = temp;
      }
    }
  }
  const acesalarysort1 = acesalarysort.map((item, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
      <td>{item.country}</td>
      <td>{item.mobile}</td>
      <td>{item.project}</td>
      <td className={styles.salary_sort_highlight}>{item.salary}</td>
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
  ));
  //* --------------------------------------< sorting Descending Order salary >-------------------------------
  function handleDescSalary() {
    if (!setShowTable(true)) {
      setDescSalary(true);
      setShowTable(false);
      setAscSalary(false);
      setAscSorted(false);
      setDescSorted(false);
      setSearchReasult(false);
      return;
    }
  }
  const descsalarysort = [...employees];
  for (let i = 0; i < descsalarysort.length; i++) {
    for (let j = 0; j < descsalarysort.length - 1; j++) {
      if (descsalarysort[j].salary < descsalarysort[j + 1].salary) {
        let temp = 0;
        temp = descsalarysort[j];
        descsalarysort[j] = descsalarysort[j + 1];
        descsalarysort[j + 1] = temp;
      }
    }
  }
  const descsalarysort1 = descsalarysort.map((item, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
      <td>{item.country}</td>
      <td>{item.mobile}</td>
      <td>{item.project}</td>
      <td className={styles.salary_sort_highlight}>{item.salary}</td>
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
  ));
  return (
    <>
      {/* <div className= {styles.="highlight">
          {employees.editemp}
        </div> */}
      <div>
        {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </div>
      <div className={styles.Form_Container}>
        <form id="form-section" className={styles.form_section}>
          <div className={styles.input_container}>
            <h1 id="heading" className={styles.heading}>
              Employee Details
            </h1>
            {/* <h2>A simple React-based form application that stores user details in a state array and displays them in a dynamic table.</h2> */}
            <input
              className={`${styles.form_input} ${
                highlight ? styles.highlight : ""
              }`}
              type="text"
              name="firstname"
              value={userinfo.firstname}
              onChange={handleChangeEvent}
              placeholder="Enter firstname"
            />
            <input
              className={`${styles.form_input} ${
                highlight ? styles.highlight : ""
              }`}
              type="text"
              name="lastname"
              value={userinfo.lastname}
              onChange={handleChangeEvent}
              placeholder="Enter lastname"
            />
            <input
              className={`${styles.form_input} ${
                highlight ? styles.highlight : ""
              }`}
              type="date"
              name="dob"
              value={userinfo.dob}
              onChange={handleChangeEvent}
            />
            <select
              className={`${styles.select_optn} ${
                highlight ? styles.highlight : ""
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
                highlight ? styles.highlight : ""
              }`}
              type="number"
              name="mobile"
              value={userinfo.mobile}
              onChange={handleChangeEvent}
              placeholder="Enter Mobile"
            />
            <select
              className={`${styles.select_optn} ${
                highlight ? styles.highlight : ""
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
                highlight ? styles.highlight : ""
              }`}
              type="number"
              name="salary"
              value={userinfo.salary}
              onChange={handleChangeEvent}
              placeholder="Enter salary"
            />
            {/* <input type="text" value={searchitem} onChange={e => setSearchItem(e.target.value)} placeholder="seach the name "/> */}
            {/* button click per data store karna h state me but display nhi karna */}
            <div id="btn-section" className={styles.btn_section}>
              {updateshowbtn && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
              {addhidebtn && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleBtnAdd}
                >
                  Add
                </button>
              )}

              {hideresetbtn && (
                <input
                  type="reset"
                  className={styles.btn_feature}
                  onClick={handleReset}
                />
              )}
              {/* Display btn onclick show details table of HTML*/}
              {hidedisplaybtn && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleDisplay}
                >
                  Display
                </button>
              )}
              {hidesearchbtn && (
                <button
                  className={styles.btn_feature}
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              )}
              {hidebackbtn && (
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

      {/* here create the logic or method to pass Display funtion to show table */}
      {/* Search item result */}
      {/* React me && ka matlab hota hai: “Sab condition true ho tabhi UI dikhao” */}
      {/* {sorted && } */}
      {employees.length > 0 && hidesortIcon && (
        <div className={styles.sort_icon_grid_box}>
          <div className={styles.sort_icon_name}>
            <span className={styles.icon_title}>Sort By Name</span>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleAscName();
              }}
            >
              <i className="fa-solid fa-chevron-up" />
            </button>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleDescName();
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
                handleAscSalary();
              }}
            >
              <i className="fa-solid fa-chevron-up" />
            </button>
            <button
              type="button"
              className={styles.shotOrder}
              onClick={() => {
                handleDescSalary();
              }}
            >
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>
        </div>
      )}
      {employees.length > 0 && showtable && (
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
            <tbody className={styles.tbody}>{tablerow}</tbody>
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
            <tbody className={styles.tbody}>{match}</tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && ascsorted && (
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
            <tbody className={styles.tbody}>{AscendingName1}</tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && descsorted && (
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
            <tbody className={styles.tbody}>{DescendingName1}</tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && ascsalary && (
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
            <tbody className={styles.tbody}>{acesalarysort1}</tbody>
          </table>
        </div>
      )}
      {employees.length > 0 && descsalary && (
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
            <tbody className={styles.tbody}>{descsalarysort1}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default EmployeeInfoForm;
