# Life's A Beach

## Description

Life's A Beach is a Budget Web Appn to plan future vacations

User stories
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
500 - As a user I want to see a nice error page if there is a problem.
login-signup - As a user I want to see a welcome page that gives them the option to either log in as an existing user, or sign up with a new account.
add-signup - As a user they can sign up with Username and email.
homepage - On the home page they can trips already planned or start a new one.
Next pages, ask the user information about the kind of trip that they want to plan. With options to go to the previous screen or enter the information and continue to the next screen.
The final screen will take the information provided and calculate the estimate cost as well as how much money every month the user will need to save in order to take the planned vacation.

## API routes (back-end)

-GET /
renders create a profile or login page

//login page
-GET/login.hbs
renders page to enter email and password. Directs user to current vacations planned and asks if the user wants to start a new one.

//first page of creating a new vacation
-POST/budget.hbs
asks the user to enter the total amount they would like to spend on the trip, this will get stored as total, to be modified with every iteration

//second page
-POST/time.hbs
this page will ask the user how long they want the trip to last

//third page,
-POST/when.hbs
this page will ask the user when do they want to take the trip, with a drop down of three choices. In 3 months, in 6 months or in 1 year

//fourth page,
-POST/destination.hbs
this page will let the user choose one of the pre programmed destinations.

//fifth page
-POST/sleep.hbs
this page will ask the user to choose one of three choices to determine the luxury level of the trip

//sixth page
-POST/activities.hbs
this page will ask the user to chooe from a list of activities they might want to participate in. And will add the costs to the total of the trip

//seventh page
-GET/saved
this page will ask the user how much money they have already saved for this trip to better estimate the time it will take to reach their goal. If number is zero, this is perfectly ok.

//eighth page
-GET/total
this page will add the total and subtract what they have saved, then display the cost of the trip and then calculate the amount every month they will need to save in order to reach their desired goal for the vacation. It will then prompt the user to the final screen

//ninth page
-GET/final
this page will show a pie chart of the breakdown of the trip and ask the user if they want to save this information for later use.

Models
User new Schema ({ email: String, required: true, password: String, minlength: 6, maxlength: 12 })

## Data Structure

## Links

https://whimsical.com/life-s-a-beach-XwrJiGYjuuWT3GEJYyR51P

### Deployed Version

https://lifes-a-beach.herokuapp.com/
