
import React from 'react'
import { Box, Text } from 'grommet';

const WaitMessage = (props) => (
    <Box className='not-yet'
        width='large'
        border={{ color: 'brand', size: 'small' }}
        margin={{top:'small', bottom:'large'}}
        pad="medium" 
        round='small'>
        <Text size='medium'>
            You have not any route yet. <br/>
            Please check later to see the results 
        </Text>
    </Box>
);

export default WaitMessage;