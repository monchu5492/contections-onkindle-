import React from "react";
import { Button, Modal } from "semantic-ui-react";
// Form, Header, Image,
const INITIAL_STATE = {
  name: "",
  picture: "",
  links: "",
  description: "",
  address: "",
  user: []
  //    owner_id: ""
};
export default class CreateEventForm extends React.Component {
  //testing modal click functionality
  state = { open: false };
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });
  //-------------------------------------------
  state = INITIAL_STATE;
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFormSubmit = e => {
    // debugger;
    e.preventDefault();
    this.close();
    this.props.updateEvent(this.state);
    this.setState(INITIAL_STATE);
  };
  render() {
    //testing modal:
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    return (
      <div>
        <Button onClick={this.closeConfigShow(false, true)} color="grey">
          Edit an Event
        </Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Edit your Event</Modal.Header>
          <Modal.Content>
            <p>Please provide the following information about your event.</p>
          </Modal.Content>
          <form className="ui form" onSubmit={this.handleFormSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name"
              />
            </div>
            <div className="field">
              <label>Event Photo</label>
              <input
                type="text"
                name="picture"
                value={this.state.picture}
                onChange={this.handleChange}
                placeholder="Image"
              />
            </div>
            <div className="field">
              <label>Relevant Git/other links </label>
              <input
                type="text"
                name="links"
                value={this.state.links}
                onChange={this.handleChange}
                placeholder="Animal Type"
              />
            </div>
            <div className="field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Description"
              />
            </div>
            <div className="field">
              <label>address</label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
                placeholder="Address"
              />
            </div>
            {/* <button type="submit" className="ui button">Submit</button> */}
          </form>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Close
            </Button>
            <Button
              onClick={this.handleFormSubmit}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Submit"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
