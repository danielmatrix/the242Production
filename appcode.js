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
    {"name":"Holidays", "image":"url('images/seasons/Holidays3.jpg')", "id":"15","start":"2015-11-07", "end":"2016-01-10", "open":"2015-11-04"},
],


};

window.Listings.config = {
    HTMLsearchType: $('#searchTypes').html(),
    DOMsearchType: $('#searchCarousel')[0],

    HTMLsearchIslands: $('#searchIslands').html(),
    DOMdivSearchIslands : $('#islandCarousel')[0],

    HTMLlistSuggestions: $('#tmp_list_suggestions').html(),
    DOMulListSuggestions: $('ul#ul-list-suggestions')[0],

    HTMLpsSuggestions: $('#tmp_ps_suggestions').html(),
    DOMulPsSuggestions: $('ul#ul-ps-suggestions')[0],

    HTMLbpSuggestions: $('#tmp_bp_suggestions').html(),
    DOMulBpSuggestions: $('ul#ul-bp-suggestions')[0],

    HTMLlistCompany: $('#tmp_listings').html(),
    DOMtblListCompany: $('#tbllistCompany')[0],

    HTMLpsCompany: $('#tmp_ps_company').html(),
    DOMulpsCompany: $('ul#ul-ps-company')[0],

    HTMLdisplayProduct: $('#tmp_display_products').html(),
    DOMdisaplayProducts: $('div#display-products')[0],

    HTMLdisaplaySeasonProducts: $('#tmp_display_season_products').html(),
    HTMLdisaplayCompanyProducts:$('#tmp_company_products').html(),

    HTMLdisplaySeasonCompany: $('#tmp_display_season').html(),
    DOMdisplaySeasonCompany: $('div#accordion-season')[0],

    HTMLdisplaySalesEvents: $('#tmp_display_salesevents').html(),
    DOMdisplaySalesEvents: $('div#accordion-salesevents')[0],

    HTMLdisplaySales: $('#tmp_display_sales').html(),
    DOMdisplaySales: $('div#accordion-sales')[0],    

    HTMLdisplayClassified: $('#tmp_display_classifieds').html(),
    DOMdisplayClassified: $('div#accordion-classified')[0],  

    HTMLdisplayForRent: $('#tmp_display_forrent').html(),
    DOMdisplayForRent: $('div#accordion-forrent')[0],       

    HTMLdisplayHelpWanted: $('#tmp_help_wanted').html(),
    DOMdisplayHelpWanted: $('div#helpWantedList')[0],


    DOMbPSummary: $('div.bp_summary')[0],
    DOMbPDetails: $('div.bp_details')[0],

    HTMLlistLocation: $('#tmp_list_location').html(),
    DOMlistLocation: $('div#list-location')[0],

    HTMLmemberMenu: $('#tmp_memberMenu').html(),
    DOMmemberMenu: $('ul#ulMemberMenu')[0],

        
    $inputField: $('input#lookup'),
    $divSearchCarousel: $('div#searchCarousel'),
    $divIslandCarousel: $('div#islandCarousel'),
    $formSearchForm: $('form#searchForm'),
    $divTableResponsive: $('div.table-responsive'),
    $aSearchClick: $('a#search_click'),    
    $divIslands: $('div#islands'),
    $divSearchType: $('div#searchtype'),
    $divDetailsAd: $('div.details-ad'),
    $divDisplaycatsub: $('div#displaycatsub'),
    $divMap: $('div#maps'),
    $ulNavbarRight: $('ul#navbar-right'),
    $spanLoginStatus: $('span#login-status'),
    $aNewMemeber: $('a#newMember'),
    $aCancelNewMember: $('a#calcelNewMember'),
    $buttonMemberLogin: $('button#loginSubmit'),
    $aCancelLogin: $('a#calcelLogin'),
    $formMemberLogin: $('form#memberLogin'),
    $aMember_non: $('a#member_non'),
    $ulMemberMenu: $('ul#ulMemberMenu'),
   
  mutualExclusiveDom: {
    $divLogo: $('div.jumbotron-logo'),
    $divListSuggestions: $('div#list-suggestions'),
    $divPsSuggestions: $('div#ps-suggestions'),
    $divBpSuggestions: $('div#bp-suggestions'),
    $divListCompany: $('div#list-company'),
    $divListLocation: $('div#list-location'),
    $divLocationAd: $('div#ad'),
    $divMapCanvas: $('div#mapcanvas'),
    $divPsCompany: $('div#ps-company'),
    $divDisplayProducts: $('div#display-products'),
    $divBpCompany: $('div.bp_company'),
    $divAd: $('div#ad'),
    $divMapCanvas: $('div#mapcanvas'),
    $divLoginSignUp: $('div#login'),
    $divSignUp: $('div#signup'),
    $divManageListings: $('div#manageListings'),
    $divCatSub: $('div#catsub'),
    $divSeasonShopping: $('div#seasonshopping'),
    $divResume: $('div#resume'),
    $divHelpWanted: $('div#helpWantedList'),
    $divSalesevents: $('div#salesevents'),
    $divForRent: $('div#for_rent'),
    $divClassifieds: $('div#classifieds'),
    $divdisplayClassifieds: $('div#displayClassifieds'),
    $divdisplayForRent: $('div#displayForRent'),
    $divthe242help: $('div#the242help'),
    $divDisplaysales: $('div#sales'),
    $divNewArrivals: $('div#newarrivals'),
    $divHelpfulLinks: $('div#helpfullinks')
  }
}   

  window.Listings.bindEvents = function(){
    var self = this, 
    conFig = this.config,
    $document = $(document);

    // $('input#lookup').on('select', function(evt){
    //   console.log(self.inputText);
    //   self.inputText = self.inputText.replace(window.getSelection().toString(),'');
    //   console.log(self.inputText);
    // });

    conFig.$inputField.on('select',function(evt){
      self.programDirector('evtSelect', $(this), null, evt, 'All');
    }); 
    
    conFig.$formSearchForm.on('submit',function(evt){
      self.programDirector('evtSubmit',$(this), null, evt);
    });

    conFig.$inputField.on('focus', function(evt){
          self.programDirector('evtFocus',$(this));  
        });
      
    conFig.$inputField.on('keyup', function(evt){
        self.programDirector('evtKeyup', $(this) , null, evt);
      });

    conFig.mutualExclusiveDom.$divListSuggestions.on('keydown','a',function(evt){
      self.programDirector('evtKeydown', $(this), null, evt);
    });

    conFig.mutualExclusiveDom.$divListSuggestions.on('click','a',function(evt){
      self.programDirector('evtClick', $(this), null, evt);
    });

    conFig.mutualExclusiveDom.$divPsSuggestions.on('keydown','a',function(evt){
      self.programDirector('evtKeydown', $(this), null, evt);
    });

    conFig.mutualExclusiveDom.$divPsSuggestions.on('click','a',function(evt){
      self.programDirector('evtClick', $(this), null, evt);
    });  

    conFig.mutualExclusiveDom.$divBpSuggestions.on('keydown','a',function(evt){
      self.programDirector('evtKeydown', $(this), null, evt);
    });

    conFig.mutualExclusiveDom.$divBpSuggestions.on('click','a',function(evt){
      self.programDirector('evtClick', $(this), null, evt);
    });  

    conFig.$aSearchClick.on('click', function(evt){
      self.programDirector('evtClick', $(this), null, evt);
    });
    
    conFig.mutualExclusiveDom.$divListCompany.on('keydown','a[data-element="aListCompany"]', function(evt){
      self.programDirector('evtkeydown', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divListCompany.on('click','a[data-element="aListCompany"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divListLocation.on('keydown', 'button[data-element="btnBackListLocation"]', function(evt){
      self.programDirector('btnKeyDown', $(this), null, evt, 'All');  
    });   

    conFig.mutualExclusiveDom.$divListLocation.on('click', 'button[data-element="btnBackListLocation"]', function(evt){
      self.programDirector('btnClick', $(this), null, evt, 'All');  
    });//goBackResults

    conFig.$divIslands.on('slid.bs.carousel',function(evt){
      self.programDirector('evtSlidIslands', $(this), 'islandCarousel', evt);  
    });

    conFig.$divIslands.on('slid.bs.carousel',function(evt){
      if(self.seasonSearchClicked){
        self.programDirector('evtSlidIslands', $(this), 'seasonIslands', evt); 
      }
    });    

    conFig.$divSearchType.on('slid.bs.carousel',function(evt){
      self.programDirector('evtSlidSearch', $(this), 'searchCarousel', evt, 'All');  
    });

    conFig.$divIslands.on('slide.bs.carousel',function(evt){
      self.programDirector('evtPreSlidIslands', $(this), 'islandCarousel', evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divPsCompany.on('click', 'a[data-element="aPsCompany"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt);  
    });

    conFig.mutualExclusiveDom.$divListLocation.on('click','button.details-ad',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    });//this.displayAd

    conFig.mutualExclusiveDom.$divAd.on('click','button[data-element="btnCloseAd"]',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    });//this.closeAd   

    conFig.mutualExclusiveDom.$divListLocation.on('click','button[data-element="btnShopping"]',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divListLocation.on('click','button[data-element="btnNewArrivals"]',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    });    

    conFig.mutualExclusiveDom.$divCatSub.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionProSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divSeasonShopping.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionSeasonSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divSalesevents.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionSalesEventsSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divForRent.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionForRentFormSlidDown', $(this), 'collapse', evt, 'All');  
     });  

    conFig.mutualExclusiveDom.$divClassifieds.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionClassifiedsFormSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divdisplayForRent.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionForRentDetailSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divDisplaysales.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionSalesSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divSalesevents.on('click','a[data-element="a_list_id"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
     });         

    conFig.mutualExclusiveDom.$divManageListings.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionResumeSlidDown', $(this), 'collapse', evt, 'All');  
     });    

    conFig.mutualExclusiveDom.$divdisplayClassifieds.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionClassifiedDetailSlidDown', $(this), 'collapse', evt, 'All');  
     });

    conFig.mutualExclusiveDom.$divdisplayForRent.on('shown.bs.collapse',function(evt){
       self.programDirector('evtAccordionForRentDetailSlidDown', $(this), 'collapse', evt, 'All');  
     });    

    conFig.mutualExclusiveDom.$divSeasonShopping.on('click', 'a[data-element="aGetSeasonList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });


    conFig.mutualExclusiveDom.$divCatSub.on('click','button[data-element="btnCatSubClose"]',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    });//this.closeAd 

    conFig.mutualExclusiveDom.$divNewArrivals.on('click','button[data-element="btnCloseNewarrivals"]',function(evt){
      self.programDirector('evtBtnClick', $(this), null, evt, 'All');  
    });//this.closeAd            

    conFig.mutualExclusiveDom.$divListCompany.on('click', 'a[data-element="aCompListSingleMap"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });//this.getMaps

    conFig.mutualExclusiveDom.$divMapCanvas.on('click', 'button[data-element="btnMapClose"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });
    
    conFig.mutualExclusiveDom.$divMapCanvas.on('click', 'button[data-element="btnMapPlus"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divMapCanvas.on('click', 'button[data-element="btnMapSubtract"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divMapCanvas.on('click', 'button[data-direction="large"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });    

    conFig.mutualExclusiveDom.$divPsCompany.on('click', 'a[data-element="aPSMap"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divPsCompany.on('click', 'button[data-element="btnPsMultiMap"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divDisplayProducts.on('click', 'button[data-element="btnDpsMultiMap"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divListLocation.on('click', 'button[data-element="btnLocationSingleMap"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divListCompany.on('click', 'button[data-element="btnCompListMultiMap"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });//this.allMaps
    
    conFig.mutualExclusiveDom.$divListCompany.on('click', 'button[data-element="btnBackCompList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });    

    conFig.$ulNavbarRight.on('click', 'a[id="alogin"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });    

    $document.on('click', 'a[data-element="aNewMember"]',function(evt){
      self.programDirector('evtClick', conFig.$aNewMemeber, null, evt, 'All');  
    });

    $document.on('click', 'a[data-element="cancelNewMember"]',function(evt){
      self.programDirector('evtClick', null, 'cancelNewMember', evt, 'All');  
    }); 

    $document.on('submit','form[id="newmember"]',function(evt){
      self.programDirector('evtSubmit',null,'newMember', evt, 'All');
    }); 
    
    $document.on('click','a[data-element="dropMenuHelp"]',function(evt){
      self.programDirector('evtClick',null,'help', evt, 'All');
    });

    $document.on('click','a[data-element="dropMenuLinks"]',function(evt){
      self.programDirector('evtClick',null,'links', evt, 'All');
    });    

    conFig.$buttonMemberLogin.on('click',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.$aCancelLogin.on('click',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.$ulMemberMenu.on('click', 'a[data-element="dropMenuLogin"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    $document.on('click', 'a[data-element="freeMemListings"]',function(evt){
      self.programDirector('evtClick', null, 'freeMemListings', evt, 'All');  
    });

    $document.on('click', 'a[data-element="fullMemListings"]',function(evt){
      self.programDirector('evtClick', null, 'fullMemListings', evt, 'All');  
    });


    $document.on('click', 'a[data-element="aAddToMyListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="freeMemClassified"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="dropForRent"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="dropMenuHome"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="dropMenuContactUs"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="dropMenuSupport"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'a[data-element="dropMenuPrivacy"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

   $document.on('click', 'button[data-element="btn_print_reciept"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

   $('#reciept').on('hidden.bs.modal', function (e) {
      $('div#manageListings').css('visibility','visible');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnMemberSearchListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnFreePersonalListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('submit', 'form[id="freeMemberPersonal"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[id="calcelFreeList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="editMemberListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnMemberAccount"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="removeMemberListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });     

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnFreeBusinessListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="cancelFreeBusinessListing"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('submit', 'form[id="freeBusinessListing"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[data-element="btnSelectPhoto"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnPaymentOptions"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="donePayOptions"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnShowAddPayOptions"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubmitPayOption"]',function(evt){
      self.programDirector('evtSubmit', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="deletePayOptions"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[name="cardtype"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="paidMemberListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnSelectPayOptions"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="calcelPayOptionList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnUpdatePayOption"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="removePremium"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnSelectBannerAd"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="doneBanner"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubmitBanner"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnEditKeywords"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnViewSeasons"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneKeywords"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneSeasons"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });
    
    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="editKeywordsApply"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[data-element="btnbannerPhoto"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubMitHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnSelectMapPicture"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneMapPicture"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[data-element="btnMapPicture"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubmitMapPicture"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="deleteCeatorListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('focus', 'td[data-element="businesshours"]',function(evt){
      self.programDirector('evtFocus', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnEditProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 
    
    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aProductCatagorySelect"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aServiceCatagorySelect"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');      
    });


    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aSubCatagorySelect"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aServiceSubCatagorySelect"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="cancelProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="calcelKeywords"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnGetProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aEditProductService"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aRemoveFromListing"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aRemoveFromAll"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aAddAllProductsTo"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });
    
    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[data-element="btnProductPhoto"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aDeleteProduct"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnEditHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="adoneViewResume"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aEditHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aDeleteHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="aDeleteAllHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="calcelHelpWanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnGetHelpWantedList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="addToSeason"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    }); 

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="viewHelpWantedApply"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="resumeNotify"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btnEditSalesEvents"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubmitSalesEvents"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });    

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="btndoneSalesEvents"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'input[data-element="btnsalesEventPhoto"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="deleteRequestDeleteListings"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'a[data-element="doneDeleteRequest"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divManageListings.on('click', 'button[data-element="btnSubmitDeleteRequest"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divDisplayProducts.on('click', 'a[data-element="aGetCompanyList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divDisplaysales.on('click', 'a[data-element="aGetCompanyList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'Sales');
    });    

    conFig.mutualExclusiveDom.$divCatSub.on('click', 'a[data-element="aGetCompanyList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    $document.on('click', 'button[data-element="btnSeasonShopping"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    $document.on('click', 'a[data-element="freeMemResume"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });
     
    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btndoneResume"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('focus', '.user-input',function(evt){
      self.programDirector('evtClick', $(this), 'resumeInputFocus', evt, 'All');  
    });
     
    conFig.mutualExclusiveDom.$divResume.on('blur', '.user-input',function(evt){
      self.programDirector('evtClick', $(this), 'resumeInputBlur', evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'button[data-element="btnResetResume"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    
    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnAddEducation"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnRemoveEducation"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnAddExperience"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnRemoveExperience"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnAddSkillSet"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'a[data-element="btnRemoveSkillSet"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divResume.on('click', 'button[data-element="btnFreeResume"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divResume.on('click', 'input[data-element="btnSelectPhoto"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divHelpWanted.on('click', 'a[data-element="aHelpWantedListId"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divHelpWanted.on('click', 'button[data-element="btnApplyForJob"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divHelpWanted.on('click', 'button[data-element="btnDeleteApplyForJob"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divClassifieds.on('click', 'a[data-element="doneClassified"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divClassifieds.on('click', 'button[data-element="btnResetClassified"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divClassifieds.on('click', 'button[data-element="btnSubmitClassified"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divClassifieds.on('click', 'input[data-element="btnSelectImage"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divForRent.on('click', 'a[data-element="doneForRent"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divForRent.on('click', 'button[data-element="btnSubmitForRent"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divForRent.on('click', 'button[data-element="btnResetForRent"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divdisplayForRent.on('click', 'a[data-element="forrent_map"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divdisplayForRent.on('click', 'button[data-element="btnForRentListMultiMap"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    }); 

    conFig.mutualExclusiveDom.$divHelpWanted.on('click', 'a[data-element="map_helpwanted"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });
    
    conFig.mutualExclusiveDom.$divSalesevents.on('click', 'a[data-element="a_salesevent_map"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divLoginSignUp.on('click', 'button[data-element="resetPassword"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divthe242help.on('click', 'a[data-element="aToggleHelp"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

    conFig.mutualExclusiveDom.$divthe242help.on('click', 'a[data-element="doneHelp"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });

}

  window.Listings.programDirector = function(event, $activeElement, inactiveElement, evt, insearchTypeSelected){
    var self = Listings
    conFig = self.config,
    searchTypeSelected = '',
    activeElementName = inactiveElement || $activeElement.attr('data-element');
    searchTypeSelected = insearchTypeSelected || conFig.$divSearchCarousel.find('div.active').attr('data-searchtype');
    executeFunction = event + '$' + activeElementName + '$' + 'searchType' + '$' + searchTypeSelected;// + '$' + 'islandId' + '$' + islandSelected;
    console.log(executeFunction);
    self.programFunctions[executeFunction](self,conFig,evt,searchTypeSelected, $activeElement);

  };

  window.Listings.programFunctions = {

    evtSelect$searchInput$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputText = self.inputText.replace(window.getSelection().toString(),'');
    },    

    evtSubmit$form$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(config.$inputField.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions, self.config.$inputField[0]); 
    },

    evtSubmit$form$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(config.$inputField.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.PsSuggestionsData, self.populatePsuggestions, self.config.$inputField[0]); 
    },    

    evtSubmit$form$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(config.$inputField.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions, self.config.$inputField[0]);
    },

    evtFocus$searchInput$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.val('');
      self.seasonSearchClicked = false;
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    }, 
    
    evtFocus$searchInput$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    },

    evtFocus$searchInput$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.val('');
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    }, 

    evtFocus$searchInput$searchType$4: function(self, config, evt, searchTypeSelected, $activeElement){
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    },     

    evtKeyup$searchInput$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions, self.config.$inputField[0]); 
    },

    evtKeyup$searchInput$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 8 && searchTypeSelected === '2'){self.inputText = $activeElement.val();}
      self.inputLookup(evt.which, searchTypeSelected, self.PsSuggestionsData, self.populatePsuggestions, self.config.$inputField[0]);
    },

    evtKeyup$searchInput$searchType$4: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 8 && searchTypeSelected === '4'){self.inputText = $activeElement.val();}
      self.inputLookup(evt.which, searchTypeSelected, self.PsSuggestionsData, self.populatePsuggestions, self.config.$inputField[0]);
    },   

    evtKeyup$searchInput$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions, self.config.$inputField[0]);
    },

    evtClick$searchButton$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      self.resetIslandSelector();
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions, self.config.$inputField[0])
    },  

    evtClick$searchButton$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      if(conFig.$inputField.val().length < 2){
        return;
      }
      self.resetIslandSelector();
      self.getPsCompany(conFig.$inputField.val(), searchTypeSelected);
    },
    
    // evtClick$searchButton$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
    //   self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions, self.config.$inputField[0]);
    //   self.getPsCompany(conFig.$inputField.val(), searchTypeSelected);
    // },





    evtClick$searchButton$searchType$4: function(self, config, evt, searchTypeSelected, $activeElement){
      if(conFig.$inputField.val().length < 2){
        return;
      }
      self.resetIslandSelector();
      self.getDisplayProductsServices(conFig.$inputField.val(), null, searchTypeSelected);
    },

    evtAccordionProSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var divTarget = $(evt.target).attr('id');
      if(divTarget.indexOf('collapsesub') !== -1){
        self.getListDisplayProductsServices($(evt.target).attr('data-div_display_id'), $(evt.target).attr('product_ids'));
      } 
    },

    evtAccordionResumeSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getApplyResume($(evt.target).attr('data-resume_id'),$(evt.target).attr('data-display-div'));
    },

    evtAccordionSeasonSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getDisplaySeasonProducts($(evt.target).attr('data-div_display_id'), $(evt.target).attr('data-product_ids'));
    },

    evtAccordionSalesEventsSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getDisplaySalesEventsList($(evt.target).attr('data-div_display_id'), $(evt.target).attr('data-list_ids'));
    },

    evtAccordionClassifiedDetailSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getDisplayClassifiedDetails($(evt.target).attr('data-div_display_id'), $(evt.target).attr('data-classified_id'));
    },

    evtAccordionForRentDetailSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getDisplayForRentDetails($(evt.target).attr('data-div_display_id'), $(evt.target).attr('data-for_rent_id'));
    },

    evtAccordionSalesSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var product_ids, island_array, island_id;
      island_id = '#' + conFig.$divIslandCarousel.find('div.active').attr('data-island') + '#';
      island_array = self.displaySalesData[$(evt.target).attr('data-index')][5];
      island_array.forEach(function(element, index, array){
        if(element[0] === island_id){
          product_ids = element[3];  
        }
      });
      self.getSalesProducts(product_ids,$(evt.target).attr('data-div_display_id'));
    },

    evtKeydown$aListSuggestion$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 13){
        evt.preventDefault();
        self.getListCompany($activeElement.attr("href"),null, 'backToCompList$searchType$All');
      }
    },

    evtKeydown$aPsSuggestion$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 13){
        evt.preventDefault()
        self.inputText += $activeElement.text() + ' ';
        conFig.$inputField.val(self.inputText);  
        conFig.$inputField.focus();
      }
    },

    evtKeydown$aBpSuggestion$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 13){
        evt.preventDefault();
        self.getBpCompany($activeElement.attr('href'));
      }
    }, 

    evtClick$aListSuggestion$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),null,'backToCompList$searchType$All');
    },

    evtClick$aHelpWantedListId$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),null,'backToHelpWanted$searchType$All');
    },

    evtClick$aGetCompanyList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0','backToDisplayProducts$searchType$All');
    },

    evtClick$aGetCompanyList$searchType$Sales: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0','backToDisplaySales$searchType$All');
    },

    evtClick$aGetSeasonList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0','backToDisplaySeason$searchType$All');
    },

    evtClick$a_list_id$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0','backToDisplaySalesEvents$searchType$All');
    },

    evtClick$aPsSuggestion$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault()
      self.inputText += $activeElement.text() + ' ';
      conFig.$inputField.val(self.inputText);  
      conFig.$inputField.focus();
    },    

    evtClick$aBpSuggestion$searchType$3:function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getBpCompany($activeElement.attr('href')); 
     }, 

    evtClick$aPsSuggestion$searchType$4: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault()
      self.inputText += $activeElement.text() + ' ';
      conFig.$inputField.val(self.inputText);  
      conFig.$inputField.focus();
    },     

     evtkeydown$aListCompany$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 13){
        evt.preventDefault();
        self.populateListLocation(self.listCompanyData[$activeElement.attr('href')]);
      }  
     },

     evtClick$aListCompany$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.populateListLocation(self.listCompanyData[$activeElement.attr('href')]);
     },

      btnKeyDown$btnBackListLocation$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
        if(evt.which === 13){
          self.filterListings();  
        }  
      },

     btnClick$btnBackListLocation$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterListings();
     },

     evtSlidIslands$islandCarousel$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterListings();
     },

     evtSlidIslands$seasonIslands$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      if( !self.displaySeasonCompanyData){
        evt.preventDefault();
        return;
      } 
      self.filterDisplaySeasonCompany();
     }, 

     evtSlidIslands$islandCarousel$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterProductService();
     },

     evtSlidIslands$islandCarousel$searchType$6: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterClassifieds();
     },

     evtSlidIslands$islandCarousel$searchType$7: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterForRent();
     },     

     evtSlidIslands$islandCarousel$searchType$4: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterDisplayProductService();
     },

     evtSlidIslands$islandCarousel$searchType$8: function(self, config, evt, searchTypeSelected, $activeElement){
      if( !self.displaySalesEventsData){
        evt.preventDefault();
        return;
      }      
      self.filterDisplaySalesEvents();
     },

     evtSlidIslands$islandCarousel$searchType$9: function(self, config, evt, searchTypeSelected, $activeElement){
      if( !self.displaySalesData){
        evt.preventDefault();
        return;
      }      
      self.filterDisplaySales();
     },     

     evtSlidIslands$islandCarousel$searchType$5: function(self, config, evt, searchTypeSelected, $activeElement){
      self.filterHelpWanted();
     }, 

     evtPreSlidIslands$islandCarousel$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      if(!self.listCompanyData && !self.psCompanyData && !self.displayProductsData && !self.displaySeasonCompanyData && !self.helpWantedActiveData && !self.displaySalesEventsData && !self.displayClassifiedsData && !self.displayForRentData && !self.displaySalesData ){
        evt.preventDefault();
        return;
      } 
     },

     evtSlidSearch$searchCarousel$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var searchTypeSelected = $('div.searchtype.active').attr('data-searchtype');
      self.resetIslandSelector();
      config.$inputField.val('');
      self.inputText = '';

      if(searchTypeSelected === '5'){
        config.$inputField.val('All');  
      };

      if(searchTypeSelected === '8'){
        config.$inputField.val('All');  
      };

      if(searchTypeSelected === '6'){
        config.$inputField.val('All');  
      };

      if(searchTypeSelected === '7'){
        config.$inputField.val('All');  
      };

      if(searchTypeSelected === '9'){
        config.$inputField.val('All');  
      };

      if(searchTypeSelected === '10'){
        config.$inputField.val('All');  
      };

     }, 

     evtClick$aPsCompany$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0','backToCompList$searchType$All');
     },

     evtBtnClick$addBtn$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      imgFile = $activeElement.attr('data-imgfile'),
      addHTML = '<div class="thumbnail"> <img src="images/' + imgFile + '" alt="Ad"></div>';
      self.displayMutExDom(config.mutualExclusiveDom.$divAd);
      config.$divDetailsAd.empty().hide().append(addHTML).fadeIn();
     },

     evtBtnClick$btnCloseAd$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(config.mutualExclusiveDom.$divListLocation);
     },

     evtBtnClick$btnCloseNewarrivals$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(config.mutualExclusiveDom.$divListLocation);
     },

     evtBtnClick$btnCatSubClose$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(config.mutualExclusiveDom.$divListLocation);
     },

     evtBtnClick$btnShopping$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getCatSubAccordion($activeElement.attr('data-list_id'));
     },

     evtBtnClick$btnNewArrivals$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getNewArrivals($activeElement.attr('data-list_id'));
      self.displayMutExDom(config.mutualExclusiveDom.$divNewArrivals);
     },

     evtClick$aCompListSingleMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){return;}
      self.mapOrigin = $activeElement.attr('data-element');  
      self.getMaps($activeElement.attr('href'), null, $activeElement.attr('data-phone'), $activeElement.attr('data-storefront'));
     },

     evtClick$forrent_map$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){return;}
      self.mapOrigin = $activeElement.attr('data-element');  
      self.getMaps($activeElement.attr('href') + ':' + $activeElement.attr('data-adline'), null, $activeElement.attr('data-phone'), $activeElement.attr('data-storefront').replace('images/',''));
     },

     evtClick$map_helpwanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){return;}
      self.mapOrigin = $activeElement.attr('data-element');  
      self.getMaps($activeElement.attr('href') + ':' + $activeElement.attr('data-list_name'), null, $activeElement.attr('data-phone'), 'nophoto');
     },

     evtClick$a_salesevent_map$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){return;}
      self.mapOrigin = $activeElement.attr('data-element');  
      self.getMaps($activeElement.attr('href') + ':' + $activeElement.attr('data-search_display'), null, '', 'nophoto');
     },



     evtClick$btnMapClose$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.closeMap(self.mapOrigin);
     },

     evtClick$btnMapPlus$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.resizeMap(evt, $activeElement);
     },

     evtClick$btnMapSubtract$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      self.resizeMap(evt, $activeElement);
     },

     evtClick$btnMapLarge$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      self.resizeMap(evt, $activeElement);
     },

     evtClick$aPSMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){
        return;
      }
      self.mapOrigin = $activeElement.attr('data-element');
      self.psSingleCompMap($activeElement.attr('href'), $activeElement);
     },

     evtClick$btnLocationSingleMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.getMaps($activeElement.attr('data-latlng'), null, $activeElement.attr('data-phone'), $activeElement.attr('data-storefront'));
     },

     evtClick$btnCompListMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.mapAllCompList();
     },

     evtClick$btnForRentListMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.mapAllForRent();
     },



     evtClick$btnBackCompList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.programFunctions[$activeElement.attr('data-function')](self, config, evt, searchTypeSelected, $activeElement);
     },

     backToCompList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      var selectedIsland, 
      serachType = $('div.active.searchtype').attr('data-searchtype');
      evt.preventDefault();
      if(serachType === '1'){
        self.listCompanyData = '';
        self.resetIslandSelector();
        self.displayMutExDom(conFig.mutualExclusiveDom.$divListSuggestions);        
      }

      if(serachType === '2'){
        selectedIsland = $('div.island.active').attr("data-island");
        self.populateIsland(self.psIslandList);
        $('div.island.active').removeClass('active');
        $('div.island[data-island = "' + selectedIsland + '"]').addClass('active');
        self.displayMutExDom(conFig.mutualExclusiveDom.$divPsCompany);
      }  

     },

     backToDisplayProducts$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      var selectedIsland, 
      serachType = $('div.active.searchtype').attr('data-searchtype');
      evt.preventDefault();
      if(serachType === '4'){
        selectedIsland = $('div.island.active').attr("data-island");
        self.populateIsland(self.dpsIslandList);
        $('div.island.active').removeClass('active');
        $('div.island[data-island = "' + selectedIsland + '"]').addClass('active');
        self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplayProducts);        
      }
     },

     backToDisplaySales$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplaysales);        
     },

     backToDisplaySeason$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divSeasonShopping);        
     },

     backToHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divHelpWanted);        
     },

     backToDisplaySalesEvents$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divSalesevents);        
     },



     evtClick$btnPsMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.psCompFiltered ? self.psMultiCompMap(self.filteredListPS) : self.psMultiCompMap(self.psCompanyData);
     },

     evtClick$btnDpsMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.psDisplayFiltered ? self.dpsMultiCompMap(self.filteredListDPS) : self.dpsMultiCompMap(self.displayProductsData);
     },

     // evtClick$dropMenuLogin$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
     //  evt.preventDefault();
     //  self.programFunctions.evtClick$aLogin$searchType$All(self, config, evt, searchTypeSelected, $activeElement);
     // },


     evtClick$aLogin$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var status = $activeElement.attr('data-status');
      evt.preventDefault();
      if(window.innerWidth < 768){
        $('button#btn_menu').click();  
      }      

      if(status === 'login'){
        self.displayMutExDom(conFig.mutualExclusiveDom.$divLoginSignUp);
        $('input#loginEmail').focus();  
      }
      
      if(status === 'logout'){
        self.logoutMember(); 
      }

    },

    evtClick$cancelNewMember$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#newmember')[0].reset();
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLoginSignUp);  
    },  

    evtClick$aNewMember$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getSignupForm(false); 
    },

    evtClick$memberLogin$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      formData,
      formSerialized,
      $formLoginMember = config.$formMemberLogin,    
      $applyButton = config.$buttonMemberLogin;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($formLoginMember[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj);
      formSerialized = $formLoginMember.serialize();
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = self.createFormSubmitObj(formSerialized,formElementObj)
        self.loginMember(formData, $applyButton, $formLoginMember, formElementObj);
       }
       else{
        $("div#formLoginAlert").css("visibility","visible");
       }      
    },

    evtClick$cancelLogin$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    },

    evtSubmit$newMember$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      formData,
      formSerialized,
      $formNewMember = $('form#newmember'),
      formStatus = $formNewMember.attr('data-status');      
      $applyButton = $('button#apply');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($formNewMember[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj);
      formSerialized = $formNewMember.serialize();
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = self.createFormSubmitObj(formSerialized,formElementObj)
        self.submitMember(formData, $applyButton, $formNewMember, formElementObj, formStatus);
       }
       else{
        $('div#formNewMemberAlert').css("visibility","visible");
       }
    },

    evtClick$aAddToMyListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var source = $activeElement.attr("data-source");
      evt.preventDefault();
      if($activeElement.hasClass('disabled')){return;}
      self.addToMyListings($activeElement.attr('href'), $activeElement, source);
    },

    evtClick$freeMemListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
      self.getMemberListings(conFig.mutualExclusiveDom.$divManageListings);
    },

    evtSubmit$donePayOptions$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.programFunctions.evtClick$freeMemListings$searchType$All(self, config, evt, searchTypeSelected, $activeElement);
    },

    evtClick$fullMemListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.programFunctions.evtClick$freeMemListings$searchType$All(self, config, evt, searchTypeSelected, $activeElement);
    },

    evtClick$cancelFreeBusinessListing$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.programFunctions.evtClick$freeMemListings$searchType$All(self, config, evt, searchTypeSelected, $activeElement);
    },

    evtClick$btnMemberSearchListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.startUpDisplay();
      config.$inputField.focus();
    },

    evtClick$btnFreePersonalListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getFreePersonalListingForm();
    },


    evtClick$btnFreeBusinessListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getFreeBusinessListingForm();
    },

    evtClick$cancelFreeListing$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.programFunctions.evtClick$freeMemListings$searchType$All(self, config, evt, searchTypeSelected, $activeElement);
    }, 

    evtSubmit$formFreePersonal$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $formLoginMember = $('form#freeMemberPersonal'),  
      formStatus = $formLoginMember.attr('data-status'), 
      $applyButton = $('button#btnFreePersonal');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($formLoginMember[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(100000, $('input#freeMemberPhoto')[0].files, $('label[for="freeMemberPhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($formLoginMember[0]);
        previous_photo = $('input[id="freeMemberPhoto"]').attr('data-previous_photo');
        self.submitFreePersonalListing(formData, $applyButton, $formLoginMember, formElementObj, formStatus, previous_photo);
       }
       else{
        $('div#formPersonalMemberAlert').css("visibility","visible");
       } 
    },


    evtClick$editMemberListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var listId = $activeElement.attr('data-listid'),
      listSource = $activeElement.attr('data-listsource'),
      listType = $activeElement.attr('data-listtype');
      evt.preventDefault();
      if(listSource === 'FP' || listSource === 'LP'){
        self.getFreePersonalListingForm(true, listId);
      }

      if(listSource === 'FB' || listSource === 'PB'){
        self.getFreeBusinessListingForm(true, listId);
      }

    },

    evtSubmit$btnSelectPhoto$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-previous_photo', '');
    },



    evtClick$btnMemberAccount$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getSignupForm(true); 
    },


    evtClick$removeMemberListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var listId = $activeElement.attr("data-listid");
      evt.preventDefault();
      $activeElement.prop("disabled", true);
      self.removeFromMyListings(listId);
    }, 

    evtSubmit$formFreeBusiness$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      source = '',
      formSerialized,
      $form = $('form#freeBusinessListing'),  
      formStatus = $form .attr('data-status'), 
      $applyButton = $('button#btnFreeBusiness');
      source = $applyButton.attr('data-source');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(100000, $('input#freeBusinessPhoto')[0].files, $('label[for="freeBusinessPhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        previous_photo = $('input[id="freeBusinessPhoto"]').attr('data-previous_photo');
        self.submitFreeBusinessListing(formData, $applyButton, $form, formElementObj, formStatus, previous_photo, source);
       }
       else{
        $('div#formFreeBusinessAlert').css("visibility","visible");
       } 
    },   

    evtSubmit$btnPaymentOptions$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getPaymentOptions();
    },

    evtSubmit$btnShowAddPayOptions$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#newPayOptionForm').slideToggle();
    },


    evtSubmit$btnSubmitPayOption$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      // fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form.attr('data-status'), 
      $applyButton = $activeElement;
      evt.preventDefault();
      payOptopnId = $activeElement.attr('data-poID');
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj)
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.submitPayOption(formData, $applyButton, $form, formElementObj, formStatus, payOptopnId);
       }
       else{
        formStatus === 'add' ? $('div#formAddPayOption').css("visibility","visible") : $('div#formEditPayOption' + $activeElement.attr('item-cnt')).css("visibility","visible");
       } 
    },   


    evtClick$deletePayOptions$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.removePayOption($activeElement.attr('href'));
    }, 

    evtClick$inputCardType$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $optionalFields = $('input.optional');
      if($activeElement.attr('value') === '4'){
        $optionalFields.attr('data-required','0').prop('disabled',true);
      }
      else{
        $optionalFields.attr('data-required','1').prop('disabled',false);
      }
    },



    evtClick$paidMemberListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getPaidListing($activeElement.attr('data-listid'));
    },

    evtClick$calcelPayOptionList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#selectPayOptionSD').hide();
    },

    evtClick$btnSelectPayOptions$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('button#print').css('visibility','visible');
      self.selectPayOption($activeElement.attr('data-listid'));
    },

    evtClick$btnUpdatePayOption$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      formData = null,
      formSerialized,
      $form = $('form#' + $activeElement.attr('data-form')),
      list_id = $activeElement.attr('data-listId'),  
      formStatus = $form.attr('data-status'), 
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj)
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        $('img#imgwait').css("visibility", "visible");
        self.updatePayOption(formData, $applyButton, $form, formElementObj, list_id);       
       }
       else{
        $('div#formUpdatePayOption').css("visibility","visible");
      }
    },

    evtClick$removePremium$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.removePremium($activeElement.attr('data-listid'));
    },
     

    evtClick$btnSelectBannerAd$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.selectBanner($activeElement.attr('data-listid'));
    },

    evtClick$doneBanner$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#selectBannerSD').hide();
    },

    evtClick$btnSubmitBanner$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#banner'),  
      formStatus = $form .attr('data-status'), 
      listId = $activeElement.attr('data-listID');
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(100000, $('input#bannerPhoto')[0].files, $('label[for="bannerPhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        previous_banner = $('input[id="bannerPhoto"]').attr('data-bannerName');
        self.updateBanner(formData, $applyButton, $form, formElementObj, formStatus, listId, previous_banner);
       }
       else{
        $('div#bannerAlert').css("visibility","visible");
       } 

    },

    evtClick$btnbannerPhoto$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-bannerName', '');
    },

    evtClick$btnEditKeywords$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.selectKeywords($activeElement.attr('data-search_display'));
    },

    evtClick$btnViewSeasons$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getSeasons();
    },

    evtClick$btndoneKeywords$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#editKeywordsSD').hide();
    },

    evtClick$btndoneSeasons$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#viewSeasonsSD').hide();
    },

    evtClick$calcelKeywords$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#formKeywords')[0].reset();
    },

    evtClick$editKeywordsApply$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form .attr('data-status'), 
      kws_id = $activeElement.attr('data-kw_id');
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj)
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.updateAdLineKeywords(formData, $applyButton, $form, formElementObj, formStatus, kws_id);
       }
       else{
        $('div#formKeywordsAlert').css("visibility","visible");
       } 
    },

    evtClick$btnEditHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.selectHelpWanted(
          $activeElement.attr('data-hw_id'),
          $activeElement.attr('data-listid'),
          $activeElement.attr('data-search_display'), 
          $activeElement.attr('data-status'),
          $activeElement.attr('data-email'),
          $activeElement.attr('data-phone'),
          $activeElement.attr('data-island_id'),
          $activeElement.attr('data-map_phone')
        );
    },

    evtClick$aEditHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#formhelpWanted').attr('data-status', 'edit');
      self.editHelpWanted($activeElement.attr('href'),'','','edit','','','','');
    },

    evtClick$btnSubMitHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form .attr('data-status'), 
      list_id = $activeElement.attr('data-listid'),
      island_id = $activeElement.attr('data-island_id'),
      map = $activeElement.attr('data-map'),
      search_display = $activeElement.attr('data-search_display'),
      hw_id = $activeElement.attr('data-hw_id'),
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      formValid = self.validateForm(formElementObj)
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insert_updateHelpWanted(formData, $applyButton, $form, formElementObj, formStatus, list_id, island_id, map, search_display, hw_id);
       }
       else{
        $('div#formhelpWantedAlert').css("visibility","visible");
       } 
    },

    evtClick$btndoneHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#editHelpWantedSD').hide();
    },

    evtClick$adoneViewResume$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#viewResumeSD').hide();
    },

    evtClick$calcelHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#formhelpWanted')[0].reset();
    },

    evtClick$btnGetHelpWantedList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getHelpWantedList($activeElement.attr('data_listid'));
    },

    evtClick$aDeleteHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.deleteHelpWanted($activeElement.attr('href'), $activeElement.attr('data_list_id'));
    },

    evtClick$aDeleteAllHelpWanted$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.deleteAllHelpWanted($activeElement.attr('data-listid'));
    },

    evtClick$btnMapPicture$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-MapPictureName', '');
    },

    evtClick$btnProductPhoto$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-previous_photo', '');
    },

    evtClick$btnSelectMapPicture$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.selectMapPicture($activeElement.attr('data-listid'));
    },

    evtClick$btndoneMapPicture$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#selectMapPictureSD').hide();
    },

    evtClick$btnSubmitMapPicture$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#formMapPicture'),  
      formStatus = $form .attr('data-status'), 
      listId = $activeElement.attr('data-listID');
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(50000, $('input#mapPicture')[0].files, $('label[for="mapPicture"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        previous_MapPicture = $('input[id="mapPicture"]').attr('data-MapPictureName');
        self.updateMapPicture(formData, $applyButton, $form, formElementObj, formStatus, listId, previous_MapPicture);
       }
       else{
        $('div#formMapPictureAlert').css("visibility","visible");
       } 
    },

    evtClick$deleteCeatorListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.find('span').hasClass('glyphicon-remove')){
        $activeElement.find('span').removeClass('glyphicon-remove');
        $activeElement.find('span').addClass('glyphicon-ok');
        return; 
      }
      self.deleteCreatorListings($activeElement.attr('data-listid'), $activeElement.attr('data-listsource'), $activeElement.attr("data-searchname"))
    },

    evtFocus$businesshours$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.html() === 'example 9:00 am or Closed or 24hrs'  || $activeElement.html() === 'example 5:30 pm or Closed or 24hrs'){
        $activeElement.html('');  
      }
    },

    evtClick$btnEditProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var
      list_id = $activeElement.attr('data-listid'),
      island_id = $activeElement.attr('data-island_id'),
      search_display = $activeElement.attr('data-list_name'), 
      map = $activeElement.attr('data-map'),
      phone = $activeElement.attr('data-phone'),
      website = $activeElement.attr('data-website'),
      form_status = 'add',
      product_id = $activeElement.attr('data-product_id'),
      address = $activeElement.attr('data-address');
      evt.preventDefault();
      self.addEditProductService(list_id, island_id, search_display, map, phone, form_status, product_id, website, address);
    },

    evtClick$btndoneProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#productServiceSD').hide();
    },

    evtClick$aProductCatagorySelect$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getSubCatagories($activeElement.text(),$activeElement.attr('href'));
    },

    evtClick$aServiceCatagorySelect$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getServiceSubCatagories($activeElement.text(),$activeElement.attr('href'));
    },

    evtClick$aSubCatagorySelect$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('input#subcategory').val($activeElement.text());
    },

    evtClick$aServiceSubCatagorySelect$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('input#subcategory').val($activeElement.text());
    },

    evtClick$cancelProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#productService')[0].reset();
    },

    evtClick$btnProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj,
      regPrice = '',
      salePrice ='', 
      formValid = false,
      fileValid = false,
      formData = null,
      filename = '',
      product_name = '',
      formSerialized,
      $form = $('form#productService'), 
      list_id = $activeElement.attr('data-listid'),
      island_id = $activeElement.attr('data-island_id'),
      search_display = $activeElement.attr('data-search_display'),
      map = $activeElement.attr('data-map'),
      phone = $activeElement.attr('data-phone'),
      product_id = $activeElement.attr('data-product_id'), 
      website = $activeElement.attr('data-website'),
      previous_photo = $('input[id="productPhoto"]').attr('data-previous_photo'), 
      li_id = $activeElement.attr('data-li_id'),        
      formStatus = $form .attr('data-status'), 
      onSale = $('input#discountEnabled:checked').length === 1 ? true : false,
      season_id = $activeElement.attr('data-season_id'),
      address = $activeElement.attr('data-address'),
      $applyButton = $activeElement;
      regPrice = $('input#productServicePrice').val();
      if(regPrice){
        $('input#productServicePrice').val(regPrice.replace(/\$|,/g,''));   
      }
      salePrice = $('input#discountPrice').val();
      if(salePrice){
        $('input#discountPrice').val(salePrice.replace(/\$|,/g,''));   
      }
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(10000, $('input#productPhoto')[0].files, $('label[for="productPhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.updateProductService(formData, $applyButton, $form, formElementObj, formStatus, product_id, previous_photo, list_id, island_id, search_display, map, phone, li_id, website, onSale, season_id, address);
       }
       else{
        $('div#formProductServiceAlert').css("visibility","visible");
       } 
    },

    evtClick$btnGetProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getProductServiceList($activeElement.attr('data_listid'));
    },

    evtClick$addToSeason$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var season_id;
      evt.preventDefault();
      season_id = $activeElement.attr('data-action') === 'add' ? $activeElement.attr('season_id') : 0;
      self.addRemoveSeason($activeElement.attr('product_id'), season_id);
    },

    evtClick$aEditProductService$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var
      $apply = $('button#btnProductService');
      evt.preventDefault();
      //$('input#productServiceName').prop('disabled', true);
      //$('input#category').attr('data-required', '0');
      //$('input#subcategory').attr('data-required', '0');
      $('ul#ul_product_service').find('p').removeClass('highlight');
      $('p#' + $activeElement.attr('data-producttext')).addClass('highlight');
      list_id = $apply.attr('data-listid');
      island_id = $apply.attr('data-island_id');
      search_display = $apply.attr('data-search_display'); 
      map = $apply.attr('data-map');
      phone = $apply.attr('data-phone');
      website = $apply.attr('data-website');
      form_status = 'edit';
      li_id = $activeElement.closest('li.ps_list').attr('id');
      product_id = $activeElement.attr('href');
      self.edit_product_info(list_id, island_id, search_display, map, phone, form_status, product_id, li_id, website);
    },

    evtClick$aRemoveFromListing$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.removeProductFromListings($activeElement.attr('href'), $activeElement.attr('data-listid'), $activeElement);
    },    

    evtClick$aRemoveFromAll$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.remove_all_products_from_listings($activeElement.attr('data-listid'));
    },

    evtClick$aAddAllProductsTo$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.add_all_products_to_listings($activeElement.attr('data-listid'));
    },

    evtClick$aDeleteProduct$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.delete_product($activeElement, $activeElement.attr('href'));
    },

    evtClick$btnSeasonShopping$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      self.getSeasonDisplayComapny();
    },


    evtClick$freeMemResume$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.getResume();
    },

    evtClick$btndoneResume$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.startUpDisplay();
    },

    evtClick$btnResetResume$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.startUpDisplay();
    },

    evtClick$resumeInputFocus$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.text() === $activeElement.attr('data-placeholder')){
        $activeElement.text('');
        $activeElement.removeClass('placeholder'); 
      }
    },

    evtClick$resumeInputBlur$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.text() === ''){
        $activeElement.text($activeElement.attr('data-placeholder'));
        $activeElement.addClass('placeholder');  
      }
    },

    evtClick$btnAddEducation$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).append('<dl class="dl-horizontal"><dt class="user-input placeholder" contenteditable data-placeholder="School">School</dt><dd class="user-input placeholder" contenteditable data-placeholder="Achievements">Achievements</dd></dl>')
    },

    evtClick$btnRemoveEducation$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).children('dl').last().remove();
    },

    evtClick$btnAddExperience$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).append('<dl class="dl-horizontal"><dt class="user-input placeholder" contenteditable data-placeholder="Business">Business</dt><dd class="user-input placeholder" contenteditable data-placeholder="Experience">Experience</dd></dl>')
    },

    evtClick$btnRemoveExperience$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).children('dl').last().remove();
    },

    evtClick$btnAddSkillSet$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).append('<dl class="dl-horizontal"><dt class="user-input placeholder" contenteditable data-placeholder="Skill">Skill</dt><dd class="user-input placeholder" contenteditable data-placeholder="Accomplishment">Accomplishment</dd></dl>')
    },

    evtClick$btnRemoveSkillSet$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div')).children('dl').last().remove();
    },

    evtClick$btnFreeResume$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#freeMemberResume'),  
      formStatus = $form .attr('data-status'),
      $applyButton = $activeElement,
      resumeName = $('span#resume_name').text(),
      resumeEmail = $('dd#resume_email').text(),
      resumePhone = $('dd#resume_phone').text(),
      removePhoto = $activeElement.attr('data-remove_photo'),
      previous_Picture = $('input[id="freeResumePhoto"]').attr('data-previous_photo');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(100000, $('input#freeResumePhoto')[0].files, $('label[for="freeResumePhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insertUpdateResume(formData, $applyButton, $form, formElementObj, formStatus, resume, previous_Picture, resumeName, resumeEmail, resumePhone, removePhoto);
       }
       else{
        $('div#formResumeAlert').css("visibility","visible");
       } 
    }, 

    evtClick$btnSelectPhoto$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-previous_photo', '');
    },  

    evtClick$searchButton$searchType$5: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getHelpWantedActive();
    }, 

    evtClick$btnApplyForJob$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.insert_help_wanted_apply($activeElement,$activeElement.attr('data-job_id'),$activeElement.attr('data-resume_id'),$activeElement.attr('data-list_id'));
    },

    evtClick$btnDeleteApplyForJob$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      self.delete_help_wanted_appy($activeElement,$activeElement.attr('data-job_id'));
    },

    evtClick$viewHelpWantedApply$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.seasonOn = false;
      self.get_help_wanted_apply($activeElement.attr('data-listid'));
    }, 

    evtClick$resumeNotify$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.resumeNotify($activeElement, $activeElement.attr('data-job_id'),$activeElement.attr('data-email'));
    },  

    evtClick$btnEditSalesEvents$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getSalesEvents($activeElement.attr('data-listid'),$activeElement.attr('data-search_display'),$activeElement.attr('data-map'),$activeElement.attr('data-island_id'),$activeElement.attr('data-fulladdress'));
    }, 

    evtClick$btndoneSalesEvents$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#salesEventsSD').hide();
    },

    evtClick$btnSubmitSalesEvents$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      $form = $('form#sales_events'),  
      formStatus = $form .attr('data-status'),
      $applyButton = $activeElement,
      search_display = $activeElement.attr('data-search_display'),
      list_id = $activeElement.attr('data-list_id'),
      map = $activeElement.attr('data-map'),
      island_id = $activeElement.attr('data-island_id'),
      full_address = $activeElement.attr('data-fulladdress'),
      previous_picture = $('input#salesEventPhoto').attr('data-previous_photo');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = self.checkFileTypeSize(150000, $('input#salesEventPhoto')[0].files, $('label[for="salesEventPhoto"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insertUpdateSalesEvents(formData, $applyButton, $form, formElementObj, formStatus, search_display, list_id, map, previous_picture, island_id, full_address);
       }
       else{
        $('div#salesEventsAlert').css("visibility","visible");
       }       
    },

    evtClick$btnsalesEventPhoto$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-previous_photo','');
    },

    evtClick$searchButton$searchType$8: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getDisplaySalesEvents();
    },

    evtClick$searchButton$searchType$9: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getDisplaySales();
      console.log('Get Sales');
      //self.getDisplaySales();
    },

    evtClick$searchButton$searchType$10: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      console.log('Get New Arrivals');
      //self.getDisplayNewArrivals();
    },

    evtClick$freeMemClassified$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(conFig.mutualExclusiveDom.$divClassifieds);
    },

    evtClick$dropForRent$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.displayMutExDom(conFig.mutualExclusiveDom.$divForRent);
    },

    evtAccordionClassifiedsFormSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getClassifiedForm($(evt.target).attr('data-div_display_id'),$(evt.target).attr('data-control'))
    },

    evtAccordionForRentFormSlidDown$collapse$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getForRentForm($(evt.target).attr('data-div_display_id'),$(evt.target).attr('data-control'))
    },




    evtClick$doneClassified$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#classifieds').find('div.in').removeClass('in');
    },

    evtClick$btnResetClassified$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#' + $activeElement.attr('data-form'))[0].reset();
      $('div#classifieds').find('div.in').removeClass('in');
    },
    
    evtClick$btnSubmitClassified$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      control = $activeElement.attr('data-control'),
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form.attr('data-status'),
      $applyButton = $activeElement,
      photo_1 = $('input#image_1' + control).attr('data-previous_photo'),
      photo_2 = $('input#image_2' + control).attr('data-previous_photo'),
      photo_3 = $('input#image_3' + control).attr('data-previous_photo'),
      photo_4 = $('input#image_4' + control).attr('data-previous_photo');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_1' + control)[0].files, $('label[for="image_1' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_2' + control)[0].files, $('label[for="image_2' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_3' + control)[0].files, $('label[for="image_3' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_4' + control)[0].files, $('label[for="image_4' + control + '"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insertUpdateClassified(formData, $applyButton, $form, formElementObj, formStatus, control, photo_1,photo_2,photo_3,photo_4);
       }
       else{
        $('div#formClassifiedAlert').css("visibility","visible");
       }       
    },

    evtClick$btnSelectImage$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.attr('data-previous_photo', '');
    },

    evtClick$searchButton$searchType$6: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getDisplayClassifieds();
    },

    evtClick$searchButton$searchType$7: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getDisplayForRent();
    },

    evtClick$doneForRent$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#for_rent').find('div.in').removeClass('in');
    },

    evtClick$btnResetForRent$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('form#' + $activeElement.attr('data-form'))[0].reset();
      $('div#for_rent').find('div.in').removeClass('in');
    },

    evtClick$btnSubmitForRent$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = false,
      fileValid = true,
      formData = null,
      formSerialized,
      control = $activeElement.attr('data-control'),
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form.attr('data-status'),
      $applyButton = $activeElement,
      photo_1 = $('input#image_1' + control).attr('data-previous_photo'),
      photo_2 = $('input#image_2' + control).attr('data-previous_photo'),
      photo_3 = $('input#image_3' + control).attr('data-previous_photo'),
      photo_4 = $('input#image_4' + control).attr('data-previous_photo');
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      //Check File size and type
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_1' + control)[0].files, $('label[for="image_1' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_2' + control)[0].files, $('label[for="image_2' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_3' + control)[0].files, $('label[for="image_3' + control + '"]'));
      fileValid = fileValid && self.checkFileTypeSize(50000, $('input#image_4' + control)[0].files, $('label[for="image_4' + control + '"]'));
      formValid = self.validateForm(formElementObj)
      if(formValid && fileValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insertUpdateForRent(formData, $applyButton, $form, formElementObj, formStatus, control, photo_1,photo_2,photo_3,photo_4);
       }
       else{
        $('div#formForRentAlert').css("visibility","visible");
       }       
    },


    evtClick$resetPassword$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.resetPassword($('input#loginEmail').val());
    },

    evtClick$deleteRequestDeleteListings$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#divDeleteRequest').remove();
      self.getDeleteRequestForm($activeElement.attr('data-listid'));
      console.log('Go Get Form');
    },

    evtClick$doneDeleteRequest$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#memberListings').slideToggle();
      $('div#divDeleteRequest').remove();
    },

    evtClick$btnSubmitDeleteRequest$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      var formElementObj, 
      formValid = true,
      formData = null,
      formSerialized,
      control = $activeElement.attr('data-control'),
      $form = $('form#' + $activeElement.attr('data-form')),  
      formStatus = $form.attr('data-status'),
      $applyButton = $activeElement;
      evt.preventDefault();
      formElementObj = self.createFormElementsObj($form[0]);
      self.validateFormElements(formElementObj);
      if(formValid){
        $applyButton.prop("disabled", true); 
        formData = new FormData($form[0]);
        self.insertDeleteRequest(formData, $applyButton, $form, formElementObj, formStatus,$applyButton.attr('data-listid'));
       }
       else{
        $('div#deleteRequestAlert').css("visibility","visible");
       }   
    },

    evtClick$dropMenuHome$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.listSuggestionsData = '';
      self.PsSuggestionsData = '';
      self.bpSuggestionData = '';
      self.listCompanyData = '';
      self.psCompanyData = '';
      self.displayProductsData = '';
      self.displaySeasonCompanyData = '';
      self.helpWantedActiveData = '';
      self.displaySalesEventsData = '';
      self.displayClassifiedsData = '';
      self.displayForRentData = '';
      self.filteredListCompany = false;
      self.listCompFiltered = false;
      self.psCompFiltered = false;
      self.psDisplayFiltered = false;
      self.classifiedDisplayFiltered = false;
      self.forRentDisplayFiltered = false;
      self.seasonCompanyFiltered = false;
      self.salesEventsFiltered = false;
      self.seasonSearchClicked = false;
      self.filteredListPS = false;
      self.filteredHelpWanted = false;
      self.startUpDisplay();
      console.log('Go Home');
    },

    evtClick$dropMenuContactUs$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('#contact_us').modal('show');
    },

    evtClick$dropMenuSupport$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('#support').modal('show');
    },

    evtClick$dropMenuPrivacy$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('#privacy').modal('show');
    },

    evtClick$btn_print_reciept$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('button#print').css('visibility','hidden');
      window.print();
    },

    evtClick$help$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getHelp();
    },

    evtClick$aToggleHelp$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      config.mutualExclusiveDom.$divthe242help.find('div.help-info').hide();
      $('div#' + $activeElement.attr('data-div_id')).find('div.help-info').toggle();
    },

    evtClick$doneHelp$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      $('div#' + $activeElement.attr('data-div_id')).find('div.help-info').toggle();
    },

    evtClick$links$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getHelpfulLinks();
    }  



  };//window.Listings.programFunctions Ending


  /*Hangelbars Routines */
  window.Listings.complieTemplates = function(){
   var self = Listings,
   conFig = self.config;
   self.HBsearchTypeFun = Handlebars.compile(self.config.HTMLsearchType);
   self.HBsearchIslandFun = Handlebars.compile(self.config.HTMLsearchIslands);   
   self.HBlistSuggestionsFun = Handlebars.compile(conFig.HTMLlistSuggestions);
   self.HBbpSuggestionFun = Handlebars.compile(conFig.HTMLbpSuggestions);
   self.HBpsSuggestionFun = Handlebars.compile(conFig.HTMLpsSuggestions);
   self.HBlistComapanyFun = Handlebars.compile(conFig.HTMLlistCompany);
   self.HBpsCompnayFun = Handlebars.compile(conFig.HTMLpsCompany);
   self.HBlistLocationFun = Handlebars.compile(conFig.HTMLlistLocation);
   self.HBmemberMenuFun = Handlebars.compile(conFig.HTMLmemberMenu);
   self.HBdisplayProductsFun = Handlebars.compile(conFig.HTMLdisplayProduct);
   self.HBdisplaySeasonCompanyFun = Handlebars.compile(conFig.HTMLdisplaySeasonCompany);
   self.HBdisplaySalesEventsFun = Handlebars.compile(conFig.HTMLdisplaySalesEvents);
   self.HBdisplaySeasonProductsFun = Handlebars.compile(conFig.HTMLdisaplaySeasonProducts);
   self.HTMLdisaplayCompanyProductsFun = Handlebars.compile(conFig.HTMLdisaplayCompanyProducts);
   self.HBdisplayHelpWantedFun = Handlebars.compile(conFig.HTMLdisplayHelpWanted);
   self.HBdisplayClassifiedFun = Handlebars.compile(conFig.HTMLdisplayClassified);
   self.HBdisplayForRentFun = Handlebars.compile(conFig.HTMLdisplayForRent);
   self.HBdisplaySalesFun = Handlebars.compile(conFig.HTMLdisplaySales);
  };

  window.Listings.populateMemberMenu = function(data){
    var self = Listings;
    conFig = self.config;
    self.config.DOMmemberMenu.innerHTML = '';
    self.config.DOMmemberMenu.innerHTML = self.HBmemberMenuFun(data);
  };

  window.Listings.populateListLocation = function(data){
    var self = Listings;
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divListLocation);
    self.config.DOMlistLocation.innerHTML = '';
    self.config.DOMlistLocation.innerHTML = self.HBlistLocationFun(data);
  };

  window.Listings.populateListSuggestions = function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divListSuggestions);
    self.config.DOMulListSuggestions.innerHTML = '';
    self.config.DOMulListSuggestions.innerHTML = self.HBlistSuggestionsFun(data);
  };

  window.Listings.populatePsuggestions = function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divPsSuggestions);
    self.config.DOMulPsSuggestions.innerHTML = '';
    self.config.DOMulPsSuggestions.innerHTML = self.HBpsSuggestionFun(data);
  };

  window.Listings.populateBpSuggestions = function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divBpSuggestions);
    self.config.DOMulBpSuggestions.innerHTML = '';
    self.config.DOMulBpSuggestions.innerHTML = self.HBbpSuggestionFun(data);    
  };

  window.Listings.populateListCompany = function(data){
    var self = Listings,
    conFig = self.config,
    $mapBnt = $('div#map-all').find('button.map-all');
    self.displayMutExDom(conFig.mutualExclusiveDom.$divListCompany);
    if(data.length){
      conFig.DOMtblListCompany.innerHTML =  self.HBlistComapanyFun(data); 
    }
    else{
      conFig.DOMtblListCompany.innerHTML = '<div class="alert alert-info" role="alert"><p>Sorry, No Results.</p></div>'; 
    }
    self.mapAllBtn = false;
    for(var i = 0; i < data.length; i++){
      if(data[i][11]){
        self.mapAllBtn = true;
        break;
      }
    } 
    self.mapAllBtn ? $mapBnt.show() : $mapBnt.hide();
    if(self.mapAllBtn){
      if(!$('div#map-all').length){
        conFig.$divTableResponsive.append('<div id="map-all"><button class="btn btn-warning btn-xs map-all" data-element="btnCompListMultiMap"><span class="glyphicon glyphicon-map-marker"></span> Map All</button></div>');
      }
    }
  };

  window.Listings.populatePsCompany = function(data){
    var self = Listings,
    conFig = self.config,
    $mapBnt = $('div#map-all-ps').find('button.map-all');
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divPsCompany);
    conFig.DOMulpsCompany.innerHTML = '';
    conFig.DOMulpsCompany.innerHTML = self.HBpsCompnayFun(data);

    self.mapAllBtn = false;
    for(var i = 0; i < data.length; i++){
      if(data[i][5]){
        self.mapAllBtn = true;
        break;
      }
    } 
    
    self.mapAllBtn ? $mapBnt.show() : $mapBnt.hide();
    if(self.mapAllBtn){
      if(!$('div#map-all-ps').length){
        conFig.mutualExclusiveDom.$divPsCompany.append('<div id="map-all-ps"><button class="btn btn-warning btn-sm map-all" data-element="btnPsMultiMap"><span class="glyphicon glyphicon-map-marker"></span> Map All</button></div>');
      }
    }

  };

  window.Listings.populateDisplayProducts = function(data){
    var self = Listings,
    conFig = self.config,
    $mapBnt = $('div#map-all-dps').find('button.map-all');
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplayProducts);
    conFig.DOMdisaplayProducts.innerHTML = '';
    conFig.DOMdisaplayProducts.innerHTML = self.HBdisplayProductsFun(data)

  };

  window.Listings.populateDisplaySalesProducts = function(data){
    var self = Listings,
    conFig = self.config,
    self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplayProducts);
    conFig.DOMdisaplayProducts.innerHTML = '';
    conFig.DOMdisaplayProducts.innerHTML = self.HBdisplayProductsFun(data)

  };  

  window.Listings.populateSeasonCompany = function(data){
    var self = Listings,
    conFig = self.config;
    // $mapBnt = $('div#map-all-dps').find('button.map-all');
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divSeasonShopping);
    conFig.DOMdisplaySeasonCompany.innerHTML = '';
    conFig.DOMdisplaySeasonCompany.innerHTML = self.HBdisplaySeasonCompanyFun(data);
  };

  window.Listings.populateSalesEvents = function(data){
    var self = Listings,
    conFig = self.config;
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divSalesevents);
    conFig.DOMdisplaySalesEvents.innerHTML = '';
    conFig.DOMdisplaySalesEvents.innerHTML = self.HBdisplaySalesEventsFun(data);
  };

  window.Listings.populateSales = function(data){
    var self = Listings,
    conFig = self.config;
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplaysales);
    conFig.DOMdisplaySales.innerHTML = '';
    conFig.DOMdisplaySales.innerHTML = self.HBdisplaySalesFun(data);
  };  

  window.Listings.populateClassifieds = function(data){
    var self = Listings,
    conFig = self.config;
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divdisplayClassifieds);
    conFig.DOMdisplayClassified.innerHTML = '';
    conFig.DOMdisplayClassified.innerHTML = self.HBdisplayClassifiedFun(data);
  };

  window.Listings.populateForRent= function(data){
    var self = Listings,
    conFig = self.config;
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divdisplayForRent);
    conFig.DOMdisplayForRent.innerHTML = '';
    conFig.DOMdisplayForRent.innerHTML = self.HBdisplayForRentFun(data);
  };

  window.Listings.populateHelpWanted = function(data){
    var self = Listings,
    conFig = self.config;
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divHelpWanted);
    conFig.DOMdisplayHelpWanted.innerHTML = '';
    conFig.DOMdisplayHelpWanted.innerHTML = self.HBdisplayHelpWantedFun(data);
  };


  window.Listings.populatebPCompany = function(data){
    var self = Listings,
    conFig = self.config,
    summaryHTML = '';
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$divBpCompany); 
    conFig.DOMbPSummary.innerHTML = '';
    conFig.DOMbPDetails.innerHTML = '';

    summaryHTML += '<p>' + data[0][0] + '&nbsp; &nbsp;' + '<a href="tel:' + data[0][2] + '">' + data[0][2] + '</a> &nbsp; &nbsp;';
    summaryHTML += data[0][3]?data[0][3] + ' ':'';
    summaryHTML += data[0][4]?data[0][4] + ' ':'';
    summaryHTML += data[0][5] + ' ';
    summaryHTML += data[0][6]?'eMail to: ' + data[0][6] + ' ':'';
    summaryHTML += data[0][7]?'<a href="http://' + data[0][7] + '" target= "_blank">' + data[0][7] + '</a>' + ' ':'';
    summaryHTML += data[0][8]?'<a href="" data-element="bpAdd">' + 'View Ad' + '</a>' + ' ':'';
    summaryHTML += data[0][9]?'<a href="" data-element="bpMap">' + 'View Map' + '</a>' + ' ' :'';
    summaryHTML += '</p>';
    summaryHTML += data[0][10]?'<p>' + data[0][10] + '</p>':'';
    conFig.DOMbPSummary.innerHTML = summaryHTML;
    conFig.DOMbPDetails.innerHTML = data[0][1];
  };

  window.Listings.populateSearchType = function(data){
    var self = Listings;
    self.config.DOMsearchType.innerHTML = '';
    self.config.DOMsearchType.innerHTML = self.HBsearchTypeFun(data);
  };

  window.Listings.populateIsland = function(data){
    var self = Listings;
    self.config.DOMdivSearchIslands.innerHTML = '';
    self.config.DOMdivSearchIslands.innerHTML = self.HBsearchIslandFun(data);
  };

  window.Listings.populateListDisplayProducts = function(data, display_div){
    var self = Listings,
    conFig = self.config;
    $('#' + display_div).empty().append(self.HTMLdisaplayCompanyProductsFun(data));
  };

    window.Listings.populateDisplaySeasonProducts = function(data, display_div){
    var self = Listings,
    conFig = self.config;
    $(display_div).empty().append(self.HBdisplaySeasonProductsFun(data));
  };

  window.Listings.getMaps = function(latLng, curZoom, addToMarkerInfo, storefornt_img){
    var self = Listings,
    conFig = self.config,
    mapInfoArray = latLng.split(':'),
    listing = mapInfoArray[1],
    position_array = mapInfoArray[0].split(','),
    lat = parseFloat(position_array[0]),
    lng = parseFloat(position_array[1]);
    if(!storefornt_img){
      storefornt_img = 'classified/placeholder.png'
    };  
    
    if(!mapInfoArray[0]){return};
    self.singleMap = 'singleMap';
    self.curLatLng = latLng;
    self.curAddToMarkerInfo = addToMarkerInfo;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divMapCanvas);
    conFig.$divMap.show();

    myLatlng = new google.maps.LatLng(lat,lng),
    mapOptions = {
    center: myLatlng ,
    zoom: curZoom || 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    overviewMapControl: true
    };
    var map = new google.maps.Map(conFig.$divMap[0],mapOptions);
    self.map = map;
    var marker = new google.maps.Marker({
      position: myLatlng,
      title: listing,
      map: map
    })
    markerInfo = storefornt_img === 'nophoto' ? '<span class="span-infowindow">' + listing + '</span>' +' <a href="tel:'+ self.curAddToMarkerInfo + '" class="a-infowindow">' + self.curAddToMarkerInfo + '</a>': listing;
    if (storefornt_img !== 'nophoto'){
      markerInfo = '<img src="images/' + storefornt_img + '" class="img-responsive center-block img-thumbnail img-infowindow">' + '<span class="span-infowindow">' + listing + '</span>' +' <a href="tel:'+ self.curAddToMarkerInfo + '" class="a-infowindow">' + self.curAddToMarkerInfo + '</a>';
    }
    infoWindow = new google.maps.InfoWindow({content: markerInfo});
    google.maps.event.addListener(marker,'click', function(){infoWindow.open(map, marker);});
  };

    window.Listings.mapAllCompList = function(curZoom, inlistingArray, positionIndex){
    var self = Listings,
    conFig = self.config,
    posIndex = positionIndex ? 0 : 11;
    listingArray = [];
    self.singleMap = 'compListMultiMap';
    
    if(inlistingArray){
      listingArray = self.PSMultiMapArray;  
    }
    else
    {
      listingArray = self.listCompFiltered && $('div.islandsearch.active').attr('data-island') !=='0' ? self.filteredListCompany : self.listCompanyData;
      listingArray = $.grep(listingArray, function(item,index){return !!item[11];});
    }    
    
    if(!listingArray.length){return;}

    self.displayMutExDom(conFig.mutualExclusiveDom.$divMapCanvas);
    conFig.$divMap.show();

    var position_array = listingArray[0][posIndex].split(','),
    lat = parseFloat(position_array[0]),
    lng = parseFloat(position_array[1]);
    if($('div.islandsearch.active').attr('data-island') ==='0'){
      curZoom = 6;
    }
    var myLatlng = new google.maps.LatLng(lat,lng),
    mapOptions = {
    center: myLatlng ,
    zoom: curZoom || 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    overviewMapControl: true
    },
    map = new google.maps.Map(document.getElementById('maps'),mapOptions);
    self.map = map;
    for(var i = 0; i < listingArray.length; i++ ){
      var position_array = listingArray[i][posIndex].split(','),
      lat = parseFloat(position_array[0]),
      lng = parseFloat(position_array[1]),
      myLatlng = new google.maps.LatLng(lat,lng);
      new google.maps.Marker({
      position: myLatlng,
      title: listingArray[i][1],
      map: map});
    }
  };

    window.Listings.mapAllForRent = function(curZoom, inlistingArray, positionIndex){
    var self = Listings,
    conFig = self.config,
    marker = null;
    listingArray = [];
    self.singleMap = 'compListMultiMap';
    
    if(inlistingArray){
      listingArray = self.PSMultiMapArray;  
    }
    else
    {
      listingArray = self.forRentDisplayFiltered && $('div.islandsearch.active').attr('data-island') !=='0' ? self.filteredListPS : self.displayForRentData;
      listingArray = $.grep(listingArray, function(item,index){return !!item[5];});
    }    
    
    if(!listingArray.length){return;}

    self.displayMutExDom(conFig.mutualExclusiveDom.$divMapCanvas);
    conFig.$divMap.show();

    var position_array = listingArray[0][5].split(','),
    lat = parseFloat(position_array[0]),
    lng = parseFloat(position_array[1]);
    if($('div.islandsearch.active').attr('data-island') ==='0'){
      curZoom = 6;
    }
    var myLatlng = new google.maps.LatLng(lat,lng),
    mapOptions = {
    center: myLatlng ,
    zoom: curZoom || 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    overviewMapControl: true
    },
    map = new google.maps.Map(document.getElementById('maps'),mapOptions);
    self.map = map;
    for(var i = 0; i < listingArray.length; i++ ){
      (function(i){
      var marker = [],
      markerInfo = [],
      infoWindow = [],
      position_array = listingArray[i][5].split(','),
      lat = parseFloat(position_array[0]),
      lng = parseFloat(position_array[1]),
      myLatlng = new google.maps.LatLng(lat,lng);
      marker[i] = new google.maps.Marker({
      position: myLatlng,
      title: listingArray[i][0],
      map: map});
      markerInfo[i] = '<img src="' + listingArray[i][7] + '" class="img-responsive center-block img-thumbnail img-infowindow">' + '<span class="span-infowindow">' + listingArray[i][0] + '</span>' +' <a href="tel:'+ listingArray[i][6]+ '" class="a-infowindow">' + listingArray[i][6] + '</a>';
      infoWindow[i] = new google.maps.InfoWindow({content: markerInfo[i]});
      google.maps.event.addListener(marker[i],'click', function(){infoWindow[i].open(map, marker[i]);});
      })(i);
    }
  };

    window.Listings.resizeMap = function(evt, $activeElement){
    var self = Listings
    conFig = self.config,
    direction = $activeElement.attr("data-direction");
    evt.preventDefault();
    if(direction === 'large'){
      conFig.$divMap.css({
        height: 500
      });
      switch(self.singleMap){
        case 'singleMap': self.getMaps(self.curLatLng, self.map.zoom, self.curAddToMarkerInfo); break;
        case 'compListMultiMap' : self.mapAllCompList(null, self.PSMultiMapArray.length, self.PSMultiMapArray.length); break;
      } 
      return;
    }
    direction = (direction === 'plus')?'+=':'-=';
    conFig.$divMap.css({
      height: direction + '10'});
    switch(self.singleMap){
      case 'singleMap': self.getMaps(self.curLatLng, self.map.zoom, self.curAddToMarkerInfo); break;
      case 'compListMultiMap' : self.mapAllCompList(null, self.PSMultiMapArray.length, self.PSMultiMapArray.length); break;
    } 
   
  };

    window.Listings.closeMap = function(mapOrigin){
    var self = Listings
    conFig = self.config;
    switch(mapOrigin){
      case "aCompListSingleMap":
      self.displayMutExDom(conFig.mutualExclusiveDom.$divListCompany);
      break;

      case "btnLocationSingleMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divListLocation);
      break;

      case "btnCompListMultiMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divListCompany);
      break;

      case "aPSMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divPsCompany);
      break; 

      case "btnPsMultiMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divPsCompany);
      break;

      case "btnDpsMultiMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divDisplayProducts);
      break; 

      case "forrent_map":
      case "btnForRentListMultiMap":
        self.displayMutExDom(conFig.mutualExclusiveDom.$divdisplayForRent);
      break; 

      case "map_helpwanted": 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divHelpWanted);
      break;

      case "a_salesevent_map": 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divSalesevents);
      break;
    }

  };

    window.Listings.psMultiCompMap = function(data){
    var self = Listings
    conFig = self.config,
    listingArray = [],
    buildPSMultiMapArray = [],
    checkIslandIdArray = [],
    selectedIsland = $('div.island.active').attr("data-island");

    if(selectedIsland !== '0' && data.length > 0){
      for(var k = 0, lenData = data.length; k < lenData; k++){
        if(!data[k][5]){continue;}
        listingArray = data[k][5].split(':');
        for(var l = 0, len = listingArray.length; l < len; l++){
          checkIslandIdArray = listingArray[l].split('#');
          if(checkIslandIdArray[0] == selectedIsland){
            buildPSMultiMapArray.push([checkIslandIdArray[2], data[k][0]])
          }
        }
      }
        self.PSMultiMapArray = buildPSMultiMapArray;
        self.mapAllCompList(null, true, true)
        return; 
    }

    if(selectedIsland === '0' && data.length > 0){
      for(var i = 0, lenData = data.length; i < lenData; i++){
        if(!data[i][5]){continue;}
        listingArray = data[i][5].split(':');
        for(var j = 0, len = listingArray.length; j < len; j++){
          buildPSMultiMapArray.push([listingArray[j].split('#')[2], data[i][0]])
        }
      }
      self.PSMultiMapArray = buildPSMultiMapArray;
      self.mapAllCompList(null, true, true)
      return;
    }  
  
  };

  window.Listings.dpsMultiCompMap = function(data){
    var self = Listings
    conFig = self.config,
    listingArray = [],
    buildPSMultiMapArray = [],
    checkIslandIdArray = [],
    selectedIsland = $('div.island.active').attr("data-island");

    if(selectedIsland !== '0' && data.length > 0){
      for(var k = 0, lenData = data.length; k < lenData; k++){
        if(!data[k][5]){continue;}
        listingArray = data[k][5].split(':');
        for(var l = 0, len = listingArray.length; l < len; l++){
          checkIslandIdArray = listingArray[l].split('#');
          if(checkIslandIdArray[0] == selectedIsland){
            buildPSMultiMapArray.push([checkIslandIdArray[2], data[k][0]])
          }
        }
      }
        self.PSMultiMapArray = buildPSMultiMapArray;
        self.mapAllCompList(null, true, true)
        return; 
    }

    if(selectedIsland === '0' && data.length > 0){
      for(var i = 0, lenData = data.length; i < lenData; i++){
        if(!data[i][5]){continue;}
        listingArray = data[i][5].split(':');
        for(var j = 0, len = listingArray.length; j < len; j++){
          buildPSMultiMapArray.push([listingArray[j].split('#')[2], data[i][0]])
        }
      }
      self.PSMultiMapArray = buildPSMultiMapArray;
      self.mapAllCompList(null, true, true)
      return;
    }  
  
  };

    window.Listings.psSingleCompMap = function(compInfoStr, $inActiveElement){
    var self = Listings
    conFig = self.config,
    listings = '',
    listingArray = [],
    filteredArray = [],
    selectedIsland = $('div.island.active').attr("data-island"),    
    compArray = compInfoStr.split(':');
    listings = compArray.shift();
    
    if(selectedIsland === '0' && compArray.length === 1){
      compArray = compArray[0].split('#');
      self.getMaps(compArray[2] + ':' +  listings, null, compArray[1], 'nophoto');
      return;
    }

    if(selectedIsland === '0' && compArray.length > 1){
      for(var i = 0, len = compArray.length; i < len; i++){
        listingArray[i] = [compArray[i].split('#')[2],listings];  
      }
      self.PSMultiMapArray = listingArray;
      self.mapAllCompList(null, true, true)
      return;
    }

    if(selectedIsland !== '0' && compArray.length > 0){
      for(var i = 0, len = compArray.length; i < len; i++){
        if(compArray[i]
          .split('#')[0] == selectedIsland){
          filteredArray.push(compArray[i]);    
        }      
      }
      
      if(filteredArray.length === 0){
        self.getListCompany($inActiveElement.siblings('a[data-element="aPsCompany"]').attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0');
        return;
      }

      if(filteredArray.length === 1){
        filteredArray = filteredArray[0].split('#');
        self.getMaps(filteredArray[2] + ':' +  listings, null, filteredArray[1], 'nophoto');
        return;
      }

      if(filteredArray.length > 1){
        for(var i = 0, len = filteredArray.length; i < len; i++){
          listingArray[i] = [filteredArray[i].split('#')[2],listings];  
        }
        self.PSMultiMapArray = listingArray;
        self.mapAllCompList(null, true, true)
        return;
      }   
   }   
  };

  window.Listings.inputGetData = function(search_type, dataStore, populate, input){
  var self = Listings,
  conFig = self.config;
  dataObj = {};
  dataObj.lookup = input.value;
  dataObj.lookup = dataObj.lookup.replace(/'|"|\.|:|;|!/g,'');
  dataObj.search_type = search_type;
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: dataObj,
    success: function(data){
      dataStore = data;
      populate(dataStore);
    }
  })
};

