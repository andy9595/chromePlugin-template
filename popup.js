$(function() {
  chrome.storage.sync.get(['total', 'limit'], function(budget) {
    $('#count').text(budget.total ? budget.total : 0)
    $('#limit').text(budget.limit ? budget.limit : '无')
  })
  $('#btn').on('click', function() {
    let storageNum = parseFloat($('#count').text())
    let currentNum = parseFloat($('#num').val())
    let num =storageNum + currentNum
    if (num > $('#limit').text()) {
      let notifyOptions = {
        type: 'basic',
        title: '提示！',
        iconUrl: 'img/logo.png',
        message: '您消费的总金额已经超出限制！'
      }
      chrome.notifications.create('limitNotify',notifyOptions);
      return
    }
    chrome.storage.sync.set({ total: num },function () { 
      $('#count').text(storageNum + currentNum)
     })
  })
})
