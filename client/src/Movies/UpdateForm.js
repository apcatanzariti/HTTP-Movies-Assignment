import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from './MovieCard';

function UpdateForm () {
    const [movie, setMovie] = useState(null);

    const params = useParams();
    const history = useHistory();

    function fetchMovie(id) {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setMovie(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    console.log(movie);

    if (!movie) {
        return <div>Loading movie information...</div>;
      }

    return (
        <div className='save-wrapper'>
            <form>
                <input 
                name='title'
                type='text'/>

                <input 
                name='director'
                type='text'/>

                <input 
                name='metascore'
                type='number'/>
            </form>
        </div>
    );
};

export default UpdateForm;