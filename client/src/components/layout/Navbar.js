import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component { 
  render() {
    return (
      <div className='navbar-fixed'>
        <nav className='z-depth-0'>
          <div className='nav-wrapper white'>
            <ul className='left'>
              <li><Link to='/artist/list' className='black-text'>Artists</Link></li>
            </ul>
            <Link to='/' style={{ fontFamily: 'monospace' }} className='col s5 brand-logo center black-text'>
              <i className='material-icons'>library_music</i>
              Throwback Music
            </Link>
              <ul className='right'>
                <li><Link to='/admin/create/genre' className='black-text'>Genre</Link></li>
                <li><Link to='/admin/create/artist' className='black-text'>Artist</Link></li>
                <li><Link to='/admin/create/Track' className='black-text'>Track</Link></li>
              </ul>
          </div>    
        </nav>
      </div>
    );
  }
}

export default Navbar;
