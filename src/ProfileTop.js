import React, { Component } from "react";
import {
  Segment,
  Image,
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Divider
} from "semantic-ui-react";
import CreateEventForm from "./CreateEventForm";
import EditEventForm from "./EditEventform";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  picture: "",
  links: "",
  description: "",
  address: "",
  modalOpen: false
};

export default class MenuExampleSecondaryPointing extends Component {
  state = INITIAL_STATE;

  handleOpen = () => this.setState({ ...this.state, modalOpen: true });

  handleClose = e => {
    this.setState({
      ...this.state,
      modalOpen: false
    });
    // if (e.target.innertext === yes) {
    //   this.props.deleteEvent()
    // } else {

    // }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.addUser(this.state);
    this.setState(INITIAL_STATE);
  };

  render() {
    const open = this.state.modalOpen;
    // const { activeItem } = this.state;

    return (
      <div>
        <Segment>
          <Image
            src="https://randomuser.me/api/portraits/lego/8.jpg"
            alt="none"
            size="medium"
            style={{ width: "max-content", margin: "auto" }}
            circular
          />
          <CreateEventForm
            style={{ position: "left" }}
            user={this.props.user}
            postEvent={this.props.postEvent}
          />
          <Modal
            trigger={
              <Button onClick={this.handleOpen} color="red" inverted>
                Remove Event
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="browser" content="Cookies policy" />
            <Modal.Content>
              <h3>Are you sure you would like to remove this Event?</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleClose} inverted>
                <Icon name="checkmark" /> Yes
              </Button>
              <Button color="red" onClick={this.handleClose} inverted>
                No
              </Button>
            </Modal.Actions>
          </Modal>
          <EditEventForm
            style={{ position: "left" }}
            user={this.props.user}
            updateEvent={this.props.updateEvent}
          />
          <h2 style={{ width: "max-content", margin: "auto" }}>
            {this.props.user
              ? this.props.user.name
              : this.props.localUser().name}
          </h2>
        </Segment>
      </div>
    );
  }
}

// state = { modalOpen: false }

//   handleOpen = () => this.setState({ modalOpen: true })

//   handleClose = () => this.setState({ modalOpen: false })

//   render() {
//     return (
//       <Modal
//         trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
//         open={this.state.modalOpen}
//         onClose={this.handleClose}
//         basic
//         size='small'
//       >
//         <Header icon='browser' content='Cookies policy' />
//         <Modal.Content>
//           <h3>This website uses cookies to ensure the best user experience.</h3>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button color='green' onClick={this.handleClose} inverted>
//             <Icon name='checkmark' /> Got it
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     )
//   }
// }
