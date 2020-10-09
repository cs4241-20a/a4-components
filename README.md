Assignment 4 By Matthew Kaminski

## The forum

glitch link [http://a4-matthew-kaminski.glitch.me](http://a4-matthew-kaminski.glitch.me)

Sample login credentials: username: username, password: password (Or just register a new account)

**Changes from Assignment 3**

- Every section of the forum and login page was converted into a react component
- JSX was also used for clean and simple React components

  - See
    - public/index\_.html for where components are injected
    - public/js/login.js -> Login component
    - public/js/header.js -> Header component
    - public/js/editComment.js -> EditComponent component
    - public/js/deleteComment.js -> DeleteComment component
    - public/js/allPosts.js -> AllPosts component
    - public/js/userPosts.js -> UserPosts component

- Parcel was introduced to handle importing react on the clientside
- New website build pipeline:
  - Sass compiled -> index\_.html compiled by Parcel into index.handlebars -> index.handlebars rendered into index.html using handlebars 

**did the new technology improve or hinder the development experience?**

Integrating React into my application improved the developer experience more than I thought it would.
Parts of the page, such as the login section, neatly fit into a single file and made the index file much more manageable.
It shrunk the index file from around 300 lines to only 86, and made rearranging components very easy as well.
Changing the style of certain elements (e.g. hidden elements) also was made nicer, as React+JSX also allowed inline CSS for React components. One more positive side effect was it forced the HTML within the react component to be correct, otherwise it would throw an error.
