import React, { Component } from 'react';
import {connect} from 'react-redux';

class FooterTest extends Component{

    constructor(props)
    {
        super(props);

        this.pages = [{
            homePage : 1,
            lastPage : 8,
            nextPage : 2,
            prevPage : 0,
            currentPage : 1

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 3,
            prevPage : 1,
            currentPage : 2

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 4,
            prevPage : 2,
            currentPage : 3

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 5,
            prevPage : 3,
            currentPage : 4

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 6,
            prevPage : 4,
            currentPage : 5

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 7,
            prevPage : 5,
            currentPage : 6

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 8,
            prevPage : 6,
            currentPage : 7

        },{
            homePage : 1,
            lastPage : 8,
            nextPage : 0,
            prevPage : 7,
            currentPage : 8

        }
        ];


        this.i = 0;
    }
    changePage()
    {

        this.props.dispatch({ type: 'PAGES' ,pages:this.pages[this.i]});
        this.i = ( this.i + 1 ) % 8;

    }




    render()
    {
        return(
            <div>
                <input type="button" onClick={this.changePage.bind(this)} value="TEST"/>
            </div>
        )
    }

}



export default connect()(FooterTest);