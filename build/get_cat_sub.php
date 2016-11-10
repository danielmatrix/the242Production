<?php

function get_cat_sub($listing_id){
    
    $cat_unique_array = Array();
    //$cat_sub_array = Array();

    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    
    $select_wl_d = @mysqli_query($dbc,"CALL get_category_subcategory('$listing_id')");
    $row_wl = mysqli_fetch_all($select_wl_d);
    
    array_walk($row_wl, function($value, $idx)use (&$cat_unique_array){
        $cat_unique_array[$value[0]]=  Array();
    });
    
    array_walk($row_wl, function($value, $idx)use (&$cat_unique_array){
        $cat_unique_array[$value[0]][$value[1]] =  '';
    });  

    array_walk($row_wl, function($value, $idx)use (&$cat_unique_array){
        $cat_unique_array[$value[0]][$value[1]] = $cat_unique_array[$value[0]][$value[1]] . $value[2] . ' ';
    });    
        

$html = '';
$html .= '<div class="panel-group" id="accordion_cat" role="tablist" aria-multiselectable="true">';    
    $cat_cnt = 0;
    foreach ($cat_unique_array as $key => $value){
    $sub_cat_bullet = count($value);
    $html .= '<div class="panel panel-default">';
    $html .= "<div class='panel-heading category' role='tab' id='heading$cat_cnt'>";
    $html .= '<h4 class="panel-title">';
    $html .= "<a role='button' data-toggle='collapse' data-parent='#accordion_cat' href='#collapsecat$cat_cnt' aria-expanded='true' aria-controls='collapse$cat_cnt'>";
    $html .= htmlentities($key)  . "<span class='badge pull-right category-cnt'>$sub_cat_bullet</span>";
    $html .= '</a>';
    $html .= '</h4>';
    $html .= '</div>';
    $html .= "<div id='collapsecat$cat_cnt' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading$cat_cnt'>";
    $html .= "<div class='panel-group' id='accordion_sub$cat_cnt' role='tablist' aria-multiselectable='true'>";
        $sub_cnt = 0;
         foreach($value as $subkey => $subvalue){
            $product_ids = str_replace(' ',',',trim($subvalue)) ;
            $product_cnt = count(explode(',',$product_ids));
            $html .= '<div class="panel panel-default">';
            $html .= "<div class='panel-heading subcategory' role='tab' id='heading$sub_cnt'>";
            $html .= '<h4 class="panel-title">';
            $html .= "<a data-element='aShowProducts' role='button' data-toggle='collapse' data-parent='#accordion_sub$cat_cnt' href='#collapsesub$cat_cnt$sub_cnt' aria-expanded='true' aria-controls='collapse$sub_cnt'>";
            $html .= htmlentities($subkey) . "<span class='badge pull-right product-cnt'>$product_cnt</span>";
            $html .= '</a>';
            $html .= '</h4>';
            $html .= '</div>';
            $html .= "<div id='collapsesub$cat_cnt$sub_cnt' product_ids='$product_ids' data-div_display_id='div$cat_cnt$sub_cnt' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading$sub_cnt'>" ;
            $html .= "<div class='panel-body display-products' id='div$cat_cnt$sub_cnt'>" ;
            $html .= '<p>Loading...</p>' ;
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
            $sub_cnt = $sub_cnt + 1;
        }
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
        $cat_cnt = $cat_cnt + 1;
    }
  $html .= '</div>';  
  return $html;
}  