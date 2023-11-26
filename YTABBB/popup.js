function saveSize(e) {
  e.preventDefault();
  browser.storage.sync.set({
      iframeWidth: document.querySelector("#iframeWidth").value,
      iframeHeight: document.querySelector("#iframeHeight").value
  });
}

function restoreSize() {
  // ... existing restore logic ...
}

function adjustAspectRatio() {
  const lockAspectRatio = document.querySelector("#aspectRatioLock").checked;
  const iframeWidthInput = document.querySelector("#iframeWidth");
  const iframeHeightInput = document.querySelector("#iframeHeight");

  if (lockAspectRatio) {
      const width = iframeWidthInput.value;
      iframeHeightInput.value = (width / 16 * 9).toFixed(0);  // Adjust height based on width
  }
}

document.addEventListener("DOMContentLoaded", restoreSize);
document.querySelector("#size-form").addEventListener("submit", saveSize);
document.querySelector("#iframeWidth").addEventListener("input", adjustAspectRatio);
document.querySelector("#aspectRatioLock").addEventListener("change", adjustAspectRatio);

// Add similar event listener for iframeHeight if you want to adjust width based on height
