import { useState } from "react";
import styles from "./DashBoard.module.css";
function Dashboard({ employees }) {
  const [selectedProject, setSelectedProject] = useState(null);
  //--------- WebCore
  const webCoreCount = employees.filter(
    (emp) => emp.project === "WebCore"
  ).length;
  //--------- WebNova
  const webNovaCount = employees.filter(
    (emp) => emp.project === "WebNova"
  ).length;
  //---------SiteOps
  const siteOpsCount = employees.filter(
    (emp) => emp.project === "SiteOps"
  ).length;
  //---------Cloudix
  const cloudixCount = employees.filter(
    (emp) => emp.project === "Cloudix"
  ).length;
  //---------CloudHub
  const cloudHubCount = employees.filter(
    (emp) => emp.project === "CloudHub"
  ).length;
  // ----------- FILTER SELECTED PROJECT
  function handleProjectClick(projectName) {
    setSelectedProject(projectName);
  }
  let filteredEmployees = [];
  if (selectedProject) {
    filteredEmployees = employees.filter(
      (emp) => emp.project === selectedProject
    );
  }
  const tablerow = filteredEmployees.map((emp, index) => (
    <tr key={index} className={styles.tbody_tr}>
      <td>{emp.firstname}</td>
      <td>{emp.lastname}</td>
      <td>{emp.dob}</td>
      <td>{emp.country}</td>
      <td>{emp.mobile}</td>
      <td>{emp.project}</td>
      <td>{emp.salary}</td>
    </tr>
  ));
  return (
    <>
      <h1 className={styles.dashboard_heading}>Employees Dashboard Section</h1>
      {employees.length > 0 ? (
        <>
          <div className={styles.grid_list}>
            <div className={styles.ol_list}>
              <h2 className={styles.projects_list_title}>Projects</h2>
              <button onClick={() => handleProjectClick("WebCore")}>
                WebCore
              </button>
              <button onClick={() => handleProjectClick("WebNova")}>
                WebNova
              </button>
              <button onClick={() => handleProjectClick("SiteOps")}>
                SiteOps
              </button>
              <button onClick={() => handleProjectClick("Cloudix")}>
                Cloudix
              </button>
              <button onClick={() => handleProjectClick("CloudHub")}>
                CloudHuby
              </button>
            </div>
            <div className={styles.ul_list}>
              <h2 className={styles.employee_count_title}>Employees</h2>
              <button>{webCoreCount}</button>
              <button>{webNovaCount}</button>
              <button>{siteOpsCount}</button>
              <button>{cloudixCount}</button>
              <button>{cloudHubCount}</button>
            </div>
          </div>
          {/* -------------- EMPLOYEE FILTER TABLE BY PROJECTS ------------- */}
          {selectedProject && (
            <div className={styles.display_table} id="display-info">
              <h3 className={styles.projects_titles}>{selectedProject}</h3>
              {filteredEmployees.length > 0 ? (
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
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>{tablerow}</tbody>
                </table>
              ) : (
                <p className={styles.empty_message}>
                  No employees in this project
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <p className={styles.empty_message}>
          No data to display please add employee data
        </p>
      )}
    </>
  );
}
export default Dashboard;

// // import { useState } from "react";
// // import styles from "./DashBoard.module.css";
// // function Dashboard({ employees }) {
// //   const [ProjectTilte, setProjectTilte] = useState(null);
// //   const [showWebCore, setShowWebCore] = useState(false);
// //   const [showWebNova, setShowWebNova] = useState(false);
// //   const [showSiteOps, setShowSiteOps] = useState(false);
// //   const [showCloudix, setShowCloudix] = useState(false);
// //   const [showCloudHub, setShowCloudHub] = useState(false);

// //   //---------webcoreTitle

// //   const webcoreTitle = employees
// //     .filter((emp) => emp.project === "WebCore")
// //     .map((item) => (
// //       <tr className={styles.thead_tr_Project}>
// //         <td>{item.project}</td>
// //       </tr>
// //     ));
// //   //----------WebNova
// //   const webNovaCount = employees
// //     .filter((emp) => emp.project === "WebNova")
// //     .map((item) => (
// //       <tr className={styles.thead_tr_Project}>
// //         <td>{item.project}</td>
// //       </tr>
// //     ));
// //   //---------SiteOps
// //   const siteOpsCount = employees
// //     .filter((emp) => emp.project === "SiteOps")
// //     .map((item) => (
// //       <tr className={styles.thead_tr_Project}>
// //         <td>{item.project}</td>
// //       </tr>
// //     ));
// //   //---------Cloudix
// //   const cloudixCount = employees
// //     .filter((emp) => emp.project === "Cloudix")
// //     .map((item) => (
// //       <tr className={styles.thead_tr_Project}>
// //         <td>{item.project}</td>
// //       </tr>
// //     ));
// //   //---------CloudHub
// //   const cloudHubCount = employees
// //     .filter((emp) => emp.project === "CloudHub")
// //     .map((item) => (
// //       <tr className={styles.thead_tr_Project}>
// //         <td>{item.project}</td>
// //       </tr>
// //     ));
// //   //-----------------------Display Table Project Wise -----------------
// //   const webCoreCountTable = employees
// //     .filter((emp) => emp.project === "WebCore")
// //     .map((item, index) => (
// //       <tr key={index} className={styles.tbody_tr_Project}>
// //         <td>{item.firstname}</td>
// //         <td>{item.lastname}</td>
// //         <td>{item.dob}</td>
// //         <td>{item.country}</td>
// //         <td>{item.mobile}</td>
// //         <td>{item.project}</td>
// //         <td>{item.salary}</td>
// //       </tr>
// //     ));
// //   function handleWebCoreTable() {
// //     setShowWebCore(true);
// //     setShowWebNova(false);
// //     setShowCloudix(false);
// //     setShowSiteOps(false);
// //     setShowCloudHub(false);
// //   }
// //   function handleWebNovaTable() {
// //     setShowWebNova(true);
// //     setShowWebCore(false);
// //     setShowCloudix(false);
// //     setShowCloudHub(false);
// //     setShowWebNova(false);
// //   }
// //   function handleSiteOpsTable() {
// //     setShowSiteOps(true);
// //     setShowWebCore(false);
// //     setShowWebNova(false);
// //     setShowCloudix(false);
// //     setShowCloudHub(false);
// //   }
// //   function handleCloudixTable() {
// //     setShowCloudix(true);
// //     setShowSiteOps(false);
// //     setShowWebCore(false);
// //     setShowWebNova(false);
// //     setShowCloudHub(false);
// //   }
// //   function handleCloudHubTable() {
// //     setShowCloudHub(true);
// //     setShowCloudix(false);
// //     setShowSiteOps(false);
// //     setShowWebCore(false);
// //     setShowWebNova(false);
// //   }
// //   return (
// //     <>
// //       <h1 className={styles.dashboard_heading}>Employees Dashboard Section</h1>
// //       {employees.length > 0 ? (
// //         <>
// //           <div className={styles.display_table_container}>
// //             <table className={styles.table_list}>
// //               <thead className={styles.thead}>
// //                 <tr className={styles.thead_tr}>
// //                   <th className={styles.Our_Projects}>Our Projects</th>
// //                   <th
// //                     className={styles.thead_tr_th}
// //                     onClick={handleWebCoreTable}
// //                   >
// //                     WebCore
// //                   </th>

// //                   <th
// //                     className={styles.thead_tr_th}
// //                     onClick={handleWebNovaTable}
// //                   >
// //                     WebNova
// //                   </th>
// //                   <th
// //                     className={styles.thead_tr_th}
// //                     onClick={handleSiteOpsTable}
// //                   >
// //                     SiteOps
// //                   </th>
// //                   <th
// //                     className={styles.thead_tr_th}
// //                     onClick={handleCloudixTable}
// //                   >
// //                     Cloudix
// //                   </th>
// //                   <th
// //                     className={styles.thead_tr_th}
// //                     onClick={handleCloudHubTable}
// //                   >
// //                     CloudHub
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className={styles.tbody}>
// //                 <tr className={styles.tbody_tr}>
// //                   <td className={styles.Our_Projects}>Our Employee</td>
// //                   <td className={styles.tbody_tr_td}>{webcoreTitle.length}</td>
// //                   <td className={styles.tbody_tr_td}>{webNovaCount.length}</td>
// //                   <td className={styles.tbody_tr_td}>{siteOpsCount.length}</td>
// //                   <td className={styles.tbody_tr_td}>{cloudixCount.length}</td>
// //                   <td className={styles.tbody_tr_td}>{cloudHubCount.length}</td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //           {employees.length > 0 && showWebCore && (
// //             <div className={styles.table_Sorted_by_Project_Emp}>
// //               <h3 className={styles.projects_titles}>{webcoreTitle}</h3>
// //               <table className={styles.table_list_Project}>
// //                 <thead className={styles.thead_Project}>
// //                   <tr className={styles.thead_tr_Project}>
// //                     <th>Firstname</th>
// //                     <th>Lastname</th>
// //                     <th>DOB</th>
// //                     <th>Country</th>
// //                     <th>mobile</th>
// //                     <th>project</th>
// //                     <th>Salary</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className={styles.tbody_Project}>
// //                   {webCoreCountTable}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //           {employees.length > 0 && showWebNova && (
// //             <div className={styles.table_Sorted_by_Project_Emp}>
// //               <h3 className={styles.projects_titles}>{ProjectTilte}</h3>
// //               <table className={styles.table_list_Project}>
// //                 <thead className={styles.thead_Project}>
// //                   <tr className={styles.thead_tr_Project}>
// //                     <th>Firstname</th>
// //                     <th>Lastname</th>
// //                     <th>DOB</th>
// //                     <th>Country</th>
// //                     <th>mobile</th>
// //                     <th>project</th>
// //                     <th>Salary</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className={styles.tbody_Project}>
// //                   {webCoreCountTable}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //           {employees.length > 0 && showSiteOps && (
// //             <div className={styles.table_Sorted_by_Project_Emp}>
// //               <h3 className={styles.projects_titles}>{ProjectTilte}</h3>
// //               <table className={styles.table_list_Project}>
// //                 <thead className={styles.thead_Project}>
// //                   <tr className={styles.thead_tr_Project}>
// //                     <th>Firstname</th>
// //                     <th>Lastname</th>
// //                     <th>DOB</th>
// //                     <th>Country</th>
// //                     <th>mobile</th>
// //                     <th>project</th>
// //                     <th>Salary</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className={styles.tbody_Project}>
// //                   {webCoreCountTable}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //           {employees.length > 0 && showCloudix && (
// //             <div className={styles.table_Sorted_by_Project_Emp}>
// //               <h3 className={styles.projects_titles}>{ProjectTilte}</h3>
// //               <table className={styles.table_list_Project}>
// //                 <thead className={styles.thead_Project}>
// //                   <tr className={styles.thead_tr_Project}>
// //                     <th>Firstname</th>
// //                     <th>Lastname</th>
// //                     <th>DOB</th>
// //                     <th>Country</th>
// //                     <th>mobile</th>
// //                     <th>project</th>
// //                     <th>Salary</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className={styles.tbody_Project}>
// //                   {webCoreCountTable}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //           {employees.length > 0 && showCloudHub && (
// //             <div className={styles.table_Sorted_by_Project_Emp}>
// //               <h3 className={styles.projects_titles}>{ProjectTilte}</h3>
// //               <table className={styles.table_list_Project}>
// //                 <thead className={styles.thead_Project}>
// //                   <tr className={styles.thead_tr_Project}>
// //                     <th>Firstname</th>
// //                     <th>Lastname</th>
// //                     <th>DOB</th>
// //                     <th>Country</th>
// //                     <th>mobile</th>
// //                     <th>project</th>
// //                     <th>Salary</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className={styles.tbody_Project}>
// //                   {webCoreCountTable}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </>
// //       ) : (
// //         <p className={styles.empty_message}>
// //           No data to Display please add employee data
// //         </p>
// //       )}
// //     </>
// //   );
// // }
// // export default Dashboard;
