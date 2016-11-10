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
