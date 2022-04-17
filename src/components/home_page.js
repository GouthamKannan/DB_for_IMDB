import configs from "../config";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

function HomePage() {

    const [movie, setMovie] = useState([]);
    const onRate = async (id) => {
        let movie_details = {}
        let rate = prompt("Give rating for the selected movie between 1 and 10");
        let movie_detail = movie.map((cur_data)=>{
            if(cur_data.id === id){
                movie_details = cur_data;
                cur_data.rating.push(rate);
                return cur_data;
            }
            else
                return cur_data;
        })
        setMovie(movie_detail);
        await fetch(configs.api_url + "/movie_data/" + id, {
            method: "PUT",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(
                movie_details
            )
        })
    }

    const onEdit = (id) => {
        window.location = "/edit_movie/" + id
    }

    // When delete button is clicked
    const onDelete = async(id) => {
        var confirm = window.confirm("Do you want to delete")
        if (confirm) {
            await fetch(configs.api_url + "/movie_data/" + id, {
                method: "DELETE",
                headers: {"Content-Type":"Application/json"}
            })
            window.location = "/home_page"
        }
    }

    const getMovieDetails = async() => {
        const response = await fetch(configs.api_url + "/movie_data/", {
            method: "GET",
            headers: {"Content-Type":"Application/json"}
        })
        var movie_data = await response.json();
        if(movie_data){
            setMovie(movie_data);
        }
        else
            setMovie([])
    }

    useEffect(() => {
        getMovieDetails()
    },[])

    const loadMovieData = () =>{
        var rows = []
        if(movie){
            movie.forEach(cur_data => {
                var id = cur_data.id;
                rows.push(
                    <tr key={id}>
                        <td>{cur_data.movie}</td>
                        <td>{cur_data.genre}</td>
                        <td>{cur_data.movie_duration}</td>
                        <td>{cur_data.plot}</td>
                        <td>{
                            cur_data.rating.reduce(function (avg, value, _, { length }) {
                                return Math.round((avg + value / length)*10)/10;
                            }, 0)}
                        </td>
                        <td>
                            <button onClick={() => onRate(id)} className="btn btn-info btn-icon-split my-1">
                                Rate Movie
                            </button><br/>
                            <button onClick={() => onEdit(id)} className="btn btn-primary btn-icon-split my-1">
                                Edit
                            </button><br/>
                            <button onClick={() => onDelete(id)} className="btn btn-danger btn-icon-split my-1">
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })
        }
        return rows;
    }

    return (
        <>
            {/* List all movies */}
            <div className="container-fluid">
                <h1 className="h3 my-5 text-gray-800">Movie Details</h1>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div>
                            <Link className="btn btn-info" to="/add_movie">Add Movie</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Movie Name</th>
                                        <th>Genre</th>
                                        <th>Movie Duration</th>
                                        <th>Plot</th>
                                        <th>Rating</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadMovieData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage