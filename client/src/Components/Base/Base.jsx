import React, { Component } from 'react';
import { Box, Grid, Button } from 'grommet';
import './Logo.css';
import {Logo} from '../Logo/Logo';

class Base extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <Box
            direction="column"
        >
        
            <Box
                width='auto'
                height='5em'
            >
                <Logo/>
            
            </Box>

            <Box
                width='auto'
            >
            
            
            </Box>

        </Box>

    );
  }
}

export default Main;
