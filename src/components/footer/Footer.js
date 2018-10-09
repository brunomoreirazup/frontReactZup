import React, { Component } from 'react';
import {connect} from 'react-redux';

class Footer extends Component {

    constructor(props) {
        super(props);

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
            <nav>
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
        if(this.props.currentPage !== this.props.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
            );
        else
            return(
                <li className="page-item disabled" >
                    <a className="page-link" href="#" tabIndex="-1" >Previous</a>
                </li>
            );
    }
    printHomePageNumber()
    {
        if(this.props.currentPage - 1 > this.props.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.homePage}</a>
                </li>

            )
    }
    printPrevPageNumberSpace()
    {
        if(this.props.currentPage - 2 > this.props.homePage)
            return(
                "..."
            );

    }
    printPrevPageNumber()
    {
        if(this.props.currentPage !== this.props.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.prevPage}</a>
                </li>

            )
    }
    printCurrentPage()
    {
        return(
            <li className="page-item active">
                <a className="page-link" href="#">
                    {this.props.currentPage} <span className="sr-only">(current)</span>
                </a>
            </li>
        );

    }
    printNextPageNumber() {
        if (this.props.currentPage !== this.props.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.nextPage}</a>
                </li>
            )

    }
    printNextPageNumberSpace()
    {
        if(this.props.currentPage + 2 < this.props.lastPage)
        return(
            "..."
        );
    }
    printLastPageNumber()
    {
        if (this.props.currentPage + 1 < this.props.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.lastPage}</a>
                </li>
            )

    }
    printNextPageButton()
    {
        if(this.props.currentPage !== this.props.lastPage)
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

function mapStateToProps(state) {
    return{
        homePage : state.homePage,
        lastPage : state.lastPage,
        nextPage : state.nextPage,
        prevPage : state.prevPage,
        currentPage : state.currentPage

    };

}

export default connect(mapStateToProps)(Footer);