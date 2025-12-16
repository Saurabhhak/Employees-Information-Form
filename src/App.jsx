// All the task are completed at Date 15-12-2025, All the code here
import { useState } from "react";
import "./App.css";
function EmployeeInfoForm() {
  const [userinfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    country: "",
    mobile: "",
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
      userinfo.country === "" ||
      userinfo.mobile === "" ||
      userinfo.salary === ""
    ) {
      alert("Please fill the all detalis");
      return;
    }
    if (!userinfo.firstname.match(/^[a-zA-z]+$/)) { //not operator is use to if match fails the alert meggage
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
    if (employeeList.find((item) => item.mobile === userinfo.mobile)) {
      alert("data alredy Exists please try diffence number");
      return;
    }
    setEmployeeList((prev) => [...prev, userinfo]); // ye prev ek spread method h jsme old value store hoti or new value userinfo set aati h
    setUserInfo({
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      mobile: "",
      salary: "",
    });
    console.log("userinfo:", userinfo);
    // console.log("length", userinfo.mobile.length);
  }
  const tablerow = employeeList.map((item, index) => (
    <tr key={index} className="tbody-tr">
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.dob}</td>
      <td>{item.country}</td>
      <td>{item.mobile}</td>
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
        className="Edit-user"
        onClick={() => {
          handleEdit(index);
        }}
      >
        <i class="fa-solid fa-edit" />
      </button>
      {updateshowbtn && (
        <button className="update-user" type="button" onClick={handleUpdate}>
          <i class="fa-solid fa-check" />
        </button>
      )}
    </tr>
  ));
  // ------------------------------------- DisplayTable Section ------------------------------------------
  // Diplay button onclicked to show information details if have userinfo
  function handleDisplay() {
    if (employeeList.length > 0) {
      setSearchReasult(null);
      setShowTable(true);
    } else {
      alert("No data to Display please add your infomation");
    }
    // if (setShowTable(true)){
    //   return setShowTable(false)
    // }
  }
  // ------------------------------------- DelTableRow Section ------------------------------------------
  function handleDel(index) {
    // if(create logic to confirm to del or chancel )
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

    // if Onclick edit btn then show the update btn
    setUpdateShowBtn(true);
    
  }
  // ------------------------------------- Update EditTabeRow Section  -----------------------
  function handleUpdate() {
    if (
      userinfo.firstname === "" ||
      userinfo.lastname === "" ||
      userinfo.dob === "" ||
      userinfo.country === "" ||
      userinfo.mobile === "" ||
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
      mobile: "",
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
      ) =>
        item.firstname.toLowerCase().charAt(0) ===
        userinfo.firstname.toLowerCase().charAt(0)
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
      (item) =>
        item.firstname.toLowerCase().charAt(0) ===
        userinfo.firstname.toLowerCase().charAt(0)
    )
    .map((item, index) => (
      <tr key={index} className="tbody-tr">
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.dob}</td>
        <td>{item.country}</td>
        <td>{item.mobile}</td>
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
          className="Edit-user"
          onClick={() => {
            handleEdit(index);
          }}
        >
          <i class="fa-solid fa-edit" />
        </button>
        {updateshowbtn && (
          <button className="update-user" type="button" onClick={handleUpdate}>
            <i class="fa-solid fa-check" />
          </button>
        )}
      </tr>
    ));
  //---------------------------------------- Close --------------------------------
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
          placeholder="Enter your firstname"
        />
        <input
          className="form-input"
          type="text"
          name="lastname"
          value={userinfo.lastname}
          onChange={handleChangeEvent}
          placeholder="Enter your lastname"
        />
        <input
          className="form-input"
          type="date"
          name="dob"
          value={userinfo.dob}
          onChange={handleChangeEvent}
          placeholder="Enter your"
        />
        <select
          className="select-optn"
          type="select"
          name="country"
          value={userinfo.country}
          onChange={handleChangeEvent}
        >
          <option id="sel-optn" value="" disabled>
            Select country
          </option>
          <option id="sel-optn" value="India">
            India
          </option>
          <option id="sel-optn" value="United States">
            United States
          </option>
          <option id="sel-optn" value="United Kingdom">
            United Kingdom
          </option>
          <option id="sel-optn" value="Englend">
            Englend
          </option>
          <option id="sel-optn" value="France">
            France
          </option>
          <option id="sel-optn" value="Spain">
            Spain
          </option>
          <option id="sel-optn" value="Russia">
            Russia
          </option>
          <option id="sel-optn" value="China">
            China
          </option>
          <option id="sel-optn" value="Japan">
            Japan
          </option>
          <option id="sel-optn" value="South Korea">
            South Korea
          </option>
          <option id="sel-optn" value="Australia">
            Australia
          </option>
          <option id="sel-optn" value="South Africa">
            South Africa
          </option>
        </select>
        <input
          className="form-input"
          type="number"
          name="mobile"
          value={userinfo.mobile}
          onChange={handleChangeEvent}
          placeholder="Enter Mobile number"
        />
        <input
          className="form-input"
          type="number"
          name="salary"
          value={userinfo.salary}
          onChange={handleChangeEvent}
          placeholder="Enter salary"
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
                <th>Country</th>
                <th>mobile</th>
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
                <th>Country</th>
                <th>mobile</th>
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

