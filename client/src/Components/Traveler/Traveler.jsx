import React, { Component } from 'react';
import { Box, Text, Form, CheckBox, FormField, Select, Button, RangeInput } from 'grommet';
import LogoHeader from '../Headers/LogoHeader';
import FormHeader from '../Headers/FormHeader';
import { GENRES } from '../../consts';

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
        <Box>
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
      <Box fill align='center' justify='center'>
        <Box width='medium'>
          <LogoHeader />
          <FormHeader />
          <Form onSubmit={this.submit}>
            <FormField
              name='origin'
              label='Origin'
              required
            />
            <FormField name='Music genre'>
              <Select
                multiple={false}
                selected={selected}
                value={music}
                placeholder='Select your favorite music genre'
                onChange={this.selectMusic}
                onSearch={this.searchMusic}
                options={options}
              />
              <CheckBox
                checked={isDriver}
                label='Do you have a car?'
                onChange={this.checkDriver}
              />
              {car}
            </FormField>
            <Box direction='row' justify='between' margin={{ top: 'medium' }}>
              <Button label='Cancel' />
              <Button type='submit' label='Update' primary />
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}

export default Traveler;
