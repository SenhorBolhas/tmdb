import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import { shape , string, number } from 'prop-types';
import styled from "styled-components";
import Modal from './Modal';
import { URL_IMAGEM, URL_BACKGROUND } from "../const";
import TMDBlogo from "../images/movie_logo.svg";
import { LANGUAGE } from "../language";
import { includesFAVORITE, addFAVORITE, removeFAVORITE, FAVORITE_MOVIES } from "../favoriteMovies";

const Image = styled.img`
	width: 100%;
	border-radius: 0 0 3px 3px;
	float: left;
`;

class DetailMovieCard extends Component {

		componentDidUpdate() {
		document.body.style.backgroundImage = `url(${URL_BACKGROUND}${
			this.props.movie.backdrop_path
		})`;
	}

	render() {

		
/* eslint-disable camelcase */
		
		const {
			poster_path,
			original_title,
			vote_average,
			vote_count,
			tagline,
			overview,
			release_date,
			budget,
			revenue,
			runtime,
			id
		} = this.props.movie;
		
		console.log(this.props.movie);
		let modalID ;
		if(typeof this.props.movie.id !== "undefined"){
			modalID = <Modal modal={this.props.movie.id} />	
} 
			else {
			modalID = <div>Loading !!! </div>
	
		}
		return (
			<div className= "container my-container">
			<div className="col-xs-12 wrapper">
				<div className="poster-container col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 nopadding">
				<Image alt={`Title is ${original_title}`} src= {poster_path === 'undefined' ?  TMDBlogo : ( URL_IMAGEM + poster_path ) } />	
				</div>
				<div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
					<h2>{original_title} </h2>
						<ul className="col item-list">
							<li className="row-m-4">
							<Glyphicon className="green item-Glyph" glyph="star" />
							{LANGUAGE === "pt-BR" ? "Nota média: " : "Rating: "} {vote_average}
							</li>
							<li className="row-m-4">
							<Glyphicon className="green item-Glyph" glyph="heart" />
							{LANGUAGE === "pt-BR" ? "Quantidade de Notas: " : "Rating Count: "} {vote_count}
							</li>							
							<li className="row-m-4">
							{modalID}
							</li>
							<li className="row-m-4">

								{ FAVORITE_MOVIES !== null && includesFAVORITE(this.props.movie.id)
								? <Glyphicon className="green item-Glyph" glyph="star" onClick={() => {removeFAVORITE(id);}}/>
								:  <Glyphicon className="green item-Glyph" glyph="star-empty" onClick={() =>{addFAVORITE(id);}} />
							}
							{LANGUAGE === "pt-BR" ? "Favoritar " : "Fav "}
							</li>
						 </ul>
					<span className="movie-tagline"> {tagline} </span>
					<p className="movie-overview">{overview} </p>
					<div className="movie-subdetails"> 
						<div className="row nopadding">
							<div className="col-xs-6">
							{LANGUAGE === "pt-BR" ? "Data de Lançamento:" : "Release Date:"}
							<span className="movie-metadata"> {release_date} </span>
							 </div>
							<div className="col-xs-6">
								{LANGUAGE === "pt-BR" ? "Duração do Filme:" : "Running Time:"} 
							<span className="movie-metadata"> {runtime} mins</span>
							 </div>
						</div>
						<div className="row movie-subdetails2">
							<div className="col-xs-6">
							{LANGUAGE === "pt-BR" ? "Orçamento do Filme:" : "Budget:"}
							<span className="movie-metadata"> $ {budget} </span>
							 </div>
							 <div className="col-xs-6">
								{LANGUAGE === "pt-BR" ? "Receita:" : "Revenue:"}
							<span className="movie-metadata"> $ {revenue} </span>
							 </div>
						</div>
						</div>
					</div>
			</div>
			</div>
		)
	}
}

DetailMovieCard.propTypes = {
	movie: shape({
    		poster_path: string,
			original_title: string,
			backdrop_path: string,
			vote_average: number,
			vote_count: number,
			tagline: string,
			overview: string,
			release_date: string,
			budget: number,
			revenue: number,
			runtime: number
	}).isRequired
}


export default DetailMovieCard;