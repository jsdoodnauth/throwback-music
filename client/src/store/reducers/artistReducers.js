import {
  GET_ARTISTS,
  ARTIST_LOADING
} from '../actions/types';
import isEmpty from 'is-empty';

const initialState = {
  loading: false,
  artist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTISTS:
    return {
      ...state,
      artist: !isEmpty(action.payload)
    };
    case ARTIST_LOADING: 
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
