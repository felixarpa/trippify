import React, { Component } from 'react';
import { Box, Form, Text, FormField, Select, Button } from 'grommet';
import './Create.css';
import '../Base/Base.css';
import Logo from '../Logo/Logo';
const OPTIONS = ['EUR (€)', 'GBP (£)', 'USD ($)'];

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = { value: [], options: OPTIONS };

    this.submit = this.submit.bind(this);
  }

  submit(event) {
    // Post these values:
    // - { title, description, destination }: event.values
    // - currency: this.state.value
    const tripCode = 'ABC123';
    window.location.href = `${window.location.origin}/trip/${tripCode}`;
  }

  render() {
    const { options, selected, value } = this.state;

    return (

      <Box
      direction="column"
      >
      
        <Box
        margin='0'
        className='header'>
          <Logo/>
        </Box>
        
          <Box className='formInput' fill align="center" justify="center" background='light-1'>
            <Box>
                <Text className='title-create'>Fill the form for starting a new adventure!</Text>
            </Box>
            <Box width="large">
              <Form onSubmit={this.submit}>
                <FormField
                  className='input-form'
                  name="title"
                  label="Title"
                  placeholder='Envent name'
                  required
                />
                <Box className='margin'/>
                <FormField
                 className='input-form'
                  name="description"
                  label="Description"
                  placeholder='Write something about the event'
                  required
                />
                <Box className='margin'/>
                <FormField
                  className='input-form'
                  name="destination"
                  label="Destination"
                  placeholder='Place of your destination'
                  required
                />
                <Box className='margin'/>
                <FormField 
                className='input-form'
                name="currency"
                label="Currency"
                >
                  <Select
                    multiple={false}
                    selected={selected}
                    value={value}
                    placeholder='Select your currency'
                    onSearch={(searchText) => {
                      const regexp = new RegExp(searchText, 'i');
                      this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
                    }}
                    onChange={event => this.setState({
                      value: event.value,
                      selected: event.selected,
                      options: OPTIONS,
                    })}
                    options={options}
                  />
                </FormField>
                <Box direction="row" justify="between" margin={{ top: "large" }}>
                  <Button 
                    className='white-text-button'
                    label="Cancel" 
                    color='accent-1'  
                  />
                  <Button 
                   className='white-text-button'
                    type="submit" 
                    label="Update" 
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
