Assignment 4 - Components
===

Due: October 11th, by 11:59 PM.


https://a4-hunter-trautz.herokuapp.com/

- I created a simple TODO application which allows you to make an account and create new individual tasks that have a name, description, priority, and due date.
- After being authenticated on the application's login page users are then redirected to the homepage
- Due dates are automatically generated for each task based on the priority that was entered and you are able to delete tasks by pressing the 'Delete' button associated with it.
- Tasks can be updated by entering new information in the input fields and then pressing the update button next to the task you want to update
- Utilized flexboxes to ensure that the UI of the application scales to the user's web browser
- Tasks are stored on a MongoDB instead of on local machine
- Tasks are now associated with user accounts which are also stored on MongoDB
- Login with GitHub supported

## React Development
- I re-wrote the client-side of my application using the React JavaScript framework. I found working with React much more pleasant than working with standalone JS because it allows me to render my HTML webpages in JavaScript code, therefore allowing me to manipulate client side data with powerful JS functions. Furthermore, having access to the this.state variable allowed me to parse as well as store user input without using querySelectors. Lastly, I noticed that my pages rendered a whole lot faster due to React's virtual DOM.
