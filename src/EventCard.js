import React from "react";
import { Button, Card, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EditEventForm from "./EditEventform";
// , margin: "auto"
// style={{ width: "max-content" }}
export default class CardExampleGroups extends React.Component {
  onCardClick = () => {
    // return <EventInfoCard />;
  };

  render() {
    return (
      <Card>
        {console.log(this.props.currentEvent, "currentEvent card props")}
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={this.props.currentEvent.picture}
          />
          <Card.Header>
            Event Created By {this.props.user.user_name}
          </Card.Header>
          <Card.Meta>{this.props.currentEvent.name} project</Card.Meta>
          <Card.Description>
            <Link>{this.props.user.links}</Link>
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
            <EditEventForm
              style={{ position: "left" }}
              user={this.props.user}
              updateEvent={this.props.updateEvent}
              deleteEvent={this.props.deleteEvent}
              currentEvent={this.props.currentEvent}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}
