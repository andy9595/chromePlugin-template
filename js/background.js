chrome.runtime.onMessage.addListener(async(req, sender, sendResponse) => {
  console.log(req)
  sendResponse()
  let tabId = await getTabsId()
  chrome.tabs.sendMessage(tabId, "data", function () {
    console.log("background.js收到响应");
})
})
function getTabsId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      resolve(tabs[0].id)
    })
  })
}
