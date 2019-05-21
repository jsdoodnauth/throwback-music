import React, { Component } from 'react';
import axios from 'axios';
import { ARTIST_ENDPOINT } from '../../services/API';

class ArtistList extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    axios.get(ARTIST_ENDPOINT)
    .then(res => {
      this.setState({ artists: res.data })
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    const { artists } = this.state;
    return(
      <div style={{ height: "30vh" }} className="container">
        <div className="row">
          <div className="col s12">
            <h2>Artist List</h2>
            <div>
              <ul>
                { artists && artists.map(artist => {
                  return (
                    <li><a href={ "/artist/detail/" + artist.slug } >{artist.name}</a></li>
                  )
                }) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ArtistList;
