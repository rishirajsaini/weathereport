import React, { Component } from "react";
import Input from "./helper/input";
import Joi from "joi-browser";
import auth from "../services/authService";
//import { Redirect } from "react-router-dom";

//const tokenKey = "token";

class Login extends Component {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { data } = this.state;
    const success = auth.login(data.username, data.password);

    if (success === false) {
      //const loginValidateDetails = "loginValidateDetails";
      const errors = { ...this.state.errors };
      errors.loginValidateDetails = `Invalid Credetails.`;

      this.setState({ errors: errors || {} });
      if (errors) return;
    }

    this.props.history.push("/dashboard");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    if (auth.getJwt()) {
      window.location = "/dashboard";
    }
    return (
      <div className="text-center form-signin">
        <div
          className="shadow form-inner"
          style={{
            padding: "40px",
            border: "2px solid #8686861f",
            background: "#52525254"
          }}
        >
          <h4>Login Form</h4>

          <hr />
          {this.state.errors.loginValidateDetails ? (
            <div className="c-error center-align">
              <i className="fa fa-warning" /> &nbsp;
              {this.state.errors.loginValidateDetails}
            </div>
          ) : null}

          <form onSubmit={this.handleSubmit}>
            <Input
              value={this.state.title}
              onChangeHandle={this.handleChange}
              name="username"
			  type="text"
              className="form-control"
              errorMessage={this.state.errors.username}
              placeHolder="Username"
            />

            <Input
              value={this.state.title}
              onChangeHandle={this.handleChange}
              name="password"
			  type="password"
              className="form-control"
              errorMessage={this.state.errors.password}
              placeHolder="Password"
            />

            <button type="submit" className="btn btn-secondary btn-width">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
