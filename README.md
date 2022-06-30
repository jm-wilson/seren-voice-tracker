# Seren Voice Tracker
## Summary
This tool was built using [NextJS](https://nextjs.org/) and Weird Gloop's [Runescape API](https://api.weirdgloop.org/) to track the current and previous Voices of Seren.  By excluding the current and previous Voices, the tool can also determine which Voices will be available for the next change.

## Possible data inaccuracy
Data is fetched from the same source used by the [Runescape Wiki](https://runescape.wiki/).  As noted on the wiki's [Voice of Seren](https://runescape.wiki/w/Voice_of_Seren) page, it may be incorrect for the first hour after a game update.

The current Voices are fetched using the `getStaticProps()` method to prevent calling the API each time the page is loaded.  [On-Demand Revalidation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) can be used to update this data using an API endpoint.

## Revalidating the data
The API endpoint at `/api/revalidate` refetches Voice data as long as the correct secret token is provided as a query parameter.  The secret token should be defined as an environment variable called `REVALIDATE_TOKEN`, and then added to the end of the API endpoint as the `secret` parameter.

For example, if `REVALIDATE_TOKEN` is "password123" data can be revalidated by sending a request to `/api/revalidate?secret=password123`.

In practice, using an external service to call this endpoint hourly (after the voices change) minimizes API calls while ensuring voice data remains up to date.