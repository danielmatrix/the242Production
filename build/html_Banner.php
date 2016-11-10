<?php
session_start();

function htmlBannerForm($listId){
  $previousBanner = '';
  $file_name = '';
  
  $file_name = get_business_banner($listId);
  
  if(isset($file_name) && !empty($file_name)){
    $previousBanner = "<img src='images/$file_name' class='img-responsive center-block' alt='Banner' title='Current Banner'>";
  }

  


$formBanner = <<<EOT
  <form id="banner" class="" enctype="multipart/form-data" method="post" name="banner" data-element="formBanner" data-status="edit" novalidate>
    $previousBanner
    <div class="form-group form-group-sm">
      <label for="bannerPhoto" class="control-label">Business Banner</label>
      <div class="">
        <input type="file" id="bannerPhoto" name="bannerPhoto" data-required="0"  data-element="btnbannerPhoto"  data-bannerName="$file_name">
        <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 100 kb or smaller. Recommended: Width 728 px Height 90 px</p>
      </div>
    </div>

    <div class="checkbox">
      <label for="updateBannerAll">
        <input value='Y' type="checkbox"  id="updateBannerAll" name="updateBannerAll" data-validateMethod=""  data-label="updateBannerAll" data-errorClass="text-danger" data-required="0" data-form="banner">
        <b><small>Use Banner for all my Business Listings.</small></b>
      </label>
    </div>     

    <div class="form-group form-group-sm">
      <div class="">
        <button id="btnBanner" type="button"  class="btn btn-primary btn-xs" data-element="btnSubmitBanner" data-form="banner" data-listID="$listId">Apply</button>
      </div>
    </div>
    <div id="bannerAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
  </form>
EOT;

   return $formBanner;
}