"use client";
import { useState } from "react";
import axios from "axios";

const Home = () => {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	const searchMovies = async (e: any) => {
		e.preventDefault();
		if (!query) return;

		// const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

		const API_KEY = "db79d6eb"; // Temporarily hardcoded

		console.log("yup: " + API_KEY);
		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
		);

		setMovies(response.data.Search);
		console.log(response.data);
	};

	return (
		<div>
			<h1>Movie Search</h1>
			<form onSubmit={searchMovies}>
				<input
					type="text"
					placeholder="Enter movie name"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>

			<div>
				{movies.length > 0 ? (
					<ul>
						{movies.map((movie: any) => (
							<li key={movie.Title}>
								<h2>{movie.Title}</h2>
								<img src={movie.Poster} alt="" />
								<p>Release Date: {movie.Year}</p>
								<p>Overview: {movie.Type}</p>
							</li>
						))}
					</ul>
				) : (
					<p>No results found.</p>
				)}
			</div>
		</div>
	);
};

export default Home;
