<?PHP
require_once('formValidateFunctions.php');
session_start();

function insert_update_help_wanted(){

  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242"); 

  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $list_id = $_POST['list_id'];
  $search_display = $_POST['search_display'];
  $island_ids = $_POST['island_id'];
  $map_phone = $_POST['map'];


$formHelpWanted = <<<EOT
  <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Help Wanted</span> <a id="calcelHelpWanted" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='calcelHelpWanted'><span class="text-muted"><small>Cancel</small><span></a></h5>
  <form id="formhelpWanted" class="form-horizontal" method="post" name="formhelpWanted" data-element="formhelpWanted" data-status="add" novalidate>

    <div class="form-group form-group-sm">
      <label for="jobTitle" class="col-sm-2 control-label">Title</label>
      <div class="col-sm-10">
        <input value="$job_title" type="text" maxlength="75" class="form-control input-sm" id="jobTitle" name="jobTitle" placeholder="Job Title" data-validateMethod="productName" data-label="jobTitle" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
      </div>
    </div>


    <div class="form-group form-group-sm">
      <label for="email" class="col-sm-2 control-label">email</label>
      <div class="col-sm-10">
        <input value="$email" type="text"  class="form-control input-sm" id="email" name="email" placeholder="Enter contact email" data-validateMethod="emailvalid" data-label="email" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
      </div>
    </div>

    <div class="form-group form-group-sm">
      <label for="phone" class="col-sm-2 control-label">Phone</label>
      <div class="col-sm-10">
        <input value="$phone" type="text"  class="form-control input-sm" id="phone" name="phone" placeholder="242-555-5555" data-validateMethod="phone" data-label="phone" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
      </div>
    </div>                       

    <div class="form-group form-group-sm">
      <label for="job_description" class="col-sm-2 control-label">Description</label>
      <div class="col-sm-10">
        <textarea id="job_description" name="job_description" class="form-control" rows="10" data-required="1" data-validateMethod="description" data-form="formhelpWanted" data-errorClass="text-danger" data-label="job_description">$job_description</textarea>
      </div>
    </div> 

    <div class="form-group form-group-sm">
      <label for="active" class="col-sm-2 control-label">Active</label>
      <div class="col-sm-10">
        <input value="Y" type="checkbox" class="" id="actice" name="active" data-validateMethod="" data-label="active" data-errorClass="text-danger" data-required="0" data-form="formhelpWanted" $active>
      </div>
    </div> 

    <div class="form-group form-group-sm">
      <div class="col-sm-offset-2 col-sm-10">
        <button id="btnHelpWanted" type="submit"  class="btn btn-primary btn-xs" data-element="btnSubMitHelpWanted" data-form="formhelpWanted" data-listid="$list_id" data-island_id="$island_ids" data-map="$map_phone " data-search_display="$search_display" data-hw_id="$id" data-email="$email" data-phone="$phone">Apply</button>
      </div>
    </div>
    <div id="formhelpWantedAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check your entries.</div>
  </form>
      
EOT;


  $formStatus = $_POST['formStatus']; 
  if($formStatus === 'edit'){
      $hw_id =  $_POST['hw_id']; 
  }

  $requiredArray = Array(
    'jobTitle' => 'productname',
    'job_description' => 'description',
    'phone' => 'phone',
  );

  $formElementArray = Array();


  array_walk($_POST, function($value, $idx)use (&$formElementArray, $requiredArray){
    $formElementArray[$idx] =  Array($value,$requiredArray[$idx] );
  });

  $formValid = true;
  $return_valid_array = array();
  $return_array = array(true);
  $phone_array = Array();



  array_walk($formElementArray, function($value, $idx) use (&$formElementArray, &$return_valid_array){
    $formElementArray[$idx][0] = trim(urldecode($formElementArray[$idx][0]));
    if($formElementArray[$idx][1]){
      $return_valid_array[$idx] = $value[1]($idx,$formElementArray);
    }
    else{
      $formElementArray[$idx][] = true;
    }
  });

  foreach($requiredArray as $key => $value){
    $formValid = $formValid  && $return_valid_array[$key];
  }


  $word_file_str =$formElementArray['jobTitle'][0] . '  ' .  $formElementArray['job_description'][0];
  $word_file_str = preg_replace("/\s+|[^a-zA-Z0-9]/", " " , $word_file_str);
  $word_file_str = strtolower($word_file_str);
  $word_array = explode(' ', $word_file_str);
  array_walk($word_array, function($value, $idx)use (&$word_array, $dbc){
    $word_array[$idx] = mysqli_real_escape_string($dbc,trim($value));
    if(strlen($value) < 2){
     unset($word_array[$idx]);
     prev($word_array);
    } 
  });
  $word_array = array_unique($word_array);
  $keyword_str = implode(' ',$word_array);

  $island_id = $formElementArray['island_id'][0];
  $search_display= mysqli_real_escape_string($dbc, $formElementArray['search_display'][0]);
  $phone_array = explode('-',$formElementArray['phone'][0]);

  if(strlen($formElementArray[ 'map' ][0]) > 0 ){
    $map_phone   = "'";
    $map_phone  .= "$island_id#";
    $map_phone  .= $phone_array[1] . '-' . $phone_array[2] . '#';
    $map_phone  .= mysqli_real_escape_string($dbc,$formElementArray[ 'map' ][0]) ;
    $map_phone  .= "'";
  }
  else{
    $map_phone =  "'". '' . "'";
  }


  $insert_helpwanted_array = [];
  $insert_helpwanted_array['list_id'] = "'" . $formElementArray['list_id'][0] . "'"; //list_id
  $insert_helpwanted_array['search_display'] = "'" . $search_display ."'"; //search_display
  $insert_helpwanted_array['jobTitle'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['jobTitle'][0]) ."'"; //job title
  $insert_helpwanted_array['email'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['email'][0]) ."'"; //email
  $insert_helpwanted_array['phone'] = "'" . $formElementArray['phone'][0]."'";  //phone
  $insert_helpwanted_array['job_description'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['job_description'][0]) ."'"; //job description
  $insert_helpwanted_array['island_id'] = "'" . '#'. $island_id. '#'  ."'"; //island_ids
  $insert_helpwanted_array['$map_phone'] = $map_phone; //map_phone
  $insert_helpwanted_array['$keyword_str'] = "'" .  $keyword_str ."'"; //keywords
  if(isset($formElementArray['active'][0]) && $formElementArray['active'][0] === 'Y'){
      $insert_helpwanted_array['active'] = "'" . 'Y' . "'";// `active`
  }
  else{
      $insert_helpwanted_array['active'] = "'" . 'N'. "'" ; // `active`
  }

  if($formValid){
    if($formStatus === 'add'){
      $return_array[0] = insert_help_wanted(array_values($insert_helpwanted_array));
    }

    if($formStatus === 'edit'){
        $insert_helpwanted_array['island_id'] = "'" . $formElementArray['island_id'][0] ."'"; //island_ids
        $insert_helpwanted_array['$map_phone'] = "'" . $formElementArray['map'][0] . "'"; //map_phone
        $insert_helpwanted_array['hw_id'] = "'" . $formElementArray['hw_id'][0] . "'";
        $return_array[0] = update_help_wanted(array_values($insert_helpwanted_array));
        if($insert_helpwanted_array['active'] === "'N'"){
          $return_array[0] = delete_help_wanted_company($insert_helpwanted_array['hw_id']); 
        }
    }//edit

  }//formvalid
            
  else{
    $return_array[0] = false;
  }
  $return_array[1] = $formHelpWanted;
  return json_encode($return_array);
}//function