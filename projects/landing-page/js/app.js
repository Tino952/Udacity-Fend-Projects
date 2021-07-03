/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav




// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active

/* ===================================

Building navigation menu

=================================== */

/* Make sure to add comments */

function navInit() {

  addSections()

  const mySections = document.getElementsByTagName("section");

  const myNavLarge = document.createElement("ul");

  const myNavSmall = document.createElement("ul");

  myNavLarge.classList.add("nav");

  myNavSmall.classList.add("nav");

  const myNavSmallDiv1 = document.createElement("div");

  const myNavSmallDiv2 = document.createElement("div");

  myNavSmallDiv1.classList.add("nav__container");

  myNavSmallDiv2.classList.add("nav__container");

  myNavSmall.appendChild(myNavSmallDiv1);

  myNavSmall.appendChild(myNavSmallDiv2);

  for (let section of mySections) {

    const navItem = section.dataset.nav;

    const node = document.createElement("li");

    const link = document.createElement("a");

    link.classList.add("nav__item__link");

    node.appendChild(link);

    link.textContent = navItem;

    node.classList.add("nav__item");

    const nodeClone = node.cloneNode(true);

    /* even section numbers go in the right flex column of the nav,
    while odd section numbers go in the left column */

    if (navItem.split("-")[1] % 2 == 0) {
      myNavSmallDiv2.appendChild(node);
      }
    else {
      myNavSmallDiv1.appendChild(node);
      }

    /* for large screens the nav menu is just one container */

    myNavLarge.appendChild(nodeClone);
    }

    return {
      myNavLarge,
      myNavSmall
    }
  }

/* Creating a function to change navigation styles based
on screen size */

let a = navInit();
let myNavLarge = a.myNavLarge;
let myNavSmall = a.myNavLarge;



function mediaWidth(myWindow) {
  const myNav = document.querySelector("nav");
  myNav.appendChild(myNavSmall);
  if (myWindow.matches) {
    myNav.replaceChild(myNavLarge, myNavSmall)
  }
  else {
    myNav.replaceChild(myNavSmall, myNavLarge)
  }
}

/* Creating a media query for large screen sizes */
const w = window.matchMedia("(min-width: 550px)")

/* Adding an event listener to the window */
w.addListener(mediaWidth);

/* Calling listener function at run time */
mediaWidth(w);

/* Testing functionality by creating 20 additional sections */

function addSections() {

  const myContent = "<h2><span>Section 1</span></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p><p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>"

  for (let i = 5; i<=25; i++) {
    const newElement = document.createElement("section");
    const sectionNum = `Section-${i}`;
    const myNumberedContent = myContent.replace("Section 1", sectionNum);
    newElement.innerHTML = myNumberedContent
    newElement.setAttribute("data-nav", sectionNum);
    const main = document.querySelector("main")
    main.appendChild(newElement);
  }
}

/* ===================================

Create dynamic h2 underline effect for
section headers

=================================== */

/* Each h2 container contains an inline span element that triggers the underline */
/* The reason for this is because I want to only trigger the expanded underline when
the user hovers over the text (contained within the span) rather than the entire header
which stretches across full width of the container */

const mySpans = document.getElementsByTagName("span");

for (let span of mySpans) {
  /* Storing the original value of the underline length in order to revert for mouseout */
  myElement = getComputedStyle(span.parentElement);
  const storedElem = myElement.getPropertyValue("background-size");
  /* Update value of the underline based on mouseover */
  span.onmouseover = function() {
    span.parentElement.classList.add("underline-extend")
  }
  /* Revert to original underline size with mouseout */
  span.onmouseout = function() {
    myElement = getComputedStyle(span.parentElement);
    span.parentElement.style.backgroundSize = storedElem;
  }
}
