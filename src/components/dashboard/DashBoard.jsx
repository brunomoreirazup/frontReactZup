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
  constructor(props) {
    super(props);
    this.init(props);
  }

  componentDidMount() {
    this.focusSearch();
  }

  init(props) {
    this.title = props.title;
    this.tHead = props.tHead;
    this.modalContent = {
      title: '',
      body: '',
      footer: '',
      alerts: '',
    };
    props.dispatch({ type: 'PAGE_SIZE', page_size: 5 });
    props.dispatch({ type: 'SET_USER_PREFERENCES', userPrefs: 5 });
    props.dispatch({ type: 'SORT', sort_order: 'asc' });
    props.dispatch({ type: 'TABLE_BODY', table_body: null });
  }

  focusSearch() {
    document.querySelector('input').focus();
  }

  toggleModal() {
    this.props.dispatch({ type: 'MAIN_MODAL_CONTENT', modalContent: this.modalContent });
    this.props.dispatch({ type: 'TOGGLE_MAIN_MODAL' });
  }


  showModalAdd() {
    this.modalContent = {
      title: `Adicionar ${this.title}`,
      body: this.props.form(this.props.add),
      footer: <button id="btAddModal" type="button" className="btn btn-success" onClick={this.props.add}>Adicionar</button>,
    };
    this.toggleModal();
  }

  showModalEdit(id) {
    this.modalContent = {
      title: `Editar ${this.title}`,
      body: this.props.form(this.props.edit, id),
      footer: <button id="btEditModal" type="button" className="btn btn-info" onClick={this.props.edit.bind(this.props.edit, id)}>Salvar</button>,
    };
    this.toggleModal();
  }

  showModalDelete(id) {
    this.modalContent = {
      title: `Deletar ${this.title}`,
      body: 'Realmente Deseja Remover ? ',
      footer: <button id="btDeleteModal" type="button" className="btn bt-delete" onClick={this.props.delete.bind(this.props.delete, id)}>Remover</button>,
    };
    this.toggleModal();
  }

  sort() {
    this.props.dispatch({ type: 'SORT' });
    this.props.list();
  }

  changePageSize(size) {
    this.props.dispatch({ type: 'PAGE_SIZE', page_size: size.value });
    this.props.dispatch({ type: 'PAGES_CURRENT', currentPage: 1 });
    this.props.dispatch({ type: 'SET_USER_PREFERENCES', userPrefs: size.value });
    this.props.list();

  }

  changeCurrentPage(page) {
    this.props.dispatch({ type: 'PAGES_CURRENT', currentPage: page });
    this.props.list();
  }

  loadThead() {
    return (
      <tr>
        <th className="headerCommon"> # </th>
        {this.props.tHead.map((item, i) => {
          if (i === 0) {
            return (
              <th className={item.className} key={i} onClick={this.sort.bind(this)}>
                {item.text}
              </th>
            );
          }
          return (
            <th key={i} className={item.className}>
              {item.text}
            </th>
          );
        })}
      </tr>
    );
  }

  loadTBody() {
    let currentPossition = 0;
    try {
      currentPossition = this.props.reduceContentInfo.page_size * (this.props.reduceFooter.pages.currentPage - 1);
    } catch (e) {

    }

    if (this.props.reduceTable === undefined || this.props.reduceTable.table_body === undefined) {
      return <tr key='#'><td colSpan={5}>Carregando...</td></tr>;
    }
    if (this.props.reduceTable.table_body.length > 0) {
      return (
        <React.Fragment>
          {this.props.reduceTable.table_body.map((data, i) => {
            return (
              <tr key={data.id}>
                <td>{i + 1 + currentPossition}</td>
                {data.data.map((dataItem, i) => {
                  const keyItem = `${data.id} | ${i}`;
                  return <td key={keyItem}>{dataItem}</td>;
                })}
                <td>
                  <BtEdit onClick={() => this.showModalEdit(data.id)} />
                </td>
                <td>
                  <BtDelete onClick={() => this.showModalDelete(data.id)} />
                </td>
              </tr>
            );
          })
          }
        </React.Fragment>
      );
    } return <tr key='#'><td colSpan={5}>Nenhum Resultado Encontrado</td></tr>;


  }

  switchLoading() {
    if (this.props.reduceLoading != null && this.props.reduceLoading.showLoading) {
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
    return (
      <div>

        <Header
          title={this.title}
          showModalAdd={this.showModalAdd.bind(this)} search={this.props.search}
          changeSize={this.changePageSize.bind(this)}
        />
        <Table>
          <TableHead>
            {this.loadThead()}
          </TableHead>
          {this.switchLoading()}
        </Table>
        <Footer changeCurrentPage={this.changeCurrentPage.bind(this)} />

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