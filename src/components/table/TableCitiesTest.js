import React, { Component } from 'react';
import {connect} from 'react-redux';

class FooterTest extends Component{

    constructor(props)
    {
        super(props);
        this.data = [];
        this.data[0] = [{
            id : 1,
            data:["Uberlandia"],
        },{
            id : 2,
            data:["Uberaba"],
        },{
            id : 3,
            data:["São paulo"],
        },{
            id : 4,
            data:["Ribeirão Preto"],
        },{
            id : 5,
            data:["Rio de Janeiro"],
        },{
            id : 6,
            data:["Curitiba"],
        }
        ];
        this.data[1] = [{
            id : 1,
            data:["Uberlandia"],
        },{
            id : 2,
            data:["Uberaba"],
        },{
            id : 3,
            data:["São paulo"],
        },{
            id : 4,
            data:["Ribeirão Preto"],
        },{
            id : 5,
            data:["Rio de Janeiro"],
        }
        ];

        this.i = 0;
    }
    changePage()
    {

        this.props.dispatch({ type: 'TABLE_BODY' ,table_body:this.data[this.i]});
        this.i = (this.i + 1 ) % 2;
    }




    render()
    {
        return(
            <div>
                <input type="button" onClick={this.changePage.bind(this)} value="TEST_Table"/>
            </div>
        )
    }

}



export default connect()(FooterTest);