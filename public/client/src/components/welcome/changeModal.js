import React, { Component } from 'react';
import ChangeLocation from './changeLocation';
import { Modal } from 'react-bootstrap'
export default class ChangeModal extends Component {
  render(){
    return(
      <Modal show={this.props.visible} onHide={this.props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Change Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeLocation changeLocation={this.props.changeLocation}/>
        </Modal.Body>
      </Modal>
    )
  }
}
