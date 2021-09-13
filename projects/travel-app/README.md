# Capstone Project - Travel App

## Rationale

The aim of this project was to combine all the skills we learned in the Front End Nanodegree in order to build a web application that enables a user to search for a travel destination, and see a photo of this destination as well as the forecast weather for the chosen dates.

The main pillars of this project included:

* Responsive, mobile-first web design
* CRUD async operations
* Compilation and build with Webpack
* Unit-testing with Jest
* Use of service workers for offline functionality

## Using the App

First, enter a travel destination and pick travel dates. The maximum travel period is one year from the current date. Next, click "Go" in order to see a photo and the predicted weather for this destination, as well as the days remaining until the beginning of the trip.

The user has the option to save a trip or remove a previously saved trip by clicking on the corresponding buttons. This feature works with local storage, enabling the user to see saved trips even if the browser is closed and reopened.

Please note that the Weatherbit API only returns weather forecasts for the next 16 days, so if the entered travel date is further than 16 days in the future, no weather information is returned.

## Under the Hood

APIs used include:

* Geonames API
* Weatherbit API
* Pixabay API

Upon entering a destination in the search bar the user triggers a get request of matching destinations from the Geonames API. This populates a custom dropdown returning the first 10 search results from Geonames. Upon selecting a destination, the coordinates of that destination, which were saved as attributes to each list element of the dropdown are sent to the Weatherbit API to search for the weather for those coordinates. Finally, the Pixabay API receives the city name selected by the user and shows a randomly selected top 10 search result image for that destination. If the user enters an obscure city name that doesn't generate any search results on Pixabay, a default photo of the search term "city" is used instead.

## Dependencies

Please refer to the package.JSON file for an overview of all dependencies used.

## Defining Features of this Project

In this project in particular I focused on better understanding the unit-testing package Jest. In particular, I ran tests in the following areas:

* Virtual-DOM environment
* On the server using supertest to mimic HTTP requests
* Using module mocking to inject dependencies into tests of asynchronous functions
* Maintaining one config file while running tests in multiple environments (virtual DOM and node)

Moreover, in this project I learned and implemented the use of local storage to save data to the browser.

## Extended Options for Udacity Grader

I have decided to implement the following extensions to this project:

* Returning a default photo if the chosen destination generates no hits on Pixabay
* Using local storage to save and retrieve user searches
  * This also allows the user to remove a previously saved trip

## Further Developments

With more time and effort into this project I would like to further modularize my code, breaking larger functions into smaller ones, and generally refactoring my code. Furthermore I would improve the visual design of the layout and generally make the user experience more visually appealing. Further developments I would have liked to implement include:

* Allowing the user to generate a PDF of saved searches
* Incorporate icons into the weather forecast

Cheers! :v:
