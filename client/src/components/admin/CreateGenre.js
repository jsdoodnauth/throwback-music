import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createGenre } from "../../store/actions/authActions";
import classnames from 'classnames';

class CreateGenre extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  
  onSubmit = e => {
    e.preventDefault();
    const genreData = {
      name: this.state.name,
    };

    this.props.createGenre(genreData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div style={{ height: "30vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3><b>Create</b> Genre</h3>
            <form noValidate onSubmit={this.onSubmit}>
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
                <label htmlFor="name">Genre Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
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

CreateGenre.propTypes = {
  createGenre: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createGenre })(CreateGenre);
