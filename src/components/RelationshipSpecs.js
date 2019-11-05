import React from 'react';
import { Container, Modal, List, Button, Header, Icon, Confirm} from "semantic-ui-react";
import EditRelationshipForm from './EditRelationshipForm'

class RelationshipSpecs extends React.Component {
    state = { 
        modalOpen: false, 
        confirmOpen: false
    }
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    getAnniDate = () => {
        const anniDate = new Date(Date.parse(this.props.relationship.anniversary))
        return anniDate 
    }

    openConfirm = () => {
        this.setState({
            confirmOpen: true
        })
    }

    closeConfirm = () => {
        this.setState({
            confirmOpen: false
        })
    }
    getDates = () => {
        if(this.props.relationship.outings.length !== 0){
            return this.props.relationship.outings.map((outing) => {
                let datetime = new Date(outing.time)
                return (<List.Item key={outing.id}>{`${outing.activity} at ${outing.location} on ${datetime.toLocaleString()}`}</List.Item>)
            })
        } else{
            return (<h3> You have no upcoming dates!</h3>)
        }
    }

    
    render(){
        //console.log(this.props)
        return (
            <Container fluid id="relationship-show-container" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Icon name='x' style={
                    {position:'absolute',
                     right:'7px'   
                    }}
                    onClick={this.props.closeShowDiv}/>
                <h1>Your Relationship with {this.props.partner.first_name + " " + this.props.partner.last_name}</h1>
                <List bulleted>
                    <List.Item> Nickname: {this.props.relationship.nickname ? this.props.relationship.nickname : "You haven't set a nickname yet." }</List.Item>
                    <List.Item> Anniversary: {this.props.relationship.anniversary ? this.getAnniDate().toLocaleDateString("en-US"): "You haven't set an anniversary yet."}</List.Item>
                </List>
                <h1>Upcoming Dates:</h1>
                <List bulleted>
                    {this.getDates()}
                </List>
                <div className="ui two buttons" style={{ maxWidth: "50%" }}>
                <Modal
                    trigger={
                    <Button onClick={this.handleOpen} basic color="blue" style={{ marginRight: "20px" }}>Edit Relationship</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    closeIcon
                >
                    <Header icon='browser' content='Edit Relationship' />
                    <Modal.Content>
                        <EditRelationshipForm anniversary={this.getAnniDate()} 
                        nickname={this.props.relationship.nickname} 
                        handleClose={this.handleClose}
                        updateRelationship={this.props.updateRelationship}/>
                    </Modal.Content>
                </Modal>
                <Button basic color="red"
                        onClick={this.openConfirm}//() => this.props.handleUpdate("denied")}
                
                >Deny Relationship</Button>
                    <Confirm
                        open={this.state.confirmOpen}
                        onCancel={this.closeConfirm}
                        onConfirm={() => {
                            this.props.updateRelationshipStatus("ended", this.props.relationship.id);
                            this.props.closeShowDiv();
                            this.closeConfirm();
                        }}
                    />
                </div>
            </Container>
        )
    }
    }
    
export default RelationshipSpecs