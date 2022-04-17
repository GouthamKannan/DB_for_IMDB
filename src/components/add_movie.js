// import React from 'react';
import { Formik } from "formik";
import configs from "../config";

function AddMovie() {

    return (
        <Formik
            initialValues={{
                movie : '',
                genre : '',
                movie_duration : '',
                plot: '',
            }}
            onSubmit = {async (values)=>{
                await fetch(configs.api_url + "/movie_data/", {
                    method: "POST",
                    headers: {"Content-Type":"Application/json"},
                    body: JSON.stringify({
                        movie : values.movie,
                        genre : values.genre,
                        movie_duration : values.movie_duration,
                        plot : values.plot,
                        rating: []
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
                                    <h3>Add Movie</h3>
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
                                        <textarea name="plot" className="form-control" placeholder="Enter plot"
                                        value={values.plot} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block w-100 my-3">Add Movie</button>
                                </form>
                            </div>
                        </div>
                    </>
                )
             }}
        </Formik>

    )
}

export default AddMovie