# Natural Language Processing Project

## Rationale

The aim of this project is to build a client and server-side architecture in order to interact with the Meaning Cloud API
using RESTful services. I have decided to implement the summarizing functionality provided by the Meaning Cloud API.

This functionality relies on a natural language processing algorithm to shorten long texts to a desired length while attempting
to include only the most pertinent details from the text.

This project is compied and built using webpack. Tests to validate user input are implemented in jest, and service workers are installed to allow for offline functionality and less server time.

## Using SummarizeMe

First, select a URL with a text that you wish to summarize. Past3 this URL into the designated input-field in the UI, press enter, and finally select within how many sentences you would like the summary to be generated. Hit enter one more time to generate your summary.

Your summary will appear in the output-box below.


## Dependencies

Please refer to the package.JSON file for an overview of all dependencies used.

## Additional Features of this Project

I have decided to implement a hand-drawn arrow to the url-input box using canvas. In order to calculate the angle of the arrow head, and draw a curved line using a quadratic bezier function, I relied on the following resources. Credits to these developers for this part of the project.

* Arrow Head: [https://gist.github.com/bhtek/a2d545cf4dae316c8329]

* Quadratic Bezier: [https://developpaper.com/drawing-a-curve-animation-with-canvas/]


Shaka Khan :squid:
