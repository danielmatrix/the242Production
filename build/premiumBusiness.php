<?php
require_once('../../config/dbparams.php');

session_start();
$member_id = (int)$_SESSION['memberId'];
$list_id = $_POST['listId'];

$business_info_array = get_premium_business_name($list_id);
$business_info = $business_info_array[0];
$valid_pay_option = $business_info_array[1] === 'false' ? 'disabled' : '';
$island_id = $business_info_array[2];
$map = $business_info_array[3];
$search_display = $business_info_array[4];
$phone = $business_info_array[5];
$website = $business_info_array[6];
$area_code = $business_info_array[7];
$email = $business_info_array[8];
$address = $business_info_array[9];

$html_out = "<p class='pay_option_heading'>$business_info" . 
            '<a id="donePayOptions" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="donePayOptions"><span class="text-primary"><small>Back</small><span></a>';

if($valid_pay_option === ''){
  $html_out .= "<a data-listId='$list_id' id='removePayOption' href='#'' class='pull-right btn btn-default btn-xs btn-cancel' data-element='removePremium'>
                <span class='text-danger'><small>Remove Premium</small><span></a></p>" ; 
}
else{
  $html_out .=  '</p>'; 
}

            
if($valid_pay_option === 'disabled'){
  $html_out .= '<p id="validPaymentWarning" class="text-warning">A valid Payment Option must be selected to upgrade this Listing to Premium.';
  $html_out .= 'Upgrading to Premium will give you access to the following features; Banner Ads, Store-Front image, Products and Services, Help Wanted, Resumes, Sales and Events, Keywords and Seasons. For details on any of these features please view our documentation and videos in the Help section. ';
  $html_out .= 'All features will be available upon the successful processing of your Credit/Debit card. ';
  $html_out .= 'Cancel within seven days to recieve a full refund. No long-term contract, you may cancel anytime.';
  $html_out .= '</p>';  
}

$html_out .= '<div id="selectPayOption" class="well well-sm">
                <h5><span class="">
                <a data-listId="'. $list_id .'" id="aselectPayOptions" href="#"" class="btn btn btn-info btn-xs" data-element="btnSelectPayOptions">
                  <span class="glyphicon glyphicon-credit-card"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Select Payment Options</span>
                </a>
                <a id="calcelPayOptionList" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="calcelPayOptionList">
                  <span class="text-muted"><small>Cancel</small><span>
                </a> 
                </h5>
              </div>
              <div id="selectPayOptionSD" class="premiumBusinessSlider">
              </div>';            


$html_out .= '<div id="selectBanner" class="well well-sm">
                <h5><span class="">
                  <a data-listId="'. $list_id .'" '. $valid_pay_option .' id="aselectBannerAd" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnSelectBannerAd"><span class="glyphicon glyphicon-picture">
                  </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Banner Ad</span> 
                  </a>
                  <a id="doneBanner" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="doneBanner">
                  <span class="text-muted"><small>Done</small></span>
                  </a> 
                </h5>
              </div>
              <div id="selectBannerSD" class="premiumBusinessSlider">
              </div>'; 

$html_out .= '<div id="selectMapPicture" class="well well-sm">
              <h5><span class="">
                <a data-listId="'. $list_id .'" '. $valid_pay_option .' id="aselectMapPicture" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnSelectMapPicture"><span class="glyphicon glyphicon-picture">
                  </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Store Front Map Picture</span> 
                </a>
                <a id="doneMapPicture" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneMapPicture">
                <span class="text-muted"><small>Done</small></span>
                </a> 
              </h5>
              </div>
              <div id="selectMapPictureSD" class="premiumBusinessSlider">
              </div>';

