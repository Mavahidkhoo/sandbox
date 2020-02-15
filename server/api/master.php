<?php
session_start();
require_once '../config/database.php';
require_once '../class/operations.class.php';
require_once '../class/utils.class.php';

$operation = new Operations($databseConfig['server'], $databseConfig['database'], $databseConfig['username'], $databseConfig['password']);
