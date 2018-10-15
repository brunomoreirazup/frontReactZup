import React, {Component} from 'react';
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import { connect } from 'react-redux';
class MainModal extends Component{

    constructor(props){
        super(props);
        this.toggleMainModal = this.toggleMainModal.bind(this);
        this.toggleMainModal();
    }

    toggleMainModal()
    {
        this.props.dispatch({type:"TOGGLE_MAIN_MODAL",modalOpen:false});
    }

    createModal()
    {
        if(this.props.reduceMainModal != null && this.props.reduceMainModal.modalContent != null)
        return(
            <Modal isOpen={this.props.reduceMainModal.modalOpen} toggle={this.toggleMainModal}>
                    <ModalHeader toggle={this.toggleMainModal}>{this.props.reduceMainModal.modalContent.title}</ModalHeader>
                    <ModalBody>
                        {this.props.reduceMainModal.modalContent.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.reduceMainModal.modalContent.footer}
                        <Button id="btClosseModal" color='secondary' onClick={this.toggleMainModal}>Cancel</Button>
                    </ModalFooter>
            </Modal>
        )
        return "";
    }
    render(){
        return(
            <div>
                {this.createModal()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return{
        reduceMainModal : state.reduceMainModal
    };

}
export default connect(mapStateToProps)(MainModal);
    