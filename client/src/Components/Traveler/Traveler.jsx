import React, { Component } from 'react';
import { Box, Text, Form, CheckBox, FormField, Select, Button, RangeInput } from 'grommet';
import axios from 'axios';
import FormHeader from '../Headers/FormHeader';
import LogoHeader from '../Headers/LogoHeader';
import Create from './Create';
import Choose from './Choose';
import { GENRES, API } from '../../consts';
import './Traveler.css';
import '../Create/Create.css';

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
