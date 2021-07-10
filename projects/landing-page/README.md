# Landing Page Project

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)

## Introduction

* In this project I created a landing page that appends an additional user-defined
number of sections to the DOM upon loading. Thereupon a navigation menu is
dynamically constructed based on the number of sections in the DOM.

* Additional functionalities include scrollIntoView for individual sections which
are activated by clicking on the nav items. Moreover, an active-section class
indicates which section is currently being actively viewed.

* For personal style reasons I have decided to make the nav static and not sticky.
Instead, I have included a minimalistic chevron hover-up icon which includes
some of its own effects, such as a "hover-bob" effect, as well as a rotation
when it has been scrolled to the top of the viewport. This functionality is only
available on large devices.

* Also only on large devices I have created a hover feature to extend the length
of the header underline.

* To maximize performance I have tried to avoid setting event listeners for scrolling
and instead deploy interaction observers. Event listeners are still used for click
events.

*Cheers!*

## Installation

* None

:maple_leaf:
