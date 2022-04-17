// import React from 'react';
import { Formik } from "formik";
import { useEffect, useState } from "react";
import configs from "../config";

var id = 0;

function EditMovie() {

    const [movie, setMovie] = useState({})

    useEffect(()=>{
        const getMovieDetails = async() => {
            const windowUrl = window.location
            id = windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")

            // Get the user details of current user
            const response = await fetch(configs.api_url + "/movie_data/" + id, {
                method: "GET",
                headers: {"Content-Type":"Application/json"}
            })

            var movie_details = await response.json();
            setMovie(movie_details);
        }
        getMovieDetails();
    },[])


    return (
        <Formik
            enableReinitialize
            initialValues={{
                movie : movie.movie,
                genre : movie.genre,
                movie_duration : movie.movie_duration,
                plot: movie.plot,
            }}

            onSubmit = {async (values)=>{
                await fetch(configs.api_url + "/movie_data/" + id, {
                    method: "PUT",
                    headers: {"Content-Type":"Application/json"},
                    body: JSON.stringify({
                        movie : values.movie,
                        genre : values.genre,
                        movie_duration : values.movie_duration,
                        plot : values.plot,
                        rating: movie.rating
                    })
                })
                window.location = "/home_page"
            }}
        >
            {({values, handleChange, handleSubmit}) =>{
                return (
                    <>
                        <div className="auth-wrapper">
                            <div className="auth-inner">
                                <form onSubmit={handleSubmit}>
                                    <h3>Edit Movie</h3>
                                    <div className="form-group my-1">
                                        <label className="my-2">Movie Name</label>
                                        <input type="text" name="movie" className="form-control" placeholder="Enter movie name"
                                        value={values.movie} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group my-1">
                                        <label className="my-2">Genre</label>
                                        <input type="text" name="genre" className="form-control" placeholder="Enter genre"
                                        value={values.genre} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group my-1">
                                        <label className="my-2">Movie Duration (in mins)</label>
                                        <input type="number" name="movie_duration" className="form-control" placeholder="Enter movie duration"
                                        value={values.movie_duration} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group my-1">
                                        <label className="my-2">Plot</label>
                                        <input type="text" name="plot" className="form-control" placeholder="Enter plot"
                                        value={values.plot} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block w-100 my-3">Update Movie</button>
                                </form>
                            </div>
                        </div>
                    </>
                )
             }}
        </Formik>

    )
}

export default EditMovie