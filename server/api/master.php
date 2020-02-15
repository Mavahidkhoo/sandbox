<?php
session_start();
require_once '../config/database.php';
require_once '../class/operations.class.php';
require_once '../class/utils.class.php';
if (!isset($_POST['CRUD'])) {
    Utils::result(true, array(
        'message' => 'Missing post parameters'
    ));
}
$operation = new Operations($databseConfig['server'], $databseConfig['database'], $databseConfig['username'], $databseConfig['password']);

function formatDate($date)
{
    return substr($date, 0, 4) . '/' . substr($date, 4, 2) . '/' . substr($date, 6, 2);
}
