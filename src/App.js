import "./App.css";
import React from "react";
import HomepageLayout from "./HomepageLayout";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileContainer from "./ProfileContainer";
import { api } from "./api";
import ls from "local-storage";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const userURl = "http://localhost:3000/users";
const eventsURL = "http://localhost:3000/events";

export default class App extends React.Component {
  state = {
    users: [],
    allEvents: [],
    isLoggedIn: false,
    newSignup: false,
    owned_events: [],
    user: null,
    auth: {
      user: {}
    }
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        if (!user.error) {
          console.log(user);
          const updatedState = { ...this.state.auth, user: user };
          this.setState({ ...this.state, auth: updatedState });
        }
        this.getAllUsers();
        this.getAllEvents();
      });
    }
  }

  getAllEvents() {
    fetch(eventsURL, {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(events => {
        console.log(events);
        this.setState({
          allEvents: events
        });
      });
  }

  getAllUsers() {
    fetch(userURl, {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(users =>
        this.setState({
          users: users
        })
      );
  }

  // onLogInUser = username => {
  //   console.log(username);
  //   // this.getAllOwners()
  //   // let filteredUser = this.state.users.filter(
  //   //   user => user.user_name === username
  //   // )[0];
  //   // console.log(this.state.users);
  //   // if (filteredUser) {
  //   //   console.log("USER FOUND", filteredUser.owned_events);
  //   //   this.setState({
  //   //     isLoggedIn: true,
  //   //     user: filteredUser,
  //   //     newSignup: false,
  //   //     owned_events: filteredUser.owned_events
  //   //   });
  //   // console.log('there is a token');
  //   // make a request to the backend and find our user
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     api.auth.getCurrentUser().then(user => {
  //       if (!user.error) {
  //         console.log(user);
  //         const updatedState = { ...this.state.auth, user: user };
  //         this.setState({
  //           ...this.state,
  //           auth: updatedState,
  //           isLoggedIn: true,
  //           user: user,
  //           newSignup: false,
  //           owned_events: user.owned_events
  //         });
  //       } else {
  //         alert("not logged in");
  //       }
  //     });
  //   }
  //   // ls.set("user", JSON.stringify(filteredUser));
  //   // console.log(filteredUser);
  //   // this.setLocalStorage(ownersfiltered[0])
  // };

  addUser = user => {
    // this.setState(
    //   prevState => {
    //     return {
    //       users: [...prevState.users, user],
    //       newSignup: true
    //     };
    //   },
    this.postUser(user);
    // );
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

  // logOut = () => {
  //   console.log("logging out!");
  //   this.setState({ isLoggedIn: false });
  //   console.log("state at 117", this.state);
  // };

  // localUser = () => {
  //   let user = JSON.parse(ls.get("user"));
  //   return user;
  // };

  updateEvent = (thisevent, cur_ev_from_props) => {
    let theseEvents = this.state.owned_events.filter(
      event => event.id !== cur_ev_from_props.id
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
      .then(() => this.updateUsersEvents(nonMutatedEvents()));
    // this.unMutatedEvents(nonMutatedEvents())
  };

  // takes in an event {object} from removebuttonmodal
  deleteEvent = deletedEvent => {
    // console.log(deletedEvent);
    console.log("delete event function hit");
    let nonDeletedEvents = this.state.owned_events.filter(
      event => event.id !== deletedEvent.id
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
        this.updateUsersEvents(nonDeletedEvents);
        console.log(nonDeletedEvents);
        console.log("deleted event");
      });
  };

  postEvent = event => {
    // console.log(this.state.user.owned_events);

    let newUsersEvents = () => {
      this.state.allEvents.push(event);
      return this.state.allEvents;
    };
    // // console.log(this.user.events);
    fetch(eventsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        event: { ...event, user_id: this.state.auth.user.id }
      })
    })
      .then(res => res.json())
      .then(
        () => this.updateUsersEvents(newUsersEvents()),
        console.log("posted event")
      );
  };

  joinEvent = thisevent => {
    return fetch("http://localhost:3000/join_events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        user_id: this.state.auth.user.id,
        event_id: thisevent.id
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  updateUsersEvents = newUsersEvents => {
    console.log(newUsersEvents);
    this.setState({
      ...this.state,
      allEvents: newUsersEvents
    });
  };

  login = data => {
    // api.auth.getCurrentUser().then(user => console.log(user));
    // const token = localStorage.getItem("token");
    // const updatedState = {
    //   ...this.state.auth,
    //   user: { id: data.id, username: data.username }
    // };
    // console.log(token);
    // if (token) {
    //   api.auth.getCurrentUser().then(user => {
    //     if (!user.error) {
    //       console.log(user);
    //       // const updatedState = { ...this.state.auth, user: user };
    //       this.setState({
    //         ...this.state,
    //         isLoggedIn: true,
    //         user: user,
    //         newSignup: false,
    //         owned_events: user.owned_events
    //       });
    //     } else {
    //       alert("not logged in");
    //     }
    //   });
    localStorage.setItem("token", data.jwt);
    this.setState({
      auth: { user: data.user },
      owned_events: data.user.owned_events
    });
    // this.setState({ ...this.state, auth: updatedState });
  };
  // };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } });
  };

  render() {
    console.log(this.state.users);
    console.log(this.state.auth);
    console.log(this.state.allEvents);
    return (
      <div>
        {console.log("state at render (129)", this.state.auth.user)}
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
                render={props => (
                  <ProfileContainer
                    {...props}
                    user={this.state.auth.user}
                    users={this.state.users}
                    owned_events={this.state.owned_events}
                    localUser={this.localUser}
                    logOut={this.logout}
                    postEvent={this.postEvent}
                    updateUsersEvents={this.updateUsersEvents}
                    updateEvent={this.updateEvent}
                    deleteEvent={this.deleteEvent}
                    currentUserEvents={this.state.currentUserEvents}
                    joinEvent={this.joinEvent}
                    allEvents={this.state.allEvents}
                  />
                )}
              />
            )}
            <Route
              path="/login"
              exact
              render={props => (
                <LoginForm
                  {...props}
                  onLogInUser={this.login}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={props => (
                <SignupForm
                  {...props}
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
              render={props => (
                <ProfileContainer
                  {...props}
                  user={this.state.auth.user}
                  owned_events={this.state.owned_events}
                  users={this.state.users}
                  localUser={this.localUser}
                  logOut={this.logout}
                  postEvent={this.postEvent}
                  updateUsersEvents={this.updateUsersEvents}
                  updateEvent={this.updateEvent}
                  deleteEvent={this.deleteEvent}
                  currentUserEvents={this.state.currentUserEvents}
                  joinEvent={this.joinEvent}
                  allEvents={this.state.allEvents}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
