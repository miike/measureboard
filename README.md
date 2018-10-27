![](https://i.imgur.com/5LYYO2j.png)

## Background

[Measurecamp](https://measurecamp.org/) is a open, free-to-attend unconference founded in 2012. In 2018 it is expected 17 or more Measurecamps will be hosted across the world. Anyone is welcome and invited to talk at a Measurecamp and talk sessions are organised around a set number of rooms (usually 4-6) and a given number of talk slots (typically 20-30 minutes).

The time and location of a talk is written down and organised on a physical board (e.g., a pinboard) in a common area during the unconference. Talks may be added, removed, moved and edited throughout the course of the day.

## Philosophy

Measureboard is designed to *augment* rather than replace the physical Measurecamp board. It's quite often useful when you can't or aren't able to see the sessions on the physical board. Measureboard is heavily inspired by the original Measurecamp board first used in Columbus implemented by [Vitaliy](https://github.com/vitaluha/measurecampboard).

This board was first trialled at [Measurecamp Auckland](http://auckland.measurecamp.org/) in 2018.

Measureboard is released under the permissive MIT License. To contribute please first create an issue for the repository and open a pull request.

## Technology

The frontend to the software is a simple [Vue](https://vuejs.org/) application with a small amount of state handling for favourites and room filtering. The Semantic UI Vue plugin is used to provide Semantic UI components to render.

The backend data source for the application is a Google Sheet using the following [template](https://docs.google.com/spreadsheets/d/1NnJroBAvuceVG3nRrYKySbXVRd5rez9gP0qiF7lKCrc). This is currently been refactored to use Firestore (Firebase) instead.

Updates to the Google Sheet (e.g., room changes, talk title changes) are pushed to the front end in real time using [Pusher](https://pusher.com/) which acts as a simple pubsub messaging interface over websockets. Updates to the Google Sheet are typically reflected in the interface within 2-5 seconds and do not require the client to refresh the web page.

## Setup

Configure the `index.html` file and fill in the relevant Google Sheet URL, Pusher credentials and GTM container ID. You will need a free (or paid) Pusher account in order to use the sync. A free Pusher account allows for 100 concurrent connections and 200k messages per day.

### Google Tag Manager

You'll need to set up a container for GTM and update `index.html` with that container in two places. Then set up the container to do the tagging.

1. Set up a variable for dataLayer variable `title` to take the session title when pushed to the dataLayer.
2. Set up triggers for custom events `Add favourite`, `Board update` and `Removed favourite`.
3. Set up tags for `All pages` and then custom events for the other triggers.

## Hosting

As the app is a single HTML file serving static assets it can be hosted on any service that allows access to static files publically. Instructions are included below for deployment on AWS and GCP.

### Amazon Web Services (AWS)
1. Create a new bucket on Amazon S3 and enable public access.
2. Define the name of your bucket in `deploy_aws.sh` and run `./deploy_aws.sh`
3. Visit your page at https://s3-REGION.amazonaws.com/BUCKET/index.html

### Google Cloud Platform (GCP)
1. Create a new bucket using Google Cloud Storage and enable public access.
2. Define the name of your bucket in `deploy_gcp.sh` and run `./deploy_gcp.sh`
3. Visit your page at https://storage.googleapis.com/BUCKET/index.html

## Limitations

- Doesn't render text that well on low DPI (e.g., large LED displays)
- Data has to be manually entered into the Google Spreadsheet and modified if changes occur
- Can't yet be hosted on Wordpress using *.measurecamp.org (Wordpress doesn't render iframes without plugins)

## Future improvements

- Add fiducial markers (likely QR codes) to each physical Measurecamp board card and use to sync with the Google Sheet instead of manually data entry.
- Multiple display mode options (mobile device, tablet device, television screen, LED display)
- Use consistent branding (colour scheme, iconography) with the Measurecamp brand
- Use favourites/RSVPs to gauge talk interest and use to dynamically reassign rooms based on predicted session popularity
- Display real time visualisations of what is occurring on the board (basic version exist of this)