window.Listings.getListCompany = function(inListIds, psFilter, backButtonFunction){
  var self = Listings,
  conFig = self.config,
  islandsReturned = [],
  queryParmsObj = null,
  island_selected = conFig.$divIslandCarousel.find('div.active').attr('data-island'),
  islandList =[];
  self.listCompFiltered = false;
  queryParmsObj = {'ids': inListIds, 'search_type': '1'}
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      for(var i=0, len=data.length; i<len; i++){
       if(data[i][10]){
         data[i][10] = data[i][10].replace('Edit ', '');
         data[i][10] = data[i][10].replace(/contenteditable=""/g, '');
       }        
      }

      self.listCompanyData = data;
      for(var i = 0; i < self.listCompanyData.length; i++){
        self.listCompanyData[i].push(i);
        if(self.memberType === 0){self.listCompanyData[i][13] = true;} 
      }
      self.populateListCompany(self.listCompanyData);
      $('button[data-element="btnBackCompList"]').attr('data-function', backButtonFunction);

      islandsReturned = $.map(self.listCompanyData, function(item, index) {
        return item[5];
      });
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsReturned) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.populateIsland(islandList);

      if(psFilter){
        $('div.island.active').removeClass('active');
        $('div.island[data-island = "' + island_selected + '"]').addClass('active');
        self.filterListings();
      }

      console.dir(data);
    }
  });
};

