const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

/*
    Params: location: String
    -GET the latitude and longitude of the newly added location of your itinerary.
*/
export async function getLatAndLong(location) {
    const splitLocation = location.split()
    const locationPlus = splitLocation.join('+')
    var uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationPlus}+San+Francisco,+CA&key=${GOOGLE_MAPS_API_KEY}`
    var response = await fetch(uri)
                .then(response => response.json())
                .then(data => {
                    return data
                })
                .catch(error => console.log(error))
    return response
}