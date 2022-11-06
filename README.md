{
  "manifest_version": 2, // 浏览器插件版本
  "name": "helloWorld",  // 插件名称
  "version": "1.0",  // 插件自身版本号
  "description": "hello world 插件", // 插件描述
  "icons": {  // 插件的图标
    "128": "img/logo.png",
    "48": "img/logo.png",
    "16": "img/logo.png"
  },
  "browser_action": {
    "default_icon": "img/logo.png", // 插件打开的图标
    "default_popup": "popup.html" // 插件默认打开
  },
  "permissions": [  // 插件授权使用的chrome API , 还有更多权限请查阅
    "storage",
    "tabs" ,
  "<all_urls>"  // 所有url 都授权以上功能  
  ],
   "background": {  // 伴随浏览器打开而运行的Js,生命周期最长
        "scripts": ["./background.js"], 
        "persistent": false //是否在页面上一直运行
    },
  "content_scripts": [{
    "matches": ["<all_urls>"],    //所有地址
    "matches": ["https://www.baidu.com/", "http://www.baidu.com/"], // 匹配如下规则时,插件帮忙注入下方js css到项目中
    "js": ["./test.js"], // 注入此js到项目中,项目中可以访问插件注入JS的变量
    "css": ["./css/custom-style.css"], // 注入此css到项目中
    "run_at": "document_idle"
  }],
  "chrome_url_overrides": {
    "newtab": "new.html" // 新标签页:newtab，历史记录页面:history，书签页:bookmarks，需要注意的是，每个插件仅可以重写一个页面
  },
  "options_page": "options.html"
}

https://cloud.tencent.com/developer/article/2059668
<!-- content-scripts  -->
/**
content-scripts 
1.是可以获取页面dom ,并可以修改
2.不能直接访问除了chrome.extension之外的chrome.*接口
3.如果要实现请求及相关chrome的API,可以通过与popop.js与background.js进行通讯

*/
