import API from './API';
import axios from 'axios';

export const getAllArtists = () => {
  return axios.get(API.artistEndpoint);
}

export const getOneArtistBySlug = (_slug) => {
  return axios.get(API.artistEndpoint + '/' + _slug);
}

export const getOneArtistById = (_id) => {
  return axios.get(API.artistEndpoint + '/id/' + _id);
}

export const createArtist = () => { return; }
export const updateArtist = () => { return; }
export const deleteArtist = () => { return; }
