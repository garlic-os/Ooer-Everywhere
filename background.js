// When icon clicked
chrome.browserAction.onClicked.addListener( () => {
    // Find which tab the user is currently on
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Tell that instance of this extension's content.js to
        //   toggle the Ooer content
        chrome.tabs.sendMessage(tabs[0].id, "toggle");
    });
});
