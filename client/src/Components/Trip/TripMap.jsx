import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import './Trip.css';
import axios from 'axios';
import { API } from '../../consts';

class TripMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchComplete: false,
      route: {},
    };
  }

  componentDidMount() {
    console.log('component did mount');
    if (!this.state.fetchComplete) {
      axios.get(`${API}/route?participant_id=${this.props.userId}`)
        .then((response) => {
          console.log(response.data.response);
          this.setState({
            fetchComplete: true,
            route: response.data.response,
          });
        })
        .catch(_ => alert('Oops! something went wrong'));
    }
  }

  render() {
    const { fetchComplete, route } = this.state;
    return(
      <Box className='not-yet'
        width='large'
        border={{ color: 'accent-1', size: 'small' }}
        margin={{top:'small', bottom:'large'}}
        pad="medium"
        round='small'>
        <Text size='large'>
          <b>MAP</b>
        </Text>
        <Box>
          <div className='maps'/>
          <img
            // TODO: Change for some generic image
            src={require('./photo.png')}
            width='700em'
            height='auto'
            alt=''
            onClick={() => {
              if (fetchComplete) {
                window.location.href = `${window.location.origin}/map.html?route=${JSON.stringify(route)}`;
              }
            }
          } />
         </Box>
      </Box>
    );
  }
}

export default TripMap;
