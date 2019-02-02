import React, { Component } from 'react';
import { Box, Form, FormField, Select, Button } from 'grommet';
import './Create.css';
import '../Base/Base.css';
import LogoHeader from '../Headers/LogoHeader';
import FormHeader from '../Headers/FormHeader';
import { CURR } from '../../consts';

const OPTIONS = CURR;

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
      options: OPTIONS
    };

    this.selectCurrency = this.selectCurrency.bind(this);
    this.searchCurrency = this.searchCurrency.bind(this);
    this.submit = this.submit.bind(this);
  }

  selectCurrency(event) {
    this.setState({
      value: event.value,
      selected: event.selected,
      options: OPTIONS
    });
  }

  searchCurrency(text) {
    const regexp = new RegExp(text, 'i');
    this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
  }

  submit(event) {
    // Post these values:
    // - { title, description, destination }: event.value
    // - currency: this.state.value
    // console.log(event.value);
    const tripId = 'ABC123';
    window.location.href = `${window.location.origin}/trip/${tripId}`;
  }

  render() {
    const { options, selected, value } = this.state;

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
                    selected={selected}
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
                  />
                  <Button 
                    type='submit' 
                    label='Update' 
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
