import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

class CreateGenre extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div style={{ height: "30vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3><b>Create</b> Genre</h3>
          </div>
        </div>
      </div>
    );
  }
}

CreateGenre.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(CreateGenre);