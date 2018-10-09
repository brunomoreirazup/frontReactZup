import React, { Component } from 'react';
import MainTitle from "./MainTitle";
import SearchBox from "./SearchBox";
import BtnAdd from "./BtnAdd";
import ContentInfo from "./ContentInfo";


export default class Header extends Component{

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
                        <BtnAdd title={this.props.title} type="Adicionar"/>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <ContentInfo/>
                </div>
            </div>
        );
    }}