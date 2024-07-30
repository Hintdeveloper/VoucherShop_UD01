import "./Login.scss";

function loginForm() {
  return (
    <div className="loginCard">
      <div className="cardHeader">
        <div className="log">Login</div>
      </div>
      <form>
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input required name="username" id="username" type="text" />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input required name="password" id="password" type="password" />
        </div>
        <div className="formGroup">
          <input value="Login" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default loginForm;
