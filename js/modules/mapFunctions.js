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

  