(function(){
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}
}());

(function(){
var Listings = {
  inputTimer: null,
  config: null,
  
  listSuggestionsData: '',
  PsSuggestionsData: '',
  bpSuggestionData: '',
  
  listCompanyData: '',
  psCompanyData: '',
  
  HBsearchTypeFun: null,
  HBsearchIslandFun: null,
  HBlistSuggestionsFun: null,
  HBpsSuggestionFun: null, 
  HBbpSuggestionFun: null,
  HBlistComapanyFun: null, 
  HBpsCompnayFun: null,
  HBlistLocationFun: null,
  
  filteredListCompany: null,
  listCompFiltered: false,
  psCompFiltered: false,
  filteredListPS: null,
  PSMultiMapArray: [],  
  inputText: '',
  mapOrigin: '',
  singleMap: '',
  curLatLng: '',
  curAddToMarkerInfo: '',
  psIslandList: null,
  //resultsTmp: null,
  mapAllBtn: false,

  island_id: "0",
  
  
  map: null,
  
  
  
  searchTypeArray: [['Listings','active','1'],['Products & Services','','2'],['Government','','3']],
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
  
  
  init: function(config){
    this.config = config;
    this.complieTemplates();
    this.populateSearchType(this.searchTypeArray);
    this.populateIsland(this.islandArray);
    this.bindEvents();
    this.config.$inputField.focus();
    this.inputText = '';
    this.startUpDisplay();
    return this;
  },

  bindEvents: function(){
    var self = this, 
    conFig = this.config;
    
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

    conFig.mutualExclusiveDom.$divListLocation.on('click', 'button[data-element="btnLocationSingleMap"]', function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');
    });

    conFig.mutualExclusiveDom.$divListCompany.on('click', 'button[data-element="btnCompListMultiMap"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });//this.allMaps
    
    conFig.mutualExclusiveDom.$divListCompany.on('click', 'button[data-element="btnBackCompList"]',function(evt){
      self.programDirector('evtClick', $(this), null, evt, 'All');  
    });    

     //conFig.$divSuggestions.on('click','a',this.searchTypeSelected);
    
    

    // conFig.$divResults.on('click','button.map-all',this.mapAll);

    // conFig.$divMapCanvas.on('click','button.map-resize',this.resizeMap);
    
    // conFig.$divDetails.on('click','button.details-map', this.displayMap);
    
     

  },

  displayMutExDom: function($displayMe){
    var self = Listings,
    conFig = self.config,
    displayDomObj = conFig.mutualExclusiveDom;
    $.each(displayDomObj, function(key, val) {
      val.hide();
    });
    $displayMe.show();
  },

  startUpDisplay: function(){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
  },

  programDirector: function(event, $activeElement, inactiveElement, evt, insearchTypeSelected){
    var self = Listings
    conFig = self.config,
    searchTypeSelected = '',
    activeElementName = inactiveElement || $activeElement.attr('data-element');
    searchTypeSelected = insearchTypeSelected || conFig.$divSearchCarousel.find('div.active').attr('data-searchtype');
    executeFunction = event + '$' + activeElementName + '$' + 'searchType' + '$' + searchTypeSelected;// + '$' + 'islandId' + '$' + islandSelected;
    console.log(executeFunction);
    self.programFunctions[executeFunction](self,conFig,evt,searchTypeSelected, $activeElement);

  },

  programFunctions: {

    evtSubmit$form$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions); 
    },

    evtSubmit$form$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.PsSuggestionsData, self.populatePsuggestions); 
    },    

    evtSubmit$form$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if($activeElement.val() === ''){return;}
      self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions);
    },
 
    evtFocus$searchInput$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.val('');
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    }, 
    
    evtFocus$searchInput$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    },

    evtFocus$searchInput$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      $activeElement.val('');
      self.displayMutExDom(conFig.mutualExclusiveDom.$divLogo);
    },  

    evtKeyup$searchInput$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions); 
    },

    evtKeyup$searchInput$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 8 && searchTypeSelected === '2'){self.inputText = $activeElement.val();}
      self.inputLookup(evt.which, searchTypeSelected, self.PsSuggestionsData, self.populatePsuggestions);
    },

    evtKeyup$searchInput$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions);
    },

    evtClick$searchButton$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      self.resetIslandSelector();
      self.inputLookup(evt.which, searchTypeSelected, self.listSuggestionsData, self.populateListSuggestions)
    },  

    evtClick$searchButton$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      self.resetIslandSelector();
      self.getPsCompany(conFig.$inputField.val());
    },
    
    evtClick$searchButton$searchType$3: function(self, config, evt, searchTypeSelected, $activeElement){
      self.inputLookup(evt.which, searchTypeSelected, self.bpSuggestionData, self.populateBpSuggestions);
    },  

    evtKeydown$aListSuggestion$searchType$1: function(self, config, evt, searchTypeSelected, $activeElement){
      if(evt.which === 13){
        evt.preventDefault();
        self.getListCompany($activeElement.attr("href"));
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
      self.getListCompany($activeElement.attr("href"));
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

     evtSlidIslands$islandCarousel$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      if(config.mutualExclusiveDom.$divPsCompany.css('display') === 'block'){
        self.filterProductService();
      }
      else{
        self.filterListings();  
      }
     },

     evtPreSlidIslands$islandCarousel$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      if(!self.listCompanyData && !self.psCompanyData){
        evt.preventDefault();
        return;
      } 
     },

     evtClick$aPsCompany$searchType$2: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.getListCompany($activeElement.attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0');
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

     evtClick$aCompListSingleMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      if(!$activeElement.hasClass('btn-warning')){return;}
      self.mapOrigin = $activeElement.attr('data-element');  
      self.getMaps($activeElement.attr('href'), null, $activeElement.attr('data-phone'));
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
        self.getListCompany($activeElement.siblings('a[data-element="aPsCompany"]').attr("href"),conFig.$divIslandCarousel.find('div.active').attr('data-island') !== '0');
        return;
      }
      self.mapOrigin = $activeElement.attr('data-element');
      self.psSingleCompMap($activeElement.attr('href'), $activeElement);
     },

     evtClick$btnLocationSingleMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.getMaps($activeElement.attr('data-latlng'), null, $activeElement.attr('data-phone'));
     },

     evtClick$btnCompListMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.mapAllCompList();
     },

     evtClick$btnBackCompList$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){ 
      var selectedIsland, 
      serachType = $('div.active.searchtype').attr('data-searchtype');
      evt.preventDefault();
      if(serachType === '1'){
        self.listCompanyData = '';
        self.resetIslandSelector();
        self.displayMutExDom(conFig.mutualExclusiveDom.$divListSuggestions);        
      }

      if(serachType === '2'){
        selectedIsland = $('div.island.active').attr("data-island")
        self.populateIsland(self.psIslandList);
        $('div.island.active').removeClass('active');
        $('div.island[data-island = "' + selectedIsland + '"]').addClass('active');
        self.displayMutExDom(conFig.mutualExclusiveDom.$divPsCompany);
      }  

     },

     evtClick$btnPsMultiMap$searchType$All: function(self, config, evt, searchTypeSelected, $activeElement){
      evt.preventDefault();
      self.mapOrigin = $activeElement.attr('data-element');
      self.psCompFiltered ? self.psMultiCompMap(self.filteredListPS) : self.psMultiCompMap(self.psCompanyData);
     } 


  },

  resetIslandSelector: function(evt){
    $('div.island.active').removeClass('active');
    $('div.island[data-island = "0"]').addClass('active');
  },

  resetSearchSelector: function(evt){
    $('div.active.searchtype').removeClass('active');
    $('div.searchtype[data-searchtype="1"]').addClass('active');
  },

  psSingleCompMap: function(compInfoStr, $inActiveElement){
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
      self.getMaps(compArray[2] + ':' +  listings, null, compArray[1]);
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
        self.getMaps(filteredArray[2] + ':' +  listings, null, filteredArray[1]);
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
  },

  psMultiCompMap: function(data){
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
  
  },  

  closeMap: function(mapOrigin){
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
    }
  },

  resizeMap: function(evt, $activeElement){
    var self = Listings
    conFig = self.config,
    direction = $activeElement.attr("data-direction");
    evt.preventDefault();
    if(direction === 'large'){
      conFig.$divMap.css({
        width: 700,
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
      width: direction + '20',
      height: direction + '10'});
    switch(self.singleMap){
      case 'singleMap': self.getMaps(self.curLatLng, self.map.zoom, self.curAddToMarkerInfo); break;
      case 'compListMultiMap' : self.mapAllCompList(null, self.PSMultiMapArray.length, self.PSMultiMapArray.length); break;
    } 
   
  }, 

  mapAllCompList: function(curZoom, inlistingArray, positionIndex){
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
  },


  getMaps: function(latLng, curZoom, addToMarkerInfo){
    var self = Listings,
    conFig = self.config,
    mapInfoArray = latLng.split(':'),
    listing = mapInfoArray[1],
    position_array = mapInfoArray[0].split(','),
    lat = parseFloat(position_array[0]),
    lng = parseFloat(position_array[1]);
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
    }),
    markerInfo = addToMarkerInfo ? listing + ' ' +'<a href="tel:'+ self.curAddToMarkerInfo + '">' + self.curAddToMarkerInfo + '</a>': listing;
    infoWindow = new google.maps.InfoWindow({content: markerInfo});
    google.maps.event.addListener(marker,'click', function(){infoWindow.open(map, marker);});
  },

  filterListings: function(){
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
  },

  filterProductService: function(){
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
  },


  inputLookup: function(whichKey, searchType, dataStore, populate){
    var self = Listings,
    conFig = self.config,
    enterKey = whichKey,
    input = conFig.$inputField[0];
    clearTimeout(self.inputTimer);
    self.inputTimer = (input.value.length >= 3) && setTimeout(function(){self.inputGetData(searchType, dataStore, populate);}, 300);
    if(input.value.length >= 3 && enterKey === 13){
      clearTimeout(self.inputTimer);
      self.inputGetData(searchType, dataStore, populate);
    }
  },

    inputGetData: function(search_type, dataStore, populate){
    var self = Listings,
    conFig = self.config;
    dataObj = {};
    dataObj.lookup = self.config.$inputField.val();
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
  },

  getListCompany: function(inListIds, psFilter){
    var self = Listings,
    conFig = self.config,
    islandsReturned = [],
    queryParmsObj = null,
    island_selected = conFig.$divIslandCarousel.find('div.active').attr('data-island'),
    islandList =[];
    self.listCompFiltered = false;
    queryParmsObj = {ids: inListIds, search_type: '1'}
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      dataType: 'json',
      data: queryParmsObj,
      success: function(data){
        self.listCompanyData = data;
        for(var i = 0; i < self.listCompanyData.length; i++){
          self.listCompanyData[i].push(i);
        }
        self.populateListCompany(self.listCompanyData);
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
      }
    });
  },


 getPsCompany: function(inPsSearchStr){
  var self = Listings,
  islandList =[],
  islandsReturned = [],
  islandsReturnedCleaned = [],
  islandsUnique = [],
  queryParmsObj = null;
  psCompFiltered = false;
  queryParmsObj = {ps_search_str: inPsSearchStr, search_type:'2'};
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
  }, 

  getBpCompany: function(inBpId){
    var self = Listings,
    queryParmsObj = null;
    queryParmsObj = {bp_id: inBpId, search_type:'3'};
    $.ajax({
      url: 'build/phonebook.php',
      type: 'POST',
      dataType: 'json',
      data: queryParmsObj,
      success: function(data){
        self.populatebPCompany(data);
      }
    })  
  },



