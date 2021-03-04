const api = require('unsplash-js')
const fetch = require('node-fetch');

global.fetch = fetch

const unsplash = api.createApi({
    accessKey: '',
});

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async(event) => {
    try {
        let query = event.queryStringParameters.q || "cat";
        return unsplash.search.getPhotos({ query: query, page: 1, perPage: 20, orientation: 'squarish' }).then(result => {
            if (result.errors) {
                // handle error here
                console.log('error occurred: ', result.errors[0]);
            } else {
                const feed = result.response;

                // extract total and results array from response
                const { total, results } = feed;

                // handle success here
                console.log(`received ${results.length} photos out of ${total}`);
                return {
                    statusCode: 200,
                    body: JSON.stringify(results),
                }
            }
        });
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }