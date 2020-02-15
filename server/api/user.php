<?php
require_once 'master.php';
switch ($_POST['CRUD']) {
    case 'list':
        /*
            @desc   This CRUD represent a list of users
            @method POST
            @params searchColumn [optional] (allowed values: multi-column [search in name, family, username and bio], name, username)
                    searchStrin [optional] (at least 3 characters)
        */
        # Check search params are set or not
        $search = ' 1 ';
        if (isset($_POST['searchColumn']) && trim($_POST['searchColumn']) != '' && isset($_POST['searchString']) && trim($_POST['searchString'])) {
            # Check searchString length
            if (strlen($_POST['searchString']) < 3) {
                Utils::result(true, array(
                    'message' => 'Search string must be at least 3 characters'
                ));
            }
            # Create where syntax for select
            switch ($_POST['searchColumn']) {
                case 'multi-column':
                    $search = " CONCAT(name, ' ', family, ' ', username, ' ', bio) LIKE '%" . $_POST['searchString'] . "%' ";
                    break;
                case 'name':
                    $search = " CONCAT(name, ' ', family) LIKE '%" . $_POST['searchString'] . "%' ";
                    break;
                case 'username':
                    $search = " username LIKE '%" . $_POST['searchString'] . "%' ";
                    break;
                default:
                    Utils::result(true, array(
                        'message' => 'Invalid search parameter'
                    ));
                    break;
            }
        }
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
            $search
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
