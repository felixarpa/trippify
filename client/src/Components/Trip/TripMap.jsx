import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import './Trip.css';

class TripMap extends Component {
  render() {
    return(
      <Box className='not-yet'
        width='large'
        border={{ color: 'accent-1', size: 'small' }}
        margin={{top:'small', bottom:'large'}}
        pad="medium" 
        round='small'>
        <Text size='large'>
          <b>MAP</b>
        </Text>
        <Box>
          <div className='maps'>
            <div id="map"></div>
            <script>
              function initMap() {
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 6,
                  center: {lat: 41.85, lng: -87.65}
                });
                directionsDisplay.setMap(map);
                calculateAndDisplayRoute(directionsService, directionsDisplay);
              }

              function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                var apiResponse = simularAPI();
                directionsService.route({
                  origin: apiResponse.origin,
                  destination: apiResponse.destination,
                  waypoints: apiResponse.waypoints,
                  optimizeWaypoints: true,
                  travelMode: 'DRIVING'
                }, function(response, status) {
                  if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                  } else {
                    console.log('TripMap: Error');
                  }
                });
              }

              function simularAPI() {
                return {
                  origin: "Alperton Station, Wembley, UK",
                  destination: "Windsor Building, University in Egham, England",
                  waypoints: [
                    { location: "North Wembley Station, Wembley, UK" },
                    { location: "St Georges Shopping Centre, Harrow, UK" },
                  ]
                }
              }
            </script>
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIewBmoNkiLKRpIiVZByVX6RnG5DZ5xO4&callback=initMap"></script>
          </div>
        </Box>
      </Box>
    );
  }
}

export default TripMap;