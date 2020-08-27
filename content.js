let enabled = false;
let injected = false;

let link;
let cssPath;
const decorations = [];


// Be nice and only put stuff on the page once the icon is clicked
function injectPayload() {
    cssPath = chrome.runtime.getURL("ooer.css");

    link = document.createElement("link");
    link.id = "ooer-css";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssPath;
    document.head.appendChild(link);

    const soupdog = document.createElement("img");
    soupdog.src = chrome.runtime.getURL("img/soupdog.png");
    soupdog.classList.value = "ooer-soupdog";
    soupdog.setAttribute("style", "");
    decorations.push(soupdog);
    document.body.appendChild(soupdog);

    const raptor = document.createElement("img");
    raptor.src = chrome.runtime.getURL("img/raptor.jpg");
    raptor.classList.value = "ooer-raptor";
    raptor.setAttribute("style", "");
    decorations.push(raptor);
    document.body.appendChild(raptor);

    const deadpixel = document.createElement("div");
    deadpixel.classList.value = "ooer-deadpixel";
    deadpixel.setAttribute("style", "");
    decorations.push(deadpixel);
    document.body.appendChild(deadpixel);

    injected = true;
}


// Undisable the Ooer stuff, unless it hasn't been injected onto the page yet,
//   in which case do that instead
function enable() {
    if (enabled) {
        return;
    }

    if (!injected) {
        injectPayload();
        // The content is enabled by default, so no need to go through
        //   re-enabling just yet
        enabled = true;
        return;
    }

    link.href = cssPath;

    for (const dec of decorations) {
        dec.style.visibility = "visible";
    }

    enabled = true;
}


// Disable the Ooer stuff
function disable() {
    if (!enabled) {
        return;
    }

    // Disable the CSS by removing the path to the link's stylesheet
    link.removeAttribute("href");

    for (const dec of decorations) {
        dec.style.visibility = "hidden";
    }

    enabled = false;
}


// Let other parts of the extension (namely, background.js) tell content.js to
//   toggle the Ooer content
chrome.runtime.onMessage.addListener( (request) => {
    if (request === "toggle") {
        if (enabled) {
            disable();
        } else {
            enable();
        }
    }
});
