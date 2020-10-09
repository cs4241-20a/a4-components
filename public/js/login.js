import React from "react";
import ReactDOM from "react-dom";

class Login extends React.Component {
  componentDidMount() {
    function formSubmit_login(event) {
      var url = "/login";
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.onload = function () {
        // request successful
        // we can use server response to our request now
        window.location.replace(request.responseURL);
      };
      request.onerror = function () {
        // request failed
      };

      let formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      request.overrideMimeType("application/json");
      request.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );

      request.send(json);
      event.preventDefault();
    }

    function formSubmit_register(event) {
      var url = "/local-reg";
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.onload = function () {
        // request successful
        // we can use server response to our request now
        window.location.reload();
      };
      request.onerror = function () {
        // request failed
      };

      let formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      request.overrideMimeType("application/json");
      request.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );

      request.send(json);
      event.preventDefault();
    }

    // and you can attach form submit event like this for example
    function attachFormSubmitEvent(formId, fun) {
      document.getElementById(formId).addEventListener("submit", fun);
    }

    window.onload = function () {
      attachFormSubmitEvent("local-sign-in", formSubmit_login);
      attachFormSubmitEvent("local-reg", formSubmit_register);
    };
  }

  render() {
    return (
      <span>
        <h1>the forum</h1>
        <p>Please sign in or register to view the forum.</p>
        <h5>Sign in </h5>
        <form
          id="local-sign-in"
          class="collapse"
          action="/login"
          method="post"
          enctype="multipart/form-data"
        >
          <p></p>
          <label>Username:</label>
          <input type="text" name="username" />

          <label>Password:</label>
          <input type="password" name="password" />

          <input type="submit" class="btn btn-primary btn-sm" value="Log In" />
        </form>

        <h5>Register</h5>
        <form
          id="local-reg"
          class="collapse"
          action="/local-reg"
          method="post"
          enctype="multipart/form-data"
        >
          <p></p>
          <label>New Username:</label>
          <input type="text" name="username" />

          <label>New Password:</label>
          <input type="password" name="password" />

          <input
            type="submit"
            class="btn btn-primary btn-sm"
            value="Register"
          />
        </form>
      </span>
    );
  }
}

const login = document.getElementById("login_react");
ReactDOM.render(<Login />, login);
