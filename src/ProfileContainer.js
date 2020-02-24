import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link} from "react-router-dom"

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  componentDidMount = () => {console.log(this.props.user)}

  currentUser = () => this.props.user 

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogOut = () => {
  if (window.confirm("Are you sure you want to logout?" == true)) {
    return (<Link to='/'/>)
  } else {
    alert("Save Canceled!")
  }
  }
    
//   handleLogOut = () => {(alert("Save Canceled!")
//     confirm("Do you want to logout?") ? (<Redirect to='/'/>) : 
//   }
  
  render() {
    const { activeItem } = this.state
    return (
      <div>
    <Segment>
      <img src='https://randomuser.me/api/portraits/lego/8.jpg' alt='none'  />
    </Segment>
        <Menu pointing secondary>
        <Link to='/'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
        </Link>
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={(this.handleItemClick, this.handleLogOut)}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}