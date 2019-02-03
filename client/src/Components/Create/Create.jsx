import React, { Component } from 'react';
import { Box, Form, FormField, Select, Button } from 'grommet';
import './Create.css';
import LogoHeader from '../Headers/LogoHeader';
import FormHeader from '../Headers/FormHeader';
import { CURR } from '../../consts';
import axios from 'axios';
import { API } from '../../consts';

const OPTIONS = CURR;

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: OPTIONS
    };

    this.selectCurrency = this.selectCurrency.bind(this);
    this.searchCurrency = this.searchCurrency.bind(this);
    this.submit = this.submit.bind(this);
  }

  selectCurrency(event) {
    this.setState({
      value: event.value,
      options: OPTIONS
    });
  }

  searchCurrency(text) {
    const regexp = new RegExp(text, 'i');
    this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
  }

  submit(event) {
    const { title, description, destination } = event.value;
    const currency = this.state.value;
    axios.get(
      `${API}/location/verify/location/verify?location=${encodeURI(destination)}`
      ).then(res =>
        axios.post(`${API}/trip`, {
            title: title,
            description: description,
            destination: destination,
            currency: currency
          })
          .then((response) => {
            const tripId = response.data.response.trip_id;
            window.location.href = `${window.location.origin}/trip/${tripId}`;
          })
          .catch((error) => {
            let message = 'Service unavailable right now. Please, try again later.';
            if (error.response.status === 400) {
              message = 'Invalid resquest';
            }
            alert(message);
          })
      ).catch(error => alert('Invalid destination location'));
  }

  render() {
    const { options, value } = this.state;

    return (

      <Box
      direction='column'
      >
      
        <Box
        margin='0'
        className='header'>
          <LogoHeader/>
        </Box>
        
          <Box className='formInput' fill align='center' justify='center' background='light-1'>
            <FormHeader/>
            <Box width='large'>
              <Form onSubmit={this.submit}>
                <FormField
                  className='input-form'
                  name='title'
                  label='Title'
                  placeholder='Envent name'
                  required
                />
                <Box className='margin'/>
                <FormField
                  className='input-form'
                  name='description'
                  label='Description'
                  placeholder='Write something about the event'
                  required
                />
                <Box className='margin'/>
                <FormField
                  className='input-form'
                  name='destination'
                  label='Destination'
                  placeholder='Place of your destination'
                  required
                />
                <Box className='margin'/>
                <FormField 
                  className='input-form'
                  name='currency'
                  label='Currency'>
                  <Select
                    multiple={false}
                    value={value}
                    placeholder='Select your currency'
                    onChange={this.selectCurrency}
                    onSearch={this.searchCurrency}
                    options={options}
                  />
                </FormField>
                <Box direction='row' justify='between' margin={{ top: 'large' }}>
                  <Button 
                    label='Cancel' 
                    color='accent-1'
                    onClick={() => window.location.href = `${window.location.origin}/`}
                  />
                  <Button 
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

export default Create;
