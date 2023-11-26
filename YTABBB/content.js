// Function to wait for an element and then execute a callback
function waitForElement(selector, callback, maxTime = 10000) {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        callback();
      } else if (Date.now() - startTime > maxTime) {  // Timeout check
        clearInterval(interval);
        console.log('Timeout waiting for element');
      }
    }, 500);  // Polling interval, e.g., 500ms
  }
  
  // Function to replace the YouTube player with an iframe
//   function replacePlayerWithIframe() {
//     const videoId = new URLSearchParams(window.location.search).get('v');
//     if (videoId) {
//       const player = document.querySelector('#player'); // Replace with the correct selector
//       if (player) {
//         const iframe = document.createElement('iframe');
//         iframe.src = `https://www.youtube.com/embed/${videoId}`;
//         iframe.width = '100%';
//         iframe.height = '100%';
//         player.replaceWith(iframe);
//       }
//     }
//   }

  function replacePlayerWithIframe() {
    console.log("replacePlayerWithIframe")
    const videoId = new URLSearchParams(window.location.search).get('v');
    if (videoId) {
      browser.storage.sync.get(["iframeWidth", "iframeHeight"]).then((res) => {
        const iframeWidth = res.iframeWidth || 560;  // Default width
        const iframeHeight = res.iframeHeight || 315;  // Default height
  
        const player = document.querySelector('#player'); // Replace with the correct selector
        if (player) {
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.width = iframeWidth;
          iframe.height = iframeHeight;
          player.replaceWith(iframe);
        }
      });
    }
  }
  
  // Function to check and update the iframe source if needed
  function checkAndUpdateIframe() {
    const iframe = document.querySelector('iframe');
    const videoId = new URLSearchParams(window.location.search).get('v');
  
    if (iframe && videoId) {
      const correctSrc = `https://www.youtube.com/embed/${videoId}`;
      if (iframe.src !== correctSrc) {
        iframe.src = correctSrc;
      }
    }
  }
  
  // MutationObserver callback function
  const observerCallback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if navigation occurred (e.g., by examining URL changes)
        if (window.location.href !== currentUrl) {
          currentUrl = window.location.href;
          checkAndUpdateIframe();
        }
        // check if window contains an player element
        if (document.querySelector('#player')) {
          replacePlayerWithIframe();
        }
      }
    }
  };
  
  // Set up and start the MutationObserver
  let currentUrl = window.location.href;
  const observer = new MutationObserver(observerCallback);
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
  
  // Initial check and replacement of the player
  waitForElement('#player', replacePlayerWithIframe);
  