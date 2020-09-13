import React from "react";
import "./css/Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:5000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <article className="main-article">
        <main className="main">
          <div className="measure">
            <fieldset>
              <legend>Register</legend>
              <div className="mt3">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="label" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input
                className="input2"
                type="submit"
                value="Register"
                onClick={this.onSubmitSignIn}
              ></input>
            </div>
            <div className="register-nav">
              <p
                onClick={() => this.props.onRouteChange("signin")}
                className="register-nav-link"
              >
                Sign In
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
