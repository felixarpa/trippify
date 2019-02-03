import React, { Component } from 'react';
import { Box, Text, Form, FormField, Select, Button } from 'grommet';
import LogoHeader from '../Headers/LogoHeader';
import Create from './Create';
import './Traveler.css';
import '../Create/Create.css';

class Choose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tripId: props.tripId,
      user: [],
      options: props.users,
      createUser: false,
    };

    this.selectTraveler = this.selectTraveler.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  selectTraveler(event) {
    this.setState({
      user: event.value,
    });
  }

  submit(event) {
    const { user, options, tripId } = this.state;
    const selected = options.filter(x => x.name === user)[0];
    window.location.href = `${window.location.origin}/trip/${tripId}/${selected.id}`
  }

  cancel(event) {
    this.setState({ createUser: true });
  }

  render() {
    const { user, options, createUser, tripId } = this.state;
    const namesList = options.map(x => x.name);

    if (createUser) {
      return (<Create tripId={tripId}/>);
    }

    return (
      <Box direction='column'>
        <Box margin='0' className='header'><LogoHeader/></Box>
        <Box className='formInput' fill align='center' justify='center' background='light-1'>
          <Box fill align='center' justify='center'>
            <Box width='large'>
              <Box>
                <Text className='title-create'>Select an exsiting user o create a new one</Text>
              </Box>
              <Form onSubmit={this.submit}>
                <FormField name='User name' label='Who are you?'>
                  <Select
                    className='input-form'
                    multiple={false}
                    value={user}
                    placeholder='Who are you?'
                    onChange={this.selectTraveler}
                    options={namesList}
                  />
                </FormField>
                <Box direction='row' justify='between' margin={{ top: 'large' }}>
                  <Button
                    label='Create new Traveler'
                    color='accent-1'
                    onClick={this.cancel}
                    />
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

export default Choose;
