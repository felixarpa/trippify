import React, { Component } from 'react';
import { Box, Grid, Button } from 'grommet';
import './main.css';

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

      <div className='main-class'>

        <div className='background' />
        <Grid
            className='mainGrid'
            columns={['fill']}
            rows={['medium', 'small']}
            gap='none'
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'options', start: [0, 1], end: [1, 1] },
            ]}
          >
            <Box className ='box-header' gridArea='header'>
              <h1>Hello,</h1>
              <h2>welcome to 
                  <div className='name'> trippify!</div>
              </h2>
              <h3>Please, select your requests:</h3>
            </Box>
            
            <Box 
              direction="row"
              fill='horizontal'
              className='boxButton'
              gridArea='options'
              alignContent = 'center'
            >
                <Box 
                  fill='horizontal'
                >
                    <Button 
                    className='mainButton'
                    color='accent-1'
                    label='CREATE'
                    onClick={this.create}
                  />
                </Box>
                
                <Box width='xsmall'/>
                
                <Box 
                  fill='horizontal'
                >
                      <Button
                      className='mainButton'
                      color='accent-1'
                      label='JOIN'
                      onClick={this.join}
                    />
                </Box>

            </Box>
          </Grid>
    
      </div>
    
    );
  }
}

export default Main;
