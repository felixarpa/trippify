import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import './Trip.css';

class TripMap extends Component {
  render() {
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
              // TODO: Run query to api and get origin and destination. Then put it in the Query.
              window.location.href = `${window.location.origin}/map.html`;
            }
          } />
         </Box>
      </Box>
    );
  }
}

export default TripMap;
