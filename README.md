# Read With Me

## Team
* **David Doan** - Development Team Member
* **Jen Wong** - Development Team Member
* **Cathy Lee** - Scrum Master
* **Ashwini Jogwar** - Product Owner

### Requirements
* node.js - v6.2.0
* mongodb

### Description
Read With Me is a remote reading app, that allows parents who are away from their kids to interactively read and webcam with them online. Both parties can draw on the storybook, change the pages, and make the images animate.

### Installing Dependencies

From the root directory run:
```
npm install
npm install -g nodemon webpack
webpack --watch
mongod
nodemon server.js
Visit `localhost:8000` in the browser.

**The server file is in the root directory for easy access, but there is a server 
folder where all logic will be stored.