window.Listings.getPsCompany = function(inPsSearchStr){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsReturnedCleaned = [],
  islandsUnique = [],
  queryParmsObj = null;
  psCompFiltered = false;
  queryParmsObj = {'ps_search_str': inPsSearchStr, 'search_type':'2'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      self.psCompanyData = data;
      self.populatePsCompany(self.psCompanyData);
      islandsReturned = $.map(self.psCompanyData, function(item, index) {
        return item[4];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
         var numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
        } 
      });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.psIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};



window.Listings.getBpCompany = function(inBpId){
  var self = Listings,
  queryParmsObj = null;
  queryParmsObj = {'bp_id': inBpId, 'search_type':'3'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      self.populatebPCompany(data);
    }
  })  
};

window.Listings.getDisplayProductsServices = function(inPsSearchStr, psFilter, searchTypeSelected){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsReturnedCleaned = [],
  islandsUnique = [],
  list_ids = '',
  island_ids = '',
  maps = '',
  phones = '',
  location_array = null;
  queryParmsObj = null;
  psDisplayFiltered = false;
  queryParmsObj = {'ps_search_str': inPsSearchStr, 'search_type':searchTypeSelected};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      data.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
            location_array = location.split(':');
            island_ids = island_ids + location_array[0];
            index2 + 1 < product[12].length ? island_ids  = island_ids + ',' : null;
            list_ids = list_ids + location_array[1];
            index2 + 1 < product[12].length ? list_ids  = list_ids + ',' : null;
            phones = phones + location_array[2];
            index2 + 1 < product[12].length ? phones  = phones + ',' : null;
            maps = maps + location_array[3];
            index2 + 1 < product[12].length ? maps  = maps + ':' : null;            
        });
        product.push(island_ids,list_ids,phones,maps,product[12].length, island_ids);
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
      });
      console.log(data);
      self.displayProductsData = data;
      self.populateDisplayProducts (self.displayProductsData);
      islandsReturned = $.map(self.displayProductsData, function(item, index) {
        return item[13];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
         var numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
        } 
      });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.dpsIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};

