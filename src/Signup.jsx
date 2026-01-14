import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
function SignUpForm() {
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
    return;
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert(userinfo.firstname);
    setUserInfo({
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      password: "",
    });
  }
  return (
    <>
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
