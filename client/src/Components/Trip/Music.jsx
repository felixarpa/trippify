import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { API } from '../../consts';
import axios from 'axios';
import './Trip.css';

class Music extends Component {

  constructor(props) {
    super(props);
    this.state = {
        url: undefined
    }
  }


  componentDidMount() {
    if (this.state.url === undefined) {
      axios.get(`${API}/participant/playlist?participant_id=${this.props.userId}`)
        .then((res) => {
          if (res.data.error) {
            alert('This user does not exists');
            window.location.href = `${window.location.origin}/`;
          } else {

            this.setState({
                url: res.data.response
            });
          }
        }).catch(error => alert('Service unavailable right now. Please, try again later.'));
    }
  }

  render() {

    const {url} = this.state;
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
          <Box direction='row' pad='small' round='small' background='neutral-1' onClick={() =>  window.location.href=url}>
              <img src={require('./spotify.png')} width='60em' height='60em'></img>
              <Text alignSelf='center' margin='small'><b> LISTEN PLAYLIST</b></Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Music;
