/* global document */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../footer/Footer';
import Table from '../table/Table';
import Header from '../header/Header';
import MainModal from '../modal/MainModal';
import Loading from '../modal/Loading';
import BtEdit from '../button/btEdit/BtEdit';
import BtDelete from '../button/btDelete/BtDelete';
import TableBody from '../table/TableBody';
import TableHead from '../table/TableHead';

class DashBoard extends Component {
  static focusSearch() {
    document.querySelector('input').focus();
  }

  constructor(props) {
    super(props);
    this.init();
    this.showModalAdd = this.showModalAdd.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  componentDidMount() {
    DashBoard.focusSearch();
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
    dispatch({ type: 'PAGE_SIZE', page_size: 5 });
    dispatch({ type: 'SET_USER_PREFERENCES', userPrefs: 5 });
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
    const { deleteCb } = this.props;
    this.modalContent = {
      title: `Deletar ${this.title}`,
      body: 'Realmente Deseja Remover ? ',
      footer: <button id="btDeleteModal" type="button" className="btn bt-delete" onClick={() => deleteCb(id)}>Remover</button>,
    };
    this.toggleModal();
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
    if (reduceTable === undefined || reduceTable.table_body === undefined) {
      return <tr key="#"><td colSpan={5}>Carregando...</td></tr>;
    }
    if (reduceTable.table_body.length > 0) {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    } return <tr key="#"><td colSpan={5}>Nenhum Resultado Encontrado</td></tr>;
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

function mapStateToProps(state) {
  return {
    reduceTable: state.reduceTable,
    reduceFooter: state.reduceFooter,
    reduceContentInfo: state.reduceContentInfo,
    reduceLoading: state.reduceLoading,
  };
}

export default connect(mapStateToProps)(DashBoard);
