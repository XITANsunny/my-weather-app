import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component{
    state ={
        city: ""
    };


    onSumbit = e =>{
        e.preventDefault();
        if (this.state.city ===""){
            alert ("city can not be empty");
        }else{
            this.props.searchCity(this.state.city);
        }
        this.setState({city: ""});
    };

    onChange = e=> this.setState({[e.target.name]: e.target.value});
    

    render(){
        return (
            <div className="searchBar">
                <div className="searchBarContainer">
                    <h4 className="text-black">Search weather by city name</h4>

                    <form onSubmit={this.onSumbit} className="formSearchCity">
                        <input className="inputBox" type="text" name="city" id="inputSearchCity" value={this.state.city} onChange={this.onChange} placeholder="search by city name"/>
                        <button type="submit" className="btn btn-outline-info">search</button>

                    </form>
                </div>

            </div>
        )
    }
}

export default SearchBar;