window.Listings.getSalesProducts = function(product_ids, display_div){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsReturnedCleaned = [],
  islandsUnique = [],
  list_ids = '',
  island_ids = '',
  maps = '',
  phones = '',
  location_array = null;
  queryParmsObj = null;
  psDisplayFiltered = false;
  queryParmsObj = {'getSalesProducts': 'getSalesProducts', 'search_type':'9', 'product_ids':product_ids};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      data.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
            location_array = location.split(':');
            island_ids = island_ids + location_array[0];
            index2 + 1 < product[12].length ? island_ids  = island_ids + ',' : null;
            list_ids = list_ids + location_array[1];
            index2 + 1 < product[12].length ? list_ids  = list_ids + ',' : null;
            phones = phones + location_array[2];
            index2 + 1 < product[12].length ? phones  = phones + ',' : null;
            maps = maps + location_array[3];
            index2 + 1 < product[12].length ? maps  = maps + ':' : null;            
        });
        product.push(island_ids,list_ids,phones,maps,product[12].length, island_ids);
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
      });
      $(display_div).empty().append(self.HBdisplayProductsFun(data));
    }
  })
};

window.Listings.getNewArrivals = function(list_id){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsReturnedCleaned = [],
  islandsUnique = [],
  list_ids = '',
  island_ids = '',
  maps = '',
  phones = '',
  location_array = null;
  queryParmsObj = null;
  psDisplayFiltered = false;
  queryParmsObj = {'getNewArrivals': 'getNewArrivals', 'list_id':list_id};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      data.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
            location_array = location.split(':');
            island_ids = island_ids + location_array[0];
            index2 + 1 < product[12].length ? island_ids  = island_ids + ',' : null;
            list_ids = list_ids + location_array[1];
            index2 + 1 < product[12].length ? list_ids  = list_ids + ',' : null;
            phones = phones + location_array[2];
            index2 + 1 < product[12].length ? phones  = phones + ',' : null;
            maps = maps + location_array[3];
            index2 + 1 < product[12].length ? maps  = maps + ':' : null;            
        });
        product.push(island_ids,list_ids,phones,maps,product[12].length, island_ids);
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
      });
      $('div#products_newarrivals').empty().append(self.HTMLdisaplayCompanyProductsFun(data));
    }
  })
};

