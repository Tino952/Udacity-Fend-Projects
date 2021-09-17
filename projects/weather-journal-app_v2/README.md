# Weather-Journal App - V2

## Overview
This project required creating an asynchronous web app that uses Web API and user data to dynamically update the UI. This was my first project using async javascript. The idea was to fetch weather data from the Openweathermap API, and send a user-inputted message to the server.

In my original version of this app, which did not fulfill rubric requirements, I had the user input a location. In this version, I was required to use only US zip codes. Moreover, in my original version, the user can enter a personal message in a separate input field, and retrieve this message from a further input field. According to the project rubric, however, I was required to integrate the zip code search and the user message into the same input field, and display the user message in the UI with the weather data. This version of the app also differs from V1 in that only one date of weather is displayed. In the original version, I have displayed three days of weather.

The main pillars of this project included:

* Responsive, mobile-first web design
* Asynchronous Javascript and CRUD operations
* Storing and retrieving data from server

## Using the App

The user is requested to enter a destination and a personal message in the main input field. If the user has entered an invalid input, an alert pops up on the browser notifying the user to enter a valid zip code.

Next, the UI updates with the weather for the current date and the personal message of the user.

## Under the Hood
Integration with the Openweathermap API retrieves weather data for a chosen destination.

In the second iteration of this app, the weather data retrieved from the API and the user message are both stored to the server and subsequently retrieved to update the UI.

## Dependencies
None

Stay classy! :sunny:
