import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from 'classnames';
import { createTrack } from "../../store/actions/trackActions";
import { ARTIST_ENDPOINT, GENRE_ENDPOINT } from '../../services/API';
import M from 'materialize-css';

class CreateTrack extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      artist: '',
      group: '',
      featureArtist: '',
      genre: '',
      released: '',
      album: '',
      mediaImage: '',
      mediaVideo: '',
      mediaITunes: '',
      mediaGooglePlay: '',
      mediaSpotify: '',
      tags: '',
      artistList: [],
      genreList: [],
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {});

    axios.get(ARTIST_ENDPOINT)
    .then(res => {
      this.setState({ artistList: res.data });
      
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    })
    .catch(err => {
      console.log(err);
    });

    axios.get(GENRE_ENDPOINT)
    .then(res => {
      this.setState({ genreList: res.data });
      
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    })
    .catch(err => {
      console.log(err);
    });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const trackData = {
      name: this.state.name,
      artist: this.state.artist,
      gropu: this.state.group,
      featureArtist: this.state.featureArtist,
      genre: this.state.genre,
      released: this.state.released,
      album: this.state.album,
      mediaImage: this.state.mediaImage,
      mediaVideo: this.state.mediaVideo,
      mediaITunes: this.state.mediaITunes,
      mediaGooglePlay: this.state.mediaGooglePlay,
      mediaSpotify: this.state.mediaSpotify,
      tags: this.state.tags
    };

    this.props.createTrack(this.state);
  };

  render() {
    const { errors, artistList, genreList } = this.state;

    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3><b>Create</b> Track</h3>
            <form noValidate onSubmit={this.onSubmit}>
              {/* Name */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                  error={errors.name}
                  className={ classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Track Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              
              {/* Artist */}
              <div className="input-field col s12">
                <select
                  id='artist'
                  name='artist'
                  value={this.state.artist}
                  onChange={this.onChange}
                  error={errors.artist}
                  className={ classnames("", {
                    invalid: errors.artist
                  })}
                  >
                  <option value="" disabled>Select Artist</option>
                  {artistList && artistList.map(artist => {
                    return (
                      <option
                        key={artist._id}
                        value={artist._id}
                        label={artist.name}>{artist.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="name">Artist</label>
                <span className="red-text">{errors.artist}</span>
              </div>
              
              {/* Group */}
              <div className="input-field col s12">
                <select
                  id='group'
                  name='group'
                  value={this.state.group}
                  onChange={this.onChange}
                  error={errors.group}
                  className={ classnames("", {
                    invalid: errors.group
                  })}
                  >
                  <option value="" disabled>Select Group</option>
                  {artistList && artistList.map(artist => {
                    return (
                      <option
                        key={artist._id}
                        value={artist._id}
                        label={artist.name}>{artist.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="group">Group</label>
                <span className="red-text">{errors.group}</span>
              </div>
              
              {/* Featured Artist */}
              <div className="input-field col s12">
                <select multiple
                  id='featureArtist'
                  name='featureArtist'
                  onChange={this.onChange}
                  error={errors.featureArtist}
                  className={ classnames("", {
                    invalid: errors.featureArtist
                  })}
                  >
                  <option value="" disabled>Select Featured Artist</option>
                  {artistList && artistList.map(artist => {
                    return (
                      <option
                        key={artist._id}
                        value={artist._id}
                        label={artist.name}>{artist.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="name">Featured Artist</label>
                <span className="red-text">{errors.featureArtist}</span>
              </div>
              
              {/* Genre */}
              <div className="input-field col s12">
                <select
                  id='genre'
                  name='genre'
                  value={this.state.genre}
                  onChange={this.onChange}
                  error={errors.genre}
                  className={ classnames("", {
                    invalid: errors.genre
                  })}
                  >
                  <option value="" disabled>Select Genre</option>
                  {genreList && genreList.map(genre => {
                    return (
                      <option
                        key={genre._id}
                        value={genre._id}
                        label={genre.name}>{genre.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="name">Genre</label>
                <span className="red-text">{errors.genre}</span>
              </div>

              {/* Released */}
              <div className="input-field col s12">
                <input
                  id="released"
                  type="text"
                  value={this.state.released}
                  onChange={this.onChange}
                  error={errors.released}
                  className={ classnames("datepicker", {
                    invalid: errors.released
                  })}
                  />
                <label htmlFor="name">Released</label>
                <span className="red-text">{errors.released}</span>
              </div>
              
              {/* Album */}
              <div className="input-field col s12">
                <input
                  id="album"
                  onChange={this.onChange}
                  value={this.state.album}
                  type="text"
                  error={errors.album}
                  className={ classnames("", {
                    invalid: errors.album
                  })}
                />
                <label htmlFor="name">Album</label>
                <span className="red-text">{errors.album}</span>
              </div>
              
              {/* Image */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mediaImage}
                  id="mediaImage"
                  type="text"
                  error={errors.mediaImage}
                  className={ classnames("", {
                    invalid: errors.mediaImage
                  })}
                />
                <label htmlFor="name">Image</label>
                <span className="red-text">{errors.mediaImage}</span>
              </div>
              
              {/* Video */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mediaVideo}
                  id="mediaVideo"
                  type="text"
                  error={errors.mediaVideo}
                  className={ classnames("", {
                    invalid: errors.mediaVideo
                  })}
                />
                <label htmlFor="name">Video</label>
                <span className="red-text">{errors.mediaVideo}</span>
              </div>
              
              {/* Itunes Link */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mediaITunes}
                  id="mediaITunes"
                  type="text"
                  error={errors.mediaITunes}
                  className={ classnames("", {
                    invalid: errors.mediaITunes
                  })}
                />
                <label htmlFor="name">ITunes</label>
                <span className="red-text">{errors.mediaITunes}</span>
              </div>
              
              {/* Google Play Link */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mediaGooglePlay}
                  id="mediaGooglePlay"
                  type="text"
                  error={errors.mediaGooglePlay}
                  className={ classnames("", {
                    invalid: errors.mediaGooglePlay
                  })}
                />
                <label htmlFor="name">Google Play</label>
                <span className="red-text">{errors.mediaGooglePlay}</span>
              </div>
              
              {/* Spotify Link */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mediaSpotify}
                  id="mediaSpotify"
                  type="text"
                  error={errors.mediaSpotify}
                  className={ classnames("", {
                    invalid: errors.mediaSpotify
                  })}
                />
                <label htmlFor="name">Spotify</label>
                <span className="red-text">{errors.mediaSpotify}</span>
              </div>
              
              {/* Tags */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.tags}
                  id="tags"
                  type="text"
                  error={errors.tags}
                  className={ classnames("", {
                    invalid: errors.tags
                  })}
                />
                <label htmlFor="name">Tags</label>
                <span className="red-text">{errors.tags}</span>
              </div>

              {/* Submit Buttons */}
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create
                </button>
              </div>            
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateTrack.propTypes = {
  createTrack: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    createTrack: (track) => dispatch(createTrack(track))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrack);
