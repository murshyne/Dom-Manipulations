const log = console.log.bind(console);
// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector("main");
// console.log(mainEl)

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'

mainEl.style.backgroundColor = "var(--main-bg)";
// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = "<h1> DOM Manipulation</h1>";

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add("flex-ctr");

// Part 2: Creating a Menu Bar
// Next, create a blank menu bar that we can use to later add some interactivity to the page:
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById("top-menu");
log(topMenuEl);
// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
// Add a class of flex-around to topMenuEl.
// Progress Check - Here's what the page should look like so far:
topMenuEl.classList.add("flex-around");

// Iterate over the entire menuLinks array and for each "link" object:
menuLinks.forEach((link) => {
  console.log(link);
  // Create an <a> element .createElement
  let newLink = document.createElement("a");

  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  newLink.setAttribute("href", link.href);
  //   console.log(newLink)

  // Set the new element's content to the value of the text property of the "link" object.
  newLink.textContent = link.text;
  console.log(newLink);

  // Append the new element to the topMenuEl element.
  // Progress Check - Here's what the page should look like so far
  topMenuEl.appendChild(newLink);
});
// ===============================================
// R-ALAB 316.3.1: DOM Manipulation (Part Two)
// ===============================================
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById("sub-menu");
log(subMenuEl);

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = "100%";

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add("flex-around");

// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl = document.getElementById("sub-menu");

// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = "absolute";

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = "0";

// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = topMenuEl.querySelectorAll("a");
log(topMenuEl);

// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener("click", function (event) {
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  event.preventDefault();

  // The second line of code of the function should immediately return if the element clicked was not an <a> element.
  if (event.target.tagName !== "A") {
    return;
  }
  // Log the content of the <a> to verify the handler is working.
  log("Menu item clicked:", event.target.textContent);

  // we will want to add a toggled "active" state to each menu item, showing whether or not it is currently selected
  // let topMenuLinks = topMenuEl.querySelectorAll("a");
  // topMenuLinks.forEach((link) => link.classList.remove("active"));

  let clickedLinkText = event.target.textContent.trim();
  let clickedLink = menuLinks.find((link) => link.text === clickedLinkText);

  // Checks if the clicked link is already active
  let isActive = event.target.classList.contains("active");

  // Remove active class from all links
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Clear submenu if it was previously displayed
  subMenuEl.innerHTML = "";

  // Added the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
  if (isActive) {
    // Remove if already active
    event.target.classList.remove("active");

    // Hide submenu when clicked link is inactive
    subMenuEl.style.top = "0";
  } else {
    // Add if not active
    event.target.classList.add("active");

    // Populate submenu if there are subLinks
    if (
      clickedLink &&
      clickedLink.subLinks &&
      clickedLink.subLinks.length > 0
    ) {
      //Clear the current contents of subMenuEl
      subMenuEl.innerHTML = "";

      // Clear existing submenu items
      clickedLink.subLinks.forEach((subLink) => {
        // Create an <a> element.
        let subLinkElement = document.createElement("a");

        // Add an href attribute to the <a>, with the value set by the href property of the "link" object.
        subLinkElement.setAttribute("href", subLink.href);
        // Set the element's content to the value of the text property of the "link" object.
        subLinkElement.textContent = subLink.text;

        // Append the new element to the subMenuEl.
        subMenuEl.appendChild(subLinkElement);
      });
      subMenuEl.style.top = "100%"; // Show submenu
    } else {
      subMenuEl.style.top = "0"; // Hide submenu if no subLinks
    }
  }

  log("Clicked link content:", event.target.textContent);
});

// Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener("click", function (event) {
  //function call to prevent object's event default action preventDefault() method.
  event.preventDefault();

  //function to immediately return if the element clicked was not an <a> element.
  if (event.target.tagName !== "A") {
    return;
  }
  //Log the content of the <a> to verify the handler is working
  log("Submenu item clicked:", event.target.textContent);

  //the event listener to set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = "0";

  // Remove the active class from each <a> element in topMenuLinks
  topMenuLinks.forEach(link => link.classList.remove("active"));

  // Update the contents of mainEl within an <h1>
  let clickedSubMenuText = event.target.textContent.trim();
  mainEl.innerHTML = `<h1>${clickedSubMenuText}</h1>`;
});
