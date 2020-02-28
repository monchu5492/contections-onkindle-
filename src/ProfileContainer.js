import React, { Component } from "react";
// import { Menu, Segment, Image } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileBottom from "./ProfileBottom";
import CreateEventForm from "./CreateEventForm";

const eventsURL = "http://localhost:3000/events";

export default class MenuExampleSecondaryPointing extends Component {
  state = {
    currentUserEvents: this.props.user.events
  };
  // state = { activeItem: "home" };

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // handleLogOut = () => {
  // if (window.confirm("Are you sure you want to logout?") === true) {
  //     return <Link to="/" />;
  //   }
  // };
  //
  postEvent = event => {
    // console.log(this.localUser())
    fetch(eventsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: { ...event, user_id: this.props.user.id }
      })
    })
      .then(res => res.json())
      .then(event => console.log("posted..?"));
    // this.setState({...this.state, currentUserPets: this.state.currentUserPets.push(event)}))
  };

  updateEvent = event => {
    fetch(eventsURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: { ...event, user_id: this.props.user.id }
      })
    })
      .then(res => res.json())
      .then(data => console.log("hope this works"));
  };

  deleteEvent = deletedEvent => {
    console.log(deletedEvent);
    let keptEvents = this.state.currentUserEvents.filter(
      event => event.id != deletedEvent.id
    )[0];
    this.setState({
      currentUserEvents: keptEvents
    });
    fetch(`http://localhost:3000/events/${deletedEvent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log("deleted event");
      });
  };

  render() {
    console.log(this.state.currentUserEvents);
    // const { activeItem } = this.state;
    return (
      <div>
        {console.log(this.props)}
        <ProfileTop
          user={this.props.user}
          localUser={this.props.localUser}
          postEvent={this.postEvent}
          deleteEvent={this.deleteEvent}
          updateEvent={this.updateEvent}
        />
        <ProfileBottom
          user={this.props.user}
          localUser={this.props.localUser}
          logOut={this.props.logOut}
          deleteEvent={this.deleteEvent}
        />
      </div>
    );
  }
}
