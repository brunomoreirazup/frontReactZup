import React, { Component } from 'react';
import MainTitle from "./MainTitle";
import SearchBox from "./searchBox/SearchBox";
import BtnAdd from "./BtnAdd";
import ContentInfo from "./ContentInfo";
import MainModal from "../modal/MainModal"

export default class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            modal:false
        };

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        console.log(this.state.modal);
    }

    body = () =>{
        return(
            <form className="form-inline form-group">
                <label>Cidade:</label>
                <input className="form-control" type="text" placeholder="Insira uma cidade"/>
            </form>
        );
    }

    footer = () =>{
        return(
            <button type="button" className="btn btn-dark">Salvar</button>
        );
    }

    modalContent = {
        type:this.props.type,
        title:this.props.title,
        body: this.body(),
        footer: this.footer()

    };


    render(){
        return(
            <div className='container'>
                <br/>
                <div className='row bottomline'>
                    <div className='col-md-3'>
                        <MainTitle title={this.props.title} />
                    </div>
                    <div className='col-md-7 bottomline'>
                        <SearchBox/>
                    </div>
                    <div className='col-md-2 bottomline'>
                        <BtnAdd title={this.props.title} type="Adicionar" click={this.toggle.bind(this)}/>
                        <MainModal modal={this.state.modal} toggle={this.toggle.bind(this)} modalContent={this.modalContent}/>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <ContentInfo/>
                </div>
            </div>
        );
    }}