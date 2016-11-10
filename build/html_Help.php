<?PHP
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
mysqli_select_db ($dbc, "the242");

$sql_select_d = @mysqli_query($dbc,"CALL get_help()");
// ordinal, video, video_link, short_description, audience, subject, text
//htmlentities($address)
$html_out = '';
$html_out .= '<ul id="ul_help" class="list-group">';
while($row_listings = mysqli_fetch_array($sql_select_d)){
    extract($row_listings);
    $html_out .= '<li class="list-group-item list-group">';
    $html_out .= "<div id='div$ordinal' class='panel panel-default'>";
    $html_out .= '<div class="panel-heading">';
    $html_out .= "<h5 class='panel-title'><a href='#' data-div_id='div$ordinal' data-element='aToggleHelp'>".$audience ." : ". $subject . ' - '. htmlentities($short_description) ."</a> <a href='#'' class='pull-right btn btn-default btn-xs btn-cancel' data-element='doneHelp' data-div_id='div$ordinal'><span class='text-muted'><small>Done</small><span></a></h5>";
    $html_out .= '</div>';
    $html_out .= '<div class="panel-body help-text help-info">';
    $html_out .= '<p>'. htmlentities($text) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-footer help-video help-info">';
    if($video === 'Y'){
      $html_out .= '<video controls style="width:600px" poster="videos/poster242.png" class="center-block" preload="none">';
      $html_out .= "<source src='$video_link'" . "type='video/mp4;codecs=\"avc1.42E01E, mp4a.40.2\"'" . '/>';
      $html_out .= '</video>';
      $html_out .= '</div>';
    }
    else{
      $html_out .= '</div>';
    }
    $html_out .= '</div>';
    $html_out .= '</li>';
}
$html_out .= '</ul>';
echo $html_out;

               
      
    
  

