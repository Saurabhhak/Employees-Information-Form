import styles from "./EmpForm.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
function SignUpForm() {
  const [successMsg, setSuccessMsg] = useState("");
  // const [userlist, setUserList] = useState([]);
  const [userinfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
  });
  function handleChanageEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userinfo.firstname ||
      !userinfo.lastname ||
      !userinfo.age ||
      !userinfo.email ||
      !userinfo.password
    ) {
      alert("Please fill all details");
      return;
    }
    await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });
    // if (!res.ok) {
    //   alert("Signup failed");
    //   return;
    // }
    setSuccessMsg(`${userinfo.firstname} added successfully!`);
    setUserInfo({
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);
  return (
    <>
      <div>
        {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </div>
      <div className="form-container">
        <form action="#" onSubmit={handleSubmit} className="form-section">
          <h1 className="tagh1">Create Your Account</h1>
          <input
            className="form-input"
            type="text"
            name="firstname"
            placeholder="enter your firstname"
            onChange={handleChanageEvent}
            value={userinfo.firstname}
          />
          <input
            className="form-input"
            type="text"
            name="lastname"
            placeholder="enter your lastname"
            onChange={handleChanageEvent}
            value={userinfo.lastname}
          />
          <input
            className="form-input"
            type="number"
            name="age"
            placeholder="enter your age"
            onChange={handleChanageEvent}
            value={userinfo.age}
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={handleChanageEvent}
            value={userinfo.email}
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="enter your password"
            onChange={handleChanageEvent}
            value={userinfo.password}
          />
          <div className="btn-section">
            <input id="btn" className="btn" type="reset" />
            <input id="btn" className="btn" type="submit" />
          </div>
          <p className="">
            <Link to="/login" className="linkStyle">
              Already have account? Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default SignUpForm;
