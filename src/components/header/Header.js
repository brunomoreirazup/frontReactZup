import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MainTitle from "./MainTitle";
import SearchBox from "./SearchBox";
// import BtnAdd from "BtnAdd";
// import ContentInfo from "ContentInfo";


export default class Header extends Component{

    render(){
        return(
            <div>
                <MainTitle title={this.props.title} />
                <SearchBox/>
                {/*<BtnAdd/>*/}
                {/*<ContentInfo/>*/}
            </div>
        );
    }}