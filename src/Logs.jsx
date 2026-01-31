import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./EmpForm.module.css";
import "./Logs.css";
function LoginForm() {
  const [successMsg, setSuccessMsg] = useState("");
  const [userinfo, setUserInfo] = useState({
    useremail: "",
    userpassword: "",
  });
  function handleChangeEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userinfo.useremail || !userinfo.userpassword) {
      alert("please Fill the email or Password");
      return;
    }
    const getData = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userinfo.useremail,
        password: userinfo.userpassword,
      }),
    });
    if(!getData.ok){
      alert("Invalid email or password");
      return;
    }
    const data = await getData.JSON();
    setSuccessMsg(`Welcome ${data.firstname}`);
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
      {" "}
      <div>
        {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </div>
      <div className="form-container">
        <form action="#" onSubmit={handleSubmit} className="form-section">
          <h1 className="tagh1">login Your Account</h1>
          <input
            className="form-input"
            type="email"
            name="useremail"
            value={userinfo.useremail}
            onChange={handleChangeEvent}
            placeholder="enter your email"
          />
          <input
            className="form-input"
            type="password"
            name="userpassword"
            value={userinfo.userpassword}
            onChange={handleChangeEvent}
            placeholder="enter your password"
          />
          <div className="btn-section">
            <input id="btn" className="btn" type="reset" />
            <input id="btn" className="btn" type="submit" />
            <br></br>
          </div>
          <p className="link-colo">
            <Link className="linkStyle" to="/signup">
              Create new account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default LoginForm;
