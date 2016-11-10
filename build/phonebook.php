<?php
	require_once('../../config/dbparams.php');
	require_once('mysql_functions.php');
	// require_once('formNewMember.php'); 
	// require_once('formLoginMember.php');
	//require_once('newPersonalListing.php');

	session_start();

	
	/* Connect to database */
	$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD,DB_NAME)
	or die('Warning Service curently unavailable.');
	

	if (isset($_POST['lookup']) && $_POST['search_type'] === '1') {
			$html_out = display_search_list($dbc);
			echo $html_out;
			exit;
	}


	if (isset($_POST['ids']) && $_POST['search_type'] === '1'){
		$html_out = display_listings($dbc);
		echo $html_out;
		exit;			
	}

	if (isset($_POST['lookup']) && $_POST['search_type'] === '2') {
		$html_out = display_listwords($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['ps_search_str']) && $_POST['search_type'] === '2') {
		$html_out = display_ps_search($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['ps_search_str']) && $_POST['search_type'] === '4') {
		$html_out = product_keyword_search();
		echo $html_out;
		exit;
	}


	if (isset($_POST['lookup']) && $_POST['search_type'] === '3') {
		$html_out = display_bp_list($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['bp_id']) && $_POST['search_type'] === '3') {
		$html_out = display_bp_company($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['lookup']) && $_POST['search_type'] === '4') {
		$html_out = productwords($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['getSalesProducts']) && $_POST['search_type'] === '9') {
		echo product_sales_search($_POST['product_ids']);
		exit;
	}

	if (isset($_POST['getNewArrivals'])) {
		echo getNewArrivals($_POST['list_id']);
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'login' ){
		require_once('formLoginMember.php');
		echo login_member($dbc);
		exit;
	}




//Member - Insert Update Validate
	if (isset($_POST['form']) && $_POST['form'] === 'getMemberForm' ){
		require_once('html_MemberForm.php');
		$edit = $_POST['edit'] === 'true' ?  true : false;
		$html_out = htmlMemberForm($dbc, $edit);		
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insert_update_member'){
		require_once('insert_update_Member.php'); 
		echo insert_update_member($dbc);
		exit;
	}


//Free Personal Listings - Insert Update Validate
	if (isset($_POST['form']) && $_POST['form'] === 'getFreePersonalListingForm' ){
		require_once('html_PersonalListingForm.php');
		$edit = $_POST['edit'] === 'true' ?  true : false;
		$listId = $_POST['listId'];
		$html_out = htmlFreePersonalForm($dbc, $edit, $listId);
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insert_update_PersonalForm' ){
		require_once('insert_update_PersonalListing.php');
		$html_out = insert_update_personal_listings($dbc);
		echo $html_out;
		exit;
	}

//Free Business Listings - Insert Update Validate
	if (isset($_POST['form']) && $_POST['form'] === 'getFreeBusinessListingForm' ){
		require_once('html_FreeBusinessListingForm.php');
		$edit = $_POST['edit'] === 'true' ?  true : false;
		$listId = $_POST['listId'];
		$html_out = htmlFreeBusinessForm($dbc, $edit, $listId);
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insert_updateFreeBusinessForm' ){
		require_once('insert_update_FreeBusinessListing.php');
		$edit = $_POST['edit'] === 'true' ?  true : false;
		$listId = $_POST['listId'];
		$html_out = insert_update_free_business_listings($dbc);
		echo $html_out;
		exit;
	}


