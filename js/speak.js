
var menuItem = {
  "id":"tts",
  "title":"使用语音朗读",
  "contexts":["selection"]
}
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  //clickData.menuItemId:被点击的菜单选项卡的id
  //clickData.selectionText:选中的内容
  if(clickData.menuItemId == 'tts' && clickData.selectionText){
      chrome.tts.speak(clickData.selectionText,{"rate":0.7});
  }
})
