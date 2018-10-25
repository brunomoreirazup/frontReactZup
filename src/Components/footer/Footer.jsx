import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import previousArrow from '../../img/back.png';
import nextArrow from '../../img/next.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.clearPages();
  }

  clearPages() {
    const { dispatch } = this.props;
    const defaultPages = {
      homePage: 1,
      lastPage: 1,
      currentPage: 1,

    };
    dispatch({ type: 'PAGES', pages: defaultPages });
  }

  printPagination() {
    const { reduceFooter, changeCurrentPage } = this.props;
    if (reduceFooter != null && reduceFooter.pages != null) {
      const {
        currentPage,
        homePage,
        lastPage,
      } = reduceFooter.pages;
      return (
        <div className="footer">
          <nav className="footer">
            <ul className="pagination">
              <li className={currentPage !== homePage ? 'page-item' : 'page-item disabled'}>
                <button
                  onClick={
                    currentPage !== homePage ? () => changeCurrentPage(currentPage - 1) : () => {}
                  }
                  type="button"
                  className="page-link _page-link"
                  id="prevPageBt"
                  tabIndex="-1"
                >
                  <img className="arrows" src={previousArrow} alt="Previous arrow" />
                </button>

              </li>

              {currentPage - 1 > homePage ? (

                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(homePage)}
                    type="button"
                    className="page-link _page-link"
                    id="homePage"
                  >
                    {homePage}
                  </button>
                </li>

              ) : ''}

              {currentPage - 2 > homePage ? '...' : ''}

              {currentPage !== homePage ? (
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(currentPage - 1)}
                    type="button"
                    className="page-link _page-link"
                    id="prevPage"
                  >
                    {currentPage - 1}
                  </button>
                </li>

              ) : ''}

              <li className="page-item active ">
                <button type="button" className="_pagination-active page-link" href="#">
                  {currentPage}
                  <span className="sr-only">(current)</span>
                </button>
              </li>

              {currentPage !== lastPage ? (
                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(currentPage + 1)}
                    type="button"
                    className="page-link _page-link"
                    id="nextPage"
                  >
                    {currentPage + 1}
                  </button>
                </li>

              ) : ''}

              {currentPage + 2 < lastPage ? '...' : ''}

              {currentPage + 1 < lastPage ? (

                <li className="page-item">
                  <button
                    onClick={() => changeCurrentPage(lastPage)}
                    type="button"
                    className="page-link _page-link"
                    id="lastPage"
                  >
                    {lastPage}
                  </button>
                </li>

              ) : ''}

              <li className={currentPage !== lastPage ? 'page-item' : 'page-item disabled'}>
                <button
                  onClick={
                    currentPage !== lastPage ? () => changeCurrentPage(currentPage + 1) : () => {}
                  }
                  type="button"
                  className="page-link _page-link"
                  id="nextPageBt"
                >
                  <img className="arrows" src={nextArrow} alt="Next arrow" />
                </button>

              </li>
            </ul>
          </nav>
        </div>


      );
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.printPagination()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    reduceFooter: state.reduceFooter,
  };
}

Footer.defaultProps = {
  reduceFooter: {},
};


Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reduceFooter: PropTypes.shape({
    pages: PropTypes.objectOf(PropTypes.number),
  }),
  changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Footer);
