const pool = require("../db");
const empPost = async (req, res) => {
  try {
    const { firstname, lastname, dob, country, mobile, project, salary } =
      req.body;
    const result = await pool.query(
      `INSERT INTO emp_data (firstname, lastname, dob, country, mobile, project, salary )
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      //RETURNING * → DB se inserted row wapas milta ha
      [firstname, lastname, dob, country, mobile, project, salary],
    );
    res.status(200).json({
      message: "Data send successful",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};  
// Get Data to Display Data 
const empGet = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM emp_data");
    res.json(result.rows); // send data
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }

};
// ---- Update Employees
const empUpdate = async (req, res) => {
  try {
    const { mobile } = req.params;
    const { firstname, salary } = req.body;

    const result = await pool.query(
      `UPDATE emp_data 
       SET firstname=$1, salary=$2 
       WHERE mobile=$3 
       RETURNING *`,
      [firstname, salary, mobile]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
// ---- Delete Employees
const empDel = async (req, res) => {
  try {
    await pool.query("DELETE FROM emp_data WHERE mobile=$1", [
      req.params.mobile,
    ]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
module.exports = { empPost, empGet, empUpdate , empDel };
