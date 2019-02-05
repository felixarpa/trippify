import React, { Component } from 'react';
import { Box, Form, Text, FormField, Button } from 'grommet';
import LogoHeader from '../Headers/LogoHeader';
import '../Create/Create.css'
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
          <LogoHeader/>
        </Box>
        <Box className='formInput' fill align='center' justify='center' background='light-1'>
          <Box>
              <Text className='title-create'>Join an existing Trip using its ID!</Text>
          </Box>
          <Box width='large'>
            <Box className='margin'/>
            <Form onSubmit={this.submit}>
              <FormField
                className='input-form'
                name='id'
                label='ID of the trip you want to join'
                placeholder='Trip ID'
                required
              />
              <Box className='margin'/>
              <Box direction='row' justify='between' margin={{ top: 'medium' }}>
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
          <Box className='margin'/>
          <Box background='#3B5479' pad='1.5px' width='large'></Box>
          <Box className='margin'/>
          <Box width='large'>
            <Box className='invite'
                  width='medium'
                  direction='row'
                  border={{ color: 'accent-1', size: 'small' }}
                  margin={{top:'small', bottom:'large'}}
                  pad="small" 
                  round='small'
                  align='right'>
                <Box>
                <Form onSubmit={this.invite}>
                  <FormField
                        className='input-form'
                        name='telephone'
                        label='Do you want to share with someone?'
                        placeholder='Telephone of a friend'
                      />
                </Form>
              </Box>

              <Box>
                <Button 
                    className='white-text-button'
                    label='Invite' 
                    color='accent-1'
                    width='small'
                    pad='0'
                    primary
                  />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      
    );
  }
}

export default Join;
