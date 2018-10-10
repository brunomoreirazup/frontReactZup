import React, { Component } from 'react';
import {connect} from 'react-redux';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.init();

    }
    init()
    {

        this.clearPages();

        this.printPagination = this.printPagination.bind(this);
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
    clearPages()
    {
        this.props.dispatch({ type: 'PAGES' ,pages: null });
    }

    printPagination()
    {
        if(this.props.pages != null)
        {
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
        else
            return "";

    }

    render() {
        return (
            <div>
                {this.printPagination()}
            </div>
    )
    }




    printPrevPageButton()
    {
        if(this.props.pages.currentPage !== this.props.pages.homePage)
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
        if(this.props.pages.currentPage - 1 > this.props.pages.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.pages.homePage}</a>
                </li>

            )
    }
    printPrevPageNumberSpace()
    {
        if(this.props.pages.currentPage - 2 > this.props.pages.homePage)
            return(
                "..."
            );

    }
    printPrevPageNumber()
    {
        if(this.props.pages.currentPage !== this.props.pages.homePage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.pages.prevPage}</a>
                </li>

            )
    }
    printCurrentPage()
    {
        return(
            <li className="page-item active">
                <a className="page-link" href="#">
                    {this.props.pages.currentPage} <span className="sr-only">(current)</span>
                </a>
            </li>
        );

    }
    printNextPageNumber() {
        if (this.props.pages.currentPage !== this.props.pages.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.pages.nextPage}</a>
                </li>
            )

    }
    printNextPageNumberSpace()
    {
        if(this.props.pages.currentPage + 2 < this.props.pages.lastPage)
        return(
            "..."
        );
    }
    printLastPageNumber()
    {
        if (this.props.pages.currentPage + 1 < this.props.pages.lastPage)
            return (
                <li className="page-item">
                    <a className="page-link" href="#">{this.props.pages.lastPage}</a>
                </li>
            )

    }
    printNextPageButton()
    {
        if(this.props.pages.currentPage !== this.props.pages.lastPage)
            return(
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            );
        else
            return(
                <li className="page-item disabled">
                    <a className="page-link" href="#" disabled>Next</a>
                </li>

            );
    }




}

function mapStateToProps(state) {
    return{
        pages : state.pages

    };

}

export default connect(mapStateToProps)(Footer);