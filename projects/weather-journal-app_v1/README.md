# Weather-Journal App - V1

## Overview
This project required creating an asynchronous web app that uses Web API and user data to dynamically update the UI. This was my first project using async javascript. The idea was to fetch weather data from the Openweathermap API, and send a user-inputted message to the server. Next, the UI is updated with the weather data from the chosen destination, and the user can retrieve a message from the server using an ID.

Note, I have developed this app without any safety protocols concerning user-inputted data stored on the server. Any user can retrieve data from the server using a valid ID, even if they did not enter this data. This app is made for learning purposes only.

In this project I opted for a very colorful and bright design. I didn't spare any hover effects on the input fields, and used the border-radius shorthand in css to create beautiful imperfect circles.

The main pillars of this project included:

* Responsive, mobile-first web design
* Asynchronous Javascript and CRUD operations
* Storing and retrieving data from server

## Using the App

The user is requested to enter a destination in the first input field. Next, a validating input field pops up to display potential matches with the user's input. Through selecting "yes" or "no" the user is able to iterate through all available destinations that match the given input. This is a continuous loop. If the user has entered an invalid input, an alert pops up on the browser notifying the user.

Below, in the second input field the user is able to enter a personal message, which is stored on the server and can be retrieved in the final input field just above the footer by entering a message ID.

## Under the Hood
Integration with the Openweathermap API retrieves weather data for a chosen destination.

In this first iteration of this app, the weather data retrieved from the API is used to update the UI directly. The user message is however stored on the server. In the second iteration (V2) both the weather data and the user message are stored on the server.

## Dependencies
None

Stay classy! :sunny:
