README.md
===

CS 4241: Webware Assignment 4: Components
---

### Author: Eric Reardon

**Live App Links**: (In case one doesn't work. Glitch was giving me trouble) 
- https://a4-eric-reardon.herokuapp.com
- https://a4-eric-reardon-final.glitch.me

# Karate Dojo Roster WebApp - Svelte

For this project, I used all of my code and logic from A3. Therefore, my app
should look and function the same as my previous Karate Dojo Roster Management
WebApp.

**Reminder**:

For the login, a user will enter their username (last name) and password, which
will give them access to their individual roster. Currently, I have two accounts
already set up. 
- Sensei Reardon
  - **username: Reardon**
  - **password: password**
- Sensei Roberts
  - **username: Roberts**
  - **password: password**

However, feel free to start from scratch with a new account! All
you have to do is fill out the "New Account" form and then log in with the credentials.


For A4, I reimplemented the client-side portion of the code using Svelte. I started
using React since it is more similar to Angular, in which I already have some experience.
However, I ran into a lot of problems with React using Glitch. The biggest problem was
that it would immediately fill all of the free space for glitch and give me errors.
Since I had a good amount of time with the project deadline extension, I took a different
approach and ended up using Svelte instead. I found Svelte to be very
simple and definitely improved the development experience. After watching the class
video and looking at some tutorials, I found Svelte to be very useful to migrate my
vanilla js/html code into a more organized framework. I noticed that Svelte is very useful
for state management and reactivity. However, my only complaint about svelte is that it
does not handle custom CSS very well. This is perfectly fine (and most times easier) when
you are beginning to develop an app, but I used quite a bit of custom CSS in A3 to 
satisy the CRAP prinnciples. Overall, I definitely found Svelte useful and I expect to
use a similar framework for the final project.