//Add and Remove Listings for Members

	if (isset($_POST['form']) && $_POST['form'] === 'addToMyListings' ){
		if(isset($_SESSION['memberId'])){
			$html_out = add_to_my_listings($dbc, $_SESSION['memberId'], $_POST['listingId'], $_POST['source']);
			echo $html_out;
		}
		exit;
	}

	
	if (isset($_POST['form']) && $_POST['form'] === 'removeFromMyListings' ){
		if(isset($_SESSION['memberId'])){
			$html_out = removeFromMyListings($dbc, $_POST['listingId']);
			echo $html_out;
		}
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insert_updatePayOption' ){
		require_once('insert_update_PayOptions.php');
		$html_out = insert_update_PayOptions($dbc);
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'removePayOption' ){
		$html_out = delete_pay_option($dbc,$_POST['payOptionId']);
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'paidMemberListings' ){
		require_once('premiumBusiness.php');
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'selectPayOption' ){
		require_once('html_SelectPayOption.php');
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'update_pay_option' ){
		require_once('update_Billing_Info.php');
		require_once('PnP.php');
		echo update_billing_info();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'removePremium' ){
		echo remove_premium_listings($_POST['list_id']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'selectBanner' ){
		require_once('html_Banner.php');
		echo htmlBannerForm($_POST['listId']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'update_banner' ){
		require_once('insert_update_banner.php');
		echo insert_update_banner();
		exit;
	}

	
	if (isset($_POST['form']) && $_POST['form'] === 'selectKeywords' ){
		require_once('html_Keywords.php');
		echo htmlKeywordsForm($_POST['search_display']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'selectMapPicture' ){
		require_once('html_MapPicture.php');
		echo htmlMapPictureForm($_POST['listId']);
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'update_MapPicture' ){
		require_once('insert_update_MapPicture.php');
		echo insert_update_MapPicture();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'deleteCeatorListings' ){
		require_once('deleteCreatorListing.php');
		echo deleteCreatorListing();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'addEditProductService' ){
		require_once('html_ProductService.php');
		$html_out = htmlProductService($_POST['list_id'], $_POST['island_id'], $_POST['search_display'], $_POST['map'], $_POST['phone'],$_POST['form_status'],$_POST['product_id)'], $_POST['website'], $_POST['address']);
		echo $html_out;
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getSubCatagories' ){
		$html_out =  get_product_subcategories($_POST['catagory_id']);
		echo $html_out;
		exit;
	}	
	
	if (isset($_POST['form']) && $_POST['form'] === 'getServiceSubCatagories' ){
		$html_out =  get_service_subcategories($_POST['catagory_id']);
		echo $html_out;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'updateProductService' ){
		require_once('insert_update_ProductService.php');
		echo insert_update_product_service($dbc);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getProductServiceList' ){
		require_once('html_ProductServiceList.php');
		exit;
	}
	
	if (isset($_POST['form']) && $_POST['form'] === 'removeProductFromListings' ){
		echo remove_product_from_listings($_POST['product_id'], $_POST['list_id']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'remove_all_products_from_listings' ){
		echo remove_all_products_from_listings($_POST['list_id']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'add_all_products_to_listings' ){
		$location = get_listings_products_info2($_POST['list_id']);
		echo add_all_product_to_listing($_POST['list_id'], $_SESSION['memberId'], $location);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'edit_product_info' ){
		require_once('html_ProductService.php');
		$html_out = htmlProductService($_POST['list_id'], $_POST['island_id'], $_POST['search_display'], $_POST['map'], $_POST['phone'],$_POST['form_status'],$_POST['product_id'],$_POST['website']);
		echo $html_out;
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'delete_product' ){
		$return_json = delete_product_from_listings($_POST['product_id']);
		$return_json = delete_product($_POST['product_id']);
		echo $return_json;
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getCatSubAccordion' ){
		require_once('get_cat_sub.php');
		echo get_cat_sub($_POST['list_id']);
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getListDisplayProductsServices' ){
		echo getListDisplayProductsServices($_POST['product_ids']);
		exit;
	}

	
	if (isset($_POST['form']) && $_POST['form'] === 'getDisplaySeasonProducts' ){
		echo getDisplaySeasonProducts($_POST['product_ids']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'updateAdLineKeywords' ){
		require_once('insert_updateAdLineKeyword.php');
		echo insert_update_AdLineKeyword($_POST['kws_id']);
		exit;
	}	


	if (isset($_POST['form']) && $_POST['form'] === 'selectHelpWanted' ){
		require_once('html_HelpWanted.php');
		echo html_HelpWanted($_POST['hw_id'],$_POST['list_id'], $_POST['search_display'], $_POST['form_status'], $_POST['email'], $_POST['phone'], $_POST['island_id'], $_POST['map_phone']);
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'insert_updateHelpWanted' ){
		require_once('insert_update_HelpWanted.php');
		echo insert_update_help_wanted();
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getHelpWantedList' ){
		require_once('html_HelpWantedList.php');
		exit;
	}	

	
	if (isset($_POST['form']) && $_POST['form'] === 'deleteHelpWanted' ){
		echo deleteHelpWanted($_POST['id']); 
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'deleteAllHelpWanted' ){
		echo deleteAllHelpWanted($_POST['list_id']); 
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'addRemoveSeason' ){
		echo update_product_season($_POST['product_id'], $_POST['season_id']); 
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getSeasonDisplayComapny' ){
		$season_id = get_current_season_Id();
		echo get_company_season($season_id );
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getDisplaySalesEvents' ){
		echo get_sales_events_display();
		exit;		
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getDisplaySales' ){
		echo get_sales_display();
		exit;		
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getSeasons' ){
		require_once('html_ViewSeasons.php');
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getResume' ){
		require_once('html_Resume.php');
		echo htmlFreeResumeForm();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insertUpdateResume' ){
		require_once('insert_update_Resume.php');
		echo insert_update_resume();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'get_help_wanted_active' ){
		$return_array = Array();
		if(isset($_SESSION['memberId'])){
			$member_id = $_SESSION['memberId'];
		}
		else{
			$member_id = 0;	
		}
		echo get_help_wanted_active($return_array, $member_id);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insert_help_wanted_apply' ){
		echo insert_help_wanted_apply($_POST['job_id'],$_POST['resume_id'],$_SESSION['memberId'],$_POST['list_id']);
		exit;
	}


	if (isset($_POST['form']) && $_POST['form'] === 'delete_help_wanted_appy' ){
		echo delete_help_wanted_appy($_POST['job_id'],$_SESSION['memberId']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'get_help_wanted_apply' ){
		require_once('html_HelpWantedApply.php');
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getApplyResume' ){
		echo getApplyResume($_POST['resume_id']);
		exit;
	}

		
	if (isset($_POST['form']) && $_POST['form'] === 'resumeNotify' ){
		$mail_sent = get_email_job_info($_POST['job_id'], $_POST['email']);
		echo json_encode($mail_sent);
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getSalesEvents' ){
		require_once('html_SalesEvents.php');
		echo htmlSalesEvents($_POST['list_id'], $_POST['search_display'], $_POST['map'], $_POST['island_id'], $_POST['full_address'] );
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'insertUpdateSalesEvents' ){
		require_once('insert_update_SalesEvents.php');
		echo insert_update_SalesEvents();
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getDisplaySalesEventsList' ){
		echo getDisplaySalesEventsList($_POST['list_ids']);
		exit;
	}

	
	if (isset($_POST['form']) && $_POST['form'] === 'getDisplayClassifiedDetails' ){
		echo getDisplayClassifiedDetails($_POST['classified_id']);
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getDisplayForRentDetails' ){
		echo getDisplayForRentDetails($_POST['for_rent_id']);
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getClassifiedForm' ){
		require_once('html_Classifieds.php');
		echo htmlClassifiedsForm($_POST['control_number']);
		exit;
	}
	
	if (isset($_POST['form']) && $_POST['form'] === 'insertUpdateClassified' ){
		require_once('insert_update_classified.php');
		echo insert_update_classified($_POST['control']);
		exit;
	}

	
	if (isset($_POST['form']) && $_POST['form'] === 'getDisplayClassifieds' ){
		echo get_classified_active();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getDisplayForRent' ){
		echo get_for_rent_active();
		exit;
	}	

	if (isset($_POST['form']) && $_POST['form'] === 'getForRentForm' ){
		require_once('html_ForRent.php');
		echo htmlForRentForm($_POST['control_number']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insertUpdateForRent' ){
		require_once('insert_update_ForRent.php');
		echo insert_update_for_rent($_POST['control']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'resetPassword' ){
			$puid = get_email_password("'" . $_POST['email'] . "'");
      $to      = $_POST['email'];
      $subject = 'the242.com Password Reset Request';
      $message =  "Please click on the link below to reset your password to: welcome.\r\n";
      $message .=  "Please login and change the password as soon as posible.\r\n";
      $message .= 'Click to Confirm www.the242.com/build/reset_password.php?uid='. urlencode($_POST['email']) .'&puid=' . $puid ;
      $headers = 'From:the242Support' . "\r\n" .
      'Reply-To: the242Support@gamil.com' . "\r\n"; 

      echo mail($to, $subject, $message, $headers);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getDeleteRequestForm' ){
		require_once('html_DeleteRequestForm.php');
		echo htmlDeleteRequestForm();
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'insertDeleteRequest' ){
		echo insertDeleteRequest($_SESSION['memberId']);
		exit;
	}

	if (isset($_POST['form']) && $_POST['form'] === 'getHelp' ){
		require_once('html_Help.php');
		exit;
	}

	if (isset($_POST['request']) && $_POST['request'] === 'getHelpfulLinks' ){
		require_once('html_HelpfulLinks.php');
		exit;
	}	