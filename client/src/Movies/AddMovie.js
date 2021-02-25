import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

function AddMovie(props) {
    const [newMovie, setNewMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: ['', '', '']
    });

    const [error, setError] = useState('');

    const history = useHistory();

    function handleChange(e) {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        });
    };

    function submitNewMovie(e) {
        e.preventDefault();

        if (newMovie.title === '' || newMovie.director === '' || newMovie.metascore === '') {
            setError('All fields must be filled out')
        } else {
            axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => {
              props.setMovieList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            history.push('/');
        }
    };

    return(
        <StyledAddContainer>
            <form onSubmit={submitNewMovie}>

                <div>
                    <input 
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={newMovie.title}
                    onChange={handleChange}/>
                </div>

                <div>
                    <input 
                    name='director'
                    type='text'
                    placeholder='Director'
                    value={newMovie.director}
                    onChange={handleChange}/>
                </div>

                <div>
                    <input 
                    name='metascore'
                    type='number'
                    placeholder='Metascore'
                    value={newMovie.metascore}
                    onChange={handleChange}/>
                </div>

                <h3>These don't work yet...</h3>

                <div>
                    <input 
                    name='star1'
                    type='text'
                    placeholder='NOPE'
                    onChange={handleChange}/>
                </div>

                <div>
                    <input 
                    name='star2'
                    type='text'
                    placeholder='NOPE'
                    onChange={handleChange}/>
                </div>

                <div>
                    <input 
                    name='star3'
                    type='text'
                    placeholder='NOPE'
                    onChange={handleChange}/>
                </div>

                <button>Add New Movie</button>

                <div>{error}</div>

            </form>
        </StyledAddContainer>
    );
};

export default AddMovie;

const StyledAddContainer = styled.div`
    text-align: center;

    input {
        margin-top: 2%;
        padding: .6%;
        width: 20%;
    }

    button {
        margin-top: 2%;
        margin-bottom: 2%;
    }
`;