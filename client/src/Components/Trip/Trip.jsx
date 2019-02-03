import React, { Component } from 'react';
import { Box,  Heading, Text } from 'grommet';
import './Trip.css';
import TripMap from './TripMap';
import Music from './Music';
// import Price from './Price';
import LogoHeader from '../Headers/LogoHeader';
import Emoji from '../Emojis/Emoji';
import ElementList from '../ElementList/ElementList';
import WaitMessage from '../TripMessages/WaitMessage';
import axios from 'axios';
import { API } from '../../consts';

const STATUS = {
  LOADING: 1,
  UNAVAILABLE: 2,
  COMPLETE: 3
};

class Trip extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: STATUS.LOADING,
      tripId: props.match.params.tripId,
      userId: props.match.params.userId,
    };
  }

  componentDidMount() {
    if (this.state.status === STATUS.LOADING) {
      axios.get(`${API}/participant?participant_id=${this.state.userId}`)
        .then((res) => {
          if (res.data.error) {
            alert('This user does not exists');
            window.location.href = `${window.location.origin}/`;
          } else {
            const response = res.data.response;
            const newStatus = response.route_id ?
              STATUS.COMPLETE :
              STATUS.UNAVAILABLE;
            this.setState({
              name: response.name,
              title: response.trip.title,
              description: response.trip.description,
              carName: newStatus === STATUS.COMPLETE ?
                response.car['car_name'] : '',
              passengers: newStatus === STATUS.COMPLETE ?
                response.car['passengers'] : [],
              status: newStatus
            });
          }
        }).catch(error => alert('Service unavailable right now. Please, try again later.'));
    }
  }

  render() {
    const { status } = this.state;

    let content = (<div />);
    switch(status) {
      case STATUS.LOADING:
        return (
          <Box direction='column' >
            <Box margin='0' className='header'><LogoHeader/></Box>
            <Box align='center' justify='center' background='light-1'>
              <Text size='large'>Loading...</Text>
            </Box>
          </Box>
        );

      case STATUS.UNAVAILABLE:
        content = (<WaitMessage />);
        break;

      case STATUS.COMPLETE:
        let mates = this.state.passengers.map((name, index) => {
          return (<ElementList key={index} text={name}></ElementList>);
        });
        content = (
          <div>
            <Box
              className='not-yet'
              width='large'
              border={{ color: 'accent-1', size: 'small' }}
              margin={{top:'small', bottom:'large'}}
              pad="medium" 
              round='small'>
              <Text size='medium'>
                You are part of <b>{this.state.carName}</b> car<br/><br/>
                In companion with the following team mates:
              </Text>
              <Box>
                {mates}
              </Box>
            </Box>
            <TripMap userId={this.state.userId} />
            <Music userId={this.state.userId} />
          </div>
        );
          // <Price currency={'EUR'} total={100} price={25} />
        break;

      default:
        break;
    }
    
    const { title, name, description } = this.state;

    return (
      <Box direction='column' >
        <Box margin='0' className='header'><LogoHeader/></Box>
        <Box align='center' justify='center' background='light-1'>
          <Box align='center' className='header-description' width='xxlarge' pad={{top:'medium', bottom:'medium'}}>
              <Heading textAlign='center' truncate={true}>{title}</Heading>
              <Heading textAlign='center' truncate={true} level='3'>{description}</Heading>            
          </Box>
          <Box width='large' pad={{top:'small', bottom:'medium'}}>
              <Text size='large' >Hello, <b>{name}</b> <Emoji symbol="👋" label="hello"/></Text>
          </Box>
          {content}
        </Box>
      </Box>
    );
  }
}

export default Trip;
