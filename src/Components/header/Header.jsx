import React from 'react';
import PropTypes from 'prop-types';
import MainTitle from './mainTitle/MainTitle';
import SearchBox from './searchBox/SearchBox';
import BtnAdd from '../buttons/BtnAdd';
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
        <MainTitle title={title} />
        <SearchBox search={search} />
        <BtnAdd title={title} type="Adicionar" click={showModalAdd} />
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
