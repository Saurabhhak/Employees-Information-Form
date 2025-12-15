import { useState } from "react";
import "./App.css";

// New essus the same data emplyoee details are asign
function EmployeeInfoForm() {
  const [userinfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    mobile: "",
    country: "",
    salary: "",
  });

  //conditional oprator { &&<></>}
  const [employeeList, setEmployeeList] = useState([]);
  const [showtable, setShowTable] = useState(false);
  const [searchresult, setSearchReasult] = useState(false);
  const [editindex, setEditIndex] = useState("");
  //update btn show onclick to edit btn
  const [updateshowbtn, setUpdateShowBtn] = useState(false);
  function handleChangeEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
  }
  //-------------------------- ADD userInformission To Browser database With conditons or validations --------
  function handleBtnAdd() {
    if (
      userinfo.firstname === "" ||
      userinfo.lastname === "" ||
      userinfo.dob === "" ||
      userinfo.mobile === "" ||
      userinfo.country === "" ||
      userinfo.salary === ""
    ) {
      alert("Please fill the all detalis");
      return false;
    }
    if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
      alert("Only letter allowed in firstname");
      return;
    }
    if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {
      //not operator is use to if match fails the alert meggage
      alert("Only letter allowed in lastname");
      return;
    }
    setEmployeeList((prev) => [...prev, userinfo]); // ye prev ek spread method h jsme old value store hoti or new value userinfo set aati h
    setUserInfo({
      firstname: "",
      lastname: "",
      dob: "",
      mobile: "",
      country: "",
      salary: "",
    });
    console.log("userinfo:", userinfo);
    if (employeeList.filter((item) => !item.mobile === userinfo.mobile)) {
      alert("User already registered try diferrent details");
      return;
    }
  }
  //function EmployeeInfoForm() ke under const variable tablerow asign kiya or return me expression diya ({tablerow})
  const tablerow = employeeList.filter((items) => !items.mobile === userinfo.mobile).map((items, index) => (
    <tr key={index} className="tbody-tr">
      <td>{items.firstname}</td>
      <td>{items.lastname}</td>
      <td>{items.dob}</td>
      <td>{items.mobile}</td>
      <td>{items.country}</td>
      <td>{items.salary}</td>
      <button
        type="button"
        className="Del-user"
        onClick={() => {
          handleDel(index);
        }}
      >
        <i class="fa-solid fa-close" />
      </button>
      <button
        type="button"
        className="Del-user"
        onClick={() => {
          handleEdit(index);
        }}
      >
        <i class="fa-solid fa-edit" />
      </button>
      {updateshowbtn && (
        <button className="Del-user" type="button" onClick={handleUpdate}>
          <i class="fa-solid fa-check" />
        </button>
      )}
    </tr>
  ));
  // ------------------------------------- DisplayTable Section ------------------------------------------
  // Diplay button onclicked to show information details if have userinfo
  function handleDisplay() {
    if (employeeList.length > 0) {
      setShowTable(true);
      // setSearchReasult(null);
      // setSearchReasult(false);
    } else {
      alert("No data to Display please add your infomation");
    }
  }
  // ------------------------------------- DelTableRow Section ------------------------------------------
  function handleDel(index) {
    setEmployeeList(
      employeeList.filter((Item, indexNumber) => indexNumber !== index)
    );
    // if the del index are matches to employeelist index , result false and filter always return true flase is deleted
    //                    1 !== 2 true
    //                    2 !== 2 wrong <---
    //                    3 !== 3 ture
    // filter always return ture , false delete
    return;
  }
  // ------------------------------------- EditTabeRow Section ------------------------------------------
  function handleEdit(index) {
    const editemp = employeeList[index]; // onclick table index row to pass employeeList to veriable editemp
    setUserInfo(editemp); // pass to input section this row data to be edit
    setEditIndex(index); // Save current input index row will be updated

    // Onclick edit btn then show the update btn
    setUpdateShowBtn(true);
  }
  // ------------------------------------- Update EditTabeRow Section  -----------------------
  function handleUpdate() {
    if (
      userinfo.firstname === "" ||
      userinfo.lastname === "" ||
      userinfo.dob === "" ||
      userinfo.country === "" ||
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
    const updateList = [...employeeList]; // Copy list
    updateList[editindex] = userinfo; // replace row  editindex = userinfo
    setEmployeeList(updateList); // Save updated list
    setEditIndex(null); // Reset edit mode
    setUpdateShowBtn(false);
    setUserInfo({
      // Clear input fields
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      salary: "",
    });
    alert("Edit information updated successfully");
    return;
  }
  //-------------------------------------- Search ----------------------------------
  // Q. search the firstname of first input area from employeelist and print the firstname in table
  // step1: search name in [input text area in first name] is check employeelist table == [first name]
  // step2: fist add the employee table then link the search btn to [input area]
  // step3: type search the name is match that table fistname
  // step4: if matched then print the matches name only in table
  function handleSearch() {
    // New task asign is for name search first latter show related to all the name if available in database
    if (!employeeList.length > 0) {
      // not list is less 0
      alert("User data is empty, please add your data");
      return;
    }
    if (!userinfo.firstname > 0) {
      alert("Please write your first name in the firstname input box ");
      return;
    }
    const match = employeeList.filter(
      (
        item // Enter name to search the name its case-in-sensitive if match firstname = employeeListfirst filter return ture result in table
      ) => item.firstname.toLowerCase() === userinfo.firstname.toLowerCase()
    );
    console.log(match);
    if (match.length > 0) {
      alert(`Employee '${userinfo.firstname}' found successfully.`); // setShowTable(false);
      setShowTable(null); // full table hide
      return setSearchReasult(true); // setSearchItem(match) match row show
    } else {
      alert(`Employee '${userinfo.firstname}'  not found in Database`);
    }
  }
  const match = employeeList
    .filter(
      (item) => // employeeList.FirstName("Saurabh")  = index (0) = S == userinfo.firstname.toString(0) = S
        item.firstname.toLowerCase().charAt(0) === userinfo.firstname.toLowerCase().charAt(0)
    )
    .map((item, index) => (
      <tr key={index} className="tbody-tr">
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.dob}</td>
        <td>{item.mobile}</td>
        <td>{item.country}</td>
        <td>{item.salary}</td>
        <button
          type="button"
          className="Del-user"
          onClick={() => {
            handleDel(index);
          }}
        >
          <i class="fa-solid fa-close" />
        </button>
        <button
          type="button"
          className="Del-user"
          onClick={() => {
            handleEdit(index);
          }}
        >
          <i class="fa-solid fa-edit" />
        </button>
        {updateshowbtn && (
          <button className="Del-user" type="button" onClick={handleUpdate}>
            <i class="fa-solid fa-check" />
          </button>
        )}
      </tr>
    ));
  //-------------------------------------- Close ----------------------------------
  function handleClose() {
    if (!setShowTable(true) && !setSearchReasult(true)) {
      setShowTable(false);
      setSearchReasult(false);
      return;
    }
  }
  return (
    <form id="form-section" className="form-section">
      <div id="input-btn-container" className="input-btn-container">
        <h1 id="heading">Employees Information Form</h1>
        {/* <h2>A simple React-based form application that stores user details in a state array and displays them in a dynamic table.</h2> */}
        <input
          //then i create the logic for it
          className="form-input"
          type="text"
          name="firstname"
          value={userinfo.firstname}
          onChange={handleChangeEvent}
          placeholder="enter firstname"
        />
        <input
          className="form-input"
          type="text"
          name="lastname"
          value={userinfo.lastname}
          onChange={handleChangeEvent}
          placeholder="enter lastname"
        />
        <input
          className="form-input"
          type="date"
          name="dob"
          value={userinfo.dob}
          onChange={handleChangeEvent}
        />
        <input
          className="form-input"
          type="number"
          name="mobile"
          value={userinfo.mobile}
          onChange={handleChangeEvent}
          placeholder="enter mobile number"
        />
        <select
          className="select-optn"
          type="select"
          name="country"
          value={userinfo.country}
          onChange={handleChangeEvent}
        >
          <option className="otpn" value="" disabled>
            Select country
          </option>
          <option className="otpn" value="India">
            India
          </option>
          <option className="otpn" value="United States">
            United States
          </option>
          <option className="otpn" value="United Kingdom">
            United Kingdom
          </option>
          <option className="otpn" value="Englend">
            Englend
          </option>
          <option className="otpn" value="France">
            France
          </option>
          <option className="otpn" value="Spain">
            Spain
          </option>
          <option className="otpn" value="Russia">
            Russia
          </option>
          <option className="otpn" value="China">
            China
          </option>
          <option className="otpn" value="Japan">
            Japan
          </option>
          <option className="otpn" value="South Korea">
            South Korea
          </option>
          <option className="otpn" value="Australia">
            Australia
          </option>
          <option className="otpn" value="South Africa">
            South Africa
          </option>
        </select>
        <input
          className="form-input"
          type="number"
          name="salary"
          value={userinfo.salary}
          onChange={handleChangeEvent}
          placeholder="enter salary"
          minLength={8000}
        />
        {/* <input type="text" value={searchitem} onChange={e => setSearchItem(e.target.value)} placeholder="seach the name "/> */}
        {/* button click per data store karna h state me but display nhi karna */}
        <div id="Add-Display-btn" className="Add-Display-btn">
          <button className="btn" type="button" onClick={handleBtnAdd}>
            Add
          </button>
          {/* Display btn onclick show details table of HTML*/}
          <button className="btn" type="button" onClick={handleDisplay}>
            Display
          </button>
          <button className="btn" type="button" onClick={handleSearch}>
            Seacrch
          </button>
          <button className="btn" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
      {/* here create the logic or method to pass Display funtion to show table */}
      {/* Search item result */}
      {showtable && (
        <div className="display-info" id="display-info">
          <table className="table-list" id="table-list">
            <thead className="thead">
              <tr className="thead-tr">
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Country</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="tbody">{tablerow}</tbody>
          </table>
        </div>
      )}
      {searchresult && (
        <div className="display-info" id="display-info">
          <table className="table-list" id="table-list">
            <thead className="thead">
              <tr className="thead-tr">
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Country</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="tbody">{match}</tbody>
          </table>
        </div>
      )}
    </form>
  );
}
export default EmployeeInfoForm;

