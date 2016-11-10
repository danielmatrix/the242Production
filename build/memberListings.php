<?php
require_once('../../config/dbparams.php');

session_start();
$member_id = (int)$_SESSION['memberId'];

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
mysqli_select_db ($dbc, "the242");


$html_out = '';
$html_out .= '<div id="memberListButtons" class="row">';
$html_out .= '<button type="button" class="memlistbtn btn btn-primary btn-xs" data-element="btnMemberSearchListings"><span class="glyphicon glyphicon-search"> </span> Search for Listing</button>';
$html_out .= '<button type="button" class="memlistbtn btn btn-warning btn-xs" data-element="btnFreePersonalListings"><span class="glyphicon glyphicon-plus"> </span> Free Personal Listing</button>';
$html_out .= '<button type="button" class="memlistbtn btn btn-info btn-xs" data-element="btnFreeBusinessListings"><span class="glyphicon glyphicon-plus"> </span> Free Business Listing</button>';
$html_out .= '<button type="button" class="memlistbtn btn btn-success btn-xs" data-element="btnPaymentOptions"><span class="glyphicon glyphicon-credit-card"> </span> Payment Options</button>';
$html_out .= '<button id="btnMemberAccount" type="button" class="memlistbtn btn btn-default btn-xs pull-right" data-element="btnMemberAccount"><span class="text-primary">My Account</span></button>';
$html_out .= '</div>';

$html_out .= '<div id="memberListings" class="row">';
$html_out .= '<div class="table-responsive">';
$html_out .= '<table class="table table-condensed">';
$html_out .= '<tbody id="memberlistCompany">';


$sql_select_d = @mysqli_query($dbc,"CALL member_listings($member_id)");

while($row_listings = mysqli_fetch_array($sql_select_d)){
    $btnClass = 'text-muted';
    if((int)$row_listings[payment_method_id] > 0){
        $listType = ' Premium';
        $listToggle = 'Premium';
        $btnClass = 'text-success';        
    }
    else{
        $listType = ' Free';
        $listToggle = 'Upgrade';
        $btnClass = 'text-info';        
    }

    if((int)$row_listings[creator_id] > 0){  
        $creator =  '';
        $claimed = 'disabled'; 
    }
    else{
        $creator =  'disabled'; 
        $claimed = '';    
    }  

    $html_out .= '<tr>';
    $html_out .= '<td><span class="text-primary">'  . $row_listings['page_name']  . '  - ' . $row_listings['phone_number'] . '</span><br><span>' . $row_listings['address'] . ' ' . $row_listings['island_name'];
    $html_out .= '<span class="text-muted"><small>';
    if($row_listings['source'] === 'FP' || $row_listings['source'] === 'LP'){
        $html_out .= ' - Personal Free';
        $listType = ' Free';
        $disabled = 'disabled';
        $btnClass = 'text-muted';

    }
    else{
        $html_out .= ' - Business';
        $html_out .= $listType;
        $disabled = ''; 
    }
    $html_out .= '</small><span></span></td>';
    $html_out .= '<td>';
    $html_out .= '<button type="button" class="memlistbtn btn btn-default btn-xs" data-element="editMemberListings"' . 'data-listId="' . $row_listings['id'] . '"data-listSource="'.$row_listings['source']. '"data-listType ="'.trim($listType) .'">Edit</button>';
    $html_out .= '<button type="button" class="memlistbtn btn btn-default btn-xs" data-element="paidMemberListings" data-listId="'. $row_listings['id'] . '" ' . '"data-listSource="'.$row_listings['source']. '"' . ' ' . $disabled .'><span class="businessList '.$btnClass.'">' . $listToggle . '</span></button>';
    $html_out .= '<button type="button" class="memlistbtn btn btn-warning btn-xs" data-element="removeMemberListings" '. 'data-listId="' . $row_listings['id'] .'">Remove</button>';
    $html_out .= '<button type="button" class="memlistbtn btn btn-danger btn-xs" data-element="deleteCeatorListings" ' . $creator . ' data-listId="' . $row_listings['id'] . '"'. 'data-listSource="'.$row_listings['source'] . '"' . 'data-SearchName="' . $row_listings['search_display'] . '"><span class="glyphicon glyphicon-remove"></span></button>';
    $html_out .= '<button type="button" class="memlistbtn btn btn-info btn-xs"'. 'data-listId="' . $row_listings['id'] . '"" data-element="deleteRequestDeleteListings" '. $claimed . '>Request Delete</button>';
    $html_out .= '</td></tr>';
};
    $html_out.= '</tbody></table></div></div>';

echo $html_out;