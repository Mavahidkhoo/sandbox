<?php
require_once 'master.php';
function validation()
{
    # Check POST parameters
    if (!isset($_POST['title']) || !isset($_POST['body']) || ($_POST['CRUD'] === 'update' && !isset($_POST['postId']))) {
        Utils::result(true, array(
            'message' => 'Missing post parameters'
        ));
    }

    # Using mb_strlen() instead of strlen()
    # HINT: Compare strlen('سلام') and mb_strlen('سلام')
    if (mb_strlen($_POST['title']) < 3 || mb_strlen($_POST['title']) > 150) {
        Utils::result(true, array(
            'message' => 'Post title must between 3 and 150 characters'
        ));
    }

    if (trim($_POST['body']) == '') {
        Utils::result(true, array(
            'message' => 'Post body can not be empty'
        ));
    }
}

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
    case 'create':
        /*
            @desc   This CRUD use for create new post for current user
            @method POST
            @params title   (The title of post. must between 3 and 150 characters)
                    body    (The post content, can't be empty)
        */

        authenticate();

        # Check POST parameters and validate them
        validation();

        $insert = $operation->insert(
            'posts',
            array(
                'userId' => $_SESSION['userId'],
                'title' => $_POST['title'],
                'body' => $_POST['body'],
                'date' => $currentDate // current date in shamsi format
            )
        );
        # Check to see inserted or not
        if (is_array($insert) && $insert[0] == 'true') {
            Utils::result(false, array(
                'message' => 'Post created successfully',
                'postId' => $insert[1]
            ));
        }
        Utils::result(true, array(
            'message' => 'Server error'
        ));
        break;
    case 'update':
        /*
            @desc   This CRUD use for update the post that specified by postId, if belong to current user
            @method POST
            @params postId
                    title   (The title of post. must between 3 and 150 characters)
                    body    (The post content, can't be empty)
        */

        authenticate();

        # Check POST parameters and validate them
        validation();

        # Check if this post belong to current user or not, and if this post even exists or not
        $select = $operation->select('posts', array('userId'), ' id = ' . $_POST['postId'] . ' AND userId = ' . $_SESSION['userId']);
        if ($select == 'rowCountFalse') {
            Utils::result(true, array(
                'message' => 'Post not found or permission error'
            ));
        }

        $update = $operation->update(
            'posts',
            array(
                'title' => $_POST['title'],
                'body' => $_POST['body'],
                'edited' => TRUE,
                'id' => $_POST['postId']
            )
        );

        if ($update === 'true') {
            Utils::result(false, array(
                'message' => 'Post updated successfully'
            ));
        }
        Utils::result(true, array(
            'message' => 'Server error'
        ));
        break;
    default:
        Utils::result(true, array(
            'message' => 'Invalid CRUD'
        ));
        break;
}
