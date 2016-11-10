<?PHP
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
mysqli_select_db ($dbc, "the242");

$sql_select_d = @mysqli_query($dbc,"CALL get_seasons_list()");
while($row_listings = mysqli_fetch_array($sql_select_d)){
    extract($row_listings);
    $html_out .= "<div class='media'>";
    $html_out .= "<div class='media-left media-top'>";
    $html_out .= "<a href='#'>";
    $html_out .= '<img class="media-object" src="' . $thumbnail . '" alt="">';
    $html_out .= "</a>";
    $html_out .= "</div>";
    $html_out .= "<div class='media-body'>";
    $html_out .= "<h4 class='media-heading'>$season</h4>";
    $html_out .= "<ul>";
    $html_out .= "<li><span class='text-warning'>Open Date&nbsp;:</span>&nbsp;&nbsp;$open</li>";
    $html_out .= "<li><span class='text-success'>Start Date&nbsp;&nbsp;:</span>&nbsp;&nbsp;$start</li>";
    $html_out .= "<li><span class='text-danger'>End Date&nbsp;&nbsp;&nbsp;:</span>&nbsp;&nbsp;$end</li>";
    $html_out .= "</ul>";
    $html_out .= "</div>";
    $html_out .= "</div>";
}
echo $html_out;