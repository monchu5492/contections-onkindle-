import React, { Component } from "react";
import { Input, Menu, Segment, Card, Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import EventCard from "./EventCard";
import CreateEventForm from "./CreateEventForm";
import EventContainer from "./CreateEventForm";
import HomepageLayout from "./HomepageLayout";

export default class MenuExampleTabularOnTop extends Component {
  state = {
    activeItem: "events",
    currentUserEvents: [],
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
      return this.props.logOut(), this.props.history.push("/");
      //supposed to redirect to home page as well as removing user from local state
    }
  };

  // eventGridFuntion = () => {
  //   let ownedEvents = this.props.allEvents.filter(
  //     (event) => event.user.id === this.props.user.id
  //   );
  //   console.log(ownedEvents);
  //   let variab = ownedEvents;
  //   if (
  //     (ownedEvents.length === 0 && this.state.activeItem === "events") ||
  //     this.state.activeItem === "all events"
  //   ) {
  //     console.log("ownedEvents length 0");
  //     return (
  //       this.state.activeItem === "events", (<h3>Please create an event</h3>)
  //     );
  //   } else if (
  //     (ownedEvents.length >= 3 && this.state.activeItem === "events") ||
  //     this.state.activeItem === "all events"
  //   ) {
  //     console.log(`ownedEvents length: ${ownedEvents.length}`);
  //     while (variab.length >= 3) {
  //       let variab2 = variab.splice(3, 1);
  //       return (
  //         <Grid>
  //           <Grid.Row columns={3}>
  //             {variab2.map((thisevent) => {
  //               return (
  //                 <Grid.Column>
  //                   <EventCard
  //                     user={this.props.user}
  //                     users={this.props.users}
  //                     history={this.props.history}
  //                     allEvents={this.props.allEvents}
  //                     currentEvent={thisevent}
  //                     deleteEvent={this.props.deleteEvent}
  //                     updateEvent={this.props.updateEvent}
  //                     joinEvent={this.props.joinEvent}
  //                   />
  //                 </Grid.Column>
  //               );
  //             })}
  //           </Grid.Row>
  //         </Grid>
  //       );
  //     }
  //   }
  //   return (
  //     <Grid>
  //       <Grid.Row columns={variab.length}>
  //         {variab.map((thisevent) => {
  //           return (
  //             <Grid.Column>
  //               <EventCard
  //                 user={this.props.user}
  //                 users={this.props.users}
  //                 history={this.props.history}
  //                 allEvents={this.props.allEvents}
  //                 currentEvent={thisevent}
  //                 deleteEvent={this.props.deleteEvent}
  //                 updateEvent={this.props.updateEvent}
  //                 joinEvent={this.props.joinEvent}
  //               />
  //             </Grid.Column>
  //           );
  //         })}
  //       </Grid.Row>
  //     </Grid>
  //   );
  // };

  // eventMenuTab = () => {
  //   let ownedEvents = this.props.allEvents.filter(
  //     (event) => event.user.id === this.props.user.id
  //   );
  //   console.log(ownedEvents);
  //   if (ownedEvents.length === 0) {
  //     return (
  //       this.state.activeItem === "events", (<h3>Please create an event</h3>)
  //     );
  //   } else {
  //      this.state.activeItem === "events"
  //       ? let variab = ownedEvents;
  //       while (variab.length >= 3) {
  //         let variab2 = variab.splice(3, 1);
  //         return (
  //           <Grid>
  //             <Grid.Row columns={3}>
  //               {variab2.map((thisevent) => {
  //                 <Grid.Column>
  //                   <EventCard eachEvent={thisevent} />
  //                 </Grid.Column>;
  //               })}
  //             </Grid.Row>
  //           </Grid>
  //         );
  //       }
  //       return (
  //         <Grid>
  //           <Grid.Row columns={variab.length}>
  //             {variab.map((thisevent) => {
  //               <Grid.Column>
  //                 <EventCard eachEvent={thisevent} />
  //               </Grid.Column>;
  //             })}
  //           </Grid.Row>
  //         </Grid>
  //       );
  //       : null;
  //   }
  // };

  eventChange = (event) => {
    if (event) {
      this.setState({ currentUserEvents: event });
    }
  };

  eventMenuTab = () => {
    let ownedEvents = this.props.allEvents.filter(
      (event) => event.user.id === this.props.user.id
    );
    // let ownedEvents = this.props.owned_events;
    if (ownedEvents.length === 0 && this.state.activeItem === "events") {
      return (
        this.state.activeItem === "events", (<h3>Please create an event</h3>)
      );
    } else {
      return this.state.activeItem === "events"
        ? ownedEvents.map((event) => {
            return (
              <EventCard
                user={this.props.user}
                users={this.props.users}
                history={this.props.history}
                allEvents={this.props.allEvents}
                currentEvent={event}
                deleteEvent={this.props.deleteEvent}
                updateEvent={this.props.updateEvent}
                joinEvent={this.props.joinEvent}
                eventChange={this.eventChange}
              />
            );
          })
        : null;
    }
  };

  allEventMenuTab = () => {
    let nonOwnedEvents = this.props.allEvents.filter(
      (event) => event.user.id !== this.props.user.id
    );
    // let ownedEvents = this.props.owned_events;
    if (nonOwnedEvents) {
      console.log(nonOwnedEvents);
      return this.state.activeItem === "all events"
        ? nonOwnedEvents.map((event) => {
            return (
              <EventCard
                user={this.props.user}
                users={this.props.users}
                history={this.props.history}
                currentEvent={event}
                deleteEvent={this.props.deleteEvent}
                updateEvent={this.props.updateEvent}
                joinEvent={this.props.joinEvent}
                allEvents={this.props.allEvents}
                eventChange={this.eventChange}
              />
            );
          })
        : null;
    }
  };

  bioMenuTab = () => {
    return this.state.activeItem === "bio" ? (
      <h3 style={{ width: "max-content" }}>
        {this.props.user ? this.props.user.bio : this.props.localUser().bio}
      </h3>
    ) : null;
  };

  noEvent = () => <h3>Currently no Events available</h3>;

  render() {
    console.log(this.props.users);
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
          <Menu.Item
            name="all events"
            active={activeItem === "all events"}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={Link} to="/" name="Home" />
          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={this.handleItemClick}
            />
            {/* <Menu.Item>
              <Input
                transparent
                icon={{ name: "search", link: true }}
                placeholder="Search users..."
              />
            </Menu.Item> */}
          </Menu.Menu>
        </Menu>
        <Segment attached="bottom" textAlign="center">
          {this.allEventMenuTab()}
          {/* {this.eventGridFuntion()} */}
          {this.bioMenuTab()}
          {this.eventMenuTab()}
          {this.props.owned_events.length >= 1 ? this.noEvent : null}
        </Segment>
      </div>
    );
  }
}
