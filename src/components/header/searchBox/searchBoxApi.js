import {connect} from 'react-redux';

class searchBoxApi{

    static search(){
        const pages = {lista:[{id:1, nome:'Chuchu'},{id:2, nome:'Truquim'}]};

        this.props.store.dispatch({type: "SEARCH",pages:this.pages});

        console.log(this.props.store);

    }

}

function mapStateToProps(state){
    return{
        store: state.pages
    };
}
export default connect(mapStateToProps)(searchBoxApi);