window.Listings.getDisplaySeasonProducts = function(display_div, product_ids){
  var self = Listings,
  list_ids = '',
  island_ids = '',
  maps = '',
  phones = '',
  location_array = null;
  cnt = 0,
  index3 = 0;
  queryParmsObj = null;
  psDisplayFiltered = false;
  queryParmsObj = {'form':'getDisplaySeasonProducts', 'product_ids':product_ids};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      data.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
            location_array = location.split(':');
            island_ids = island_ids + location_array[0];
            index2 + 1 < product[12].length ? island_ids  = island_ids + ',' : null;
            list_ids = list_ids + location_array[1];
            index2 + 1 < product[12].length ? list_ids  = list_ids + ',' : null;
            phones = phones + location_array[2];
            index2 + 1 < product[12].length ? phones  = phones + ',' : null;
            maps = maps + location_array[3];
            index2 + 1 < product[12].length ? maps  = maps + ':' : null;            
        });
        product.push(island_ids,list_ids,phones,maps,product[12].length, island_ids);
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
      });
      if(self.seasonCompanyFiltered){
        self.island_id = $('div.islandsearch.active').attr('data-island');
        self.filteredListDPS = [];
        searchFor = '#' + self.island_id + '#';
        self.filteredListDPS = $.grep(data, function(item,index){
          return (item[18].indexOf(searchFor) !== -1);
        });

        self.filteredListDPS.forEach(function(product, index1){
          product[12].forEach(function(location, index2){
              location_array = location.split(':');
              index3 = index2;
              if(location_array[0] === searchFor){
                island_ids = island_ids + location_array[0] + ',';
                list_ids = list_ids + location_array[1] + ',';
                phones = phones + location_array[2] + ',';
                maps = maps + location_array[3] + ':';;
                cnt = cnt + 1;
              }            
          });
          product[13] = island_ids;
          product[14] = list_ids;
          product[15] = phones;
          product[16] = maps;
          product[17] = cnt;
          list_ids = '';
          island_ids = '';
          maps = '';
          phones = '';
          cnt = 0;
          if(product[12].length === index3 +1 )
            product[13] = product[13].replace(/,$/,'');
            product[14] = product[14].replace(/,$/,'');
            product[15] = product[15].replace(/,$/,''); 
            product[16] = product[16].replace(/:$/,'');         
        });
        self.populateDisplaySeasonProducts(self.filteredListDPS,display_div);   
      }
      else{
        self.populateDisplaySeasonProducts(data,display_div);  
      }

      
      console.log(data);
      //self.populateListDisplayProducts (data);
    }
  })
};

