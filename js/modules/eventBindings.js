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

    // conFig.mutualExclusiveDom.$divManageListings.on('blur', 'td[data-element="businesshours"]',function(evt){
    //   self.programDirector('evtBlur', $(this), null, evt, 'All');
    // });



    







    // conFig.mutualExclusiveDom.$divManageListings.on('click','button[data-element="editMemberListings"]',function(evt){
    //    evt.preventDefault();
    //   console.log('It Will Work');
    // });


    //   $document.on('submit','form[id="freeMemberPersonal"]',function(evt){
    //   evt.preventDefault();
    //   console.log('Event fired 6');
    //   //self.programDirector('evtSubmit', $(this), null, evt, 'All');
    // });

}