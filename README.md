# Assignment 4 - Components

## Food Tracker V2: Now with Svelte

Jordan Gold  

Website Link: http://a4-jordan-gold.heroku.com  

The project is the same as A3 except the front end has been re-written to use Svelte instead of plain JavaScript. As before it is a tracker that allows you to enter meals you have eaten and update or delete them. Users must log in and only see the foods for their account. The big change comes in the form of the front-end experience, that while not looking different, has been entirely rewritten into Svelte.  

This new technology did improve the development experience a great amount once I got used to it and learned how it worked. A thing I am a big fan of in Svelte is the functionality it provides while not hindering a simple approach. Sometimes these complicated frameworks force you to write code as they want where as with Svelte you could use a very standard setup of javascript, css, and html but you can always expand it as you see fit with Svelte components and functionality. The biggest speed improvement I saw was the ability to construct tables on the fly from arrays using the $each keyword in Svelte. This meant that all the complicated aspects of making sure each new entry is added to the table correctly is wiped away as all you have to do is append the new value to the array and Svelte will take care of internally updating the table easily and simply.
