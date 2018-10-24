import React from 'react';
import PropTypes from 'prop-types';
import MainTitle from './mainTitle/MainTitle';
import SearchBox from './searchBox/SearchBox';
import BtnAdd from '../button/BtnAdd';
import ContentInfo from './contentInfo/ContentInfo';

export default function Header(props) {
  const {
    title,
    search,
    showModalAdd,
    changeSize,
  } = props;
  return (
    <div className="container">
      <br />
      <div className="row bottomline">
        <div className="col-md-4">
          <MainTitle title={title} />
        </div>
        <div className="col-md-6 bottomline">
          <SearchBox search={search} />
        </div>
        <div className="col-md-2 bottomline">
          <BtnAdd title={title} type="Adicionar" click={showModalAdd} />
        </div>
      </div>
        <ContentInfo changeSize={changeSize} />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  showModalAdd: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
};
