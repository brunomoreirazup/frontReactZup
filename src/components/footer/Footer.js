import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.clearPages();

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
            return (
                <div className="container">
                    <nav >


                        <ul className="pagination">
                            <li className={currentPage !== homePage ? "page-item" : "page-item disabled"}
                                onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage - 1) }}
                            >
                                <a className="page-link _page-link" id="prevPageBt" href="#" tabIndex="-1">Previous</a>

                            </li>

                            {currentPage - 1 > homePage ? (

                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.homePage) }}>
                                    <a className="page-link _page-link" id="homePage" href="#">{this.props.reduceFooter.pages.homePage}</a>
                                </li>

                            ) : ""}

                            {currentPage - 2 > homePage ? "..." : ""}

                            {currentPage !== homePage ? (
                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage - 1) }}>
                                    <a className="page-link _page-link" id="prevPage" href="#">{this.props.reduceFooter.pages.currentPage - 1}</a>
                                </li>

                            ) : ""}

                            <li className="page-item active ">
                                <a className="_pagination-active page-link" href="#">
                                    {this.props.reduceFooter.pages.currentPage} <span className="sr-only">(current)</span>
                                </a>
                            </li>

                            {currentPage !== lastPage ? (
                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                                    <a className="page-link _page-link" id="nextPage" href="#">{this.props.reduceFooter.pages.currentPage + 1}</a>
                                </li>

                            ) : ""}

                            {currentPage + 2 < lastPage ? "..." : ""}

                            {currentPage + 1 < lastPage ? (

                                <li className="page-item" onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.lastPage) }}>
                                    <a className="page-link _page-link" id="lastPage" href="#">{this.props.reduceFooter.pages.lastPage}</a>
                                </li>

                            ) : ""}

                            <li className={currentPage !== lastPage ? "page-item" : "page-item disabled"}
                                onClick={() => { this.props.changeCurrentPage(this.props.reduceFooter.pages.currentPage + 1) }}>
                                <a className="page-link _page-link" id="nextPageBt" href="#">Next</a>

                            </li>
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
}
function mapStateToProps(state) {
    return {
        reduceFooter: state.reduceFooter
    };

}

export default connect(mapStateToProps)(Footer);
