<?php
require_once('../../config/dbparams.php');

session_start();
$member_id = $_SESSION['memberId'];

$list_id = $_POST['listId'];

$pay_options_cnt = check_pay_options_exist($member_id);
$html_out =  '';

if($pay_options_cnt > 0){
  $html_out .= '<form name="update_pay_option" id="update_pay_option"  method="post" action="" data-element="update_pay_option" data-status="update" novalidate>';
  $html_out .= '<div class="form-group form-group-sm">
                <label  for="cardInfo">Bill me monthly $19.95 plus VAT, a total of $21.45 for each Premium Listing</label><br>';

  $html_out .= '<hr><label  for="cardInfo">Select Payment Option</label><br>';

  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

  $sql_select_d = @mysqli_query($dbc,"CALL select_payment_options($member_id)");
  while($row_listings = mysqli_fetch_array($sql_select_d)){
    $last_digits = substr($row_listings['card_number'], strlen($row_listings['card_number']) - 4); 
    extract($row_listings);
    //id, card_number, name_on_card, card_icon

    $html_out .= '<div class="radio">';
    $html_out .= '<label>';
    $html_out .= "<input  type='radio' name='card_id' id='$id' value='$id' data-validateMethod='radiomutex'  data-label='cardInfo' data-errorClass='text-danger' data-required='1' data-form='update_pay_option' data-group='card_id'>";
    $html_out .=  "<img src='images/$card_icon'  alt='Image'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='text-warning'>Edit ending with : $last_digits</span>";
    $html_out .= '</label>';
    $html_out .= '</div>';
  }    

  // $html_out .= '</div>
  //           <div class="checkbox">
  //             <label for="updateAll">
  //               <input type="checkbox"  id="updateAll" name="updateAll" data-validateMethod=""  data-label="updateAll" data-errorClass="text-danger" data-required="0" data-form="update_pay_option">
  //               <b><small>Use selected Payment Option to upgrade all of my Listings to Premium.</small></b>
  //             </label>
  //           </div>';  
  $html_out .= '<button id="btnUpdatePayOption" type="button" data-listId = "'. $list_id .'"  class="btn btn-primary btn-xs" data-element="btnUpdatePayOption" data-form="update_pay_option" >Process Payment Now</button>
          <img id="imgwait" src="fZbgn6A.gif" height="40px" alt="search">
          <div id="formUpdatePayOption" class="alert alert-danger multiForm form-errors" role="alert">There were errors! Please check your entries.</div>
    </form>';
}
else{
  $html_out .= '<p class="text-danger">You must have one or more Pay Options setup before you can Upgrade listing to Premium.<button id="upgrade_payoption" type="button" class="memlistbtn btn btn-success btn-xs pull-right" data-element="btnPaymentOptions"><span class="glyphicon glyphicon-usd"> </span> Payment Options</button></p>';
}  

echo $html_out;