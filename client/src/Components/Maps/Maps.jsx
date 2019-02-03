import React from 'react'
import HEREMap from 'react-here-maps';

const Maps = (props) => (
    <HEREMap 
        appId='m7AG9dmM8HNO5ZnJWRVO'
        appCode='2mCmRml-o_e3-uZuD_Z62A'
        center={{ lat: 0, lng: 0 }}
        zoom={14}
    />
);

export default Maps;