import axios from 'axios';

import {
  GET_ERRORS,
  GET_TRACK,
  TRACK_LOADING
} from './types';


/**
 * Artist
 */

export const getTracks = (trackData) => {
  return ((dispatch) => {
  axios.get('/api/track', trackData)
   .then(res => {
     dispatch({
       type: GET_TRACK,
       payload: res.data
     })
   })
 });
}

export const createTrack = trackData => dispatch => {
 axios.post('/api/track', trackData)
   .then(res => {
     console.info(res);
   })
   .catch(err => {
    console.log(err.response.data)
     dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     })
    }
   );
}

export const setTrackLoading = () => {
  return {
    type: TRACK_LOADING
  };
};