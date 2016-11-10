<?php
session_start();

function htmlMemberForm($dbc, $edit){
  $firstName = '';
  $middleName = '';
  $lastName = '';
  $memberEmail = '';
  $town = '';
  $island = '';
  $phone = '';
  $birthday = '';
  $sex = '';
  $password1 = '';
  $password2 = '';
  $agree = '';
  $male = '';
  $female = '';
  $formStatus = 'add';

  if($edit){
    $member_id = $_SESSION['memberId'];
    $formStatus = 'edit';
    extract(edit_member($dbc, $member_id));
    $male = ($sex === 'M') ? "checked" : '';
    $female = ($sex === 'F') ? "checked" : '';
  }


$formdataMember = <<<EOT
    <h5 class="well well-sm"><span class="text-primary">New Member Sign Up</span> <a id="calcelNewMember" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelNewMember'><span class="text-muted"><small>Cancel</small><span></a></h5>
    <form name="newmember" id="newmember" action="" data-element="newMember" data-status="$formStatus"novalidate>

      <div class="form-group form-group-sm">
        <label for="firstName">First Name</label>
        <input value="$firstName" class="form-control" type="text" id="firstName" name="firstName" placeholder="First name" data-validateMethod="firstname" data-label="firstName" data-errorClass="text-danger" data-required="1" data-form="newmember">
      </div>

      <div class="form-group form-group-sm">
        <label for="middleName">Middle Name</label>
        <input value = "$middleName" class="form-control" type="text" id="middleName" name="middleName" placeholder="Middle name" data-validateMethod="middlename"  data-label="middleName" data-errorClass="text-danger" data-required="0" data-form="newmember">
      </div>

      <div class="form-group form-group-sm">
        <label for="lastName">Last Name</label>
        <input value="$lastName" class="form-control" type="text" id="lastName" name="lastName" placeholder="Last name" data-validateMethod="lastname"  data-label="lastName" data-errorClass="text-danger" data-required="1" data-form="newmember">
      </div>      

      <div class="form-group form-group-sm">
        <label for="memberEmail">Email address</label>
        <input value="$memberEmail" type="email" class="form-control" id="memberEmail" name="memberEmail" placeholder="Enter your email" data-validateMethod="emailunique"  data-label="memberEmail" data-errorClass="text-danger" data-required="1"  data-form="newmember">
      <p class="help-block"><span class="text-warning">An email will be sent to this address. Please check your email to confirm email address. Note: email may be placed in the Junk Folder.</span></p>
      </div>

      <div class="form-group form-group-sm">
        <label for="town">City or Town</label>
        <input value="$town" type="text" class="form-control" id="town" name="town" placeholder="Town" data-validateMethod="town"  data-label="town" data-errorClass="text-danger" data-required="1"  data-form="newmember">
        <p class="help-block">Town or city where you reside.</p>
      </div> 

      <div class="form-group form-group-sm">
        <label for="island">Island</label>
        <input value="$island" type="text" class="form-control" id="island" name="island" placeholder="Island" data-validateMethod="island"  data-label="island" data-errorClass="text-danger" data-required="1" data-form="newmember">
        <p class="help-block">Island where you reside.</p>
      </div>            
      
      <div class="form-group form-group-sm">
        <label for="phone">Phone</label><br/>
        <input value="$phone" id="phone" type="text" class="form-control" name="phone" value="" placeholder="242-555-5555" data-validateMethod="phone"  data-label="phone" data-errorClass="text-danger" data-required="1"  data-form="newmember">
      </div>

      <div class="form-group form-group-sm">
        <label for="birthday">Birthday</label><br/>
        <input value="$birthday" id="birthday" type="text" class="form-control" name="birthday"  value="" placeholder="mm/dd/yyyy" data-required="1" data-validateMethod="birthday"  data-label="birthday" data-errorClass="text-danger" data-form="newmember">
      </div> 

      <div class="form-group form-group-sm">
        <label for="sex">Sex</label><br/>
        <div class="radio">
          <label>
            <input $female type="radio" name="sex" id="female" value="female" data-validateMethod="radiomutex"  data-label="sex" data-errorClass="text-danger" data-required="1" data-form="newmember" data-group="sex">
            Female
          </label>
        </div>
        <div class="radio">
          <label>
            <input $male type="radio" name="sex" id="male" value="male" data-validateMethod="radiomutex"  data-label="sex" data-errorClass="text-danger" data-required="1" data-form="newmember" data-group="sex">
            Male
          </label>
        </div>                  
      </div>

      <div class="form-group form-group-sm">
        <label for="password1">Create Password</label>
        <input type="password" class="form-control" id="password1" name="password1" placeholder="Password" data-validateMethod="passwordconfirm"  data-label="password1" data-errorClass="text-danger" data-required="1" data-form="newmember">
      </div>

      <div class="form-group form-group-sm">
        <label for="password2">Confirm Password</label>
        <input type="password" class="form-control" id="password2" name="password2" placeholder="Comfirm Password" data-validateMethod="passwordconfirm"  data-label="password2" data-errorClass="text-danger" data-required="1" data-form="newmember">
      </div>

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <small>Read Terms of Use Agreement</small>
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        <p class="text-warning">
        <small>These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full.   
        If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website. 
        You must be at least [18] years of age to use this website.  By using this website and by agreeing to these terms and conditions
        you warrant and represent that you are at least [18] years of age.You must not use this website in any way that causes, or 
        may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is 
        unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
        By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.  
        If you do not think they are reasonable, you must not use this website.</small></p>
      </div>
    </div>
  </div>
</div>
      
      <div class="checkbox">
        <label for="agree">
          <input type="checkbox" value="yes" id="agree" name="agree" data-validateMethod="checkedconfirm"  data-label="agree" data-errorClass="text-danger" data-required="1" data-form="newmember">
          <b><small>I have read and agree with all terms of use.</small></b>
        </label>
      </div>
      <button id="apply" type="submit" class="btn btn-default btn-primary btn-xs" data-oldEmail="$memberEmail" data-form="newmember" data-element='newMemberApply'>Apply</button>
      <div id="formNewMemberAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
    </form>  
EOT;

   return $formdataMember;
}
