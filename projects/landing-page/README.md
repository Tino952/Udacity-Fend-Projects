# Dynamic Landing Page

## Overview

In this project I created a landing page that appends an additional user-defined
number of sections to the DOM upon loading. Thereupon a navigation menu is
dynamically constructed based on the number of sections in the DOM.

Additional functionalities include scrollIntoView for individual sections which
are activated by clicking on the nav items. Moreover, an active-section class
indicates which section is currently being actively viewed.

For personal style reasons I have decided to make the nav static and not sticky.
Instead, I have included a minimalistic chevron hover-up icon which includes
some of its own effects, such as a "hover-bob" effect, as well as a rotation
when it has been scrolled to the top of the viewport. This functionality is only
available on large devices.

Also only on large devices I have created a hover feature to extend the length
of the header underline.

To maximize performance I have tried to avoid setting event listeners for scrolling
and instead deploy interaction observers. Event listeners are still used for click
events.

## Using the App

Upon page load the user is prompted by a browser alert to choose how many additional sections she/he would like to add. There are already 4 sections loaded so inputting "1" will make a total of 5 sections.

The user can scroll through the page and activate the different sections, or click on a link in the nav to go directly to a section.

The text is default placeholder text.

## Under the Hood

In this project I became very familiar with the Intersection Observer API, which I learned was more efficient than adding click event listeners to every section.

## Dependencies

None

## Further Developments

In this project I designed the chevron scroll bar using css and border styling. This made it quite difficult to add animation and hover effects that could interact with the intersection observer API. For this reason, in the future I would opt to use a PNG file or image file of a chevron instead. Paricularly as performance is not an issue with this project I think this would styling and animation far easier.

_Cheers!_

:maple_leaf:
