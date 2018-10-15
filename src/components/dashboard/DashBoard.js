import React, { Component } from 'react';
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import Header from "../header/Header";
import MainModal from "../modal/MainModal";
import { connect } from 'react-redux';
import HttpApi from "../http/HttpApi";
class DashBoard extends Component {


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
        this.props.dispatch({type:"PAGE_SIZE",page_size:5})

    }


    toggleModal() {
        this.props.dispatch({type:"MAIN_MODAL_CONTENT",modalContent:this.modalContent})
        this.props.dispatch({type:"TOGGLE_MAIN_MODAL"});
    }


    showModalAdd() {
        this.modalContent = {
            title: "Adicionar " + this.title,
            body: this.props.form(this.props.add),
            footer: <button type="button" className="btn btn-success" onClick={this.props.add}>Adicionar</button>
        }
        this.toggleModal();

    }
    showModalEdit(id) {
        this.modalContent = {
            title: "Editar " + this.title,
            body: this.props.form(this.props.edit, id),
            footer: <button type="button" className="btn btn-info" onClick={this.props.edit.bind(this.props.edit, id)}>Salvar</button>
        }
        this.toggleModal();

    }
    showModalDelete(id) {
        this.modalContent = {
            title: "Deletar " + this.title,
            body: "Realmente Deseja Remover City ? ",
            footer: <button type="button" className="btn btn-dark" onClick={this.props.delete.bind(this.props.delete, id)}>Remover</button>
        }
        this.toggleModal();
    }

    changePageSize(size) {
        this.props.dispatch({type:"PAGE_SIZE",page_size:size.value})
        this.props.dispatch({type:"PAGES_CURRENT",currentPage:1})
        this.props.list();
        
    }
    changeCurrentPage(page){
        this.props.dispatch({type:"PAGES_CURRENT",currentPage:page})
        this.props.list();
    }


    render() {
        return (
            <div>

                <Header title={this.title}
                    showModalAdd={this.showModalAdd.bind(this)} search={this.props.search}
                    changeSize={this.changePageSize.bind(this)}
                />
                <Table thead={this.tHead} edit={this.showModalEdit.bind(this)} delete={this.showModalDelete.bind(this)} />
                <Footer changeCurrentPage={this.changeCurrentPage.bind(this)}/>
                <MainModal />

            </div>

        )
    }
}
export default connect()(DashBoard);