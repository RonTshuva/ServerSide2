import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Sale from "../components/Sale";

class SearchPage extends React.Component{

    state = {
        response : "",
        searchText : "",
        sales : [],
        searchResult : []
    }

    componentDidMount(){
        const cookies = new Cookies();
        cookies.set("logged_in",'AAA'); // just for testing
        this.getSales();
    }


    onSearchBarChange = (e) =>{
        this.setState({searchText : e.target.value})
        this.search(e.target.value)
    }


    getSales = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-sales",{
            params:{
                token : cookies.get("logged_in")
            }
        }).then((response) =>{
            if(response.data.success) {
                this.setState({
                    response : response.data.dataSet.length > 0 ? "successfully loaded sales" : "no sales found!",
                    sales : response.data.dataSet
                })
            }
        })
    }


    search = (text) =>{
        const result = this.state.sales.filter(sale =>{
            return sale.object.description.includes(text)
        }).map(sale => {
            return (
                <div style={{color : sale.belongsToUser ? "green" : "red"}}>
                    --------------- <Sale object={sale.object}/>
                </div>
            )
        })
        this.setState({ searchResult : result})
    }


    render() {

        return(
            <div>
                <input placeholder={"Search: (ex: iphone,tel....)"}
                       onChange={this.onSearchBarChange}
                       value={this.state.searchText} />
                {this.state.searchResult.length > 0 && this.state.searchResult}
                <br/>


            </div>
        )
    }



}
export default SearchPage;