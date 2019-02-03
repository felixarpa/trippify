import React, { Component } from 'react';
import axios from 'axios';
import Create from './Create';
import Choose from './Choose';
import { API } from '../../consts';

class Traveler extends Component {
  constructor(props) {
    super(props);

    this.tripId = props.match.params.tripId;

    this.state = {
      loading: true,
      users: [],
    };
  }

  componentDidMount() {
    if (this.state.loading) {
      axios.get(`${API}/participant/trip?trip_id=${this.tripId}`)
        .then((response) => {
          if (response.data.error) {
            alert('This trip does not exists');
            window.location.href = `${window.location.origin}/`;
          } else {
            this.setState({
              users: response.data.response,
              loading:false
            });
          }
        }).catch(error => alert('Service unavailable right now. Please, try again later.'));
    }
  }

  render() {
    const {
      loading,
      users
    } = this.state;

    if (loading) {
      return (<div />);
    }

    if (users.length === 0) {
      return (<Create tripId={this.tripId} />);
    } else {
      return (<Choose tripId={this.tripId} users={users} />)
    }

    
  }
}

export default Traveler;
