<?php
session_start();

function htmlKeywordsForm($search_display){
  $search_display = "'" . $search_display ."'";
  extract(edit_business_keywords($search_display));

  //id, keywords, description
  $keyword_array = explode(' ', $keywords);
  sort($keyword_array);
  $keyword_str = implode(' ', $keyword_array);
  


  


$formBanner = <<<EOT
  <h5 class="well well-sm"><span class="text-primary">Ad Line &amp; Keywords</span> <a id="calcelKeywords" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element="calcelKeywords"><span class="text-muted"><small>Cancel</small><span></a></h5>
  <form id="formKeywords" class=""  method="post" name="formKeywords" data-element="formKeywords" data-status="edit" novalidate>

    <div class="form-group form-group-sm">
      <label for="description">Ad Line</label><br/>
      <input value="$description" id="description" type="text" maxlength="140" class="form-control" name="description"  value="" placeholder="" data-required="1" data-validateMethod="description"  data-label="description" data-errorClass="text-danger" data-form="formKeywords">
    </div> 

    <div class="form-group form-group-sm">
      <label for="keywords">Keywords</label>
        <textarea id="keywords" name="keywords" class="form-control" rows="3" data-required="1" data-validateMethod="keywords_PB" data-form="formKeywords">$keyword_str</textarea>
    </div> 

    <button id="apply" type="submit" class="btn btn-default btn-primary btn-xs" data-kw_id="$id" data-element='editKeywordsApply' data-form="formKeywords">Apply</button>
    <div id="formKeywordsAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>       

  </form>
EOT;

   return $formBanner;
}
