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






