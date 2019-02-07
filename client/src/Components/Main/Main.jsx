import React, { Component } from 'react';
import { Box, Grid, Heading, Button } from 'grommet';
import './Main.css';
import { New, Group } from 'grommet-icons';

class Main extends Component {
  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
    this.join = this.join.bind(this);
  }

  create() {
    window.location.href = `${window.location.origin}/create/`;
  }

  join() {

  }

  render() {
    return (
      <Grid
        columns={['fill']}
        rows={['medium', 'small']}
        gap='none'
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'create', start: [0, 1], end: [0, 1] },
          { name: 'join', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea='header'>
          <h1>Hello,</h1>
          <h2>welcome to <div className='Name'>trippify</div></h2>
        </Box>
        <Box gridArea='create'>
          <Button
            icon={<New />}
            label='CREATE'
            onClick={this.create}
          />
        </Box>
        <Box gridArea='join'>
          <Button
            icon={<Group />}
            label='JOIN'
            onClick={this.join}
          />
        </Box>
      </Grid>
    );
  }
}

export default Main;
