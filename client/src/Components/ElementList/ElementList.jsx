import React from 'react'
import { Box } from 'grommet';

const ElementList = (props) => (
    <Box width='medium' border='bottom' margin='small' pad='small'>
        <b> {props.text} </b>
    </Box>
);

export default ElementList;