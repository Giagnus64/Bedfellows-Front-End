import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'

const RelationshipModal = (props) => {
    return (
        <Modal
            trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
            open={props.modalState}
            onClose={this.handleClose}
            basic
        >
            <Header icon='browser' content='Cookies policy' />
            <Modal.Content>
                
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={this.handleClose} inverted>
                 EditUser
                </Button>
            </Modal.Actions>
        </Modal>
    )
}