window.Listings.submitMember = function(formData, $submitButton, $form, formElementObj, formStatus){
   var self = Listings,
   conFig = self.config;

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData + '&form=insert_update_member&formstatus=' + formStatus + '&oldemail=' + $submitButton.attr('data-oldEmail'),
    dataType: 'json',
    success: function(data){
      if(data[0]){
        $submitButton.prop("disabled", false);
        $("input#loginEmail").val($("input#memberEmail").val());
        $form[0].reset();
        $('div#formNewMemberAlert').css("visibility","hidden");
        self.displayMutExDom(conFig.mutualExclusiveDom.$divLoginSignUp);
        $('input#loginPassword').focus();
      }
      if(!data[0]){
        data.shift();
        for(var i=0, len=data.length; i<len; i++ ){
          formElementObj[data[i]].valid = false;  
        }
        self.validateForm(formElementObj);
        $submitButton.prop("disabled", false);
        $('div#formNewMemberAlert').css("visibility","visible");
      }
    }
  });
};

window.Listings.loginMember = function(formData, $submitButton, $form, formElementObj){
   var self = Listings,
   conFig = self.config;

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData + '&form=login',
    dataType: 'json',
    success: function(data){
      if(data[0]){
        self.memberType = data[1];
        $submitButton.prop("disabled", false);
        $form[0].reset();
        $("div#formLoginAlert").css("visibility","hidden");
        self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
        if(data[1] === 1){
          self.populateMemberMenu(self.freeMemberArray);
          $('a#alogin').attr('data-status','logout').find('span').text('Logout').addClass('text-warning');
          conFig.$spanLoginStatus.addClass('text-warning');
        }

        if(data[1] === 2){
          self.populateMemberMenu(self.fullMemberArray);
          $('a#alogin').attr('data-status','logout').find('span').text('Logout').addClass('text-warning'); 
          conFig.$spanLoginStatus.addClass('text-warning'); 
        }
      }
      
      if(!data[0]){
        data.shift();
        for(var i=0, len=data.length; i<len; i++ ){
          formElementObj[data[i]].valid = false;  
        }
        self.validateForm(formElementObj);
        $submitButton.prop("disabled", false);
        $("div#formLoginAlert").css("visibility","visible");
      }
    
    }
  });
};

window.Listings.logoutMember = function(){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/memberLogout.php',
      type: 'POST',
      data: {'form':'login'},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          self.memberType = 0;
          $('a#alogin').attr('data-status','login').find('span').text('Login').removeClass('text-warning');
          conFig.$spanLoginStatus.removeClass('text-warning');
          self.populateMemberMenu(self.nonMemberArray);
          self.startUpDisplay();
        }
      }
   });
};      

window.Listings.getSignupForm = function(edit){
   var self = Listings,
   conFig = self.config,
   editStatus = edit ? 'true' : 'false';
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getMemberForm', 'edit':editStatus},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divSignUp.empty().append(data); 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divSignUp);
        $('input#firstName').focus();
      }
    });
}; 

window.Listings.getClassifiedForm = function(div_display_id, control){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getClassifiedForm', 'control_number':control}, 
      dataType: 'html',
      success: function(data){
        $('div#' + div_display_id).empty().append(data); 
        $('input#adLine' + control).focus();
      }
    });
};

window.Listings.getForRentForm = function(div_display_id, control){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getForRentForm', 'control_number':control}, 
      dataType: 'html',
      success: function(data){
        $('div#' + div_display_id).empty().append(data); 
        $('input#adLine' + control).focus();
      }
    });
};

window.Listings.addToMyListings = function(listingId, $activeElement, source){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'addToMyListings', 'listingId':listingId, 'source':source},
      dataType: 'json',
      success: function(data){
        if(data[0] === true){
          $('a.add-list').removeClass('disabled');
          $activeElement.addClass('disabled');
        }
      }
    });
};    

window.Listings.getMemberListings = function($divManageListings){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/memberListings.php',
      type: 'POST',
      data: '',
      dataType: 'html',
      success: function(data){
        $divManageListings.empty().append(data); 
      }
    });
};

window.Listings.getFreePersonalListingForm = function(edit, listId){
   var self = Listings,
   conFig = self.config,
   editStatus = edit ? 'true' : 'false';
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getFreePersonalListingForm', 'edit':editStatus, 'listId':listId},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divManageListings.empty().append(data); 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
        $('input#freeMemberFirstName').focus();
      }
    });
}; 

window.Listings.submitFreePersonalListing = function(formData, $submitButton, $form, formElementObj, formStatus, previous_photo){
   var self = Listings,
   conFig = self.config;
   formData.append('form','insert_update_PersonalForm');
   formData.append('previous_photo', previous_photo);
   formData.append('searchName', $submitButton.attr("data-searchname"));
   formData.append('listId', $submitButton.attr("data-listid"));
   formData.append('formstatus', formStatus);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0] === true){
       $submitButton.prop("disabled", false);
       $form[0].reset();
       window.Listings.getMemberListings(window.Listings.config.mutualExclusiveDom.$divManageListings);
      }
    else{
      $submitButton.prop("disabled", false);
      $('div#formPersonalMemberAlert').html(data[0]).css("visibility","visible");

    }
  }
  });
};

window.Listings.removeFromMyListings = function(listingId){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'removeFromMyListings', 'listingId':listingId},
      dataType: 'json',
      success: function(data){
        if(data[0] === true){
          window.Listings.getMemberListings(window.Listings.config.mutualExclusiveDom.$divManageListings);
        }
      }
    });
}; 

window.Listings.getFreeBusinessListingForm = function(edit, listId){
   var self = Listings,
   conFig = self.config,
   editStatus = edit ? 'true' : 'false';
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getFreeBusinessListingForm', 'edit':editStatus, 'listId':listId},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divManageListings.empty().append(data); 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
        $('input#freeBusinessName').focus();
      }
    });
};

window.Listings.getSeasons = function(){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form': 'getSeasons'},
      dataType: 'html',
      success: function(data){
        $('div#viewSeasonsSD').empty().append(data).show(); 
      }
    });
};

window.Listings.submitFreeBusinessListing = function(formData, $submitButton, $form, formElementObj, formStatus, previous_photo, source){
   var self = Listings,
   conFig = self.config;
   formData.append('form','insert_updateFreeBusinessForm');
   formData.append('previous_photo', previous_photo)
   formData.append('hours', $('div#divhours').html());
   formData.append('searchName', $submitButton.attr("data-searchname"));
   formData.append('listId', $submitButton.attr("data-listid"));
   formData.append('formstatus', formStatus);
   formData.append('source',  source);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0]){
       $submitButton.prop("disabled", false);
       $form[0].reset();
       window.Listings.getMemberListings(window.Listings.config.mutualExclusiveDom.$divManageListings);
      }
    else{
      $submitButton.prop("disabled", false);  
    }
  }
  });
}; 


window.Listings.getPaymentOptions = function(){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/paymentOptions.php',
      type: 'POST',
      data: '',
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divManageListings.empty().append(data); 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
      }
    });
}; 

window.Listings.submitPayOption = function(formData, $submitButton, $form, formElementObj, formStatus, payOptopnId){
   var self = Listings,                     
   conFig = self.config;
   if(formStatus === 'edit'){
    formData.append('cardtype', $submitButton.attr('card-type')); 
    formData.append('item_cnt', $submitButton.attr('item-cnt')); 
   }
   formData.append('form','insert_updatePayOption');
   formData.append('payOptopnId', payOptopnId);
   formData.append('formstatus', formStatus);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0]){
       $submitButton.prop("disabled", false);
       $form[0].reset();
       self.getPaymentOptions();
      }
    else{
      $submitButton.prop("disabled", false);  
    }
  }
  });
}; 

window.Listings.removePayOption = function(payOptionId){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'removePayOption', 'payOptionId':payOptionId},
      dataType: 'json',
      success: function(data){
        if(data[0] === true){
          self.getPaymentOptions();
        }
      }
    });
}; 


window.Listings.getPaidListing = function(listId){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'paidMemberListings', 'listId':listId},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divManageListings.empty().append(data); 
        self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
      }
    });
};

window.Listings.selectPayOption = function(listId){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'selectPayOption', 'listId':listId},
      dataType: 'html',
      success: function(data){
        $('div#selectPayOptionSD').empty().append(data).show();
      }
    });
};

window.Listings.updatePayOption = function(formData, $submitButton, $form, formElementObj, list_id){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','update_pay_option');
   formData.append('list_id', list_id);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
    console.log(data);
     if(data[0]){
       $submitButton.prop("disabled", false);
       $form[0].reset();
       $('img#imgwait').css("visibility", "hidden");
       $('div#selectPayOptionSD').hide();
       $('a.premium').removeAttr("disabled");
       $('p#validPaymentWarning').html('');
       $('p#reciept_info').empty();
       $('p#reciept_info').append('<p>' + data[1] + '</p>');
       data[2].forEach(function(value){
        $('p#reciept_info').append('<p>' + value + '</p>'); 
       });
       $('p#reciept_info').append('<p class="text-warning">A receipt listing of your charges will be emailed to ' + data[3] + '</p>');
       $('div#manageListings').css('visibility','hidden');
       $('#reciept').modal('show');
      }
    else{
      $submitButton.prop("disabled", false);  
    }
  }
  });
};

window.Listings.removePremium = function(list_id){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'removePremium', 'list_id':list_id},
      dataType: 'json',
      success: function(data){
        if(data[0] === true){
          self.displayMutExDom(conFig.mutualExclusiveDom.$divManageListings);
          self.getMemberListings(conFig.mutualExclusiveDom.$divManageListings);
        }
      }
    });
};

window.Listings.selectBanner = function(listId){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'selectBanner', 'listId':listId},
      dataType: 'html',
      success: function(data){
        $('div#selectBannerSD').empty().append(data).show();
      }
    });
};

window.Listings.getSalesEvents = function(list_id, search_display, map, island_id, full_address){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getSalesEvents','list_id':list_id,'search_display':search_display,'map':map,'island_id':island_id, 'full_address':full_address},
      dataType: 'html',
      success: function(data){
        $('div#salesEventsSD').empty().append(data).show();
        $('input#title').focus();
      }
    });
};

window.Listings.updateBanner = function(formData, $applyButton, $form, formElementObj, formStatus, listId, previous_banner){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','update_banner');
   formData.append('list_id', listId);
   formData.append('previous_banner', previous_banner);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0]){
       $applyButton.prop("disabled", false);
       $form[0].reset();
       $('div#selectBannerSD').hide();
      }
    else{
      $('div#bannerAlert').css("visibility","visible");
      $applyButton.prop("disabled", false);  
    }
  }
  });
};

window.Listings.selectKeywords = function(search_display){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'selectKeywords', 'search_display':search_display},
      dataType: 'html',
      success: function(data){
        $('div#editKeywordsSD').empty().append(data).show();
        $('input#description').focus();
      } 
    });
};

window.Listings.get_help_wanted_apply = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'get_help_wanted_apply', 'list_id':list_id},
      dataType: 'html',
      success: function(data){
        $('div#viewResumeSD').empty().append(data).show();
      } 
    });
};

window.Listings.selectHelpWanted = function(hw_id, list_id, search_display, form_status, email, phone, island_id, map_phone){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {
        'form':'selectHelpWanted',
        'list_id':list_id,
        'search_display':search_display,
        'form_status':form_status,
        'email':email,
        'phone':phone,
        'island_id':island_id,
        'map_phone':map_phone,
        'hw_id': hw_id  
      },
      dataType: 'html',
      success: function(data){
        $('div#editHelpWantedSD').empty().append(data).show();
        $('input#jobTitle').focus();
      } 
    });
};

window.Listings.editHelpWanted = function(hw_id, list_id, search_display, form_status, email, phone, island_id, map_phone){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {
        'form':'selectHelpWanted',
        'list_id':list_id,
        'search_display':search_display,
        'form_status':form_status,
        'email':email,
        'phone':phone,
        'island_id':island_id,
        'map_phone':map_phone,
        'hw_id': hw_id  
      },
      dataType: 'html',
      success: function(data){
        $('div#div_HelpWanted').empty().append(data).show();
        $('input#jobTitle').focus();
      } 
    });
};

window.Listings.selectMapPicture = function(listId){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'selectMapPicture', 'listId':listId},
      dataType: 'html',
      success: function(data){
        $('div#selectMapPictureSD').empty().append(data).show();
      }
    });
};


