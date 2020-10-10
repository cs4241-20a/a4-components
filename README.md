Assignment 4 - Components
===

## Nikhil Chintada Assignment 4

https://a4-nikhil-chintada.herokuapp.com/

The goal of this application was to replicate the two tiered web application created in the previous assignment by replacing the front end with component based programming.
My webpage is a place where users can create an account, sign in and make a todo list for themselves which they can add to, edit and delete tasks from.
I used svelte for the front end components of my website, replacing the two html pages, two javascript files and css stylesheet with two .svelte files in their place.

## Changes/Additions to Assignment 3:
- Two svelte components, one for the login page, the other for the task page which are switched between by App.Svelte, these handle all of the frontend
- Small changes to the server so that adding, editing and deleting on the backend all return the user's entire collection
- There are not page redirects anymore (i.e. sendFile), instead using App.svelte the component is set to the appropriate svelte file based on whether a user is signed in or not
- Removed item numbers on the table
- index.html has no code except for the default svelte template + bootstrap stylesheet
- newpage.html exists but is essentially empty and unused as page redirects no longer are used
- Deployed on Heroku instead of Glitch

Overall I feel that svelte improved the functionality and experience of the website.
It took me some time to figure out how to properly use svelte and even how to integrate it into existing code.
But ultimately the reactivity it provides is very advantageous and efficient for the website, particularly with making the todo list reactive.
It helped stream line code in general and I feel was more efficient than my assignment 3 code.
