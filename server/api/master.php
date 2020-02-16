<?php
session_start();
require_once '../config/database.php';
require_once '../class/operations.class.php';
require_once '../class/utils.class.php';
require_once '../class/jdf.php';
if (!isset($_POST['CRUD'])) {
    Utils::result(true, array(
        'message' => 'Missing post parameters'
    ));
}
$operation = new Operations($databseConfig['server'], $databseConfig['database'], $databseConfig['username'], $databseConfig['password']);
$currentDate = jdate('o', '', '', '', 'en') . jdate('m', '', '', '', 'en') . jdate('d', '', '', '', 'en');;

/* 
    @desc This function check if user signed in or not, if not return 'Unauthorized' and exit();
*/
function authenticate()
{
    if (!isset($_SESSION['signedIn']) || !isset($_SESSION['userId']) || !$_SESSION['signedIn']) {
        Utils::result(true, array(
            'message' => 'Unauthorized'
        ));
    }
}
function formatDate($date)
{
    return substr($date, 0, 4) . '/' . substr($date, 4, 2) . '/' . substr($date, 6, 2);
}
