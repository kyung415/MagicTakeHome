const SF_FILM_APP_TOKEN = process.env.REACT_APP_SF_FILM_APP_TOKEN

//GET request for all movie set locations.
export async function getLocations () {
    return await fetch('https://data.sfgov.org/resource/yitu-d5am.json', {
        method: 'GET',
        data: {
            limit: 5000,
            app_token: SF_FILM_APP_TOKEN
        }
    })
    .then(response => response.json())
    .then(data => {

        var final = {}
        for (var i = 0; i < data.length; i++) {
            var location = data[i]['locations']
            if (location !== undefined) {
                final[location] = data[i]
            }
        }

        return final
    })
    .catch(error => console.log(error))
}