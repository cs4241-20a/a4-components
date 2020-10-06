# Gabe's Coursework TODO List: React Edition
- https://a4-gabriel-aponte.herokuapp.com/
- This website is a nice and simple way for us to keep track of class assignments and project deadlines!
- The goal of this version of the website was to redo the client side by using the React library.
- To Use this app  you first must login. Logging in for the first time creates a new account, then you will need the same password to login to that username again.  
- To Add tasks: Simply input the Course Name, the Assignment/Task, its Due Date, and the Effort to complete it (1=least - 5=most).
- To Update or Delete tasks: use the correlating buttons in each row of the tasks table.
- The priority field will be automatically assigned based on the Due Date and the Effort of the assignment.

## Changes Since A3
- If a user attempts to make changes to their account data after they have signed out, they will be given a Permission Denied alert and returned to the login screen.
- If a user signs into another account and still has an older account screen in another window, that old window will update to the latest account login upon interaction.
- The client side has been refactored to use the React library

## React's Impact on my Development
I found React to be extremely useful in terms of creating clarity in my client side code. By utilizing the state component, I was able to easily update UI fields and grab input data without needing to explicitly add listeners or use the query selector. In addition, React made adding onClick listeners for my buttons much simpler by being able to apply them straight on the button in html rather than inside of the Window.onLoad function. However, I found the render function to be a pain. The syntax is just different enough from normal html that it took me quite a bit of time to fix all the little things inside my A3 html code that React had problems with. In addition, I utilized Babel to compile my client. This causes the website to be slightly slower since it uses the browser version of Babel. This version is typically used for prototyping rather than production website. After a bit of research, I found it would have required a lot of extra work to compile my scripts in the server before deployment, so I opted to take the slower speeds of the Babel browser compiler. All in all, it seems like React is great for bigger projects and production level websites, but is not super necessary for smaller project. I very much enjoyed learning about React for the first time!
