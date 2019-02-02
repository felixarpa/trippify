from src.maps.maps import maps_geo_coding_client


def get_coordinates(location):
    response = maps_geo_coding_client.geocode(location)
    if 'geometry' in response and 'location' in response['geometry']:
        return response['geometry']['location']
    return None
