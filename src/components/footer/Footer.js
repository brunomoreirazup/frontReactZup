import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.homePage = 1;
        this.lastPage = 8;
        this.nextPage = 7;
        this.prevPage = 5;
        this.currentPage = 6;
        this.printPrevPageButton = this.printPrevPageButton.bind(this);
        this.printPrevPageNumberSpace = this.printPrevPageNumberSpace.bind(this);
        this.printPrevPageNumber = this.printPrevPageNumber.bind(this);
        this.printCurrentPage = this.printCurrentPage.bind(this);
        this.printNextPageNumber = this.printNextPageNumber.bind(this);
        this.printNextPageNumberSpace = this.printNextPageNumberSpace.bind(this);
        this.printNextPageButton = this.printNextPageButton.bind(this);
        this.printLastPageNumber = this.printLastPageNumber.bind(this);
        this.printHomePageNumber = this.printHomePageNumber.bind(this);
    }


    render() {
        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {this.printPrevPageButton()}
                    {this.printHomePageNumber()}
                    {this.printPrevPageNumberSpace()}
                    {this.printPrevPageNumber()}
                    {this.printCurrentPage()}
                    {this.printNextPageNumber()}
                    {this.printNextPageNumberSpace()}
                    {this.printLastPageNumber()}
                    {this.printNextPageButton()}
                </ul>
            </nav>
        );
    }



    printPrevPageButton()
    {
        if(this.currentPage!=this.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
            )
        else
            return(
                <li className="page-item disabled" >
                    <a className="page-link" href="#" tabIndex="-1" >Previous</a>
                </li>
            )
    }
    printHomePageNumber()
    {
        if(this.currentPage - 1 > this.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.homePage}</a>
                </li>

            )
    }
    printPrevPageNumberSpace()
    {
        if(this.currentPage - 2 > this.homePage)
            return(
                "..."
            );

    }
    printPrevPageNumber()
    {
        if(this.currentPage!=this.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.prevPage}</a>
                </li>

            )
    }
    printCurrentPage()
    {
        return(
            <li className="page-item active">
                <a className="page-link" href="#">
                    {this.currentPage} <span className="sr-only">(current)</span>
                </a>
            </li>
        );

    }
    printNextPageNumber() {
        if (this.currentPage != this.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.nextPage}</a>
                </li>
            )

    }
    printNextPageNumberSpace()
    {
        if(this.currentPage + 2 < this.lastPage)
        return(
            "..."
        );
    }
    printLastPageNumber()
    {
        if (this.currentPage + 1 < this.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.lastPage}</a>
                </li>
            )

    }
    printNextPageButton()
    {
        if(this.currentPage!=this.lastPage)
            return(
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            );
        else
            return(
                <li className="page-item">
                    <a className="page-link" href="#" disabled>Next</a>
                </li>

            );
    }


}