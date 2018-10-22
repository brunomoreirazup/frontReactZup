import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import { connect } from "react-redux";
class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.index = 0;
        this.defaultInputProps = { id: 'states-autocomplete', className: "form-control " };
        this.okInputProps = { id: 'states-autocomplete', className: "form-control _border-green" };
    }


    renderItem(item, isHighlighted) {
        if (this.index >= this.props.reduceAutoComplete.autoCompleteState.menu.length)
            this.index = 0;
        this.index++;
        if (!isHighlighted) return (

            <div key={item.id} style={{ background: this.index % 2 ? "rgba(0,0,0,.05)" : "", border: "1px solid #dee2e6", padding: 5 }}>
                {item.name}
            </div>
        ); else return (
            <div key={item.id} style={{ background: 'lightgray', border: "1px solid #dee2e6", padding: 5 }}>
                {item.name}
            </div>
        )
    }
    onSelect(value, state) {
        this.props.dispatch({
            type: 'AUTO_COMPLETE_STATE', autoCompleteState: {
                value,
                menu: [state],
                ok: true,
                loading: false
            }
        });
    }
    onChange(event, value) {
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
        })
    }
    renderMenu(items, value) {
        return (
            <div className="menu">
                {value === '' ? (
                    <span className="item">Digite o nome da cidade</span>
                ) : this.props.reduceAutoComplete.autoCompleteState.loading ? (
                    <span className="item">Carregando...</span>
                ) : items.length === 0 ? (
                    <span className="item">Nenhum resultado para {value}</span>
                ) : items}
            </div>
        )

    }

    render() {
        return (
            <div>
                {this.props.reduceAutoComplete && this.props.reduceAutoComplete.autoCompleteState ? (
                    <div className="_remove_inline">
                        <Autocomplete
                            value={this.props.reduceAutoComplete.autoCompleteState.value}
                            inputProps={this.props.reduceAutoComplete.autoCompleteState.ok ? this.okInputProps : this.defaultInputProps}
                            items={this.props.reduceAutoComplete.autoCompleteState.menu}
                            getItemValue={(item) => item.name}
                            onSelect={(value, state) => {
                                this.onSelect(value, state);
                            }

                            }
                            onChange={(event, value) => {
                                this.onChange(event, value);
                            }}
                            renderItem={(item, isHighlighted) => {
                                return this.renderItem(item, isHighlighted);
                            }}
                            renderMenu={(items, value) => {
                                return this.renderMenu(items, value);
                            }}
                        />
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