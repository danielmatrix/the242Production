<?PHP
require_once('PnP.php');

function process_payments($card_number, $card_name, $card_amount, $card_exp, $cc_cvv){
  $p = new PnP();
  $response = $p->auth( array(
      'card_number' => $card_number,
      'card-name'   => $card_name,
      'card-amount' => $card_amount,
      'card-exp'    => $card_exp,
      'email'       => '',
      'ship-name'   => '',
      'address1'    => '',
      'city'        => '',
      'state'       => '',
      'zip'         => '',
      'cc-cvv'      => $cc_cvv 
                          ));

  // $final_results = $p->query_trans();

  if($response->FinalStatus === 'success'){
    return true;
  }
  else{
    return false;
  }

}