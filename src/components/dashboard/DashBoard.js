import React, { Component } from 'react';
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import Header from "../header/Header";
import MainModal from "../modal/MainModal";

export default class Home extends Component {


    constructor(props) {
        super(props);
        this.init();
    }
    init() {
        this.title = this.props.title;
        this.tHead = this.props.tHead;
        this.state = {
            modal: false
        };
        this.modalContent = {
            title: '',
            body: '',
            footer: ''

        };

    }
    showModalAdd() {
        this.modalContent = {
            title: "Adicionar " + this.title,
            body: this.props.form(this.props.add),
            footer: <button type="button" className="btn btn-dark" onClick={this.props.add}>Salvar</button>
        };
        console.log(this.state.modal);
        this.setState({
            modal: !this.state.modal
        });
        console.log(this.state.modal);


    }
    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }
    showModalEdit(id) {
        this.modalContent = {
            title: "Editar " + this.title,
            body: this.props.form(this.props.edit, id),
            footer: <button type="button" className="btn btn-dark" onClick={this.props.edit.bind(this.props.edit, id)}>Salvar</button>
        };
        this.setState({
            modal: !this.state.modal
        });

    }
    showModalDelete(id) {
        this.modalContent = {
            title: "Deltar " + this.title,
            body: "Realmente Deseja Remover City ? ",
            footer: <button type="button" className="btn btn-dark" onClick={this.props.delete.bind(this.props.delete, id)}>Remover</button>
        };
        this.setState({
            modal: !this.state.modal
        });
    }



    render() {
        return (
            <div>

                <Header title={this.title} showModalAdd={this.showModalAdd.bind(this)} />
                <Table thead={this.tHead} edit={this.showModalEdit.bind(this)} delete={this.showModalDelete.bind(this)} />
                <Footer />
                <FooterTest />
                <MainModal modal={this.state.modal} toggle={this.toggleModal.bind(this)} modalContent={this.modalContent} />

            </div>

        )
    }
}