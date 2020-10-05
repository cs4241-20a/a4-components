Assignment 4 - Components
===

Jonathan Dang: https://a4-jonathan-dang.herokuapp.com/

# User Tech Review 

This project essentially has the same functionalities as A3, but it utlizes React for the client side portion. While the server side stayed largely the same, I had to do quite a bit of refactoring to the script and html file for the site that presents all the reviews of the user. In the html code, I essentially migrated the main component of the website to the script file in the render() function. I learned this from seeing example codes and online tutorials. After doing that, I had to adjust the existing JS functions in my script file to be able to work in a React framework. While doing this adjustment, I found it easier to access information from the website when compared to the method I used in A3 that required me to collect the values by accessing each component's ID. I found that in React I could simply obtain the information from the state attrbute of the App class, which for me, I enjoyed it. 

I believe the new technology might have hindered my actual application's perforamnce, but for a development experience standpoint, I found it as a benefit. The hinderance to my application's performance probably could have been due to my inexperience with React, thus causing some lag issues on the screen update upon a button click. I suspect my render() function is quite large, causing it to be expensive to render the page, thus possibly causing the lag issue. Other than that I found it a great experience to learn about and work with React.  

## Please Read to Understand Occurences that May Happen
For this assignment, I implemented the main website (reviews.html) to use React. While testing out this assignment, there may be a lag issue with the page update after clicking on a button, and if that occurs, I can verify that the functionality of the action that was attempted still works. For **submitting a new review**, there may some instances that the newly submitted review may not appear on the table and to fix that issue I found that you can simply **refresh the page**. For **modifying and deleting**, I found by **double clicking the buttons** to be a good way to see the updated results. Again, I think this lag issue seems to be from my render() function being large and expensive. 
