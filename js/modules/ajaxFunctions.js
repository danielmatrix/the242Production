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