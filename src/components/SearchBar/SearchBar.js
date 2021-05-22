import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component{
    state ={
        city: ""
    };


    onSumbit = e =>{
        e.prevenDefault();
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
                    <h5 className="text-black">search weather by city name</h5>

                    <form onSubmit={this.onSumbit} className="formSearchCity">
                        <input type="text" name="city" id="inputSearchCity" onChange={this.onChange} placeholder="search by city name"/>
                        <button type="submit" className="btn btn-outline-info">search</button>

                    </form>
                </div>

            </div>
        )
    }
}

export default SearchBar;