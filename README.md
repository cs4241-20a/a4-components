## MTG Custom Card Creater, but using React

Created by: Luke Deratzou
Hosting link: https://a4-luke-deratzou.glitch.me


## How to run:
type "npm start" in the home directory

For this project, I used almost the same backend as project 3, except I had to make sure that it communicated with the new frontend, which is maintained with React. The project still does the same thing as the prior one: maintains two databases, one with users and one with their custom MtG cards. Users can make an account or sign in with GitHub, and then make cards tied to their account. React helped a lot when communicating between the backend and the frontend. Displaying the user data was done a lot more elegantly thanks to states and mapping. I also found that displaying repeated data, such as the different sections on my tutorial page, was made easier thanks to being able to make an array of data and then map through it. The main downsides of React was getting it set up, as it required a lot more files and organization versus a vanilla HTML/CSS project. It was also a bit difficult to get different pages to load, though once I mastered React's routing it was no longer an issue. Overall, I felt that React added to my app and made the code easier to write and more readable.

## Things I used to make the app:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I followed this tutorial to setup React: https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b