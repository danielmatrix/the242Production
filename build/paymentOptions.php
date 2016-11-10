<?php
require_once('../../config/dbparams.php');

session_start();
$member_id = (int)$_SESSION['memberId'];

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
mysqli_select_db ($dbc, "the242");


$html_out = '';
$html_out .= '<h5 class="well well-sm"><span class="text-primary">Add new Payment Option &nbsp;&nbsp;&nbsp;&nbsp;</span> 
                <a id="donePayOptions" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="donePayOptions"><span class="text-muted"><small>Done</small><span></a>
                <a id="showAddPayOptions" href="#"" class="btn btn-success btn-xs btn-showPayOptions" data-element="btnShowAddPayOptions"><span class="glyphicon glyphicon-plus"> </span></a>
              </h5>';

$html_out .= ' <div id="newPayOptionForm">
    <form name="new_payment_option" id="new_payment_option" class="form-horizontal" method="post" action="" data-element="newPaymentOption" data-status="add" novalidate>
    <div id="payOptionsIcons" class="col-sm-offset-2 col-sm-10">
      <p class="text-warning">All transactions are in Bahamian Dollars <b>(B$)</b></p>
    </div>  
    <div id="payOptionsIcons" class="col-sm-offset-2 col-sm-10">
      <label for="cardtype">Select Card &nbsp;&nbsp;&nbsp;</label>
      <label>
      <input type="radio" name="cardtype" id="optionsVisa" value="1" data-required="1" data-validateMethod="radiomutex" data-group="cardtype" data-label="cardtype" data-errorClass="text-danger" data-form="new_payment_option" data-element="inputCardType">
      <img src="images/visa_icon.png" class="ximg-responsive" alt="Responsive image"><span> Visa &nbsp;&nbsp;&nbsp;&nbsp;</span>
      </label>

      <label>
      <input type="radio" name="cardtype" id="optionsMC" value="2" data-required="1" data-validateMethod="radiomutex" data-group="cardtype" data-label="cardtype" data-errorClass="text-danger" data-form="new_payment_option" data-element="inputCardType">
      <img src="images/mastercard_icon.png" class="ximg-responsive" alt="Responsive image"><span> MasterCard &nbsp;&nbsp;&nbsp;&nbsp;</span>
      </label>

      <label id="amex">
      <input type="radio" name="cardtype" id="optionsAMEX" value="3" data-required="1" data-validateMethod="radiomutex" data-group="cardtype" data-label="cardtype" data-errorClass="text-danger" data-form="new_payment_option" data-element="inputCardType">
      <img src="images/americanexpress_icon.png" class="ximg-responsive" alt="Responsive image"><span> American Express &nbsp;&nbsp;&nbsp;&nbsp;</span>
      </label>

      <label id="invoice">
      <input type="radio" name="cardtype" id="optionsCheck" value="4" data-required="1" data-validateMethod="radiomutex" data-group="cardtype" data-label="cardtype" data-errorClass="text-danger" data-form="new_payment_option" data-element="inputCardType">
      <img src="images/cheque_icon.jpeg" class="ximg-responsive" alt="Responsive image"><span> Invoice</span>
      </label>

    </div>

        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="name_on_card">Name on Card</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm" name="name_on_card" id="name_on_card" placeholder="" data-required="1" data-validateMethod="creditCardAll" data-label="name_on_card" data-errorClass="text-danger" data-form="new_payment_option">
          </div>
        </div>

        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="card_number">Card Number</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm optional" name="card_number" id="card_number" placeholder="" data-required="1" data-validateMethod="creditCardAll" data-label="card_number" data-errorClass="text-danger" data-form="new_payment_option">
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="security_code">Security Code</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm optional" name="security_code" id="security_code" placeholder="3 digit security code" data-required="1" data-validateMethod="creditCardCVV" data-label="security_code" data-errorClass="text-danger" data-form="new_payment_option">
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="expiration_date">Expiration Date</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm optional" name="expiration_date" id="expiration_date" placeholder="mm/yy" data-required="1" data-validateMethod="creditCardExp" data-label="expiration_date" data-errorClass="text-danger" data-form="new_payment_option">
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="billing_address" class="control-label">Billing Address</label>
          <div class="col-sm-10">
           <textarea id="billing_address" name="billing_address" class="form-control input-sm address" rows="10" data-required="1" data-validateMethod="creditCardAll" data-label="billing_address" data-errorClass="text-danger" data-form="new_payment_option"></textarea>
          </div>
        </div> 
        
        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnAddPayOption" type="button" class="btn btn-primary btn-xs" data-element="btnSubmitPayOption" data-poID="0" data-form="new_payment_option">Submit</button>
          </div>
        </div>
        <div id="formAddPayOption" class="alert alert-danger" role="alert">There were errors! Please check you entries.</div>

        </form>
                    
      </div>';            

