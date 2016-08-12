![Alt text](/client/assets/readwithme-logo.png "Read With Me Logo")

## Team
* **Matt Vargeson**
* **David Valles**
* **Peter Chim**
* **Alex Wong**

## Demo

Check out [Read With Me](https://read-with-me-abc.herokuapp.com) to get started

## Contributing

### Requirements
* node.js - v6.2.0
* mongodb
* Go to Twilio's site and follow directions at (https://www.twilio.com/docs/api/ip-messaging/guides/quickstart-js) to create a Twilio account to get SID and API keys

### Description
*Read With Me* is a remote reading app, that allows parents who are away from their kids to interactively read and webcam with them online. Both parties can draw on the storybook, navigate pages, and make each page image animate.

### Installing Dependencies

From the root directory run:
```
npm install
npm install -g nodemon webpack
webpack --watch
mongod
nodemon server.js

//visit localhost:3000 in the browser.
```
### Testing
Client side testing is implemented with Karma and Airbnb's Enzyme framework. Developers can pinpoint the source of their errors's using Enzyme's shallow rendering and Karma's sourcemap. Server side testing is implement with Supertest and Chai.


From the root directory run:
```
npm test
