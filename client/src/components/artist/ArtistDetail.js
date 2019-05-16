// Details page
// Ideas
// - List other artists that have featured with them
// - List other songs released the same month/year

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ArtistDetail extends Component {
  state = {
    artist: []
  }

  componentDidMount = () => {
    const { slug } = this.props;
    axios.get('/api/artist/' + slug)
      .then(res => {
        this.setState({
          artist: res.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { artist } = this.state;
    if (artist) {
      return (
        <div>
          <a href='/artist/list'>Go back</a>
          <h2>{ artist.name }</h2>
          <div>Slug: { artist.slug }</div>
        </div>
      )
    } else {
      return (
        <div>No Artist found</div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  return {
    slug
  }
}

export default connect(mapStateToProps)(ArtistDetail);