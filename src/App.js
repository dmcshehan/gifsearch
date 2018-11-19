import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();

    this.state = {
      gifs : [],
      loading : true
    };

    this.performSearch = this.performSearch.bind(this);
  } 

  componentDidMount(){
    this.performSearch();
  }

performSearch(query = 'cats'){
  console.log(`http://api.giphy.com/v1/gifs/search?api_key=cnXJK7R7270KCRxSlFd045yYY95ZJFYP&q=${query}&limit=4`);
  
  axios.get(`http://api.giphy.com/v1/gifs/search?api_key=cnXJK7R7270KCRxSlFd045yYY95ZJFYP&q=${query}&limit=4`)
  .then(response =>{
    console.log(response);
    
    this.setState({
      gifs : response.data.data,
      loading : false
    });

  })
  .catch(function (error) {
    console.log(error);
  })
}

  render() { 
  
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ? <p>Loading...</p>
          : <GifList gifs={this.state.gifs}/>
        }
          
        </div>
      </div>
    );
  }
}
