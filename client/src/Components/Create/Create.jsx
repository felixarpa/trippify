import React, { Component } from 'react';
import { Box, Form, Text, FormField, Select, Button } from 'grommet';

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
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Box>
            <Text>LOGO</Text>
          </Box>
          <Box>
            <Text>Fill the form for starting a new adventure</Text>
          </Box>
          <Form onSubmit={this.submit}>
            <FormField
              name="title"
              label="Title"
              required
            />
            <FormField
              name="description"
              label="Description"
              required
            />
            <FormField
              name="destination"
              label="Destination"
              required
            />
            <FormField name="currency">
              <Select
                multiple={false}
                selected={selected}
                value={value}
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
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Button label="Cancel" />
              <Button type="submit" label="Update" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}

export default Create;
