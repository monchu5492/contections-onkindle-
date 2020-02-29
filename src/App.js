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
const eventsURL = "http://localhost:3000/events";

export default class App extends React.Component {
  state = {
    users: [],
    isLoggedIn: false,
    newSignup: false,
    user: null
  };

  componentDidMount() {
    this.getAllUsers();
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
      console.log("USER FOUND", filteredUser.owned_events);
      this.setState({
        isLoggedIn: true,
        user: filteredUser,
        newSignup: false,
        owned_events: filteredUser.owned_events
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

  updateEvent = (thisevent, cur_ev_from_props) => {
    let theseEvents = this.state.owned_events.filter(
      event => event.id != cur_ev_from_props.id
    );
    let newEvent = { ...thisevent, id: cur_ev_from_props.id };

    let nonMutatedEvents = () => {
      theseEvents.push(newEvent);
      console.log(theseEvents);
      return theseEvents;
    };

    fetch(`http://localhost:3000/events/${cur_ev_from_props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: thisevent
      })
    })
      .then(res => res.json())
      .then(() => this.unMutatedEvents(nonMutatedEvents()));
    // this.unMutatedEvents(nonMutatedEvents())
  };

  unMutatedEvents = nonMutatedEvents => {
    console.log(nonMutatedEvents);
    this.setState({
      ...this.state,
      owned_events: nonMutatedEvents
    });
  };

  // takes in an event {object} from removebuttonmodal
  deleteEvent = deletedEvent => {
    // console.log(deletedEvent);
    console.log("delete event function hit");
    let nonDeletedEvents = this.state.owned_events.filter(
      event => event.id != deletedEvent.id
    );
    console.log(nonDeletedEvents);
    fetch(`http://localhost:3000/events/${deletedEvent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => {
        this.setNonDeletedEvents(nonDeletedEvents);
        console.log(nonDeletedEvents);
        console.log("deleted event");
      });
  };

  setNonDeletedEvents = nonDeletedEvents => {
    console.log(nonDeletedEvents);
    this.setState({
      ...this.state,
      owned_events: nonDeletedEvents
    });
  };

  postEvent = event => {
    // console.log(this.state.user.owned_events);

    let newUsersEvents = () => {
      this.state.owned_events.push(event);
      return this.state.owned_events;
    };
    // // console.log(this.user.events);
    fetch(eventsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: { ...event, user_id: this.state.user.id }
      })
    })
      .then(res => res.json())
      .then(
        () => this.updateUsersEvents(newUsersEvents()),
        console.log("posted event")
      );
  };

  updateUsersEvents = newUsersEvents => {
    console.log(newUsersEvents);
    this.setState({
      ...this.state,
      owned_events: newUsersEvents
    });
  };

  render() {
    // console.log(this.state.users);
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
                    owned_events={this.state.owned_events}
                    localUser={this.localUser}
                    logOut={this.logOut}
                    postEvent={this.postEvent}
                    updateUsersEvents={this.updateUsersEvents}
                    updateEvent={this.updateEvent}
                    deleteEvent={this.deleteEvent}
                    currentUserEvents={this.state.currentUserEvents}
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
                  postEvent={this.postEvent}
                  updateUsersEvents={this.updateUsersEvents}
                  updateEvent={this.updateEvent}
                  deleteEvent={this.deleteEvent}
                  currentUserEvents={this.state.currentUserEvents}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
