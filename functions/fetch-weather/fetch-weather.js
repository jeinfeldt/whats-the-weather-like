const ApiClient = require('openweathermap-api-client')
const KEY = process.env.OPENWEATHER_API_KEY || "";

// Configure an instance
const client = new ApiClient.OwmApiClient({
    // The API key to authenticate with. Also refered to as APPID.
    apiKey: KEY,

    // Default endpoint to use if none was explicitly set.
    endpoint: "weather",

    // Language code to use for translations for OWM data. Options can be found
    // here: https://openweathermap.org/current#multi
    lang: "en",

    // Which measuring system to use for units. default ("standard") returns
    // temperatures in Kelvin, "imperial" for Farenheit and "metric" for Celcius.
    units: "metric"
});

const handler = async(event) => {
    try {
        let location = event.queryStringParameters.location || "Moskau";
        console.log("fetch-weather, location: " + location);
        const result = await client.current(location);
        let weather = result.weather[0]
        return {
            statusCode: 200,
            body: JSON.stringify(weather),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }