<?php
require_once 'master.php';
switch ($_POST['CRUD']) {
    case 'list';
        /*
            @desc   This CRUD use for get all posts from all users
            @method POST
        */
        $select = $operation->select(
            'posts JOIN users ON users.id = posts.userId',
            array(
                'posts.id',
                'posts.userId',
                'posts.title',
                'posts.body',
                'posts.date',
                " CONCAT(users.name, ' ', family) AS displayName ",
                'username',
                'profileImage'
            ),
            ' 1 '
        );
        if ($select != 'rowCountFalse') {
            foreach ($select as $key => $value) {
                $select[$key]['date'] = formatDate($value['date']);
                # Check if there is any signed in user and that user owns this post
                $select[$key]['postOwner'] = isset($_SESSION['signedIn']) && $_SESSION['signedIn'] && isset($_SESSION['userId']) && $_SESSION['userId'] == $value['userId'];
            }
        }
        Utils::result(
            $select == 'rowCountFalse',
            $select == 'rowCountFalse' ? array('message' => 'No post yet') : $select
        );
        break;
    default:
        Utils::result(true, array(
            'message' => 'Invalid CRUD'
        ));
        break;
}
