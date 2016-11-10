<?php
session_start();

function htmlFreeResumeForm(){
    
    $resume = '<div class="panel panel-default">
    <div class="panel-heading">

      <h2 class="panel-title"><img class="passport img-thumbnail" src="images/resume/img_thn_default.png"><span id="resume_name" class="resume_name text-center user-input placeholder" contenteditable data-placeholder="Enter your name here">Enter your name here</span></h2>
    </div>
    <div class="panel-body introduction">
      <dl class="dl-horizontal contact-info">
        <dt>Address:</dt>
        <dd id="resume_address" contenteditable class="user-input placeholder" data-placeholder="Enter your address">Enter your address</dd>
        <dt>Phone:</dt>
        <dd id="resume_phone" contenteditable class="user-input placeholder" data-placeholder="Enter your phone">Enter your phone</dd>
        <dt>email:</dt>
        <dd id="resume_email" contenteditable class="user-input placeholder" data-placeholder="Enter your email">Enter your email</dd>
      </dl>
      <blockquote contenteditable class="user-input placeholder about-you" data-placeholder="About You">About You</blockquote>    
    </div>
  </div>

  <div class="panel panel-default section">
    <div class="panel-heading">
      <h3 class="panel-title"><em class="text-warning">Education</em>
        <a id="removeEducation" href="#" class="pull-right btn btn-danger btn-xs plus-minus" data-element="btnRemoveEducation" data-div="education_details">
        <span class="glyphicon glyphicon-minus"></span>
        </a> 
        <a id="addEducation" href="#" class="pull-right btn btn-success btn-xs addToResume plus-minus" data-element="btnAddEducation" data-div="education_details">
        <span class="glyphicon glyphicon-plus"></span>
        </a> 
      </h3>
    </div>
    <div id="education_details" class="panel-body">      
    </div>
  </div>

  <div class="panel panel-default section">
    <div class="panel-heading">
      <h3 class="panel-title"><em class="text-warning">Work Experience</em>
        <a id="removeExperience" href="#" class="pull-right btn btn-danger btn-xs plus-minus" data-element="btnRemoveExperience" data-div="experience_details">
        <span class="glyphicon glyphicon-minus"></span>
        </a> 
        <a id="addExperience" href="#" class="pull-right btn btn-success btn-xs addToResume plus-minus" data-element="btnAddExperience" data-div="experience_details">
        <span class="glyphicon glyphicon-plus"></span>
        </a>
      </h3>
    </div>
    <div id="experience_details" class="panel-body">
    </div>
  </div>

  <div class="panel panel-default section">
    <div class="panel-heading">
      <h3 class="panel-title"><em class="text-warning">Skill Set</em>
        <a id="removeSkillSet" href="#" class="pull-right btn btn-danger btn-xs plus-minus" data-element="btnRemoveSkillSet" data-div="skillset_details">
        <span class="glyphicon glyphicon-minus"></span>
        </a> 
        <a id="addSkillSet" href="#" class="pull-right btn btn-success btn-xs addToResume plus-minus" data-element="btnAddSkillSet" data-div="skillset_details">
        <span class="glyphicon glyphicon-plus"></span>
        </a>
      </h3>
    </div>
    <div id="skillset_details" class="panel-body">
    </div>
  </div>';
    
  $formStatus = 'add';
  $photo = '';
  $resume_Active = '';

  extract(get_resume($_SESSION['memberId']));
  if(isset($resume_Active) && strlen($resume_Active) === 1){
    $formStatus = 'edit';
    if($resume_Active === 'Y'){
      $resume_Active = 'checked';
    }

  }

$formdataResume = <<<EOT
      <h5 class="well well-sm"><span class="text-primary">Free Member Resume</span> 
        <a id="doneResume" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="btndoneResume">
        <span class="text-muted"><small>Done</small></span>
        </a> 
      </h5>

      <form id="freeMemberResume" class="" enctype="multipart/form-data" method="post" name="freeMemberResume" data-element="freeMemberResume" data-status="$formStatus" novalidate>
 
        <div class="" id='divResumeHTML'>
          $resume
        </div>
        
        <div class="form-group form-group-sm">
          <label for="freeResumePhoto" class="control-label">Photo</label>
          <div class="">
            <input type="file" id="freeResumePhoto" name="freeResumePhoto" data-required="0" data-previous_photo ="$photo" data-element="btnSelectPhoto">
            <p class="help-block">Please select a photo image of type JPEG, PNG, or GIF, being 100kb or smaller</p>
          </div>
        </div>  

        <div class="form-group form-group-sm">
          <label for="resumeActive" class="control-label">Active</label>
          <div class="">
            <input value="Y" type="checkbox" id="resumeActive" name="resumeActive" data-validateMethod="" data-label="resumeActive" data-errorClass="text-danger" data-required="0" data-form="freeMemberResume"  $resume_Active>
          </div>
        </div>                 


        <div class="form-group form-group-sm">
          <div class="">
            <button id="btnFreeResume" type="submit" data-remove_photo ="$photo"  class="btn btn-primary btn-xs" data-element="btnFreeResume" data-form="freeMemberResume" >Save</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="btnResetResume" type="button"  class="btn btn-warning btn-xs" data-element="btnResetResume" data-form="freeMemberResume" >Cancel Changes</button>
          </div>
        </div>
        <div id="formResumeAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
      </form>
EOT;

   return $formdataResume;
}