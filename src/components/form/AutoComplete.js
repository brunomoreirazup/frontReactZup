import React , {Component} from "react";

class AutoComplete extends Component {
    render()
    {
        return(
            <div>
            <Autocomplete key={"test"}
                    value={this.state.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    items={this.state.unitedStates}
                    getItemValue={(item) => item.name}
                    onSelect={(value, state) => {
                        this.setState({ value, unitedStates: [state] ,ok:true})
                        this.city = state.id;
                        }
                        
                    }
                    onChange={(event, value) => {
                        this.setState({ value, loading: true, unitedStates: [],ok:false })
                        // clearTimeout(this.requestTimer)
                        this.requestTimer = this.fakeRequest(value, (items) => {
                            this.setState({ unitedStates: items, loading: false })
                        })
                    }}
                    renderItem={(item, isHighlighted) => (
                        item.header ?
                            <div
                                className="item item-header"
                                key={item.header}
                            >{item.header}</div>
                            : <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.name}
                            </div>
                    )}
                    renderMenu={(items, value) => (
                        <div className="menu">
                            {value === '' ? (
                                <div className="item">Digite o nome da cidade</div>
                            ) : this.state.loading ? (
                                <div className="item">Loading...</div>
                            ) : items.length === 0 ? (
                                <div className="item">No matches for {value}</div>
                            ) : <div>{items.map(item => <span>{item}</span>)}</div>}
                        </div>
                    )}
                    isItemSelectable={(item) => !item.header}
                />
                {this.state.ok ? <span>Ok</span> : <span></span>}
                
            <div>{this.city}</div>
            </div>
        )
    }
}