window.Listings.updateMapPicture = function(formData, $applyButton, $form, formElementObj, formStatus, listId, previous_MapPicture){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','update_MapPicture');
   formData.append('list_id', listId);
   formData.append('previous_MapPicture', previous_MapPicture);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0]){
       $applyButton.prop("disabled", false);
       $form[0].reset();
       $('div#selectMapPictureSD').hide();
      }
    else{
      $('div#formMapPictureAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.updateAdLineKeywords = function(formData, $applyButton, $form, formElementObj, formStatus, kws_id){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','updateAdLineKeywords');
   formData.append('kws_id', kws_id);

  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,    
    dataType: 'json',
    success: function(data){
     if(data[0]){
       $applyButton.prop("disabled", false);
       $form[0].reset();
       $('div#editKeywordsSD').hide();
      }
    else{
      $('div#formKeywordsAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.insert_updateHelpWanted = function(formData, $applyButton, $form, formElementObj, formStatus, list_id, island_id, map, search_display, hw_id){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insert_updateHelpWanted');
   formData.append('formStatus',formStatus);
   formData.append('list_id',list_id);
   formData.append('island_id',island_id);
   formData.append('map',map);
   formData.append('search_display',search_display);
   formData.append('hw_id',hw_id);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,    
    dataType: 'json',
    success: function(data){
     if(data[0]){
       self.getHelpWantedList(list_id);
       $('div#div_HelpWanted').empty().append(data[1]).show();
       $applyButton.prop("disabled", false);
       $form[0].reset();
       $('input#jobTitle').focus();
      }
    else{
      $('div#formhelpWantedAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.getHelpWantedList = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getHelpWantedList', 'list_id':list_id},
      dataType: 'html',
      success: function(data){
        $('ul#ul_help_wanted').empty().append(data);
      }
    });
};

window.Listings.deleteHelpWanted = function(id, list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'deleteHelpWanted', 'id':id},
      dataType: 'json',
      success: function(data){
      if(data[0]){
        self.getHelpWantedList(list_id);
      }
    }
  });
};


window.Listings.deleteAllHelpWanted = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'deleteAllHelpWanted', 'list_id':list_id},
      dataType: 'json',
      success: function(data){
      if(data[0]){
        self.getHelpWantedList(list_id);
      }
    }
  });
};

window.Listings.deleteCreatorListings = function(listId, source, searchName){
   var self = Listings,
   conFig = self.config;

    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'deleteCeatorListings', 'listId':listId, 'source':source, 'seacrhname':searchName},
      dataType: 'json',
      success: function(data){
        if(data[0] === true){
          self.getMemberListings(conFig.mutualExclusiveDom.$divManageListings);
        }
      }
    });
};

window.Listings.addEditProductService = function(list_id, island_id, search_display, map, phone, form_status, product_id, website, address){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'addEditProductService', 'list_id':list_id, 'island_id':island_id, 'search_display':search_display, 'map':map, 'phone':phone, 'form_status':form_status, 'product_id':product_id, 'website':website, 'address':address},
      dataType: 'html',
      success: function(data){
        $('div#productServiceSD').empty().append(data).show();
      }
    });
};

window.Listings.getSubCatagories = function(catagory,catagory_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getSubCatagories', 'catagory_id':catagory_id},
      dataType: 'html',
      success: function(data){
        $('input#category').val(catagory);
        $('ul#ul_product_subcatagory').empty().append(data);
        $('input#subcategory').val('');
      }
    });
};

window.Listings.getProductServiceList = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getProductServiceList', 'list_id':list_id},
      dataType: 'html',
      success: function(data){
        $('ul#ul_product_service').empty().append(data);
      }
    });
};

window.Listings.getServiceSubCatagories = function(catagory,catagory_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getServiceSubCatagories', 'catagory_id':catagory_id},
      dataType: 'html',
      success: function(data){
        $('input#category').val(catagory);
        $('ul#ul_service_subcatagory').empty().append(data);
        $('input#subcategory').val('');
      }
    });
};

window.Listings.updateProductService = function(formData, $applyButton, $form, formElementObj, formStatus, product_id, previous_photo, list_id, island_id, search_display, map, phone, li_id, website, onSale, season_id, address){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','updateProductService');
   formData.append('product_id', product_id);
   formData.append('previous_photo', previous_photo);
   formData.append('formStatus', formStatus);
   formData.append('list_id', list_id);
   formData.append('island_id', island_id);
   formData.append('search_display', search_display);
   formData.append('map', map);
   formData.append('phone', phone);
   formData.append('website', website);
   formData.append('season_id', season_id); 
   formData.append('address', address); 
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data[0]){
       product_id = data[1];
       member_id = data[2];
       filename = data[3];
       product_name = data[4];
       $applyButton.prop("disabled", false);
       $form[0].reset();
       $('div#formProductServiceAlert').css("visibility","hidden"); 
       self.getProductServiceList(list_id);
       $('p#product_text' + product_id).removeClass('highlight') 
       $('div#form_ProductService').empty().append(data[5]);
      }
    else{
      $('div#formProductServiceAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.removeProductFromListings = function(product_id, list_id, $activeElement){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'removeProductFromListings', 'product_id':product_id, 'list_id':list_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          $activeElement.closest('li.ps_list').remove();
        }
      }
    });
};

window.Listings.addRemoveSeason = function(product_id, season_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'addRemoveSeason', 'product_id':product_id, 'season_id':season_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          self.getProductServiceList(list_id);;
        }
      }
    });
};

window.Listings.remove_all_products_from_listings = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'remove_all_products_from_listings', 'list_id':list_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          $('ul#ul_product_service').children().remove();
        }
      }
    });
};

window.Listings.add_all_products_to_listings = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'add_all_products_to_listings', 'list_id':list_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          $('button#btnGetProductService').click();
        }
      }
    });
};

window.Listings.edit_product_info = function(list_id, island_id, search_display, map, phone, form_status, product_id, li_id, website){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'edit_product_info','list_id':list_id,'island_id':island_id, 'search_display':search_display, 'map':map, 'phone':phone, 'form_status':form_status, 'product_id':product_id, 'website':website},
      dataType: 'html',
      success: function(data){
        $('div#form_ProductService').empty().append(data);
        $('button#btnProductService').attr('data-li_id', li_id);

      }
    });
};

window.Listings.delete_product = function($activeElement, product_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'delete_product','product_id':product_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
           $activeElement.closest('li.ps_list').remove();  
        }
      }
    });
};

window.Listings.getCatSubAccordion = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getCatSubAccordion','list_id': list_id},
      dataType: 'html',
      success: function(data){
        conFig.$divDisplaycatsub.empty().append(data);
        self.displayMutExDom(conFig.mutualExclusiveDom.$divCatSub); 
      }
    });
};

window.Listings.getApplyResume = function(resume_id, display_div_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'getApplyResume', 'resume_id':resume_id}, 
      dataType: 'html',
      success: function(data){
        $('div#' + display_div_id).empty().append(data);
      }
    });
};

window.Listings.resumeNotify = function($activeElement,job_id,email){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form':'resumeNotify','job_id':job_id,'email':email}, 
      dataType: 'json',
      success: function(data){
        $activeElement.addClass('sent');
        $activeElement.find('span').removeClass('glyphicon-envelope');
        $activeElement.find('span').addClass('glyphicon-log-out');
      }
    });
};

window.Listings.getListDisplayProductsServices = function(display_div, product_ids){
  var self = Listings,
  queryParmsObj = null;
  psDisplayFiltered = false;
  queryParmsObj = {'form':'getListDisplayProductsServices', 'product_ids':product_ids};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      self.populateListDisplayProducts(data,display_div);
      console.log(data);
      //self.populateListDisplayProducts (data);
    }
  })
};

window.Listings.getSeasonDisplayComapny = function(){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  queryParmsObj = null,
  numStrOnly = '',
  psDisplayFiltered = false;
  queryParmsObj = {'form': 'getSeasonDisplayComapny'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      if(data){
        self.seasonSearchClicked = true;
      };
      self.displaySeasonCompanyData = data;
      self.populateSeasonCompany(self.displaySeasonCompanyData);
      islandsReturned = $.map(self.displaySeasonCompanyData, function(item, index) {
        return item[3];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
        numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
          } 
        });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.spdIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};

window.Listings.getDisplaySalesEvents = function(){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  queryParmsObj = null,
  numStrOnly = '',
  psDisplayFiltered = false;
  queryParmsObj = {'form': 'getDisplaySalesEvents'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      self.displaySalesEventsData = data;
      self.populateSalesEvents(self.displaySalesEventsData);
      islandsReturned = $.map(self.displaySalesEventsData, function(item, index) {
        return item[3];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
        numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
          } 
        });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.spdIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};

window.Listings.getDisplaySales = function(){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  queryParmsObj = null,
  numStrOnly = '',
  psDisplayFiltered = false;
  queryParmsObj = {'form': 'getDisplaySales'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      self.displaySalesData = data;
      self.populateSales(self.displaySalesData);
      islandsReturned = $.map(self.displaySalesData, function(item, index) {
        return item[3];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
        numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
          } 
        });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.spdIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
}

window.Listings.getResume = function(){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getResume'},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divResume.empty().append(data);
        self.displayMutExDom(conFig.mutualExclusiveDom.$divResume);
      } 
    });
};

window.Listings.getDisplaySalesEventsList = function(display_div, list_ids){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getDisplaySalesEventsList', 'list_ids':list_ids},
      dataType: 'html',
      success: function(data){
        $(display_div).empty().append(data);;
      } 
    });
};

window.Listings.getDisplayClassifiedDetails = function(display_div, classified_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getDisplayClassifiedDetails', 'classified_id':classified_id},
      dataType: 'html',
      success: function(data){
        $(display_div).empty().append(data);;
      } 
    });
};

window.Listings.getDisplayForRentDetails = function(display_div, for_rent_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getDisplayForRentDetails', 'for_rent_id':for_rent_id},
      dataType: 'html',
      success: function(data){
        $(display_div).empty().append(data);;
      } 
    });
};

window.Listings.insert_help_wanted_apply = function($apply_btn,job_id,resume_id,list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form': 'insert_help_wanted_apply', 'job_id':job_id, 'resume_id':resume_id, 'list_id': list_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          $apply_btn.prop('disabled', true);
        }
      } 
    });
};

window.Listings.delete_help_wanted_appy = function($activeElement,job_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form': 'delete_help_wanted_appy', 'job_id':job_id},
      dataType: 'json',
      success: function(data){
        if(data[0]){
          $activeElement.prop('disabled', true);
        }
      } 
    });
};

window.Listings.resetPassword = function(email){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'form': 'resetPassword', 'email':email},
      dataType: 'json',
      success: function(data){
        if(data){
          conFig.mutualExclusiveDom.$divLoginSignUp.append(
          '<div class="alert alert-info alert-dismissible" role="alert">' + 
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<strong>Notice!</strong> An email to reset your password was sent to the login email address.'+
          '</div>'); 
           $('div#formLoginAlert').css("visibility","hidden"); 
        }
      } 
    });
};


window.Listings.insertUpdateResume = function(formData, $applyButton, $form, formElementObj, formStatus, resume, previous_Picture, resumeName, resumeEmail, resumePhone, removePhoto){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insertUpdateResume');
   formData.append('formStatus', formStatus);
   formData.append('resume', $('div#divResumeHTML').html());
   formData.append('previous_Picture', previous_Picture);
   formData.append('resumeName', resumeName);
   formData.append('resumeEmail', resumeEmail);
   formData.append('resumePhone', resumePhone);
   formData.append('removePhoto', removePhoto);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data){
        self.startUpDisplay();
      }
    else{
      $('div#formResumeAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.getHelpWantedActive = function(){
  var self = Listings,
  conFig = self.config,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  numStrOnly = '',
  mapArray = [],
  data = [],
  resume_id = 0;
  filteredHelpWanted = false;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'get_help_wanted_active'},
      dataType: 'json',
      success: function(in_array){
        data = in_array[0];
        resume_id = in_array[1];
        console.log(data);
        for(var i = 0,len = data.length; i<len; i++ ){
          mapArray = data[i][9].split('#');
          data[i].push(mapArray[2]);
          data[i].push(i);
          data[i].push(resume_id); 
        }
        self.helpWantedActiveData = data;
        self.populateHelpWanted(self.helpWantedActiveData);
      
        islandsReturned = $.map(self.helpWantedActiveData, function(item, index) {
          return item[8];
        });
        for(var i = 0, len = islandsReturned.length; i < len; i++){
          islandsReturned[i].split(',').forEach(function(v,i,a){
          numStrOnly = v.replace(/#/g,''); 
           if(islandsUnique.indexOf(numStrOnly) === -1){
            islandsUnique.push(numStrOnly);  
            } 
          });
        }
        islandList = $.grep(self.islandArray, function(item, index){
          return ($.inArray(item[2],islandsUnique) !== -1); 
        });
        islandList.unshift(self.islandArray[0]);
        self.populateIsland(islandList);
      }
    });
};

window.Listings.insertUpdateSalesEvents = function(formData, $applyButton, $form, formElementObj, formStatus, search_display, list_id, map, previous_picture, island_id, full_address){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insertUpdateSalesEvents');
   formData.append('formStatus', formStatus);
   formData.append('search_display', search_display);
   formData.append('previous_picture', previous_picture);
   formData.append('list_id', list_id);
   formData.append('map', map);
   formData.append('island_id', island_id);
   formData.append('full_address', full_address);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data){
        $('div#salesEventsSD').hide();
      }
    else{
      $('div#salesEventsAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.insertDeleteRequest = function(formData, $applyButton, $form, formElementObj, formStatus, list_id){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insertDeleteRequest');
   formData.append('formStatus', formStatus);
   formData.append('list_id', list_id);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data){
        $('div#memberListings').slideToggle();
        $('div#divDeleteRequest').remove();
      }
    else{
      $('div#deleteRequestAlert').css("visibility","visible");
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.insertUpdateClassified = function(formData, $applyButton, $form, formElementObj, formStatus, control, photo_1,photo_2,photo_3,photo_4){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insertUpdateClassified');
   formData.append('formStatus', formStatus);
   formData.append('control', control);
   formData.append('photo_1', photo_1);
   formData.append('photo_2', photo_2);
   formData.append('photo_3', photo_3);
   formData.append('photo_4', photo_4);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data){
        $('form#' + $applyButton.attr('data-form'))[0].reset();
        $('div#classifieds').find('div.in').removeClass('in');
      }
    else{
      $('div#formClassifiedAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.insertUpdateForRent = function(formData, $applyButton, $form, formElementObj, formStatus, control, photo_1,photo_2,photo_3,photo_4){
   var self = Listings,                     
   conFig = self.config;
   formData.append('form','insertUpdateForRent');
   formData.append('formStatus', formStatus);
   formData.append('control', control);
   formData.append('photo_1', photo_1);
   formData.append('photo_2', photo_2);
   formData.append('photo_3', photo_3);
   formData.append('photo_4', photo_4);
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
     if(data){
        $('form#' + $applyButton.attr('data-form'))[0].reset();
        $('div#for_rent').find('div.in').removeClass('in');;
      }
    else{
      $('div#formForRentAlert').css("visibility","visible"); 
      $applyButton.prop("disabled", false);
    }
  }
  });
};

window.Listings.getDisplayClassifieds = function(){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  queryParmsObj = null,
  numStrOnly = '',
  classifiedDisplayFiltered = false;
  queryParmsObj = {'form': 'getDisplayClassifieds'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      self.displayClassifiedsData = data;
      self.populateClassifieds(self.displayClassifiedsData);
      islandsReturned = $.map(self.displayClassifiedsData, function(item, index) {
        return item[3];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
        numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
          } 
        });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.spdIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};

window.Listings.getDisplayForRent = function(){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsUnique = [],
  queryParmsObj = null,
  numStrOnly = '',
  forRentDisplayFiltered = false;
  queryParmsObj = {'form': 'getDisplayForRent'};
  $.ajax({
    url: 'build/phonebook.php',
    type: 'POST',
    dataType: 'json',
    data: queryParmsObj,
    success: function(data){
      console.log(data);
      self.displayForRentData = data;
      self.populateForRent(self.displayForRentData);
      islandsReturned = $.map(self.displayForRentData, function(item, index) {
        return item[3];
      });
      for(var i = 0, len = islandsReturned.length; i < len; i++){
        islandsReturned[i].split(',').forEach(function(v,i,a){
        numStrOnly = v.replace(/#/g,''); 
         if(islandsUnique.indexOf(numStrOnly) === -1){
          islandsUnique.push(numStrOnly);  
          } 
        });
      }
      islandList = $.grep(self.islandArray, function(item, index){
        return ($.inArray(item[2],islandsUnique) !== -1); 
      });
      islandList.unshift(self.islandArray[0]);
      self.spdIslandList = islandList;
      self.populateIsland(islandList);
    }
  })
};

window.Listings.getDeleteRequestForm = function(list_id){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getDeleteRequestForm', 'list_id':list_id},
      dataType: 'html',
      success: function(data){
        $('div#memberListings').slideToggle();
        conFig.mutualExclusiveDom.$divManageListings.append(data);
      } 
    });
};

window.Listings.getHelp = function(){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {form: 'getHelp'},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divthe242help.empty().append(data);
        self.displayMutExDom(conFig.mutualExclusiveDom.$divthe242help);
      } 
    });
};

