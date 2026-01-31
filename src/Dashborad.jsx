import { useState, useEffect } from "react";
import styles from "./DashBoard.module.css";
function Dashboard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/empform");
        const data = await res.json();
        setEmployees(data); //employees state update  
      } catch (error) {
        console.error(error);
        alert("Failed to load data");
      }
    };
    fetchEmployeesData();
  }, []);
  //--------- WebCore
  const webCoreCount = employees.filter(
    (emp) => emp.project === "WebCore",
  ).length;
  //--------- WebNova
  const webNovaCount = employees.filter(
    (emp) => emp.project === "WebNova",
  ).length;
  //---------SiteOps
  const siteOpsCount = employees.filter(
    (emp) => emp.project === "SiteOps",
  ).length;
  //---------Cloudix
  const cloudixCount = employees.filter(
    (emp) => emp.project === "Cloudix",
  ).length;
  //---------CloudHub
  const cloudHubCount = employees.filter(
    (emp) => emp.project === "CloudHub",
  ).length;
  // ----------- FILTER SELECTED PROJECT
  function handleProjectClick(projectName) {
    setSelectedProject(projectName);
  }
  let filtered_Poject = [];
  if (selectedProject) {
    filtered_Poject = employees.filter(
      (emp) => emp.project === selectedProject,
    );
  }
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
              {filtered_Poject.length > 0 ? (
                <table className={styles.table_list} id="table-list">
                  <thead className={styles.thead}>
                    <tr className={styles.thead_tr}>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>DOB</th>
                      <th>Country</th>
                      <th>mobile</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>
                    {filtered_Poject.map((emp, index) => (
                      <tr key={index} className={styles.tbody_tr}>
                        <td>{emp.firstname}</td>
                        <td>{emp.lastname}</td>
                        <td>{emp.dob?.split("T")[0]}</td>
                        <td>{emp.country}</td>
                        <td>{emp.mobile}</td>
                        <td>{emp.salary}</td>
                      </tr>
                    ))}
                  </tbody>
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