// // All the task are completed at Date 15-12-2025, All the code here
// import { useState } from "react";
// import "./App.css";
// function EmployeeInfoForm() {
//   const [userinfo, setUserInfo] = useState({
//     firstname: "",
//     lastname: "",
//     dob: "",
//     country: "",
//     salary: "",
//   });

//   //conditional oprator { &&<></>}
//   const [employeeList, setEmployeeList] = useState([]);
//   const [showtable, setShowTable] = useState(false);
//   const [searchresult, setSearchReasult] = useState(false);
//   const [editindex, setEditIndex] = useState("");
//   //update btn show onclick to edit btn
//   const [updateshowbtn, setUpdateShowBtn] = useState(false);
//   function handleChangeEvent(e) {
//     const { name, value } = e.target;
//     setUserInfo((values) => ({ ...values, [name]: value }));
//   }
//   //-------------------------- ADD userInformission To Browser database With conditons or validations --------
//   function handleBtnAdd() {
//     if (
//       userinfo.firstname === "" ||
//       userinfo.lastname === "" ||
//       userinfo.dob === "" ||
//       userinfo.country === "" ||
//       userinfo.salary === ""
//     ) {
//       alert("Please fill the all detalis");
//       return false;
//     }
//     if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
//       alert("Only letter allowed in firstname");
//       return;
//     }
//     if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {   //not operator is use to if match fails the alert meggage
//       alert("Only letter allowed in lastname");
//       return;
//     }
//     setEmployeeList((prev) => [...prev, userinfo]); // ye prev ek spread method h jsme old value store hoti or new value userinfo set aati h
//     setUserInfo({
//       firstname: "",
//       lastname: "",
//       dob: "",
//       country: "",
//       salary: "",
//     });
//     console.log("userinfo:", userinfo);
//   }
//   const tablerow = employeeList.map(
//     (
//       item,
//       index // method to array list convert to map for list the item into table formate
//     ) => (
//       <tr key={index} className="tbody-tr">
//         <td>{item.firstname}</td>
//         <td>{item.lastname}</td>
//         <td>{item.dob}</td>
//         <td>{item.country}</td>
//         <td>{item.salary}</td>
//         <button
//           type="button"
//           className="Del-user"
//           onClick={() => {
//             handleDel(index);
//           }}
//         >
//           <i class="fa-solid fa-close" />
//         </button>
//         <button
//           type="button"
//           className="Del-user"
//           onClick={() => {
//             handleEdit(index);
//           }}
//         >
//           <i class="fa-solid fa-edit" />
//         </button>
//         {updateshowbtn && (
//           <button className="Del-user" type="button" onClick={handleUpdate}>
//             <i class="fa-solid fa-check" />
//           </button>
//         )}
//       </tr>
//     )
//   );
//   // ------------------------------------- DisplayTable Section ------------------------------------------
//   // Diplay button onclicked to show information details if have userinfo
//   function handleDisplay() {
//     if (employeeList.length > 0) {
//       setSearchReasult(null);
//       setShowTable(true);
//     } else {
//       alert("No data to Display please add your infomation");
//     }
//     // if (setShowTable(true)){
//     //   return setShowTable(false)
//     // }
//   }
//   // ------------------------------------- DelTableRow Section ------------------------------------------
//   function handleDel(index) {
//     setEmployeeList(
//       employeeList.filter((Item, indexNumber) => indexNumber !== index)
//     );
//     // if the del index are matches to employeelist index , result false and filter always return true flase is deleted
//     //                    1 !== 2 true
//     //                    2 !== 2 wrong <---
//     //                    3 !== 3 ture
//     // filter always return ture , false delete
//     return;
//   }
//   // ------------------------------------- EditTabeRow Section ------------------------------------------
//   function handleEdit(index) {
//     const editemp = employeeList[index]; // onclick table index row to pass employeeList to veriable editemp
//     setUserInfo(editemp); // pass to input section this row data to be edit
//     setEditIndex(index); // Save current input index row will be updated

