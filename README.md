Readme
---

## My Movie List

Demo: https://movie.zph.io

The front-end client is rewrote by React and all express routes in a3 that do direct rendering are changed to API returning json for the front-end React to process. To be honest, the developing process was not as well as I expected, having several tricky bugs. But when I looked into its causation and React's design concept, I found that React enables developers to build the front-end application in a more logical way with modular design. Also the user experience is enhanced by having smooth interactions and less frequent page jumps and reloads.

## How to build

###1. Build client files
In directory `/client`, run:
```
npm run install:clean
npm run build
```
Then a directory `build` will be generated as the client files to be served.

###2. Build & run server
First modify config.js to fill in your mongodb connection information.

In directory `/`, run
```
npm install
node app.js
```
So the node.js server will start on default port 3000.
