import React, { Component } from 'react';
import Footer from "../footer/Footer";
import FooterTest from "../footer/FooterTest";
import Table from "../table/Table";
import Header from "../header/Header";
import MainModal from "../modal/MainModal";

export default class Home extends Component{


    constructor(props)
    {
        super(props);
        this.init();
    }
    init()
    {
        this.title = this.props.title;
        this.tHead = this.props.tHead;
        this.state = {
            modal:false
        };
        this.modalContent = {
            title:'',
            body: '',
            footer: ''

        };

    }
    showModalAdd(){
        this.modalContent = {
            title:"Adicionar " + this.title,
            body: this.props.form(this.props.add),
            footer: <button type="button" className="btn btn-dark" onClick={this.props.add}>Salvar</button>
        }
        this.setState({
            modal: !this.state.modal
        });


    }
    toggleModal()
    {
        this.setState({
            modal: !this.state.modal
        })
    }
    showModalEdit(){}
    showModalDelete(){}



    render(){
        return(
            <div>

                <Header title={this.title} showModalAdd={this.showModalAdd.bind(this)}/>
                <Table thead={this.tHead}/>
                <Footer />
                <FooterTest />
                <MainModal modal={this.state.modal} toggle={this.toggleModal.bind(this)} modalContent={this.modalContent}/>

            </div>

        )
    }
}