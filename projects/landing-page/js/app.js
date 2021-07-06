/* ===================================

Calling all functions

=================================== */

/* calling our navigation initializer function. This function in turn first
calls the addSection function to apoend additional sections in the DOM. Finally,
the function underlineExtend is called which adds additional functionality to
each section in the DOM. Note that this function is called with a timeout delay.
The reason for this is because the user input triggered by the addSection function
would otherwise interupt repaint & reflow of our page. You can test this out by
setting the timeout to zero. */
setTimeout(navInit, 1000);
/* function which calls activeClass() which adjusts border box on current
section in viewport. A scroll delay for large screen sizes creates a smoother
functionality */
activeClassScrollStop();
/* adding a scroll to top functionality to chevron */
chevronScrollToTop();
/* making chevron rotate when scrolled to top of viewport */
rotateChevron();

/* ===================================

Building navigation menu

=================================== */

function navInit() {

  /* Running function to add new sections to page */
  addSections();
  const mySections = document.getElementsByTagName("section");
  const myNav = document.querySelector("nav");
  /* initaliazing a new unordered list */
  const navUl = document.createElement("ul");
  /* adding an existing css class from layout.css */
  navUl.classList.add("nav");
  /* looping through all sections in page */
  for (let section of mySections) {
    /* retrieving section number from the dataset attribute */
    const navItem = section.dataset.nav;
    /* creating a list element */
    const node = document.createElement("li");
    /* adding section name */
    node.textContent = navItem;
    /* adding an existing css class from layout.css */
    node.classList.add("nav__item");
    /* adding an event listener to nav items to scroll into view when
    clicked */
    node.addEventListener("click", () =>
    /* if window is greater than 400px then scroll to center,
    otherwise for smaller screens scroll to top of section */
    { if (window.innerWidth > 400) {
      section.scrollIntoView({block: "center", behavior: "smooth"})}
    else {
      section.scrollIntoView({block: "start", behavior: "smooth"})}
    });
    /* appending list item to unordered list */
    navUl.appendChild(node);
  }
    /* appending unordered list to nav element in HTML file */
    myNav.appendChild(navUl);

    underlineExtend();
  }

/* ===================================

Adding additional sections

=================================== */

/* Testing functionality by creating additional sections */
/* This will be prompted by a user-defined input number */

function addSections() {

  /* section content will be added all at once using innerHTML property */
  const myContent = "<h2><span>Section 1</span></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p><p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>";

  let userInput = window.prompt("Hello there, how many additional sections would you like to add?");

  /* starting at section 5 because we already have sections 1-4 in our HTML
  file */
  for (let i = 5; i<=userInput; i++) {
    const newElement = document.createElement("section");
    const sectionNum = `Section-${i}`;
    const myNumberedContent = myContent.replace("Section 1", sectionNum);
    newElement.innerHTML = myNumberedContent;
    /* adding data attribute for our navInit function */
    newElement.setAttribute("data-nav", sectionNum);
    const main = document.querySelector("main");
    /* appending new sections at end of main section of HTML file */
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
which stretches across full width of the container. If it was just a hover effect on then
h2 this could have been resolved in css */

function underlineExtend () {

  const mySpans = document.getElementsByTagName("span");

  for (let span of mySpans) {
    span.onmouseover = function() {
      /* targeting the parent h2 heading to increase length of underline */
      span.parentElement.classList.add("underline-extend")
    };
    span.onmouseout = function() {
      span.parentElement.classList.remove("underline-extend")
    };
  }
}

/* ===================================

Adding Active Class marker to sections in
viewport

=================================== */

/* defining function to move the active-class id to section in viewport
This function will be activated by an event listener defined below */

function activeClass () {

  /* grabbing our sections and our active class id hook */
    const mySections = document.getElementsByTagName("section");
    myClass = document.querySelector("#active-class");
    /* looping through our sections */
    for (let section of mySections) {
      /* get dimensions of our section */
      const dimensions = section.getBoundingClientRect();
      /* on large screens we want our entire section to be in the viewport to
      be classified as active */
      if (dimensions.top >=0 && dimensions.bottom <= (window.innerHeight
        || document.documentElement.clientHeight) && window.innerWidth > 400){
          myClass.removeAttribute("id");
          section.setAttribute("id", "active-class");
        }
      /* on small screens our section is active if the top is within viewport */
      else if (window.innerWidth <= 400 && dimensions.top >=0 &&
      dimensions.top < window.innerHeight) {
        myClass.removeAttribute("id");
        section.setAttribute("id", "active-class");
      }
      else {
        continue;
      }
    }
  }


/* Creating an event listener for when scrolling stops
This creates a smoother transition of active-class while scrolling through
the page */

  function activeClassScrollStop () {
    /* Initializing timer */
    let timer = null;

    window.addEventListener("scroll", () => {
      /* If we scroll while our timer is running, then reset timer */
      if (timer !== null) {
        clearTimeout(timer);
      }
      /* Set a timeout to fire for 200ms after we started scrolling
      Only for large screen sizes. For small screen sizes due to
      increased speed of scroll we switch active class immediately, also
      to prevent an "overscroll" where user scrolls to middle of p element,
      therefore jumping over section top active class trigger  */

      if (window.innerWidth <= 550) {
        activeClass();
      }
      else {
        timer = setTimeout(() => {
          activeClass();
        }, 200);
      }
    });
  }


/* ===================================

Adding scroll to top functionality to
sticky chevron

=================================== */

function chevronScrollToTop () {

  const pageTop = document.querySelector("body");

  const sticky = document.querySelector(".sticky-icky-hover-helper");

  sticky.addEventListener("click", () => {
    pageTop.scrollIntoView({block: "start", behavior: "smooth"})
  });
}

/* adding a function to rotate chevron counterclockwise by 90° when
scrolling down */

function rotateChevron () {

  const chevron = document.querySelector(".sticky-icky__chevron");

  window.addEventListener("scroll", () => {
    /* opting against using an IntersectionObserver because this would also
    trigger the rotate when the chevron enters the bottom of the viewport.
    I only want a trigger when the chevron enters the top area i.e. when it
    sticks to the top */
    let dimensions = chevron.getBoundingClientRect();
    /* setting trigger of 50px to top of viewport */
    if (dimensions.top < 50) {
      chevron.classList.add("rotate")
    }
    else {
      chevron.classList.remove("rotate")
    }
  });
}