/*Hangelbars Routines */
  complieTemplates: function(){
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


   //self.resultsTmp = Handlebars.compile(self.config.$tmp_results);

  },

  populateListLocation: function(data){
    var self = Listings;
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divListLocation);
    self.config.DOMlistLocation.innerHTML = '';
    self.config.DOMlistLocation.innerHTML = self.HBlistLocationFun(data);
    //self.config.$divDetails.empty();
    //self.config.$divDetails.append(self.resultsTmp(data));
  },

  populateListSuggestions: function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divListSuggestions);
    self.config.DOMulListSuggestions.innerHTML = '';
    self.config.DOMulListSuggestions.innerHTML = self.HBlistSuggestionsFun(data);
  },

  populatePsuggestions: function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divPsSuggestions);
    self.config.DOMulPsSuggestions.innerHTML = '';
    self.config.DOMulPsSuggestions.innerHTML = self.HBpsSuggestionFun(data);
  },

  populateBpSuggestions: function(data){
    var self = Listings,
    conFig = self.config;
    self.displayMutExDom(conFig.mutualExclusiveDom.$divBpSuggestions);
    self.config.DOMulBpSuggestions.innerHTML = '';
    self.config.DOMulBpSuggestions.innerHTML = self.HBbpSuggestionFun(data);    
  },

  populateListCompany: function(data){
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
        conFig.$divTableResponsive.append('<div id="map-all"><button class="btn btn-warning btn-sm map-all" data-element="btnCompListMultiMap"><span class="glyphicon glyphicon-map-marker"></span> Map All</button></div>');
      }
    }
  },

  populatePsCompany: function(data){
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

  },

  populatebPCompany: function(data){
    var self = Listings,
    conFig = self.config,
    summaryHTML = '';
    if(data.length === 0){
      self.startUpDisplay();
      return;  
    }
    self.displayMutExDom(conFig.mutualExclusiveDom.$dibBpCompany); 
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
  },

  populateSearchType: function(data){
    var self = Listings;
    self.config.DOMsearchType.innerHTML = '';
    self.config.DOMsearchType.innerHTML = self.HBsearchTypeFun(data);
  },

  populateIsland: function(data){
    var self = Listings;
    self.config.DOMdivSearchIslands.innerHTML = '';
    self.config.DOMdivSearchIslands.innerHTML = self.HBsearchIslandFun(data);
  }

}

  window.Listings = Listings.init({
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

    DOMbPSummary: $('div.bp_summary')[0],
    DOMbPDetails: $('div.bp_details')[0],

    HTMLlistLocation: $('#tmp_list_location').html(),
    DOMlistLocation: $('div#list-location')[0],
    
    
  // 
    
    $inputField: $('input#lookup'),
    $divSearchCarousel: $('div#searchCarousel'),
    $divIslandCarousel: $('div#islandCarousel'),
    $formSearchForm: $('form#searchForm'),
    $divTableResponsive: $('div.table-responsive'),
    $aSearchClick: $('a#search_click'),    
    $divIslands: $('div#islands'),
    $divDetailsAd: $('div.details-ad'),
    $divMap: $('div#maps'),
    //$divSuggestions: $('div#suggestions'),
   //$divResults: $('div#results'),
  // $divDetails: $('div#details'),
  // $islandSelectors: $('a.island'),
  // ,
   
   

   
  // //$inputLookUp: $('input#lookup'),
  // $buttonClose: $('button#closead'),

  // $divMaps: $('div#maps'),
  // $divResultsBtnMapAll: $('div#results button.map-all'),
  // $divJumbotron: $('div.jumbotron'),
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
    $dibBpCompany: $('div#bp_company'),
    $divAd: $('div#ad'),
    $divMapCanvas: $('div#mapcanvas')
  }
});
})();
  
//Sets up css class for menu accordians Islands and Listings
(function (){
  $('#btn_menu').one('click', function(evt){
  $('div.island').toggleClass('island');
  $('div.search').toggleClass('search');
})
})();


