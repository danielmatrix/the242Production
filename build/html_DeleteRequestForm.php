<?php
session_start();

function htmlDeleteRequestForm(){
  $member_id = $_SESSION['memberId'];
  $listId = $_POST['list_id']; 

$formDeleteRequest = <<<EOT
  <div id=divDeleteRequest>
    <h5 class="well well-sm"><span class="text-primary">Request Listing Deletion</span> 
        <a href="#" class="pull-right btn btn-default btn-xs btn-cancel doneDeleteRequest" data-element="doneDeleteRequest">
        <span class="text-muted"><small>Done</small></span>
        </a> 
    </h5>
  <form id="formDeleteRequest" class="" method="post" name="formDeleteRequest" data-element="formDeleteRequest" data-status="add" novalidate>

   <p class="">Please select all that apply.</p>
    
    <div class="checkbox">
      <label>
        <input type="checkbox" id="deceased" name="deceased" data-validateMethod="" data-label="deceased" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Person Deceased
      </label>
    </div> 

    <div class="checkbox">
      <label>
        <input type="checkbox" id="offensive" name="offensive" data-validateMethod="" data-label="offensive" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Offensive Material
      </label>
    </div> 

    <div class="checkbox">
      <label>
        <input type="checkbox" id="replaced" name="replaced" data-validateMethod="" data-label="replaced" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Replaced by new Listing
      </label>
    </div> 

    <div class="checkbox">
      <label>
        <input type="checkbox" id="duplicate" name="duplicate" data-validateMethod="" data-label="duplicate" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Listing is a Duplicate
      </label>
    </div> 

    <div class="checkbox">
      <label>
        <input type="checkbox" id="outofbusiness" name="outofbusiness" data-validateMethod="" data-label="outofbusiness" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Out of Business
      </label>
    </div> 

    <div class="checkbox">
      <label>
        <input type="checkbox" id="changed" name="changed" data-validateMethod="" data-label="changed" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Information about Listing has changed
      </label>
    </div> 
      
    <div class="checkbox">
      <label>
        <input type="checkbox" id="other" name="other" data-validateMethod="" data-label="other" data-errorClass="text-danger" data-required="0" data-form="formDeleteRequest">Other
      </label>
    </div> 

    <div class="form-group form-group-sm">
      <label for="explanation">Explanation</label>
      <textarea id="explanation" name="explanation" class="form-control" rows="10" data-required="0" data-validateMethod="" data-form="formDeleteRequest" data-errorClass="text-danger" data-label="formDeleteRequest"></textarea>
    </div>     

    <div class="form-group form-group-sm">
      <button id="btnDeleteRequest" type="button"  class="btn btn-primary btn-xs" data-element="btnSubmitDeleteRequest" data-form="formDeleteRequest" data-listID="$listId">Apply</button>
    </div>
    <div id="deleteRequestAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
  </form>
  </div>
EOT;

   return $formDeleteRequest;
}