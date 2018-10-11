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
        if(this.props.modalContent != null)
        return(
            <Modal isOpen={this.props.modalOpen} toggle={this.toggleMainModal}>
                    <ModalHeader toggle={this.toggleMainModal}>{this.props.modalContent.title}</ModalHeader>
                    <ModalBody>
                        {this.props.modalContent.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.modalContent.footer}
                        <Button color='secondary' onClick={this.toggleMainModal}>Cancel</Button>
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
        modalOpen : state.modalOpen,
        modalContent:state.modalContent
    };

}
export default connect(mapStateToProps)(MainModal);
    