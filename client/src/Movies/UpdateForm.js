import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components';

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

    function handleChange(e) {
        e.preventDefault();

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    function submitChange(e) {
        e.preventDefault();
        console.log(movie);
    };

    if (!movie) {
        return <div>Loading movie information...</div>;
      }

    return (
        <StyledUpdateContainer>
            <h1>Edit Movie Below:</h1>

            <form onSubmit={submitChange}>
                <div>
                <input 
                name='title'
                type='text'
                value={movie.title}
                onChange={handleChange}/>
                </div>

                <div>
                <input 
                name='director'
                type='text'
                value={movie.director}
                onChange={handleChange}/>
                </div>

                <div>
                <input 
                name='metascore'
                type='number'
                value={movie.metascore}
                onChange={handleChange}/>
                </div>

                <h3>🙅‍♂️cannot make changes to actors yet...🙅‍♂️</h3>

                {
                    movie.stars.map((star) => {
                        return (
                            <div>
                                <input 
                                name='stars'
                                type='text'
                                value={star}
                                onChange={handleChange}/>
                            </div>
                        );
                    })
                }

                <button>Finish</button>
            </form>
        </StyledUpdateContainer>
    );
};

export default UpdateForm;

const StyledUpdateContainer = styled.div`
    text-align: center;

    input {
        margin: 1% 0% 1% 0%;
        padding: .6%;
        width: 30%;
    }
`;