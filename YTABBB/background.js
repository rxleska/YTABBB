chrome.webNavigation.onCompleted.addListener(function(details) {
    if (details.url.includes("youtube.com/watch")) {
      chrome.tabs.executeScript(details.tabId, {file: "content.js"});
    }
  }, {url: [{urlMatches : 'https://www.youtube.com/watch*'}]});