import React, { Component } from "react";
import { Input, Menu, Segment, Card } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import EventCard from "./EventCard";
import CreateEventForm from "./CreateEventForm";
import EventContainer from "./CreateEventForm";
import HomepageLayout from "./HomepageLayout";

export default class MenuExampleTabularOnTop extends Component {
  state = {
    activeItem: "bio",
    currentUserEvents: this.props.user.events
  };

  handleItemClick = (e, { name }) => {
    console.log(name);
    console.log(e.target.innerText, "innner text");
    if (e.target.innerText === "Logout") {
      this.handleLogOut();
    } else {
      this.setState({ activeItem: name });
    }
  };

  handleLogOut = () => {
    console.log(this.props);
    if (window.confirm("Are you sure you want to logout?") === true) {
      localStorage.clear();
      return this.props.logOut();
      //supposed to redirect to home page as well as removing user from local state
    }
  };

  showCards = () => {
    if (this.props.user) {
      this.props.user.events.map(event => {
        return <EventCard event={event} />;
      });
    } else {
      this.props.localUser().events.map(event => {
        return <EventCard event={event} />;
      });
    }
  };

  render() {
    const { activeItem } = this.state;
    // let { bio } = this.props.user;

    return (
      <div>
        {console.log(this.state.activeItem, "current active item")}
        <Menu attached="top" tabular>
          <Menu.Item
            name="bio"
            active={activeItem === "bio"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="events"
            active={activeItem === "events"}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={Link} to="/" name="Home" />
          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={this.handleItemClick}
            />
            <Menu.Item>
              <Input
                transparent
                icon={{ name: "search", link: true }}
                placeholder="Search users..."
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached="bottom">
          {this.state.activeItem === "events" ? (
            this.props.user.events ? (
              this.props.user.events.map(event => {
                return (
                  <EventCard
                    event={event}
                    deleteEvent={this.props.deleteEvent}
                  />
                );
              })
            ) : (
              <h2>Currently no events, feel free to create one</h2>
            )
          ) : (
            <h4>
              {this.props.user
                ? this.props.user.bio
                : this.props.localUser().bio}
            </h4>
          )}
        </Segment>
      </div>
    );
  }
}
