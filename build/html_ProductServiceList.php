<?php
require_once('../../config/dbparams.php');
session_start();

$member_id = $_SESSION['memberId'];
$list_id = $_POST['list_id'];
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

$html_out =  '';
$id_cnt = 0;
$season_status = "";
$season = 'Season';
$id = '';
$start_date = '';
$end_date = '';
$title = 'Not Available';
$season_action = '';


extract(get_seasons());

if(empty($id)){
    $season_status = "disabled";
    $id = '';
    $season_text = 'Season';
}
else{
  $title = $start_date . ' to ' . $end_date;
  $season_array = get_seasonal($list_id, $id);  
}

$on_sale_array = get_on_sale($list_id);




$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

$sql_select_d = @mysqli_query($dbc,"CALL get_product_service_list($list_id)");
while($row_listings = mysqli_fetch_array($sql_select_d)){
  extract($row_listings);
  $id_cnt = $id_cnt + 1;
  if(in_array($product_id,$on_sale_array)){
    $onsale_class = ' on-sale';
  }
  else{
    $onsale_class = ''; 
  }

  if(isset($season_array)){
    if(in_array($product_id,$season_array)){
      $season_class = ' season';
       $season_text =  ' - ' . $season;
       $season_action = 'remove';
    }
    else{
      $season_class = ''; 
      $season_text =  ' + ' . $season;
      $season_action = 'add';  
    }    
  }
  else{
    $season_class = ''; 
    $season_text =  ' + ' . $season;
    $season_action = 'add';  
  }
  if(empty($id)){
    $season_text = 'Season';  
  }


  if(empty($thumbnail)){
    $thumbnail = 'images/placeholder_small.png' ; 
  }
  
  $html_out .= "<li class='list-group-item ps_list' id='li$id_cnt'>";
  $html_out .= "<div class='dropdown'>";
  $html_out .= "<button class='btn btn-default dropdown-toggle btn-xs ps_list_dropdown' type='button' id='dropdownMenu$id_cnt' data-toggle='dropdown' aria-expanded='true'>";
  $html_out .= "<span class='caret'></span></button>";
  $html_out .= "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu$id_cnt'>";
  $html_out .= "<li role='presentation'><a class='editRemoveProduct' role='menuitem' tabindex='-1' href='$product_id' data-listId='$listing_id' data-productText='product_text$id_cnt' data-element='aEditProductService'>Edit</a></li>";
  $html_out .= "<li role='presentation'><button class='editRemoveProduct btn btn-link' role='menuitem' tabindex='-1' product_id='$product_id' data-listId='$listing_id' season_id ='$id' data-element='addToSeason' $season_status title='$title' data-action='$season_action'>$season_text</button></li>";
  $html_out .= "<li role='presentation'><a class='editRemoveProduct' role='menuitem' tabindex='-1' href='$product_id' data-listId='$listing_id' data-element='aRemoveFromListing'>Remove</a></li>";  
  $html_out .= "<li role='presentation'><a class='editRemoveProduct' role='menuitem' tabindex='-1' href='$product_id' data-listId='$listing_id' data-element='aDeleteProduct'><span class='text-danger'>Delete Product</span></a></li>"; 
  $html_out .= "</ul>";
  $html_out .= "</div>";
  $html_out .= "<div>";
  $html_out .= "<img src='../$thumbnail' class='img-product-edit' alt='Product Image' title='Product Service Thumbnail'>";
  $html_out .= "</div>";
  $html_out .= "<div class='saleseason ps_name$onsale_class$season_class'>";
  $html_out .= "<p id='product_text$id_cnt'>$product_name<p>";
  $html_out .= "</div>";
  $html_out .= "</li>";
}    
    
echo $html_out;  