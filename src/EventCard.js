import React from "react";
import { Button, Card, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RemoveEventModoal from "./RemoveEventModal";

// , margin: "auto"
// style={{ width: "max-content" }}
export default class CardExampleGroups extends React.Component {
  onCardClick = () => {
    // return <EventInfoCard />;
  };

  render() {
    console.log("what it do");
    return (
      <Card>
        {console.log(this.props, "event card props")}
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal
              trigger={
                <Button color="green" inverted>
                  Join
                </Button>
              }
              header="Reminder!"
              content="Call Benjamin regarding the reports."
              actions={[
                "Snooze",
                { key: "done", content: "Done", positive: true }
              ]}
            />
            <RemoveEventModoal
              event={this.props}
              deleteEvent={this.props.deleteEvent}
              currentUserEvents={this.props.currentUserEvents}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}
