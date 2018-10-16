import React , {Component} from "react";
import Autocomplete from "react-autocomplete";
import {connect} from "react-redux";
class AutoComplete extends Component {

    constructor(props)
    {
        super(props);
        this.init();
    }
    init()
    {
        this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
            value:"",
            menu:[],
            ok:false,
            loading:false
        }});

    }

    render()
    {
        return(
            <div>
             <Autocomplete
                    value={this.props.reduceAutoComplete.autoCompleteState.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    items={this.props.reduceAutoComplete.autoCompleteState.menu}
                    getItemValue={(item) => item.name}
                    onSelect={(value, state) => {
                        this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
                            value,
                            menu:[state],
                            ok:true,
                            loading:false
                        }});
                        //this.setState({ value, unitedStates: [state] ,ok:true})
                        //this.city = state.id;
                        }
                        
                    }
                    onChange={(event, value) => {
                        this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
                            value,
                            menu:[],
                            ok:false,
                            loading:true
                        }});
                        this.setState({ value, loading: true, unitedStates: [],ok:false })
                        this.props.search(value, (items) => {
                            this.props.dispatch({ type: 'AUTO_COMPLETE_STATE', autoCompleteState:{
                                value:this.props.reduceAutoComplete.value,
                                menu:items,
                                ok:false,
                                loading:false
                            }});
                            // this.setState({ unitedStates: items, loading: false })
                        })
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.name}
                        </div>
                    )}
                    renderMenu={(items, value) => (
                        <div className="menu">
                            {value === '' ? (
                                <div className="item">Digite o nome da cidade</div>
                            ) : this.props.reduceAutoComplete.autoCompleteState.loading ? (
                                <div className="item">Carregando...</div>
                            ) : items.length === 0 ? (
                                <div className="item">Nenhum resultado para {value}</div>
                            ) : items}
                        </div>
                    )}
                />
                {this.props.reduceAutoComplete.autoCompleteState.ok ? <span>this.props.reduceAutoComplete.menu[0].id</span> : <span></span>}
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        reduceAutoComplete : state.reduceAutoComplete
    };

}

export default connect(mapStateToProps)(AutoComplete);
