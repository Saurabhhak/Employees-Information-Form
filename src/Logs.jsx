import { useState } from "react";
import { Link } from "react-router-dom";
import "./Logs.css";
function LoginForm() {
  const [userinfo, setUserInfo] = useState({
    useremail: "",
    userpassword: "",
  });
  function handleChangeEvent(e) {
    const { name, value } = e.target;
    setUserInfo((values) => ({ ...values, [name]: value }));
    return;
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert(`Successfully Login '${userinfo.useremail}' Account`);
  }

  return (
    <>
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