window.Listings.getHelpfulLinks = function(){
   var self = Listings,
   conFig = self.config;
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      data: {'request': 'getHelpfulLinks'},
      dataType: 'html',
      success: function(data){
        conFig.mutualExclusiveDom.$divHelpfulLinks.empty().append(data);
        self.displayMutExDom(conFig.mutualExclusiveDom.$divHelpfulLinks);
      } 
    });
};

   window.Listings.validateFunctions = {
    addressname: function(elementObj){
      elementObj.valid = /.{2,50}/.test(elementObj.value);
    },

    firstname: function(elementObj){
      elementObj.valid = /^[A-Za-z]{2,20}$/.test(elementObj.value);
    },

    middlename: function(elementObj){
      elementObj.valid = /.{1,50}/.test(elementObj.value);  
    },

    lastname: function(elementObj){
      elementObj.valid = /^[A-Za-z]{2,20}$/.test(elementObj.value);
    },

    emailunique: function(elementObj){
      elementObj.valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elementObj.value);
    },

    emailvalid: function(elementObj){
      elementObj.valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elementObj.value);
    },

    town: function(elementObj){
      elementObj.valid = /.{2,50}/.test(elementObj.value);   
    },

    island: function(elementObj){
      var islandName = window.Listings.islandLookUp[elementObj.value.substring(0,3).toLowerCase()];
      if(islandName){
        elementObj.valid = true;
        document.getElementById(elementObj.id).value = islandName
      }

    },

    phone: function(elementObj){
      elementObj.valid = /^\d{3}-\d{3}-\d{4}$/.test(elementObj.value);
    },

    birthday: function(elementObj){
      elementObj.valid = String(new Date(elementObj.value)) !== 'Invalid Date';   
    },

    radiomutex: function(elementObj){
      elementObj.valid = $('form#' + elementObj.formId  + ' input[name=' + elementObj.elementGroup + ']').is(':checked');
        
    },

    passwordconfirm: function(elementObj){
       var password1 = $('form#' + elementObj.formId  + ' input[type=password]')[0].value,
       password2 = $('form#' + elementObj.formId + ' input[type=password]')[1].value;
       elementObj.valid = (password1 === password2) && (password1.length > 4);
    },

    passwordvalid: function(elementObj){
       elementObj.valid = elementObj.value.length > 4;
    },

    webURL: function(elementObj){
       elementObj.valid = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(elementObj.value);
    },

    mapCor: function(elementObj){
      elementObj.valid = /^[+-]?\d{1,3}\.\d{1,15},\s?[+-]?\d{1,3}\.\d{1,15}$/.test(elementObj.value); 
    },

    checkedconfirm: function(elementObj){
      elementObj.valid = elementObj.checked;  
    },

    businessName: function(elementObj){
      elementObj.valid = /.{2,50}/.test(elementObj.value); 
    },

    productName: function(elementObj){
      elementObj.valid = /[^\s]{2,75}/.test(elementObj.value); 
    },    

    keywords:function(elementObj){
      elementObj.valid = /^[a-zA-Z0-9 , \-]{2,60}$/.test(elementObj.value); 
    },

    keywords_PB:function(elementObj){
      elementObj.valid = /^[a-zA-Z0-9 , \-]{2,}$/.test(elementObj.value); 
    },    

    description:function(elementObj){
      elementObj.valid = /.{2,}/.test(elementObj.value); 
    },

    creditCardAll: function(elementObj){
      elementObj.valid = /.{2,}/.test(elementObj.value);   
    },

    creditCardExp: function(elementObj){
      elementObj.valid = /^\d\d\/\d\d$/.test(elementObj.value);   
    },    

    creditCardCVV: function(elementObj){
      elementObj.valid = /^\d\d\d$/.test(elementObj.value);   
    },

    price: function(elementObj){
      elementObj.valid = /^\d+\.\d\d$/.test(elementObj.value);
      elementObj.valid = elementObj.valid && parseFloat(elementObj.value) > 0;
    }    

  };


window.Listings.createFormElementsObj = function(memberForm){
  var formElementObj = {};
   for(var i = 0, len = memberForm.length; i < len ; i++){
   var $memberForm = $(memberForm[i]);
   if(memberForm[i].type !== 'submit'){ 
    formElementObj[memberForm[i]['id']] = {
      id:memberForm[i]['id'],
      type:memberForm[i]['type'],
      value:memberForm[i]['value'],
      checked:memberForm[i]['checked'],
      validateMethod: $memberForm.attr("data-validateMethod"),
      elementLabel: $memberForm.attr("data-label"),
      errorClass: $memberForm.attr("data-errorClass"),
      required: !!parseInt($memberForm.attr("data-required"),10),
      valid: false,
      formId: $memberForm.attr("data-form"),
      elementGroup: $memberForm.attr("data-group")
      
    } 
  }
}
  
  for (formElement in formElementObj){
    if(!formElementObj[formElement]['validateMethod']){continue}
    if(formElementObj[formElement]['validateMethod'] && formElementObj[formElement]['value'] !== ''){
      formElementObj[formElement]['required'] = true;
    }  
  }
  return formElementObj;
};

window.Listings.createFormSubmitObj = function(formSerialized, formElementObj){
  var serialArray = formSerialized.split('&'),
  validateObj = {},
  formSubmitObj = [];
  for(var elementObj in formElementObj){
    if(formElementObj[elementObj].type === 'radio'){
      validateObj[formElementObj[elementObj].elementGroup] = formElementObj[elementObj].validateMethod;
    }
    else{
    validateObj[formElementObj[elementObj].id] = formElementObj[elementObj].validateMethod;
  }};

  for(var i=0, len=serialArray.length; i < len; i++ ){
    var elementName = serialArray[i].split('=')[0];
    formSubmitObj.push({'name': elementName + '[]', 'value': serialArray[i].split('=')[1]});
    formSubmitObj.push({'name': elementName + '[]', 'value': validateObj[elementName]}); 
  };
  return($.param(formSubmitObj));
};

window.Listings.validateForm = function(formElementObj){
    var formVaild = true; 
    for(var elementObj in formElementObj){
      formVaild = formVaild && formElementObj[elementObj].valid;
      if(formElementObj[elementObj].valid === false && formElementObj[elementObj].required === true ){
        $('form#' + formElementObj[elementObj].formId  + ' label[for='+ formElementObj[elementObj].elementLabel +']').addClass(formElementObj[elementObj].errorClass);
      }
      else{
        $('form#' + formElementObj[elementObj].formId  + ' label[for='+ formElementObj[elementObj].elementLabel +']').removeClass(formElementObj[elementObj].errorClass);  
      }
  }
  return formVaild;    
};



window.Listings.validateFormElements = function(formElementObj){
  for(var elementObj in formElementObj){
    if(!formElementObj[elementObj].required){
      formElementObj[elementObj].valid = true;
      continue;
    }
    window.Listings.validateFunctions[formElementObj[elementObj].validateMethod](formElementObj[elementObj]);
  }
};

window.Listings.checkFileTypeSize = function(size, fileArray, $fileLabel){
  var fileValid = true;
  if(fileArray.length === 0){return true;};
  for(var i = 0, len = fileArray.length; i < len; i++){
    fileValid = fileValid && (fileArray[i].name.length <= 180);
    fileValid = fileValid && (fileArray[i].size <= size);
    fileValid = fileValid && !!(fileArray[i].type.match(/^image\/png|image\/gif|image\/jpeg$/ig));
    fileValid ? $fileLabel.removeClass('text-danger'): $fileLabel.addClass('text-danger');  
  };
  return fileValid;
};

  window.Listings.displayMutExDom = function($displayMe){
    var self = Listings,
    conFig = self.config,
    displayDomObj = conFig.mutualExclusiveDom;
    $.each(displayDomObj, function(key, val) {
      val.hide();
    });
    $displayMe.show();
  };

  window.Listings.startUpDisplay = function(){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
  };



  window.Listings.resetIslandSelector = function(evt){
    $('div.island.active').removeClass('active');
    $('div.island[data-island = "0"]').addClass('active');
  };

  window.Listings.resetSearchSelector = function(evt){
    $('div.active.searchtype').removeClass('active');
    $('div.searchtype[data-searchtype="1"]').addClass('active');
  };

  window.Listings.filterListings= function(){
    var self = Listings,
    conFig = self.config;
    if(conFig.$inputField.val().length){
      self.listCompFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      self.filteredListCompany = [];
      self.filteredListCompany = $.grep(self.listCompanyData, function(item,index){
        return item[5] == self.island_id;
      });
      self.island_id === "0" ? self.populateListCompany(self.listCompanyData) :self.populateListCompany(self.filteredListCompany);
    }
  };

  window.Listings.filterProductService = function(){
    var self = Listings,
    searchFor = '',
    conFig = self.config;
    if(conFig.$inputField.val().length){
      self.psCompFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      self.filteredListPS = [];
      searchFor = '#' + self.island_id + '#';
      self.filteredListPS = $.grep(self.psCompanyData, function(item,index){
        return (item[4].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.psCompFiltered = false; 
        self.populatePsCompany(self.psCompanyData); 
      }
      else{
        self.populatePsCompany(self.filteredListPS);
      }
    }
  };

    window.Listings.filterClassifieds = function(){
    var self = Listings,
    searchFor = '',
    conFig = self.config;
    if(conFig.$inputField.val().length){
      self.classifiedDisplayFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      self.filteredListPS = [];
      searchFor = '#' + self.island_id + '#';
      self.filteredListPS = $.grep(self.displayClassifiedsData, function(item,index){
        return (item[3].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.classifiedDisplayFiltered = false; 
        self.populateClassifieds(self.displayClassifiedsData); 
      }
      else{
        self.populateClassifieds(self.filteredListPS);
      }
    }
  };

    window.Listings.filterForRent = function(){
    var self = Listings,
    searchFor = '',
    conFig = self.config;
    if(conFig.$inputField.val().length){
      self.forRentDisplayFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      self.filteredListPS = [];
      searchFor = '#' + self.island_id + '#';
      self.filteredListPS = $.grep(self.displayForRentData, function(item,index){
        return (item[3].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.forRentDisplayFiltered = false; 
        self.populateForRent(self.displayForRentData); 
      }
      else{
        self.populateForRent(self.filteredListPS);
      }
    }
  };  

  window.Listings.filterHelpWanted = function(){
    var self = Listings,
    searchFor = '',
    filteredListHW = [],
    conFig = self.config;
    if(conFig.$inputField.val().length){
      self.filteredHelpWanted = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      searchFor = '#' + self.island_id + '#';
      self.filteredListHW = $.grep(self.helpWantedActiveData, function(item,index){
        return (item[8].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.filteredHelpWanted = false; 
        self.populateHelpWanted(self.helpWantedActiveData);; 
      }
      else{
        self.populateHelpWanted(self.filteredListHW);
      }
    }
  };  

  window.Listings.filterDisplayProductService = function(){
    var self = Listings,
    searchFor = '',
    conFig = self.config,
    list_ids = '',
    island_ids = '',
    maps = '',
    phones = '',
    cnt = 0,
    index3 = 0;
    location_array = null;
    if(conFig.$inputField.val().length){
      self.psDisplayFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      self.filteredListDPS = [];
      searchFor = '#' + self.island_id + '#';
      self.filteredListDPS = $.grep(self.displayProductsData, function(item,index){
        return (item[18].indexOf(searchFor) !== -1);
      });

      self.filteredListDPS.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
            location_array = location.split(':');
            index3 = index2;
            if(location_array[0] === searchFor){
              island_ids = island_ids + location_array[0] + ',';
              list_ids = list_ids + location_array[1] + ',';
              phones = phones + location_array[2] + ',';
              maps = maps + location_array[3] + ':';;
              cnt = cnt + 1;
            }            
        });
        product[13] = island_ids;
        product[14] = list_ids;
        product[15] = phones;
        product[16] = maps;
        product[17] = cnt;
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
        cnt = 0;
        if(product[12].length === index3 +1 )
          product[13] = product[13].replace(/,$/,'');
          product[14] = product[14].replace(/,$/,'');
          product[15] = product[15].replace(/,$/,''); 
          product[16] = product[16].replace(/:$/,'');         
      });

      if(self.island_id === "0"){
        self.psDisplayFiltered = false; 
        self.displayProductsData.forEach(function(product, index1){
        product[12].forEach(function(location, index2){
          location_array = location.split(':');
          island_ids = island_ids + location_array[0];
          index2 + 1 < product[12].length ? island_ids  = island_ids + ',' : null;
          list_ids = list_ids + location_array[1];
          index2 + 1 < product[12].length ? list_ids  = list_ids + ',' : null;
          phones = phones + location_array[2];
          index2 + 1 < product[12].length ? phones  = phones + ',' : null;
          maps = maps + location_array[3];
          index2 + 1 < product[12].length ? maps  = maps + ':' : null;            
        });
        product[13] = island_ids;
        product[14] = list_ids;
        product[15] = phones;
        product[16] = maps;
        product[17] = product[12].length;
        list_ids = '';
        island_ids = '';
        maps = '';
        phones = '';
      });
        self.populateDisplayProducts (self.displayProductsData);; 
      }
      else{
        self.populateDisplayProducts(self.filteredListDPS);
      }
    }
  };

    window.Listings.filterDisplaySeasonCompany = function(){
    var self = Listings,
    searchFor = '',
    filteredList = [],
    conFig = self.config;
    if(self.displaySeasonCompanyData){
      self.seasonCompanyFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      searchFor = '#' + self.island_id + '#';
      self.filteredList = $.grep(self.displaySeasonCompanyData, function(item,index){
        return (item[3].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.seasonCompanyFiltered = false;
        self.displaySeasonCompanyData.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === '#0#'){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        }); 

        self.populateSeasonCompany(self.displaySeasonCompanyData); 
      }
      else{
        self.filteredList.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === searchFor){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        });  
        self.populateSeasonCompany(self.filteredList);
      }

    }
  };

    window.Listings.filterDisplaySalesEvents = function(){
    var self = Listings,
    searchFor = '',
    filteredList = [],
    conFig = self.config;
    if(self.displaySalesEventsData){
      self.salesEventsFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      searchFor = '#' + self.island_id + '#';
      self.filteredList = $.grep(self.displaySalesEventsData, function(item,index){
        return (item[3].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.salesEventsFiltered = false;
        self.displaySalesEventsData.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === '#0#'){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        }); 

        self.populateSalesEvents(self.displaySalesEventsData); 
      }
      else{
        self.filteredList.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === searchFor){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        });  
        self.populateSalesEvents(self.filteredList);
      }

    }
  };

    window.Listings.filterDisplaySales = function(){
    var self = Listings,
    searchFor = '',
    filteredList = [],
    conFig = self.config;
    if(self.displaySalesData){
      self.salesFiltered = true;
      self.island_id = $('div.islandsearch.active').attr('data-island');
      searchFor = '#' + self.island_id + '#';
      self.filteredList = $.grep(self.displaySalesData, function(item,index){
        return (item[3].indexOf(searchFor) !== -1);
      });
      if(self.island_id === "0"){
        self.salesFiltered = false;
        self.displaySalesData.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === '#0#'){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        }); 

        self.populateSales(self.displaySalesData); 
      }
      else{
        self.filteredList.forEach(function(v1,i,a1){
          v1[5].forEach(function(v2,i,a2){
            if(v2[0] === searchFor){
              v1[1] = v2[2];
              v1[2] = v2[1];
            }
          });
        });  
        self.populateSales(self.filteredList);
      }

    }
  };  

  window.Listings.inputLookup = function(whichKey, searchType, dataStore, populate, input){
    var self = Listings,
    conFig = self.config,
    enterKey = whichKey;
    clearTimeout(self.inputTimer);
    self.inputTimer = (input.value.length >= 2) && setTimeout(function(){self.inputGetData(searchType, dataStore, populate, input);}, 300);
    if(input.value.length >= 2 && enterKey === 13){
      clearTimeout(self.inputTimer);
      self.inputGetData(searchType, dataStore, populate, input);
    }
  };


  window.Listings.init = function(){
    this.complieTemplates();
    this.populateSearchType(this.searchTypeArray);
    this.populateIsland(this.islandArray);
    this.populateMemberMenu(this.nonMemberArray);
    this.bindEvents();
    this.config.$inputField.focus();
    this.inputText = '';
    this.startUpDisplay();
    this.getSeason(window.Listings.seasons);
  };


  window.Listings.getSeason = function(seasonArray){
    var self = Listings,
    conFig = self.config,
    start,
    end,
    now = new Date().valueOf();
    seasonArray.forEach(function(season){
      start = new Date(season.start).valueOf();
      end = new Date(season.end).valueOf();
      if(now >= start && now <= end){
        $('h5#season').css('background-image', season.image);
        $('h5#season').html(season.name + '<br><br>' + '<button class="btn btn-success btn-xs shopping" data-element="btnSeasonShopping" ><span class="glyphicon glyphicon-shopping-cart"></span></button>');
        self.season_image = season.image;
        self.season_id = season.id;
        self.season_name = season.name;
        console.log(season.name);  
      }
    }
  );
  };

  //Sets up css class for menu accordians Islands and Listings
(function (){
  window.Listings.init();   
  $('#btn_menu').one('click', function(evt){
  $('div.island').toggleClass('island');
  $('div.search').toggleClass('search');
})
})();






