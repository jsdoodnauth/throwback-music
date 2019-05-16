import axios from 'axios';

import {
  GET_ERRORS,
  GET_ARTISTS,
  ARTIST_LOADING
} from './types';


/**
 * Artist
 */

export const getArtists = (artistData) => {
  return ((dispatch) => {
  axios.get('/api/artist', artistData)
   .then(res => {
     dispatch({
       type: GET_ARTISTS,
       payload: res.data
     })
   })
 });
}

export const createArtist = artistData => dispatch => {
 axios.post('/api/artist', artistData)
   .then(res => {
     console.info(res);
   })
   .catch(err => 
     dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     })
   );
}

export const setArtistLoading = () => {
  return {
    type: ARTIST_LOADING
  };
};