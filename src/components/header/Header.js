import React, { Component } from 'react';
import MainTitle from "./MainTitle";
import SearchBox from "./searchBox/SearchBox";
import BtnAdd from "./BtnAdd";
import ContentInfo from "./contentInfo/ContentInfo";

export default class Header extends Component{

    render(){
        return(
            <div className='container'>
                <br/>
                <div className='row bottomline'>
                    <div className='col-md-4'>
                        <MainTitle title={this.props.title} />
                    </div>
                    <div className='col-md-6 bottomline'>
                        <SearchBox search={this.props.search}/>
                    </div>
                    <div className='col-md-2 bottomline'>
                        <BtnAdd title={this.props.title} type="Adicionar" click={this.props.showModalAdd}/>
                    </div>
                </div>
                <div className='row'>
                    <ContentInfo changeSize={this.props.changeSize}/>
                </div>
            </div>
        );
    }}