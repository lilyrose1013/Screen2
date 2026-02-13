(function () {
  var calcScript = document.createElement('script');
  calcScript.src = 'calc.js';
  document.body.appendChild(calcScript);

  if (document.body.classList.contains('pay-page')) {
    var ratingScript = document.createElement('script');
    ratingScript.src = 'K.js';
    document.body.appendChild(ratingScript);
  }
})();
