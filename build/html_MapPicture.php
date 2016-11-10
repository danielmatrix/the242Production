<?php
session_start();

function htmlMapPictureForm($listId){
  $previousMapPicture = '';
  $file_name = '';
  
  $file_name = get_MapPicture($listId);
  
  if(isset($file_name) && !empty($file_name)){
    $previousMapPicture = "<img src='images/$file_name' class='img-responsive center-block' alt='Map Picture' title='Current Map Picture'>";
  }

  


$formMapPicture = <<<EOT
  <form id="formMapPicture" class="" enctype="multipart/form-data" method="post" name="banner" data-element="formMapPicture" data-status="edit" novalidate>
    $previousMapPicture
    <div class="form-group form-group-sm">
      <label for="mapPicture" class="control-label">Store Front Picture for Map</label>
      <div class="">
        <input type="file" id="mapPicture" name="mapPicture" data-required="0"  data-element="btnMapPicture"  data-MapPictureName="$file_name">
        <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 50kb or smaller. Recommended: Width 150 px Height 150 px</p>
      </div>
    </div>

    <div class="form-group form-group-sm">
      <div class="">
        <button id="btnMapPicture" type="button"  class="btn btn-primary btn-xs" data-element="btnSubmitMapPicture" data-form="formMapPicture" data-listID="$listId">Apply</button>
      </div>
    </div>
    <div id="formMapPictureAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
  </form>
EOT;

   return $formMapPicture;
}