// import { useState } from "react";
// import "./App.css";
// function EmployeeInfoForm() {
//   const [userinfo, setUserInfo] = useState({
//     firstname: "",
//     lastname: "",
//     dob: "",
//     country: "",
//     mobile: "",
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
//       userinfo.mobile === "" ||
//       userinfo.salary === ""
//     ) {
//       alert("Please fill the all detalis");
//       return;
//     }
//     if (!userinfo.firstname.match(/^[a-zA-z]+$/)) {
//       alert("Only letter allowed in firstname");
//       return;
//     }
//     if (!userinfo.lastname.match(/^[a-zA-z]+$/)) {
//       //not operator is use to if match fails the alert meggage
//       alert("Only letter allowed in lastname");
//       return;
//     }

//     if (userinfo.mobile.length > 12 || userinfo.mobile.length < 10) {
//       //not operator is use to if match fails the alert meggage
//       alert("Mobile Number must be 10 to 12 digites");
//       return;
//     }
//     if (!(Number(userinfo.salary) >= 8000)) {
//       //not operator is use to if match fails the alert meggage
//       alert("Salary Minimum less then equal to '8000'");
//       return;
//     }
//     if (employeeList.some((item) => item.mobile === userinfo.mobile)) {
//       alert("data alredy Exists please try diffence number");
//       return;
//     }
//     setEmployeeList((prev) => [...prev, userinfo]); // ye prev ek spread method h jsme old value store hoti or new value userinfo set aati h
//     setUserInfo({
//       firstname: "",
//       lastname: "",
//       dob: "",
//       country: "",
//       mobile: "",
//       salary: "",
//     });
//     console.log("userinfo:", userinfo);
//     // console.log("length", userinfo.mobile.length);
//   }
//   const tablerow = employeeList.map((item, index) => (
//     <tr key={index} className="tbody-tr">
//       <td>{item.firstname}</td>
//       <td>{item.lastname}</td>
//       <td>{item.dob}</td>
//       <td>{item.country}</td>
//       <td>{item.mobile}</td>
//       <td>{item.salary}</td>
//       <button
//         type="button"
//         className="Del-user"
//         onClick={() => {
//           handleDel(index);
//         }}
//       >
//         <i class="fa-solid fa-close" />
//       </button>
//       <button
//         type="button"
//         className="Edit-user"
//         onClick={() => {
//           handleEdit(index);
//         }}
//       >
//         <i class="fa-solid fa-edit" />
//       </button>
//       {updateshowbtn && (
//         <button className="update-user" type="button" onClick={handleUpdate}>
//           <i class="fa-solid fa-check" />
//         </button>
//       )}
//     </tr>
//   ));
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
//     // if(create logic to confirm to del or chancel )
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
//       userinfo.mobile === "" ||
//       userinfo.salary === ""
//     ) {
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
//     updateList[editindex] = userinfo; // replace row  editindex = userinfo
//     setEmployeeList(updateList); // Save updated list
//     setEditIndex(null); // Reset edit mode
//     setUpdateShowBtn(false);
//     setUserInfo({
//       // Clear input fields
//       firstname: "",
//       lastname: "",
//       dob: "",
//       country: "",
//       mobile: "",
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
//     const match = employeeList.filter(
//       (
//         item // Enter name to search the name its case-in-sensitive if match firstname = employeeListfirst filter return ture result in table
//       ) =>
//         item.firstname.toLowerCase().charAt(0) ===
//         userinfo.firstname.toLowerCase().charAt(0)
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
//   const match = employeeList
//     .filter(
//       (item) =>
//         item.firstname.toLowerCase().charAt(0) ===
//         userinfo.firstname.toLowerCase().charAt(0)
//     )
//     .map((item, index) => (
//       <tr key={index} className="tbody-tr">
//         <td>{item.firstname}</td>
//         <td>{item.lastname}</td>
//         <td>{item.dob}</td>
//         <td>{item.country}</td>
//         <td>{item.mobile}</td>
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
//           className="Edit-user"
//           onClick={() => {
//             handleEdit(index);
//           }}
//         >
//           <i class="fa-solid fa-edit" />
//         </button>
//         {updateshowbtn && (
//           <button className="update-user" type="button" onClick={handleUpdate}>
//             <i class="fa-solid fa-check" />
//           </button>
//         )}
//       </tr>
//     ));
//   //---------------------------------------- Close --------------------------------
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
//           placeholder="Enter your firstname"
//         />
//         <input
//           className="form-input"
//           type="text"
//           name="lastname"
//           value={userinfo.lastname}
//           onChange={handleChangeEvent}
//           placeholder="Enter your lastname"
//         />
//         <input
//           className="form-input"
//           type="date"
//           name="dob"
//           value={userinfo.dob}
//           onChange={handleChangeEvent}
//           placeholder="Enter your"
//         />
//         <select
//           className="select-optn"
//           type="select"
//           name="country"
//           value={userinfo.country}
//           onChange={handleChangeEvent}
//         >
//           <option id="sel-optn" value="" disabled>
//             Select country
//           </option>
//           <option id="sel-optn" value="India">
//             India
//           </option>
//           <option id="sel-optn" value="United States">
//             United States
//           </option>
//           <option id="sel-optn" value="United Kingdom">
//             United Kingdom
//           </option>
//           <option id="sel-optn" value="Englend">
//             Englend
//           </option>
//           <option id="sel-optn" value="France">
//             France
//           </option>
//           <option id="sel-optn" value="Spain">
//             Spain
//           </option>
//           <option id="sel-optn" value="Russia">
//             Russia
//           </option>
//           <option id="sel-optn" value="China">
//             China
//           </option>
//           <option id="sel-optn" value="Japan">
//             Japan
//           </option>
//           <option id="sel-optn" value="South Korea">
//             South Korea
//           </option>
//           <option id="sel-optn" value="Australia">
//             Australia
//           </option>
//           <option id="sel-optn" value="South Africa">
//             South Africa
//           </option>
//         </select>
//         <input
//           className="form-input"
//           type="number"
//           name="mobile"
//           value={userinfo.mobile}
//           onChange={handleChangeEvent}
//           placeholder="Enter Mobile number"
//         />
//         <input
//           className="form-input"
//           type="number"
//           name="salary"
//           value={userinfo.salary}
//           onChange={handleChangeEvent}
//           placeholder="Enter salary"
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
//                 <th>mobile</th>
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
//                 <th>mobile</th>
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
