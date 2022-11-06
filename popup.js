$(function() {
  // https://www.cnblogs.com/ministep/p/15852670.html
  // Content.js不能完成跨域请求,故跨域请求只能放在popop.js完成后再通过讯通传递给content.js再给项目页面使用
  // 获取当前窗口tab id
  function getCurrentTabId() {
    return new Promise((resolve, rejuct) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
          resolve(tabs[0].id)
        }
      })
    })
  }
  // ajax获取当前B站默认搜索的信息
  function getBiliBiliSearchDefault() {
    return new Promise((resolve, rejuct) => {
      $.ajax({
        url: 'https://api.bilibili.com/x/web-interface/search/default',
        type: 'get',
        success: res => {
          resolve(res.data)
        }
      })
    })
  }
  // 往content.js发送消息
  function sendMessage(tabId, data) {
    // 如果此回调函数不写,会导致Popup.js报错,但不影响功能
    // Unchecked runtime.lastError: The message port closed before a response was received.
    chrome.tabs.sendMessage(tabId, data, res => {
      console.log(res)
    })
  }
  /**
   * 以下两种通讯方式
   */
  // 1--------------由插件html主动触发异步请求再进行与content.js通讯---------
  $('.wrap').on('click', async () => {
    // Promise.all同时请求两个异步接口
    let [tabId, data] = await Promise.all([
      getCurrentTabId(),
      getBiliBiliSearchDefault()
    ])
    sendMessage(tabId, data)
  })
  // 2-------------由content.js主动触发通知popup.js进行异步请求,再与content.js进行通讯,达到跨域请求的目的
  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      let [tabId, data] = await Promise.all([
        getCurrentTabId(),
        getBiliBiliSearchDefault()
      ])
      sendMessage(tabId, data)
    }
  )
})
