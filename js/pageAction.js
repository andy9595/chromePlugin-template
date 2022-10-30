// chrome.runtime.onMessage.addListener(function(req, sender, res) {
  // if (req.todo === 'showPageAction') {
    // chrome.tabs.query({ currentWindow: true, active: true,url:"https://www.baidu.com" }, function(tabs) {
    //   chrome.pageAction.show(tabs[0].id)
    // })
  // }
 
// })


chrome.tabs.query({currentWindow:true,url:"https://www.taobao.com/"},function(tabs){
    chrome.pageAction.show(tabs[0].id);
})
