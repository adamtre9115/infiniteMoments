function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 2000);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
    // document.querySelector(selector).style.opacity = visible ? '1' : '0';
  }
  
  onReady(function() {
    setVisible('#content', true);
    setVisible('#loading', false);
  });