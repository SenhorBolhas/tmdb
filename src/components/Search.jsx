import React, { Component } from "react";
import _debounce from 'lodash/debounce'
import axios from 'axios';
import styled from "styled-components";
import Autosuggest from 'react-autosuggest'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap/lib'
import TMDBlogo from "../images/movie_logo.svg";
import TMDBlogoBrand from "../images/tmdb.svg";
import BRflag from "../images/br.svg";
import USAflag from "../images/usa.svg";
import { URL_SEARCH, API_KEY_ALT , IMAGEM_PEQUENA} from '../const';
import {LANGUAGE, setLANGUAGE } from '../language';

  const Brand = styled.span`
    fontWeight: bold;
    textTransform: caplitalize;
    paddingLeft: 10;
    fontSize: 1.2em;`;

  const Image = styled.img`
    height: 100%;
    width: auto;
    paddingLeft: 10px;
    marginTop: -8px;
    display: inline-block;`
  ;

  function changePTBR() {
    setLANGUAGE("pt-BR");
    localStorage.setItem("language", LANGUAGE);
    window.location.reload();
  }

  function changeENUS() {
    setLANGUAGE("en-US");
    localStorage.setItem("language", LANGUAGE);
    window.location.reload();
  }

  // When suggestion is clicked, Autosuggest needs to populate the input based on the clicked suggestion. 

const getSuggestionValue = suggestion => {const newsuggest = suggestion.title

return newsuggest };

 const renderSuggestion = (suggestion) => (
    <div>
    <Link to= {`/movie/${suggestion.id}`}> 
      <img className="searchResult-image" alt = {`Poster Path ${suggestion.title}`} src= {suggestion.poster_path === null ?  TMDBlogo : ( IMAGEM_PEQUENA + suggestion.poster_path ) } />
        <div className="searchResult-text">
          <div className="searchResult-name">
            {suggestion.title}
          </div>
          <div className="searchResult-date">
          {suggestion.release_date.trim(0, 4)}
        </div>
        </div>
        </Link>
    </div>
  );

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: []
    };
  }

    onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
  const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

          const url = URL_SEARCH + inputValue + API_KEY_ALT;

    /* eslint-disable no-console */

  return inputLength === 0 ? [] : axios.get(url).then(response => {
            this.setState({suggestions: response.data.results})
          }).catch(error => { console.log(`Error Message ${error}`)});
}

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }


  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: LANGUAGE === "en-US" ? 'Type a Movie Title' : 'Digite um Nome do Filme',
      value,
      onChange: this.onChange
    };

    const onSuggestionsFetchRequested = _debounce((term) => {this.onSuggestionsFetchRequested(term) }, 1000);
/* eslint-disable */

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>
              <Image alt = "PT-BR" src={BRflag} onClick={changePTBR}/>
            </a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a>
              <Image alt = "EN-US" src={USAflag} onClick={changeENUS}/>
            </a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a href="#">
            <Brand />
              <Image alt = " " src={TMDBlogoBrand}/>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
        </Navbar.Form>
      </Navbar>
    );
  }
}

export default Search;