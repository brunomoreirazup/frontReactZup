import React, { Component } from 'react';
import MainTitle from "./MainTitle";
import SearchBox from "./searchBox/SearchBox";
import BtnAdd from "./BtnAdd";
import ContentInfo from "./ContentInfo";

export default class Header extends Component{

    constructor(props){
        super(props);
    }
    render(){
        console.log("PROPS");
        console.log(this.props);
        return(
            <div className='container'>
                <br/>
                <div className='row bottomline'>
                    <div className='col-md-3'>
                        <MainTitle title={this.props.title} />
                    </div>
                    <div className='col-md-7 bottomline'>
                        <SearchBox search={this.props.search}/>
                    </div>
                    <div className='col-md-2 bottomline'>
                        <BtnAdd title={this.props.title} type="Adicionar" click={this.props.showModalAdd}/>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <ContentInfo changeSize={this.props.changeSize}/>
                </div>
            </div>
        );
    }}