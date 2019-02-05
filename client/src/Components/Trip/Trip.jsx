import React, { Component } from 'react';
import { Box,  Heading, Text } from 'grommet';
import './Trip.css';
import LogoHeader from '../Headers/LogoHeader';
import Emoji from '../Emojis/Emoji';
import ElementList from '../ElementList/ElementList';
import WaitMessage from '../TripMessages/WaitMessage';


class Trip extends Component {


  render() {

    const waitMessage = <WaitMessage/>

    return (

      <Box direction='column' >
      
        <Box margin='0' className='header'>
          <LogoHeader/>
        </Box>
        <Box align='center' justify='center' background='light-1'>
            <Box align='center' className='header-description' width='xxlarge' pad={{top:'medium', bottom:'medium'}}>
                <Heading textAlign='center' truncate='true'>TITLE</Heading>
                <Heading textAlign='center' truncate='true' level='3'>Description of the event</Heading>            
            </Box>
            <Box width='large' pad={{top:'small', bottom:'medium'}}>
                <Text size='large' >Hello, <b>name</b> <Emoji symbol="👋" label="hello"/></Text>
            </Box>

            <WaitMessage/>

            <Box className='not-yet'
                  width='large'
                  border={{ color: 'accent-1', size: 'small' }}
                  margin={{top:'small', bottom:'large'}}
                  pad="medium" 
                  round='small'>
              <Text size='medium'>
                You are part of <b>XXXXX</b> car<br/> <br/>
                In companion with the following team mates:
              </Text>
              <Box>
                <ElementList text='Albert'></ElementList>
                <ElementList text='Felix'></ElementList>
                <ElementList text='Bernat'></ElementList>
                <ElementList text='Elena'></ElementList>

              </Box>
            </Box>

              <Box className='not-yet'
                  width='large'
                  border={{ color: 'accent-1', size: 'small' }}
                  margin={{top:'small', bottom:'large'}}
                  pad="medium" 
                  round='small'>
              <Text size='large'>
                <b>MAP</b>
              </Text>
            </Box>

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

            <Box className='not-yet'
                  width='large'
                  border={{ color: 'accent-1', size: 'small' }}
                  margin={{top:'small', bottom:'large'}}
                  pad="medium" 
                  round='small'>
              <Text size='large'>
                <b>PRICE</b>
              </Text>
              <Text  margin={{top:'small'}}>
                The total price of this trip would be XX in total, so you shoud pay:
              </Text>
                <Box width='large' align='center' pad='medium'>
                  <Box pad='small' round='small' background='dark-6'>
                    <Text size='xlarge'>
                      <b>XX €</b>
                    </Text>
                  </Box>
                </Box>
            </Box>
          </Box>
      </Box>
      
    );
  }
}

export default Trip;
