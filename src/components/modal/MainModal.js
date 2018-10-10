import React, {Component} from 'react';
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

export default class MainModal extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>{this.props.modalContent.type} {this.props.modalContent.title}</ModalHeader>
                    <ModalBody>
                        {this.props.modalContent.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.modalContent.footer}
                        <Button color='secondary' onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}