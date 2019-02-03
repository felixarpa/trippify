import React, { Component } from 'react';
import { Box, Form, Text, FormField, Button } from 'grommet';
import Logo from '../Logo/Logo';
import axios from 'axios';
import { API } from '../../consts';

class Join extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    const tripId = event.value.id;
    axios.get(`${API}/trip?trip_id=${tripId}`)
      .then((response) => {
        if (response.data.error) {
          alert(`The trip ${tripId} does not exists.`);
        } else {
          window.location.href = `${window.location.origin}/trip/${tripId}`;
        }
      }).catch(error => alert('Service unavailable right now. Please, try again later.'));
  }

  render() {
    return (
      <Box direction='column'>
        <Box
          margin='0'
          className='header'>
          <Logo/>
        </Box>
        <Box className='formInput' fill align='center' justify='center' background='light-1'>
          <Box>
              <Text className='title-create'>Join an existing Trip using its ID!</Text>
          </Box>
          <Box width='large'>
            <Form onSubmit={this.submit}>
              <FormField
                className='input-form'
                name='id'
                label='ID of the trip you want to join'
                placeholder='Trip ID'
                required
              />
              <Box className='margin'/>
              <Box direction='row' justify='between' margin={{ top: 'large' }}>
                <Button 
                  className='white-text-button'
                  label='Cancel' 
                  color='accent-1'
                  onClick={() => window.location.href = `${window.location.origin}/`}
                />
                <Button 
                  className='white-text-button'
                  type='submit' 
                  label='Submit' 
                  color='accent-1' 
                  primary />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
      
    );
  }
}

export default Join;