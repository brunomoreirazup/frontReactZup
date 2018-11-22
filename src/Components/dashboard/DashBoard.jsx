import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../footer/Footer';
import Table from '../table/Table';
import Header from '../header/Header';
import MainModal from '../modal/MainModal';
import Loading from '../table/loading/Loading';
import BtEdit from '../buttons/BtEdit';
import BtDelete from '../buttons/BtDelete';
import TableBody from '../table/tableBody/TableBody';
import TableHead from '../table/tableHead/TableHead';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.showModalAdd = this.showModalAdd.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }


  init() {
    const { dispatch, title, tHead } = this.props;
    this.title = title;
    this.tHead = tHead;
    this.modalContent = {
      title: '',
      body: '',
      footer: '',
      alerts: '',
    };
    dispatch({ type: 'PAGE_SIZE', page_size: '5' });
    dispatch({ type: 'SET_USER_PREFERENCES', userPrefs: '5' });
    dispatch({ type: 'SORT', sort_order: 'asc' });
    dispatch({ type: 'TABLE_BODY', table_body: null });
  }


  toggleModal() {
    const { dispatch } = this.props;
    dispatch({ type: 'MAIN_MODAL_CONTENT', modalContent: this.modalContent });
    dispatch({ type: 'TOGGLE_MAIN_MODAL' });
  }


  showModalAdd() {
    const { form, add } = this.props;
    this.modalContent = {
      title: `Adicionar ${this.title}`,
      body: form(add),
      footer: <button id="btAddModal" type="button" className="btn btn-success" onClick={add}>Adicionar</button>,
    };
    this.toggleModal();
  }

  showModalEdit(id) {
    const { form, edit } = this.props;
    this.modalContent = {
      title: `Editar ${this.title}`,
      body: form(edit, id),
      footer: <button id="btEditModal" type="button" className="btn btn-info" onClick={() => edit(id)}>Salvar</button>,
    };
    this.toggleModal();
  }

  showModalDelete(id) {
    const { delete: deleteCb, loadMsgDelete } = this.props;
    loadMsgDelete(id, msg => {
      this.modalContent = {
        title: `Deletar ${this.title}`,
        body: msg,
        footer: <button id="btDeleteModal" type="button" className="btn bt-delete" onClick={() => deleteCb(id)}>Remover</button>,
      };
      this.toggleModal();
    });

  }

  sort() {
    const { dispatch, list } = this.props;

    dispatch({ type: 'SORT' });
    list();
  }

  changePageSize(size) {
    const { dispatch, list } = this.props;
    dispatch({ type: 'PAGE_SIZE', page_size: size.value });
    dispatch({ type: 'PAGES_CURRENT', currentPage: 1 });
    dispatch({ type: 'SET_USER_PREFERENCES', userPrefs: size.value });
    list();
  }

  changeCurrentPage(page) {
    const { dispatch, list } = this.props;
    dispatch({ type: 'PAGES_CURRENT', currentPage: page });
    list();
  }

  loadThead() {
    const { tHead } = this.props;
    return (
      <tr>
        <th className="headerCommon"> # </th>
        {tHead.map((item, i) => {
          const key = `th${i}`;
          if (i === 0) {
            return (
              <th className={item.className} key={key} onClick={this.sort.bind(this)}>
                {item.text}
              </th>
            );
          }
          return (
            <th className={item.className} key={key}>
              {item.text}
            </th>
          );
        })}
      </tr>
    );
  }

  loadTBody() {
    const { reduceContentInfo, reduceFooter, reduceTable } = this.props;
    let currentPossition = 0;
    try {
      currentPossition = reduceContentInfo.page_size * (reduceFooter.pages.currentPage - 1);
    } catch (e) {
      console.log();
    }
    if (reduceTable === undefined || !reduceTable.table_body) {
      return <tr key="#"><td colSpan={5}>Carregando...</td></tr>;
    }
    if (reduceTable.table_body.length > 0) {
      return (
        <Fragment>
          {reduceTable.table_body.map((data, i) => (
            <tr key={data.id}>
              <td>{i + 1 + currentPossition}</td>
              {data.data.map((dataItem, j) => {
                const keyItem = `${data.id} | ${j}`;
                return <td key={keyItem}>{dataItem}</td>;
              })}
              <td>
                <BtEdit onClick={() => this.showModalEdit(data.id)} />
              </td>
              <td>
                <BtDelete onClick={() => this.showModalDelete(data.id)} />
              </td>
            </tr>
          ))
          }
        </Fragment>
      );
    }
    return <tr key="#"><td colSpan={5}>Nenhum Resultado Encontrado</td></tr>;
  }

  switchLoading() {
    const { reduceLoading } = this.props;
    if (reduceLoading != null && reduceLoading.showLoading) {
      return (
        <Loading />
      );
    } return (
      <TableBody>
        {this.loadTBody()}
      </TableBody>
    );
  }

  render() {
    const { search } = this.props;
    return (
      <div>

        <Header
          title={this.title}
          showModalAdd={this.showModalAdd}
          search={search}
          changeSize={this.changePageSize}
        />
        <Table>
          <TableHead>
            {this.loadThead()}
          </TableHead>
          {this.switchLoading()}
        </Table>
        <Footer changeCurrentPage={this.changeCurrentPage} />

        <MainModal />

      </div>

    );
  }
}

function mapStateToProps({
  reduceTable, reduceFooter, reduceContentInfo, reduceLoading,
}) {
  return {
    reduceTable,
    reduceFooter,
    reduceContentInfo,
    reduceLoading,
  };
}

DashBoard.defaultProps = {
  dispatch: PropTypes.func,
  reduceLoading: false,
  reduceContentInfo: {},
  reduceTable: {},
  reduceFooter: {},
};

DashBoard.propTypes = {
  dispatch: PropTypes.func,
  reduceLoading: PropTypes.shape({
    showLoading: PropTypes.bool,
  }),
  reduceContentInfo: PropTypes.shape({
    page_size: PropTypes.string,
    totalElements: PropTypes.objectOf(PropTypes.number),
    userPrefs: PropTypes.string,
  }),
  reduceTable: PropTypes.shape({
    sort_order: PropTypes.string,
    table_body: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.array,
    })),
  }),
  reduceFooter: PropTypes.shape({
    pages: PropTypes.objectOf(PropTypes.number),
  }),
  title: PropTypes.string.isRequired,
  tHead: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    className: PropTypes.string,
  })).isRequired,
  form: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  list: PropTypes.func.isRequired,
  loadMsgDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DashBoard);
