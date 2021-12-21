# fakebook

Fakebook is a social network platform. Users can add friends, direct message other users, and share posts for all of their friends to see. It is designed to be simple, responsive, and visually appealing.

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
#### To install and setup this  version of the application
First pull or clone the latest version from the repo(see the installation section above). Then make sure that you have the npm package manager(you can use `npm --version` to see).You will also likely want to install mongoDB https://www.mongodb.com/try if you want to see the login/signup functionality. Next you will want to do a `npm install` inside of the cloned folder to automatically install all the needed dependencies for it to work.
  
now you will want to run the `seed.js` file to seed the mongo database with some users, to do this type `node seed.js` inside the cloned repo folder. Then to start the actual server you will do a `npm start` and to see the actual web app you will need to navigate to your `localhost:3000`

#### Design
  For the architecture of the app we use the MVC, model-view-controller, architecture. This allows us to render conditionally certain pages to the user based on the requests and it also allows for substantial interaction with the database(such as logging in or signing up).
  
In terms of actual design choices, we opted to use layouts with ejs such that we can easily render multiple different pages within the main body content of the page while perserving the header/footer and navigation type menus throughout the site. This is also essentially how the 'login' works right now... it pretty much checks to see if a user with the specified email and password is in the database and if they are it 'logs' you in (by displaying the /home page ) and if it is not, it will display an error message. To do many of these functions we use the mongoose library to easily handle the database data within the program for functionality like signing up and logging in.

### Assignment 4
#### To install and setup this  version of the application
First pull or clone the latest version from the repo(see the installation section above). Then make sure that you have the npm package manager(you can use `npm --version` to see).You will also likely want to install mongoDB https://www.mongodb.com/try if you want to see the login/signup functionality. Next you will want to do a `npm install` inside of the cloned folder to automatically install all the needed dependencies for it to work.
  
now to run the application will you want to use `npm start` in the folder. Then the next step is to navigate to `localhost:3000`, here you will need to make a new user account by clicking on the `create an account` button in green. You will need to make an account in this because we could not get the seed file to work properly with passwords. once you have created an account you can go to `localhost:3000/users/login` to login. Once you are logged in you will see the `/home` page, which on the top left shows who is logged in(you can click on it and see your profile), you can click on `edit profile` to edit your profile and `logout` to logout. In the center left of the screen you will see what  users are on the platform and you can click on their names to view their profiles also. Then in the center of the screen you will see the prompt to `create a post` and also posts that have been made will be underneath it.

#### Design 
  For the design we implemented crud actions to the application to easily allow users to be created, edited, updated, deleted, etc. We also use cookies,express sessions, passport and flashing to handle user accounts/login/logout. we also added the new ability for users to make posts and for the posts to appear on the home screen. The posts consists essentially of simple schema models,controllers, and some ejs to display it properly. Large part of the functionality comes from mongoose and passport and their interfaces which allows for things such as simple user authentication and interaction with the database and application.  

 ![image](https://user-images.githubusercontent.com/78400904/114970723-33d6bb80-9e38-11eb-91d6-300f3b772b78.png)


# Final Project
#### To install and setup this  version of the application
First pull or clone the latest version from the repo(see the installation section above). Then make sure that you have the npm package manager(you can use `npm --version` to see).You will also likely want to install mongoDB https://www.mongodb.com/try if you want to see the login/signup functionality. Next you will want to do a `npm install` inside of the cloned folder to automatically install all the needed dependencies for it to work. Ofcourse you can go to the link here https://lit-garden-61381.herokuapp.com/ to see the live version and not worry about setting anything up.
  
now to run the application will you want to use `npm start` in the folder. Then the next step is to navigate to `localhost:3000`, here you will need to make a new user account by clicking on the `create an account` button in green. You will need to make an account in this because we could not get the seed file to work properly with passwords. once you have created an account you can go to `localhost:3000/users/login` to login. Once you are logged in you will see the `/home` page, which on the top left shows who is logged in(you can click on it and see your profile), you can click on `edit profile` to edit your profile and `logout` to logout. In the center left of the screen you will see what  users are on the platform and you can click on their names to view their profiles also. Then in the center of the screen you will see the prompt to `create a post` and also posts that have been made will be underneath it. you will be able to see posts from users that you have followed. You can also delete your posts by clicking the dellete button on the post. You can also see a section where there are the trending hashtags from posts, this section displays the top 10 hashtags from posts. on the top left bar you can also access your `notifications` which shows you your notifications from people you follow.

![image](https://user-images.githubusercontent.com/78400904/118104037-db8fcc80-b397-11eb-8aaa-030ab9a55dde.png)


#### Design 
  For the design we implemented crud actions to the application to easily allow users to be created, edited, updated, deleted, etc. We also use cookies,express sessions, passport and flashing to handle user accounts/login/logout. we also added the new ability for users to make posts and for the posts to appear on the home screen. The posts consists essentially of simple schema models,controllers, and some ejs to display it properly. Large part of the functionality comes from mongoose and passport and their interfaces which allows for things such as simple user authentication and interaction with the database and application. We have also added the ability to follow and unfollow people which allows the application to conditionally display posts on your home page based on who you are following. And we have added hashtags from posts to a specific trending section. we also use modals to show you your notifications from people you follow.   

![image](https://user-images.githubusercontent.com/78400904/118104923-fadb2980-b398-11eb-8bf8-c9dcb5535709.png)


![image](https://user-images.githubusercontent.com/78400904/118104973-0d556300-b399-11eb-81fb-eae5bcfc98af.png)








## Contributions

The sign-up page and homepage were designed by Andy Le. Server-side validation functions for signup and sign in were designed by Andy Le. The sign-in page was designed by Jacques Steyn.
 
