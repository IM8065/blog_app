import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
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
              <legend>Sign In</legend>
              <div className="mt3">
                <label className="label" htmlFor="signin-email-address">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  name="signin-email-address"
                  id="signin-email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="label" htmlFor="signin-password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="signin-password"
                  id="signin-password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input
                className="input2"
                type="submit"
                value="Sign In"
                onClick={this.onSubmitSignIn}
              ></input>
            </div>
            <div className="register-nav">
              <p
                onClick={() => this.props.onRouteChange("register")}
                className="register-nav-link"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
