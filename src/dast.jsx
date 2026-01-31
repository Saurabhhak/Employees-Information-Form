import { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // 🔹 Fetch all employees once
  useEffect(() => {
    fetch("http://localhost:5000/api/empform")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Count logic
  const countByProject = (project) =>
    employees.filter((emp) => emp.project === project).length;

  // 🔹 Handle project click
  const handleProjectClick = (projectName) => {
    setSelectedProject(projectName);

    const filtered = employees.filter(
      (emp) => emp.project === projectName
    );
    setFilteredEmployees(filtered);
  };

  return (
    <>
      <h1 className={styles.dashboard_heading}>
        Employees Dashboard Section
      </h1>

      {employees.length > 0 ? (
        <>
          <div className={styles.grid_list}>
            <div className={styles.ol_list}>
              <h2>Projects</h2>
              {["WebCore", "WebNova", "SiteOps", "Cloudix", "CloudHub"].map(
                (project) => (
                  <button
                    key={project}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project}
                  </button>
                )
              )}
            </div>

            <div className={styles.ul_list}>
              <h2>Employees</h2>
              <button>{countByProject("WebCore")}</button>
              <button>{countByProject("WebNova")}</button>
              <button>{countByProject("SiteOps")}</button>
              <button>{countByProject("Cloudix")}</button>
              <button>{countByProject("CloudHub")}</button>
            </div>
          </div>

          {selectedProject && (
            <div className={styles.display_table}>
              <h3>{selectedProject}</h3>

              {filteredEmployees.length > 0 ? (
                <table className={styles.table_list}>
                  <thead>
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>DOB</th>
                      <th>Country</th>
                      <th>Mobile</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp, index) => (
                      <tr key={index}>
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
                <p>No employees in this project</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>No data to display</p>
      )}
    </>
  );
}

export default Dashboard;
