$(function(){
  //  content.js异步请求会存在跨域问题,所以请求得放在background.js或popup.js然后再通过通讯再传回给content.js,方可再渲染给项目的页面
  $('.s-p-top').click(()=>{
   chrome.runtime.sendMessage("send", function (res) {
      console.log(res);
    });
  })
  // 注册监听事件
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let {goto_value,show_name} = request
    if(goto_value){
     $('#kw').val(show_name)
    }
    sendResponse('conten.js 已经收到来自 popup.js的消息')
})
})