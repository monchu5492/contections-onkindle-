import React from "react";
import { Button, Divider, Form } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

// const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

const INITIAL_STATE = {
  user_name: "",
  password: ""
};

export default class FormExampleSize extends React.Component {
  state = INITIAL_STATE;

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.onLogInUser(this.state.user_name);
    this.setState(INITIAL_STATE);
  };

  render() {
    console.log("hello");
    return this.props.isLoggedIn ? (
      <Redirect to="/profile" />
    ) : (
      <div>
        <Form size={"small"} key={"small"} onSubmit={this.handleOnSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              label="User Name"
              control="input"
              name="user_name"
              value={this.state.name}
              onChange={this.handleOnChange}
              placeholder="User Name"
            />
          </Form.Group>
          <Form.Field
            label="Password"
            control="input"
            name="password"
            value={this.state.name}
            onChange={this.handleOnChange}
            placeholder="Password"
          />
          <Button type="submit">Submit</Button>
          <Button id="homeButton" as={Link} to={"/"}>
            Home
          </Button>
          <Divider hidden />
        </Form>
      </div>
    );
  }
}
