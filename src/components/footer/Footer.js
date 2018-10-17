import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.init();

    }
    init() {

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
    clearPages() {
        let defaultPages =
        {
            homePage: 1,
            lastPage: 1,
            currentPage: 1

        };
        this.props.dispatch({ type: 'PAGES', pages: defaultPages });
    }

    printPagination() {
        if (this.props.reduceFooter != null && this.props.reduceFooter.pages != null) {
            let currentPage = this.props.reduceFooter.pages.currentPage;
            let homePage = this.props.reduceFooter.pages.homePage;
            let lastPage = this.props.reduceFooter.pages.lastPage;
            console.log("CurrentPage:" + currentPage);
            console.log("HomePage:" + homePage);
            return (
                <div className="container">
                    <nav >


                        <ul className="pagination">
                            <li className={currentPage !== homePage ? "page-item" : "page-item disabled"}
                                onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage - 1) }}
                            >
                                <a className="page-link _page-link" href="#" tabIndex="-1">Previous</a>

                            </li>

                            {currentPage - 1 > homePage ? (

                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.homePage) }}>
                                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.homePage}</a>
                                </li>

                            ) : ""}

                            {currentPage - 2 > homePage ? "..." : ""}

                            {currentPage !== homePage ? (
                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage - 1) }}>
                                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.currentPage - 1}</a>
                                </li>

                            ) : ""}

                            <li className="page-item active ">
                                <a className="_pagination-active page-link" href="#">
                                    {this.props.reduceFooter.pages.currentPage} <span className="sr-only">(current)</span>
                                </a>
                            </li>

                            {currentPage !== lastPage ? (
                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.currentPage + 1}</a>
                                </li>

                            ) : ""}

                            {currentPage + 2 < lastPage ? "..." : ""}

                            {currentPage + 1 < lastPage ? (

                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.lastPage) }}>
                                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.lastPage}</a>
                                </li>

                            ) : ""}

                            <li className={currentPage !== lastPage ? "page-item" : "page-item disabled"}
                                onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                                <a className="page-link _page-link" href="#">Next</a>

                            </li>

                            {/* {this.printPrevPageButton()} */}
                            {/* {this.printHomePageNumber()} */}
                            {/* {this.printPrevPageNumberSpace()} */}
                            {/* {this.printPrevPageNumber()} */}
                            {/* {this.printCurrentPage()} */}
                            {/* {this.printNextPageNumber()} */}
                            {/* {this.printNextPageNumberSpace()} */}
                            {/* {this.printLastPageNumber()} */}
                            {/* {this.printNextPageButton()} */}
                        </ul>
                    </nav>
                </div >


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




    printPrevPageButton() {
        if (this.props.reduceFooter.pages.currentPage !== this.props.reduceFooter.pages.homePage)
            return true;

        return false;
    }
    printHomePageNumber() {
        if (this.props.reduceFooter.pages.currentPage - 1 > this.props.reduceFooter.pages.homePage)
            return (
                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.homePage) }}>
                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.homePage}</a>
                </li>

            )
    }
    printPrevPageNumberSpace() {
        if (this.props.reduceFooter.pages.currentPage - 2 > this.props.reduceFooter.pages.homePage)
            return (
                "..."
            );

    }
    printPrevPageNumber() {
        if (this.props.reduceFooter.pages.currentPage !== this.props.reduceFooter.pages.homePage)
            return (
                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage - 1) }}>
                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.currentPage - 1}</a>
                </li>

            )
    }
    printCurrentPage() {
        return (
            <li className="page-item active ">
                <a className="_pagination-active page-link" href="#">
                    {this.props.reduceFooter.pages.currentPage} <span className="sr-only">(current)</span>
                </a>
            </li>
        );

    }
    printNextPageNumber() {
        if (this.props.reduceFooter.pages.currentPage !== this.props.reduceFooter.pages.lastPage)
            return (
                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.currentPage + 1}</a>
                </li>
            )

    }
    printNextPageNumberSpace() {
        if (this.props.reduceFooter.pages.currentPage + 2 < this.props.reduceFooter.pages.lastPage)
            return (
                "..."
            );
    }
    printLastPageNumber() {
        if (this.props.reduceFooter.pages.currentPage + 1 < this.props.reduceFooter.pages.lastPage)
            return (
                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.lastPage) }}>
                    <a className="page-link _page-link" href="#">{this.props.reduceFooter.pages.lastPage}</a>
                </li>
            )

    }
    printNextPageButton() {
        if (this.props.reduceFooter.pages.currentPage !== this.props.reduceFooter.pages.lastPage)
            return (
                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                    <a className="page-link _page-link" href="#">Next</a>
                </li>
            );
        else
            return (
                <li className="page-item disabled">
                    <a className="page-link" href="#" disabled>Next</a>
                </li>

            );
    }




}

function mapStateToProps(state) {
    return {
        reduceFooter: state.reduceFooter
    };

}

export default connect(mapStateToProps)(Footer);