//     // Onclick edit btn then show the update btn
//     setUpdateShowBtn(true);
//   }
//   // ------------------------------------- Update EditTabeRow Section  -----------------------
//   function handleUpdate() {
//     if (
//       userinfo.firstname === "" ||
//       userinfo.lastname === "" ||
//       userinfo.dob === "" ||
//       userinfo.country === "" ||
//       userinfo.salary === ""
//     )
//     {
//       alert("Please fill the all detalis to be edit.");
//       return false;
//     }
//     if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
//       alert("Only letter allowed in firstname");
//       return;
//     }
//     if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {
//       alert("Only letter allowed in lastname");
//       return;
//     }
//     const updateList = [...employeeList]; // Copy list
//     updateList[editindex] = userinfo // replace row  editindex = userinfo
//     setEmployeeList(updateList); // Save updated list
//     // setEditIndex(null); // Reset edit mode
//     // setUpdateShowBtn(false);
//     setUserInfo({
//       // Clear input fields
//       firstname: "",
//       lastname: "",
//       dob: "",
//       country: "",
//       salary: "",
//     });
//     alert("Edit information updated successfully");
//     return;

//   }
//   //-------------------------------------- Search ----------------------------------
//   // Q. search the firstname of first input area from employeelist and print the firstname in table
//   // step1: search name in [input text area in first name] is check employeelist table == [first name]
//   // step2: fist add the employee table then link the search btn to [input area]
//   // step3: type search the name is match that table fistname
//   // step4: if matched then print the matches name only in table
//   function handleSearch() {
//     if (!employeeList.length > 0) {
//       // not list is less 0
//       alert("User data is empty, please add your data");
//       return;
//     }
//     if (!userinfo.firstname > 0) {
//       alert("Please write your first name in the firstname input box ");
//       return;
//     }
//     const match = employeeList.filter((item) =>  // Enter name to search the name its case-in-sensitive if match firstname = employeeListfirst filter return ture result in table
//         item.firstname.toLowerCase() === userinfo.firstname.toLowerCase()
//     );
//     console.log(match);
//     if (match.length > 0) {
//       alert(`Employee '${userinfo.firstname}' found successfully.`); // setShowTable(false);
//       setShowTable(null); // full table hide
//       return setSearchReasult(true); // setSearchItem(match) match row show
//     } else {
//       alert(`Employee '${userinfo.firstname}'  not found in Database`);
//     }
//   }
//   const match = employeeList.filter((item) =>
//         item.firstname.toLowerCase() === userinfo.firstname.toLowerCase())
//     .map((item, index) => (
//       <tr key={index} className="tbody-tr">
//         <td>{item.firstname}</td>
//         <td>{item.lastname}</td>
//         <td>{item.dob}</td>
//         <td>{item.country}</td>
//         <td>{item.salary}</td>
//         <button
//           type="button"
//           className="Del-user"
//           onClick={() => {
//             handleDel(index);
//           }}
//         >
//           <i class="fa-solid fa-close" />
//         </button>
//         <button
//           type="button"
//           className="Del-user"
//           onClick={() => {
//             handleEdit(index);
//           }}
//         >
//           <i class="fa-solid fa-edit" />
//         </button>
//         {updateshowbtn && (
//           <button className="Del-user" type="button" onClick={handleUpdate}>
//             <i class="fa-solid fa-check" />
//           </button>
//         )}
//       </tr>
//     ));
//   function handleClose() {
//     if (!setShowTable(true) && !setSearchReasult(true)) {
//       setShowTable(false);
//       setSearchReasult(false);
//       return;
//     }
//   }
//   return (
//     <form id="form-section" className="form-section">
//       <div id="input-btn-container" className="input-btn-container">
//         <h1 id="heading">Employees Information Form</h1>
//         {/* <h2>A simple React-based form application that stores user details in a state array and displays them in a dynamic table.</h2> */}
//         <input
//           //then i create the logic for it
//           className="form-input"
//           type="text"
//           name="firstname"
//           value={userinfo.firstname}
//           onChange={handleChangeEvent}
//           placeholder="enter your firstname"
//         />
//         <input
//           className="form-input"
//           type="text"
//           name="lastname"
//           value={userinfo.lastname}
//           onChange={handleChangeEvent}
//           placeholder="enter your lastname"
//         />
//         <input
//           className="form-input"
//           type="date"
//           name="dob"
//           value={userinfo.dob}
//           onChange={handleChangeEvent}
//           placeholder="enter your"
//         />
//         <select
//           className="select-optn"
//           type="select"
//           name="country"
//           value={userinfo.country}
//           onChange={handleChangeEvent}
//         >
//           <option className="otpn" value="" disabled>
//             Select country
//           </option>
//           <option className="otpn" value="India">
//             India
//           </option>
//           <option className="otpn" value="United States">
//             United States
//           </option>
//           <option className="otpn" value="United Kingdom">
//             United Kingdom
//           </option>
//           <option className="otpn" value="Englend">
//             Englend
//           </option>
//           <option className="otpn" value="France">
//             France
//           </option>
//           <option className="otpn" value="Spain">
//             Spain
//           </option>
//           <option className="otpn" value="Russia">
//             Russia
//           </option>
//           <option className="otpn" value="China">
//             China
//           </option>
//           <option className="otpn" value="Japan">
//             Japan
//           </option>
//           <option className="otpn" value="South Korea">
//             South Korea
//           </option>
//           <option className="otpn" value="Australia">
//             Australia
//           </option>
//           <option className="otpn" value="South Africa">
//             South Africa
//           </option>
//         </select>
//         <input
//           className="form-input"
//           type="number"
//           name="salary"
//           value={userinfo.salary}
//           onChange={handleChangeEvent}
//           placeholder="enter salary"
//           minLength={8000}
//         />
//         {/* <input type="text" value={searchitem} onChange={e => setSearchItem(e.target.value)} placeholder="seach the name "/> */}
//         {/* button click per data store karna h state me but display nhi karna */}
//         <div id="Add-Display-btn" className="Add-Display-btn">
//           <button className="btn" type="button" onClick={handleBtnAdd}>
//             Add
//           </button>
//           {/* Display btn onclick show details table of HTML*/}
//           <button className="btn" type="button" onClick={handleDisplay}>
//             Display
//           </button>
//           <button className="btn" type="button" onClick={handleSearch}>
//             Seacrch
//           </button>
//           <button className="btn" type="button" onClick={handleClose}>
//             Close
//           </button>
//         </div>
//       </div>
//       {/* here create the logic or method to pass Display funtion to show table */}
//       {/* Search item result */}
//       {showtable && (
//         <div className="display-info" id="display-info">
//           <table className="table-list" id="table-list">
//             <thead className="thead">
//               <tr className="thead-tr">
//                 <th>Firstname</th>
//                 <th>Lastname</th>
//                 <th>DOB</th>
//                 <th>Country</th>
//                 <th>Salary</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="tbody">{tablerow}</tbody>
//           </table>
//         </div>
//       )}
//       {searchresult && (
//         <div className="display-info" id="display-info">
//           <table className="table-list" id="table-list">
//             <thead className="thead">
//               <tr className="thead-tr">
//                 <th>Firstname</th>
//                 <th>Lastname</th>
//                 <th>DOB</th>
//                 <th>Country</th>
//                 <th>Salary</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="tbody">{match}</tbody>
//           </table>
//         </div>
//       )}
//     </form>
//   );
// }
// export default EmployeeInfoForm;
