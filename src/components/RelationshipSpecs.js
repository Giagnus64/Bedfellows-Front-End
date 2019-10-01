import React from 'react';
import { Container, Modal, List, Button, Header, Form } from "semantic-ui-react";

class RelationshipSpecs extends React.Component {
    state = { 
        modalOpen: false, 
    }
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    getAnniDate = () => {
        const anniDate = new Date(Date.parse(this.props.relationship.anniversary))
        return anniDate.toLocaleDateString("en-US")
    }
    
    render(){
        console.log(this.props)
        return (
            <Container fluid id="relationship-show-container" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <h1>Your Relationship with {this.props.partner.first_name + " " + this.props.partner.last_name}</h1>
                <List bulleted>
                    <List.Item> Nickname: {this.props.relationship.nickname}</List.Item>
                    <List.Item> Anniversary: {this.getAnniDate()}</List.Item>
                </List>
                <h1>Upcoming Dates:</h1>
                <List bulleted>
                    <List.Item>Date 1</List.Item>
                </List>
                <div className="ui two buttons" style={{ maxWidth: "50%" }}>
                <Modal
                    trigger={<Button onClick={this.handleOpen} basic color="blue" style={{ marginRight: "20px" }}>Edit Relationship</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    closeIcon
                >
                    <Header icon='browser' content='Edit Relationship' />
                    <Modal.Content>
                    </Modal.Content>
                </Modal>
                <Button basic color="red">Deny Relationship</Button>
                </div>
            </Container>
        )
    }
    }
    
export default RelationshipSpecs