
//1、创建contextMenus
var contextMenu = {
  id:"addAmount",
  title:"添加消费",
  //contexts:page,video...
  contexts:["selection"]
}
chrome.contextMenus.create(contextMenu);
//2、为contextMenus添加事件监听
chrome.contextMenus.onClicked.addListener(function(clickData){
  //clickData.menuItemId:被点击的菜单选项卡的id
  //clickData.selectionText:选中的内容
  if(clickData.menuItemId == 'addAmount' && clickData.selectionText){
      var amount = parseFloat(clickData.selectionText);
      //1、从浏览器获取存储的金额
      chrome.storage.sync.get('total',function(budget){
          var totalAmount = 0;
          if(budget.total){
              totalAmount = parseFloat(budget.total);
          }
          //2、将本次金额加到总金额中
          if(amount){
              totalAmount += amount;
              chrome.storage.sync.set({'total':totalAmount},function(){
                  if(totalAmount > parseFloat(budget.limit)){
                      var notifyOptions = {
                          type:'basic',
                          title:'提示！',
                          iconUrl:'img/logo.png',
                          message:'您消费的总金额已经超出限制！'
                      }
                      chrome.notifications.create('limitNotify',notifyOptions);
                  }
              });
          }
      })
  }
})

chrome.storage.onChanged.addListener(function(changes,storageName){
  //changes.total.newValue:总金额变化后的值
  chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
  chrome.browserAction.setBadgeBackgroundColor({"color":[0,255,0,255]});
});
