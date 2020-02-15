<?php
require_once 'master.php';
switch ($_POST['CRUD']) {
    case 'list':
        $select = $operation->select(
            'users',
            array(
                'id',
                " CONCAT(name, ' ', family) AS name ",
                'profileImage',
                'username',
                'profileImage',
                'linkedin',
                'instagram',
                'telegram',
                'github'
            ),
            ' 1 '
        );
        Utils::result(
            $select == 'rowCountFalse',
            $select == 'rowCountFalse' ? array('message' => 'No user yet') : $select
        );
        break;
    default:
        Utils::result(true, array(
            'message' => 'Invalid CRUD'
        ));
        break;
}
