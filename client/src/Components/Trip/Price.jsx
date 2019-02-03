import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import './Trip.css';

class Price extends Component {
  render() {
    return(
      <Box
        className='not-yet'
        width='large'
        border={{ color: 'accent-1', size: 'small' }}
        margin={{top:'small', bottom:'large'}}
        pad="medium" 
        round='small'>
        <Text size='large'>
          <b>PRICE</b>
        </Text>
        <Text  margin={{top:'small'}}>
          {`The total price of this trip would be ${this.props.total} ${this.props.currency} in total, so you shoud pay:`}
        </Text>
        <Box width='large' align='center' pad='medium'>
          <Box pad='small' round='small' background='dark-6'>
            <Text size='xlarge'>
              <b>{`${this.props.price} ${this.props.currency}`}</b>
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Price;