import React, { Component } from 'react';
import { Box, Text, Form, CheckBox, FormField, Select, Button, RangeInput } from 'grommet';
import FormHeader from '../Headers/FormHeader';
import LogoHeader from '../Headers/LogoHeader';
import { GENRES } from '../../consts';
import './Traveler.css';
import '../Create/Create.css';

const OPTIONS = GENRES;

class Traveler extends Component {
  constructor(props) {
    super(props);

    this.tripId = props.match.params.tripId;

    this.state = {
      music: [],
      options: OPTIONS,
      isDriver: false,
      seats: 1
    };

    this.selectMusic = this.selectMusic.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.checkDriver = this.checkDriver.bind(this);
    this.changeSeats = this.changeSeats.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.isEdit = false;
  }

  selectMusic(event) {
    this.setState({
      music: event.value,
      selected: event.selected,
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
    console.log(event.value);
  }

  render() {
    const {
      options,
      selected,
      music,
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
        </Box>
      );
    }

    return (

      <Box
      direction='column'
      >
      
        <Box margin='0' className='header'>
          <LogoHeader/>
        </Box>
        
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
                    selected={selected}
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
                  <Button label='Cancel' color='accent-1'  />
                  <Button type='submit' label='Update' primary color='accent-1' />
                </Box>
              </Form>
            </Box>
          </Box>
        </Box>

      </Box>
   
    
    
    );
  }
}

export default Traveler;
