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
    /* for large device screens scroll to center of section,
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

    /* function which calls activeClass() which in turn adjusts border box of
    current section in viewport. */
    activeClass();
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

Adding Active Class marker to sections in
viewport

=================================== */

function activeClass () {

  let mySections = document.querySelectorAll("section");

  let myNav = document.querySelector(".nav")

  /* setting rootMargin to -50% margin on top and bottom. This way only the
  section currently overlapping the very center of the viewport will be
  triggered as the active section */
  let config = {rootMargin: "-50% 0% -50% 0%"};

  const observer = new IntersectionObserver((entries)=> {
    entries.forEach(entry => {
      /* clearing any active-class. Originally I opted for a toggle
      functionality, however this turned out a little buggy */
      entry.target.classList.remove("active-class");
      /* checking if section intersecting the viewport's center */
      if (entry.isIntersecting) {
        /* if section is intersecting, then designate it as active class */
        entry.target.classList.add("active-class");
        /* adding the active-class marker to corresponding nav item */
        let currentSection = entry.target.dataset.nav;
        /* iterating through the text content i.e section names of each nav
        item */
        for (navItem of myNav.children) {
          /* if the nav title is equal to the current section title, then add
          an active class marker to the nav item */
          if (navItem.textContent == currentSection) {
            navItem.classList.add("nav-active-class");
          }
          /* otherwise, remove any active class marker on iterated nav item */
          else {
            navItem.classList.remove("nav-active-class");
          }
        }
      } else {
          /* without following code, the section 1 nav item would remain
          with the active class selector when scrolling to the top of the
          page */
          for (navItem of myNav.children) {
            if (navItem.classList.contains("nav-active-class")) {
              navItem.classList.remove("nav-active-class");
            }
          }
      }
    }
    )},config);
    for (let section of mySections) {
      observer.observe(section);
    };
}

/* ===================================

Chevron Functionality

=================================== */

/* scroll to top functionality to sticky chevron */

function chevronScrollToTop () {

  const pageTop = document.querySelector("body");

  const sticky = document.querySelector(".sticky-icky-hover-helper");

  sticky.addEventListener("click", () => {
    pageTop.scrollIntoView({block: "start", behavior: "smooth"})
  });
}

/* function to rotate chevron counterclockwise by 90° when scrolling down */

function rotateChevron () {

  const chevron = document.querySelector(".sticky-icky__chevron");

  /* from layout.css we can see that sticky-icky container is offset from top
  of viewport by 3em. Hence, first we compute default font size, then multiply
  this by 3 before subtracting this value from the window's inner height, and
  setting this value as a negative bottom margin in the rootmargin. This will
  enable us to activate the rotate class as soon as the chevron starts to stick
  to the top of the viewport. */

  let defaultFontSize = window.getComputedStyle(document.querySelector("body")).fontSize;

  let chevronSpaceFromTop = parseInt(defaultFontSize)*3;

  let c = window.innerHeight - chevronSpaceFromTop;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      chevron.classList.add("rotate");
  } else {
    chevron.classList.remove("rotate");
  }},{rootMargin: `0px 0px -${c}px 0px`});

  observer.observe(chevron);

}
