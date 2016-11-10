<?PHP
require_once('process_creditcards.php');
session_start();

function update_billing_info(){
    
    $member_id = $_SESSION['memberId'];
    $card_type_name = '';
    $updateAllListings = false;
    $return_array = array();
    $card_info_array = array();
    
    //$next_billing_date = '';
    // $date_array =  explode('-',$next_billing_date);
    // $year = $date_array[0];
    // $month = $date_array[1];
    // $day = (int)$date_array[2] + 1;
    // $next_billing_date = $year . '-' . $month . '-' . $day;

    // if(isset($_POST['updateAll']) && $_POST['updateAll'] === 'on'){
    //     $updateAllListings = true;
    // }
    $update_billing_info_array = [];
    $update_billing_info_array[] = "'" . $_POST['card_id']. "'";
    $update_billing_info_array[] = "'" . 'M'. "'";
    $update_billing_info_array[] = "'" . $_POST['list_id']. "'";
    //$update_billing_info_array[] = "'" .$next_billing_date . "'";
    $card_info_array = get_card_info($_POST['card_id']);
    switch ($card_info_array['card_type']) {
        case 1:
            $card_type_name = "visa";
            break;
        case 2:
            $card_type_name = "mastercard";
            break;
        case 3:
            $card_type_name = "American Express";
            break;
    } 
    $card_number = $card_info_array['card_number'];
    $card_name = $card_info_array['name_on_card'];
    $card_amount = strval(MONTHLY_FEE);
    $card_exp = $card_info_array['expiration'];
    $cc_cvv = $card_info_array['security_code'];

    //card_type,card_ending,name_on_card
    $return_array[0] = false;
    $return_array[1] = $card_info_array['name_on_card'] . "'s " . $card_type_name . ' ending in ' . $card_info_array['card_ending'] . ' will be billed $' . MONTHLY_FEE .' a month for each of the following Listings';
    $message =  $return_array[1]."\r\n";
    // if($updateAllListings){
    //     $return_array[2] = get_multi_billing_listing($member_id);
    //     $total_payment = strval(count($return_array[2]) * MONTHLY_FEE);

    //     if(process_payments($card_number, $card_name, $total_payment, $card_exp, $cc_cvv)){
    //       $update_billing_info_array[] = "'" . $member_id . "'";
    //       $return_array[0] = update_multi_billing_info_listings($update_billing_info_array ) ;
    //       array_walk($return_array[2],function($value, $index) use (&$message){
    //           $message .= $value[0] . "\r\n";
    //       });
    //     }
    // }
    //else{
    if(process_payments($card_number, $card_name, $card_amount, $card_exp, $cc_cvv)){
      $return_array[0] = update_single_billing_info_listings($update_billing_info_array ) ; 
      $return_array[2] = get_single_billing_listing($_POST['list_id']);
      $message .=  $return_array[2][0];
    }  
    //}

    $to      = $_SESSION['login_email'];
    $subject = 'Statement of Charges';
    $headers = 'From:the242.com' . "\r\n" .
    'Reply-To: the242SAccounts@gamil.com' . "\r\n"; 
    mail($to, $subject, $message, $headers);
    $return_array[3] =  $to;       
    return json_encode($return_array);

}