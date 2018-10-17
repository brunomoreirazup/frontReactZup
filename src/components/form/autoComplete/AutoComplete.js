import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import { connect } from "react-redux";
class AutoComplete extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let i = 0;
        return (
            <div>
                {this.props.reduceAutoComplete && this.props.reduceAutoComplete.autoCompleteState ? (
                    <div className="_remove_inline">
                        <Autocomplete
                            value={this.props.reduceAutoComplete.autoCompleteState.value}
                            inputProps={this.props.reduceAutoComplete.autoCompleteState.ok ? { id: 'states-autocomplete', className: "form-control _form-control _border-green" } : { id: 'states-autocomplete', className: "form-control _form-control" }}
                            items={this.props.reduceAutoComplete.autoCompleteState.menu}
                            getItemValue={(item) => item.name}
                            onSelect={(value, state) => {
                                this.props.dispatch({
                                    type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                                        value,
                                        menu: [state],
                                        ok: true,
                                        loading: false
                                    }
                                });
                                //this.setState({ value, unitedStates: [state] ,ok:true})
                                //this.city = state.id;
                            }

                            }
                            onChange={(event, value) => {
                                this.props.dispatch({
                                    type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                                        value,
                                        menu: [],
                                        ok: false,
                                        loading: true
                                    }
                                });
                                if (!value)
                                    return;
                                this.setState({ value, loading: true, unitedStates: [], ok: false })
                                this.props.search(value, (items) => {
                                    this.props.dispatch({
                                        type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                                            value: this.props.reduceAutoComplete.autoCompleteState.value,
                                            menu: items,
                                            ok: false,
                                            loading: false
                                        }
                                    });
                                    // this.setState({ unitedStates: items, loading: false })
                                })
                            }}
                            renderItem={(item, isHighlighted) => {
                                if (i >= this.props.reduceAutoComplete.autoCompleteState.menu.length)
                                    i = 0;
                                i++;
                                if (!isHighlighted) return (

                                    <div key={item.id} style={{ background: i % 2 ? "rgba(0,0,0,.05)" : "", border: "1px solid #dee2e6",padding:5 }}>
                                        {item.name}
                                    </div>
                                ); else return (
                                    <div key={item.id} style={{ background: 'lightgray', border: "1px solid #dee2e6",padding:5 }}>
                                        {item.name}
                                    </div>
                                )
                            }}
                            renderMenu={(items, value) => (
                                <div className="menu">
                                    {value === '' ? (
                                        <span className="item">Digite o nome da cidade</span>
                                    ) : this.props.reduceAutoComplete.autoCompleteState.loading ? (
                                        <span className="item">Carregando...</span>
                                    ) : items.length === 0 ? (
                                        <span className="item">Nenhum resultado para {value}</span>
                                    ) : items}
                                </div>

                            )}
                        />
                        {/* <div>
                    {this.props.reduceAutoComplete.autoCompleteState.ok ? <span>{this.props.reduceAutoComplete.autoCompleteState.menu[0].id}</span> : <span></span>}
                </div> */}
                    </div>
                ) : <div></div>}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        reduceAutoComplete: state.reduceAutoComplete
    };

}

export default connect(mapStateToProps)(AutoComplete);