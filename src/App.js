import "./App.css";
import React from "react";
import HomepageLayout from "./HomepageLayout";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileContainer from "./ProfileContainer";
import ls from "local-storage";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const userURl = "http://localhost:3000/users";

export default class App extends React.Component {
  state = {
    users: [],
    isLoggedIn: false,
    newSignup: false,
    userEvents: [],

    user: null
    // user: {
    // id: 1,
    // user_name: "monchu1",
    // name: "tanner",
    // bio: "i, am, job",
    // address: "1435 regat st. 487262 asdhre",
    // profile_pic: null,
    // events: [{}],
    // join_events: [],
    // }
  };

  componentDidMount() {
    this.getAllUsers();
    // if (this.state.user) {
    //   return (
    //     <div>
    //       <Router>
    //         <Route path="/" exact render={() => <HomepageLayout />} />
    //       </Router>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <Router>
    //         <Route
    //           path="/profile"
    //           exact
    //           render={() => <ProfileContainer user={this.state.user} />}
    //         />
    //       </Router>
    //     </div>
    //   );
    // }
  }
  getAllUsers = () => {
    fetch(userURl)
      .then(res => res.json())
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  addUser = user => {
    this.setState(
      prevState => {
        return {
          users: [...prevState.users, user],
          newSignup: true
        };
      },
      () => this.postUser(user)
    );
  };

  //Sign Up Feature: POSTING User to Database
  postUser = user => {
    return fetch(userURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: user })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  onLogInUser = username => {
    console.log(username);
    // this.getAllOwners()
    let filteredUser = this.state.users.filter(
      user => user.user_name === username
    )[0];
    console.log(this.state.users);
    if (filteredUser) {
      console.log("USER FOUND", filteredUser);
      this.setState({
        ...this.state,
        isLoggedIn: true,
        user: filteredUser,
        newSignup: false
      });
      ls.set("user", JSON.stringify(filteredUser));
      console.log(filteredUser);
      // this.setLocalStorage(ownersfiltered[0])
    }
  };

  logOut = () => {
    console.log("logging out!");
    this.setState({ isLoggedIn: false });
    console.log("state at 117", this.state);
  };

  localUser = () => {
    let user = JSON.parse(ls.get("user"));
    return user;
  };

  render() {
    console.log(this.state.users);
    return (
      <div>
        {console.log("state at render (129)", this.state)}
        <Router>
          <Switch>
            {this.state.isLoggedIn === false ? (
              <Route
                path="/"
                exact
                render={() => (
                  <HomepageLayout
                    users={this.state.users}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )}
              />
            ) : (
              <Route
                path="/profile"
                render={() => (
                  <ProfileContainer
                    user={this.state.user}
                    localUser={this.localUser}
                    logOut={this.logOut}
                    postEvent={this.postEvent}
                  />
                )}
              />
            )}
            <Route
              path="/login"
              exact
              render={() => (
                <LoginForm
                  onLogInUser={this.onLogInUser}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={() => (
                <SignupForm
                  addUser={this.addUser}
                  newSignUpState={this.state.newSignup}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={() => <HomepageLayout users={this.state.users} />}
            />
            <Route
              path="/profile"
              exact
              render={() => (
                <ProfileContainer
                  user={this.state.user}
                  localUser={this.localUser}
                  logOut={this.logOut}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