$html_out .= '<div id="managePandS" class="well well-sm">
              <h5><span class=""><a data-listId="'. $list_id .'" '. $valid_pay_option .' id="editProductService" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnEditProductService" ' . 'data-website="' . $website . '" data-island_id="'. $island_id . '"' . 'data-list_name="' . $search_display .'"' . 'data-map="' . $map . '"'. 'data-phone="' . $phone . '"' .'data-address="'.$address .'"><span class="glyphicon glyphicon-shopping-cart"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Products and Services</span> 
              </a>
              <a id="doneProductService" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneProductService">
              <span class="text-muted"><small>Done</small></span>
              </a              
              </h5>
              </div>
              <div id="productServiceSD" class="premiumBusinessSlider">
              </div>';

$html_out .= '<div id="helpWanted" class="well well-sm">
              <h5><span class="">
                <a data-hw_id="" data-map_phone = "' . $map . '" data-island_id="' . $island_id . '" data-phone="' . $area_code .'-' .$phone. '" data-email="' . $email . '" data-listId="'. $list_id .'" '. $valid_pay_option .' data-search_display= "' . $search_display .'" data-status="add" id="editHelpWanted" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnEditHelpWanted"><span class="glyphicon glyphicon-user"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Help Wanted</span> 
                </a>
                <a id="doneKeyords" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneHelpWanted">
                <span class="text-muted"><small>Done</small></span>
                </a> 
              </h5>
              </div>
              <div id="editHelpWantedSD" class="premiumBusinessSlider">
              </div>'; 

$html_out .= '<div id="apply_resume" class="well well-sm">
              <h5><span class="">
                <a data-listId="'. $list_id .'" id="viewHelpWantedApply" href="#"" class="btn btn btn-info btn-xs premium" ' . $valid_pay_option . ' data-element="viewHelpWantedApply"><span class="glyphicon glyphicon-list-alt"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Resumes</span> 
                </a>
                <a id="doneViewResume" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="adoneViewResume">
                <span class="text-muted"><small>Done</small></span>
                </a> 
              </h5>
              </div>
              <div id="viewResumeSD" class="premiumBusinessSlider">
              </div>';                              

$html_out .= '<div id="sales_events" class="well well-sm">
              <h5><span class="">
                <a data-listId="'. $list_id .'" data-search_display="' . $search_display .'" data-island_id="' . $island_id . '" data-map="' . $map . '" id="editSalesEvents" href="#"" class="btn btn btn-info btn-xs premium" ' . $valid_pay_option . ' data-element="btnEditSalesEvents"' .' data-fullAddress="'.$business_info. '"><span class="glyphicon glyphicon-calendar"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Sales &amp; Events</span> 
                </a>
                <a id="doneKeyords" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneSalesEvents">
                <span class="text-muted"><small>Done</small></span>
                </a>                 
              </h5>
              </div>
              <div id="salesEventsSD" class="premiumBusinessSlider">
              </div>';                                        

$html_out .= '<div id="keywords" class="well well-sm">
              <h5><span class="">
                <a data-listId="'. $list_id .'" '. $valid_pay_option .' data-search_display= "' . $search_display .'" id="editKeywords" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnEditKeywords"><span class="glyphicon glyphicon-search"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;Keywords</span> 
                </a>
                <a id="doneKeyords" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneKeywords">
                <span class="text-muted"><small>Done</small></span>
                </a>                 
              </h5>
              </div>
              <div id="editKeywordsSD" class="premiumBusinessSlider">
              </div>';


$html_out .= '<div id="events" class="well well-sm">
              <h5><span class="">
                <a data-listId="'. $list_id .'" '. $valid_pay_option .' id="viewSeasons" href="#"" class="btn btn btn-info btn-xs premium" data-element="btnViewSeasons"><span class="glyphicon glyphicon-tree-conifer"> </span></a>&nbsp;&nbsp;&nbsp;&nbsp;View Seasons</span> 
                </a>
                <a id="doneSeasons" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneSeasons">
                <span class="text-muted"><small>Done</small></span>
                </a>  
              </h5>
              </div>
              <div id="viewSeasonsSD" class="premiumBusinessSlider">
              </div>';           

echo $html_out; 