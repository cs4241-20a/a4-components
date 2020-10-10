# Assignment 4 - Components
## Drive++ *with* ***React***
Bryce Corbitt

http://mbsr.wpi.edu:2021

**Drive++ *with React*** is a remaster of my previous project, [**Drive++**](https://github.com/brycecorbitt/a3-persistence). This iteration's frontend is built entirely with the React framework. Additionally, this version uses Bootstrap v4 (v3 was used prior). The endpoints on the server that used to render HTML pages now respond with JSON data that is fetched using axios. Additionally, file feeds now use *pagination*, so they're ACTUAL feeds now that fetch more entries as you scroll :D.

I think this is the most visually appealing web app I've ever created. Now I don't think that's entirely because of React or Bootstrap V4, but I think I definitely put a lot more effort into it because I was motivated to learn React. This was my first exposure to client-sided rendering, so I was able to learn a lot of new concepts. I also got to try Generator functions in JavaScript for the first time (used in API pagination), which was really cool. My biggest challenge was trying to get the API communication working during development. I was running `react develop` so the app was running on a different origin than the node.js server and I ran into a bunch of CORS errors. Thankfully specifying the `proxy` field in my `package.json` to the address of the node.js temporarily did the trick!

### Usage:
**Logging in**
![Login](https://i.imgur.com/rk0g5wl.gif)

**Uploading a File**
![File Upload](https://i.imgur.com/H9DZlen.gif)

**Editing File Entry**
![File Edit](https://i.imgur.com/iJVbHzh.gif)

**Deleting File Entry**
![File Delete](https://i.imgur.com/PI174mv.gif)

**Browsing & Downloading All Files (No Auth Required)**
![File Browse](https://i.imgur.com/xXbWTpz.gif)
