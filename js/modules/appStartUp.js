//Sets up css class for menu accordians Islands and Listings
(function (){
  window.Listings.init();		
  $('#btn_menu').one('click', function(evt){
  $('div.island').toggleClass('island');
  $('div.search').toggleClass('search');
})
})();