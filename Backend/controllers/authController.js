const pool = require("../db");
const bcrypt = require("bcrypt");
const signUsers = async (req, res) => {
  try {
    const { firstname, lastname, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (firstname, lastname, age, email, password)
       VALUES ($1, $2, $3, $4, $5)`,
      [firstname, lastname, age, email, hashedPassword],
    );
    res.status(200).json({ message: "Signup successful" });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};
const logUsers = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (result.rows.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.json({
    message: "Login successful",
    firstname: user.firstname,
  });
};
module.exports = { signUsers, logUsers };

// http://localhost:5000/api/auth/users
