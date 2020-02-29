import React, { Component } from "react";
// import { Menu, Segment, Image } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileBottom from "./ProfileBottom";
import CreateEventForm from "./CreateEventForm";

export default class MenuExampleSecondaryPointing extends Component {
  // this.props.updateUsersEvents(newUsersEvents

  render() {
    // const { activeItem } = this.state;
    return (
      <div>
        {console.log(this.props.owned_events)}
        <ProfileTop
          user={this.props.user}
          localUser={this.props.localUser}
          postEvent={this.props.postEvent}
        />
        <ProfileBottom
          user={this.props.user}
          owned_events={this.props.owned_events}
          localUser={this.props.localUser}
          logOut={this.props.logOut}
          deleteEvent={this.props.deleteEvent}
          currentUserEvents={this.props.currentUserEvents}
          updateEvent={this.props.updateEvent}
        />
      </div>
    );
  }
}
