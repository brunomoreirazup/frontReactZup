/* global document */
import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainModal extends Component {
  constructor(props) {
    super(props);
    this.toggleMainModal = this.toggleMainModal.bind(this);
    this.toggleMainModal();
  }

  componentDidUpdate() {
    const input = document.querySelector('.modal-dialog input');
    if (input) {
      input.select();
    }
  }

  toggleMainModal() {
    const { dispatch } = this.props;
    dispatch({ type: 'TOGGLE_MAIN_MODAL', modalOpen: false });
  }

  createModal() {
    const { reduceMainModal } = this.props;

    if (reduceMainModal != null && reduceMainModal.modalContent != null) {
      return (
        <Modal isOpen={reduceMainModal.modalOpen} toggle={this.toggleMainModal}>
          <ModalHeader toggle={this.toggleMainModal}>
            {reduceMainModal.modalContent.title}
          </ModalHeader>
          <ModalBody>
            {reduceMainModal.modalContent.body}
            {reduceMainModal.modalContent.alerts}
          </ModalBody>

          <ModalFooter>
            {reduceMainModal.modalContent.footer}
            <Button id="btClosseModal" color="secondary" onClick={this.toggleMainModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.createModal()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    reduceMainModal: state.reduceMainModal,
  };
}
MainModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reduceMainModal: PropTypes.shape({
    modalOpen: PropTypes.bool,
    modalContent: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ]),
      footer: PropTypes.element,
    }),
  }).isRequired,
};

export default connect(mapStateToProps)(MainModal);
