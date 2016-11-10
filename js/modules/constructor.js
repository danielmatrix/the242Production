  window.Listings = {
  inputTimer: null,
  config: null,
  
  listSuggestionsData: '',
  PsSuggestionsData: '',
  bpSuggestionData: '',
  
  listCompanyData: '',
  psCompanyData: '',
  displayProductsData: '',
  displaySeasonCompanyData: '',
  helpWantedActiveData: '',
  displaySalesEventsData: '',
  displaySalesData: '',
  displayClassifiedsData: '',
  displayForRentData: '',
  
  HBsearchTypeFun: null,
  HBsearchIslandFun: null,
  HBlistSuggestionsFun: null,
  HBpsSuggestionFun: null, 
  HBbpSuggestionFun: null,
  HBlistComapanyFun: null, 
  HBpsCompnayFun: null,
  HBdisplayProductsFun: null,
  HBdisplaySeasonProductsFun: null,
  HTMLdisaplayCompanyProductsFun: null,
  HBlistLocationFun: null,
  HBdisplaySeasonCompanyFun: null,
  HBdisplayHelpWantedFun: null,
  HBdisplaySalesEventsFun: null,
  HBdisplaySalesFun: null,
  HBdisplayClassifiedFun: null,
  HBdisplayForRentFun: null,

  filteredListCompany: null,
  listCompFiltered: false,
  psCompFiltered: false,
  psDisplayFiltered: false,
  classifiedDisplayFiltered: false,
  forRentDisplayFiltered: false,
  seasonCompanyFiltered: false,
  salesEventsFiltered: false,
  salesFiltered: false,
  seasonSearchClicked: false,
  filteredListPS: null,
  filteredHelpWanted: false,
  PSMultiMapArray: [],  
  inputText: '',
  mapOrigin: '',
  singleMap: '',
  curLatLng: '',
  curAddToMarkerInfo: '',
  psIslandList: null,
  dpsIslandList: null,
  spdIslandList: null,
  mapAllBtn: false,
  memberType: 0,
  island_id: "0",

  season_image:'',
  season_id: '',
  season_name:'',
  
  
  map: null,
  
  
  
  searchTypeArray: [
  ['All Listings','active','1'],
  ['Product & Service','','2'],
  ['Shopping','','4'],
  ['Sales','','9'],
  ['Sales & Events','','8'],
  ['Help Wanted','','5'],
  ['For Rent','','7'],
  ['Classifieds','','6'],
  ['Government','','3']
],

  islandArray: [
    ['The Bahamas','active','0'],
    ['Nassau','','1'],
    ['Freeport','','2'],
    ['Abaco','','3'],
    ['Acklins','','4'],
    ['Andros','','5'],
    ['Berry Islands','','6'],
    ['Bimini','','7'],
    ['Cat Island','','8'],
    ['Crooked Island','','9'],
    ['Eleuthera','','10'],
    ['Exuma','','11'],
    ['Inagua','','12'],
    ['Long Island','','13'],
    ['Mayaguana','','14'],
    ['Ragged Island','','15'],
    ['Rum Cay','','16'],
    ['San Salvador','','17'],
    ['Rose island','','18']
  ],

  islandLookUp: {
    nas:'Nassau',
    'new':'Nassau', 
    fre:'Freeport',
    gra:'Freeport',
    aba:'Abaco',
    ack:'Acklins',
    and:'Andros',
    ber:'Berry Islands',
    bim:'Bimini',
    cat:'Cat Island',
    cro:'Crooked Island',
    ele:'Eleuthera',
    exu:'Exuma',
    ina:'Inagua',
    lon:'Long Island',
    may:'Mayaguana',
    rag:'Ragged Island',
    rum:'Rum Cay',
    san:'San Salvador',
    ros:'Rose island'
  },


  // <a id="alogin" href="#" tabindex="-1" data-element='aLogin' data-status='login'><span>Login<span></a>
  nonMemberArray: [
    {'text':'Login', 'id':'alogin', 'data_element':'aLogin', 'data-status':'login'},
    {'text':'Links', 'id':'links', 'data_element':'dropMenuLinks', 'data-status':''},
    {'text':'Help', 'id':'help', 'data_element':'dropMenuHelp', 'data-status':''},
    {'text':'Home', 'id':'home', 'data_element':'dropMenuHome', 'data-status':''},
    {'text':'Contact Us', 'id':'contact_menu', 'data_element':'dropMenuContactUs', 'data-status':''},
    {'text':'Support', 'id':'support_menu', 'data_element':'dropMenuSupport', 'data-status':''},
    {'text':'Privacy Policy', 'id':'privacy_menu', 'data_element':'dropMenuPrivacy', 'data-status':''}
  ],

  freeMemberArray: [
    {'text':'My Listings', 'id':'listings_free', 'data_element':'freeMemListings', 'data-status':''},
    {'text':'Classifieds', 'id':'classifieds_free', 'data_element':'freeMemClassified', 'data-status':''},
    {'text':'Resume', 'id':'resume_free', 'data_element':'freeMemResume', 'data-status':''},
    {'text':'For Rent', 'id':'for-rent', 'data_element':'dropForRent', 'data-status':''},
    {'text':'Links', 'id':'links', 'data_element':'dropMenuLinks', 'data-status':''},
    {'text':'Login', 'id':'alogin', 'data_element':'aLogin', 'data-status':'login'},
    {'text':'Help', 'id':'help', 'data_element':'dropMenuHelp', 'data-status':''},
    {'text':'Home', 'id':'home', 'data_element':'dropMenuHome', 'data-status':''},
    {'text':'Contact Us', 'id':'contact_menu', 'data_element':'dropMenuContactUs', 'data-status':''},
    {'text':'Support', 'id':'support_menu', 'data_element':'dropMenuSupport', 'data-status':''},
    {'text':'Privacy Policy', 'id':'privacy_menu', 'data_element':'dropMenuPrivacy', 'data-status':''}

  ],

  fullMemberArray: [
    {'text':'My Listings', 'id':'listings_free', 'data_element':'freeMemListings', 'data-status':''},
    {'text':'Classifieds', 'id':'classifieds_free', 'data_element':'freeMemClassified', 'data-status':''},
    {'text':'Resume', 'id':'resume_free', 'data_element':'freeMemResume', 'data-status':''},
    {'text':'For Rent', 'id':'for-rent', 'data_element':'dropForRent', 'data-status':''},
    {'text':'Links', 'id':'links', 'data_element':'dropMenuLinks', 'data-status':''},
    {'text':'Login', 'id':'alogin', 'data_element':'aLogin', 'data-status':'login'},
    {'text':'Help', 'id':'help', 'data_element':'dropMenuHelp', 'data-status':''},
    {'text':'Home', 'id':'home', 'data_element':'dropMenuHome', 'data-status':''},
    {'text':'Contact Us', 'id':'contact_menu', 'data_element':'dropMenuContactUs', 'data-status':''},
    {'text':'Support', 'id':'support_menu', 'data_element':'dropMenuSupport', 'data-status':''},
    {'text':'Privacy Policy', 'id':'privacy_menu', 'data_element':'dropMenuPrivacy', 'data-status':''}
],

  seasons: [
    {"name":"Valentines", "image":"url('images/seasons/Valentines.jpg')", "id":"2","start":"2015-02-01", "end":"2014-02-17", "open":"2015-01-29"},
    {"name":"Easter", "image":"url('images/seasons/Easter.jpg')", "id":"3","start":"2015-03-01", "end":"2014-04-08", "open":"2015-02-26"},
    {"name":"Mother's Day", "image":"url('images/seasons/MothersDay.jpg')", "id":"4","start":"2015-05-01", "end":"2014-05-13", "open":"2015-04-28"},
    {"name":"Bridal", "image":"url('images/seasons/bridal.jpg')", "id":"6","start":"2015-05-15", "end":"2014-06-10", "open":"2015-05-12"},
    {"name":"Father's Day", "image":"url('images/seasons/FathersDay.jpg')", "id":"5","start":"2015-06-15", "end":"2014-06-25","open":"2015-06-12"},
    {"name":"Happy Independence", "image":"url('images/seasons/statue-of-liberty.jpg')", "id":"7","start":"2015-06-27", "end":"2014-07-31", "open":"2015-06-23"},
    {"name":"Summer", "image":"url('images/seasons/Summer2.jpg')", "id":"8","start":"2016-07-26", "end":"2014-07-27", "open":"2015-07-12"},
    {"name":"Back to School", "image":"url('images/seasons/BackToSchool.jpg')", "id":"13","start":"2015-08-01", "end":"2015-09-15", "open":"2015-07-29"},
    {"name":"Halloween", "image":"url('images/seasons/Halloween2.jpg')", "id":"14","start":"2015-09-20", "end":"2015-11-03", "open":"2015-09-17"},
    {"name":"Holidays", "image":"url('images/seasons/Holidays3.jpg')", "id":"15","start":"2015-11-07", "end":"2016-01-10", "open":"2015-11-04"}
],


};