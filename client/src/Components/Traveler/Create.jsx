import React, { Component } from 'react';
import { Box, Text, Form, CheckBox, FormField, Select, Button, RangeInput } from 'grommet';
import axios from 'axios';
import FormHeader from '../Headers/FormHeader';
import LogoHeader from '../Headers/LogoHeader';
import { GENRES, API } from '../../consts';
import './Traveler.css';
import '../Create/Create.css';

const OPTIONS = GENRES;

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      music: [],
      options: OPTIONS,
      isDriver: false,
      seats: 1,
      tripId: props.tripId
    };

    this.selectMusic = this.selectMusic.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.checkDriver = this.checkDriver.bind(this);
    this.changeSeats = this.changeSeats.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  selectMusic(event) {
    this.setState({
      music: event.value,
      options: OPTIONS
    });
  }

  searchMusic(text) {
    const regexp = new RegExp(text, 'i');
    this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
  }

  checkDriver(event) {
    this.setState({ isDriver: event.target.checked });
  }

  changeSeats(event) {
    this.setState({ seats: event.target.value });
  }

  submit(event) {
    const { name, origin, carName } = event.value;
    const { music, seats, tripId, isDriver } = this.state;
    axios.get(
      `${API}/location/verify/location/verify?location=${encodeURI(origin)}`
      ).then(res =>
        axios.post(`${API}/participant`, {
          'car_available_seats': isDriver ? parseInt(seats) : 1,
          'car_brand': '',
          'car_model': '',
          'car_name': carName,
          'music_genre': music,
          'name': name,
          'origin': origin,
          'trip_id': parseInt(tripId)
        })
          .then((response) => {
            const userId = response.data.response.participant_id;
            window.location.href = `${window.location.origin}/trip/${tripId}/${userId}/`;
          })
          .catch((error) => {
            let message = 'Service unavailable right now. Please, try again later.';
            if (error.response.status === 400) {
              message = 'Invalid resquest';
            }
            alert(message);
          })
      ).catch(error => alert('Invalid origin location'));
  }

  cancel(event) {
    window.location.href = `${window.location.origin}/trip/${this.state.tripId}`
  }

  render() {
    const {
      music,
      options,
      isDriver,
      seats
    } = this.state;

    let car = (<Box/>);
    if (isDriver) {
      const text = `How many seats dos your car have? ${seats}`;
      car = (
        <Box margin={{ bottom: 'small', top: 'medium' }}>
          <Text>{text}</Text>
          <RangeInput
            value={seats}
            min={1}
            max={5}
            step={1}
            onChange={this.changeSeats}
          />
          <FormField
            className='input-form'
            name='carName'
            label='Car'
            placeholder='Give a name to your car'
            required
          />
        </Box>
      );
    }

    return (
      <Box direction='column'>
        <Box margin='0' className='header'><LogoHeader/></Box>
        <Box className='formInput' fill align='center' justify='center' background='light-1'>
          <Box fill align='center' justify='center'>
            <Box width='large'>
              <FormHeader />
              <Form onSubmit={this.submit}>
                <FormField
                  className='input-form'
                  name='name'
                  label='Name'
                  placeholder='How people call you'
                  required
                />
                <Box className='margin'/>
                <FormField
                  className='input-form'
                  name='origin'
                  label='Origin'
                  placeholder='Place from origin'
                  required
                />
                <Box className='margin'/>
                <FormField name='Music genre' label='Taste of music'>
                  <Select
                    className='input-form'
                    multiple={false}
                    value={music}
                    placeholder='Select your favorite music genre'
                    onChange={this.selectMusic}
                    onSearch={this.searchMusic}
                    options={options}
                  />
                  <Box className='margin'/>
                  <Box className='input-form' margin={{ bottom: 'small' }}>
                    <CheckBox
                      className='input-form'
                      checked={isDriver}
                      label='Do you have a car?'
                      onChange={this.checkDriver}
                    />
                  </Box>

                  {car}
                </FormField>
                <Box direction='row' justify='between' margin={{ top: 'large' }}>
                  <Button
                  label='Cancel'
                  color='accent-1'
                  onClick={this.cancel} />
                  <Button type='submit' label='Submit' primary color='accent-1' />
                </Box>
              </Form>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Create;