$html_out .= '<div class="panel-group" id="accordionPO" role="tablist">';
$cnt = 1;
$sql_select_d = @mysqli_query($dbc,"CALL get_payment_options($member_id)");
while($row_listings = mysqli_fetch_array($sql_select_d)){
    $last_digits = substr($row_listings['card_number'], strlen($row_listings['card_number']) - 4); 
    extract($row_listings);
    $required = '1';
    $disabled = '';
    if($card_type === '4'){
      $disabled = 'disabled';
      $required = '0';
    }
    $html_out .= '<div class="panel panel-default">';
    $html_out .= "<div class='panel-heading' role='tab' id='headingPO$cnt'>";
    $html_out .= '<h5 class="panel-title">';
    $html_out .= "<a class='payOptionEdit' data-toggle='collapse' data-parent='#accordionPO' href='#collapsePO$cnt'>";
    $html_out .= "<img src='images/$card_icon'  alt='Image'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='text-warning'>Edit ending with : $last_digits</span>";
    $html_out .= '</a>';
    $html_out .= "<a id='deletePayOptions' href='$id' class='pull-right btn btn-default btn-xs btn-cancel' data-element='deletePayOptions'><span class='text-danger'>Delete<span></a>";
    $html_out .= '</h5>';
    $html_out .= '</div>';
    $html_out .= "<div id='collapsePO$cnt' class='panel-collapse collapse' role='tabpanel'>";
    $html_out .= '<div class="panel-body">';
    
    $formEditPay = <<<EOT
    <form name="edit_payment_option$cnt" id="edit_payment_option$cnt" class="form-horizontal" method="post" action="" data-element="editPaymentOption" data-status="edit" novalidate>
    
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="name_on_card$cnt">Name on Card</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm" name="name_on_card$cnt" id="name_on_card$cnt" placeholder="" value="$name_on_card" data-required="1" data-validateMethod="creditCardAll" data-label="name_on_card$cnt" data-errorClass="text-danger" data-form="edit_payment_option$cnt">
          </div>
        </div>

        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="card_number$cnt">Card Number</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm" name="card_number$cnt" id="card_number$cnt" placeholder="" value="$card_number" data-required="$required" data-validateMethod="creditCardAll" data-label="card_number$cnt" data-errorClass="text-danger" data-form="edit_payment_option$cnt" $disabled>
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="security_code$cnt">Security Code</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm" name="security_code$cnt" id="security_code$cnt" placeholder="3 digit security code" value="$security_code" data-required="$required" data-validateMethod="creditCardCVV" data-label="security_code$cnt" data-errorClass="text-danger" data-form="edit_payment_option$cnt" $disabled>
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="expiration_date$cnt">Expiration Date</label>
          <div class="col-sm-10">
            <input type="text" class="form-control input-sm" name="expiration_date$cnt" id="expiration_date$cnt" placeholder="mm/yyyy" value="$expiration" data-required="$required" data-validateMethod="creditCardExp" data-label="expiration_date$cnt" data-errorClass="text-danger" data-form="edit_payment_option$cnt" $disabled>
          </div>
        </div>
        
        <div class="form-group form-group-sm">
        <label class="col-sm-2 control-label" for="billing_address$cnt" class="control-label">Billing Address</label>
          <div class="col-sm-10">
           <textarea id="billing_address$cnt" name="billing_address$cnt" class="form-control input-sm address" rows="10" data-required="1" data-validateMethod="creditCardAll" data-label="billing_address$cnt" data-errorClass="text-danger" data-form="edit_payment_option$cnt">$billing_address</textarea>
          </div>
        </div> 
        
        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btneditPayOption$cnt" type="button" item-cnt="$cnt" class="btn btn-primary btn-xs" data-element="btnSubmitPayOption" data-form="edit_payment_option$cnt" data-poID="$id" card-type="$card_type">Submit</button>
          </div>
        </div>
        <div id="formEditPayOption$cnt" class="alert alert-danger multiForm" role="alert">There were errors! Please check you entries.</div>

  </form>

EOT;

    $html_out .= $formEditPay;
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $cnt = $cnt + 1;
}


$html_out .= '</div>';
echo $html_out;  

