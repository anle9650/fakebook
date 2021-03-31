# fakebook

Fakebook is a social network platform. Users can add friends, direct message other users, and share posts for all of their friends to see. It is designed to be simple, responsive, and visually appealing. It is currently in the early stages of development. This is purely a visual and non-functional demonstration of the application.

## Installation

Clone the repository from Github (https://github.com/anle9650/webapp_spring2021_final.git). This will include the example pages: signin.html, signup.html, and home.html. The styling page can be found in styling/main.css.

```bash 
gh repo clone anle9650/webapp_spring2021_final
```
or
```bash
git clone https://github.com/anle9650/webapp_spring2021_final.git
```

For getting further updates we recommend using github desktop to fetch changes  

## Technologies used

 
### Assignment 2 
For the first check it compares the 2 passwords values and if they are not the same then we try and display a message and turn the color yellow. For the second check it iterates through the input elements and checks to see if any of the invalid characters are in the inputs and if they are then they are marked with yellow and a message is displayed. For the third check we iterate through the password value and check to see if atleast 1 character is lowercase, 1 character is uppercase, and 1 character is a number and for each of these we set a boolean that then we can see if the user does not have all 3 then display a message and change the color again. Finally for the security answer it utilizes an invisible class that has the css set the display to none and when the selection is changed it removes the invisible class.  


### Assignment 3
#### To install and setup this application
First pull or clone the latest version from the repo(see the installation section above). Then make sure that you have the npm package manager(you can use `npm --version` to see).You will also likely want to install mongoDB https://www.mongodb.com/try if you want to see the login/signup functionality. Next you will want to do a `npm install` inside of the cloned folder to automatically install all the needed dependencies for it to work.
  
now you will want to run the `seed.js` file to seed the mongo database with some users, to do this type `node seed.js` inside the cloned repo folder. Then to start the actual server you will do a `npm start` and to see the actual web app you will need to navigate to your `localhost:3000`



## Contributions

The sign-up page and homepage were designed by Andy Le. The sign-in page was designed by Jacques Steyn.
 
