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