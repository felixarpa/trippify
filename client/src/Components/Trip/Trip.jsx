import React, { Component } from 'react';
import { Box,  Heading, Text } from 'grommet';
import './Trip.css';
import LogoHeader from '../Headers/LogoHeader';
import Emoji from '../Emojis/Emoji';
import ElementList from '../ElementList/ElementList';
import WaitMessage from '../TripMessages/WaitMessage';
import axios from 'axios';

class Trip extends Component {

  constructor(props) {
    super(props);

    this.tripId = props.match.params.tripId;

    this.state = {
      loading: true,
      created: true,
      maps: undefined,
    };
  }

  componentDidMount() {


    if (this.state.loading & this.state.created) {
      console.log('hola')
      var parameters = '';
      parameters += 'https://image.maps.api.here.com/mia/1.6/route?'
      parameters += `app_id=m7AG9dmM8HNO5ZnJWRVO`
      parameters += `&app_code=2mCmRml-o_e3-uZuD_Z62A`
      parameters += `&r0=52.5338,13.2966,52.538361,13.325329
                    &r1=52.540867,13.262444,52.536691,13.264561,
                    52.529172,13.268337,52.528337,13.273144,
                    52.52583,13.27898,52.518728,13.279667`
      parameters += `&m0=52.5338,13.2966,52.538361,13.325329
                     &m1=52.540867,13.262444,52.518728,13.279667`
      parameters += `&lc0=440000ff`
      parameters += `&sc0=440000ff`
      parameters += `&lw0=6
                    &lc1=44ff00ff
                    &sc1=44ff00ff
                    &lw1=3`

      this.setState({
        parameters: parameters,
        loading:false
      });
      /*
      axios.get(`https://image.maps.api.here.com/mia/1.6/route?${parameters}`)
        .then((response) => { 
          if (response.data.error) {
            alert('The trip cannot be showed');
            window.location.href = `${window.location.origin}/`;
          } else {
            console.log(response)
            this.setState({
              maps: response.data,
              loading:false
            });
          }
        }).catch(error => alert('Service unavailable right now. Please, try again later.'));*/
    }
  }

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
              <Box><div className='maps'/></Box>
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
