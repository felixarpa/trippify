import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import './Trip.css';

class Music extends Component {
  render() {
    return(
      <Box className='not-yet'
            width='large'
            border={{ color: 'accent-1', size: 'small' }}
            margin={{top:'small', bottom:'large'}}
            pad="medium" 
            round='small'>
        <Text size='large'>
          <b>MUSIC</b>
        </Text>
        <Text margin={{top:'small'}}>This is the generate list to listen while travelling:</Text>
        <Box width='large' align='center' pad='medium'>
          <Box direction='row' pad='small' round='small' background='neutral-1'>
            <img src={require('./spotify.png')} width='60em' height='60em'></img>
            <Text alignSelf='center' margin='small'><b> LISTEN PLAYLIST</b></Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Music;