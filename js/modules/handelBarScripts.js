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
    conFig.DOMdisaplayProducts.innerHTML = self.HBdisplayProductsFun(data);

    // self.mapAllBtn = false;
    // for(var i = 0; i < data.length; i++){
    //   if(data[i][5]){
    //     self.mapAllBtn = true;
    //     break;
    //   }
    // } 
    
    // self.mapAllBtn ? $mapBnt.show() : $mapBnt.hide();
    // if(self.mapAllBtn){
    //   if(!$('div#map-all-dps').length){
    //     conFig.mutualExclusiveDom.$divDisplayProducts.append('<div class="clearfix"></div><div id="map-all-dps" class="row"><button class="btn btn-warning btn-sm map-all" data-element="btnDpsMultiMap"><span class="glyphicon glyphicon-map-marker"></span> Map All</button></div>');
    //   }
    // }

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
