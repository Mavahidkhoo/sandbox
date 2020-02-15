<?php
require_once 'master.php';
switch ($_POST['CRUD']) {
    case 'sign-up';
        if (
            !isset($_POST['name']) || !isset($_POST['family'])  || !isset($_POST['username'])  ||
            !isset($_POST['password']) || !isset($_POST['password2'])  || !isset($_POST['profileImage'])  ||
            !isset($_POST['bio'])  || !isset($_POST['linkedin'])  || !isset($_POST['instagram'])  ||
            !isset($_POST['telegram'])  || !isset($_POST['github'])
        ) {
            Utils::result(true, array(
                'message' => 'Missing post parameters'
            ));
        }
        $usernameCheck = $operation->select('users', array('id'), " username = '" . $_POST['username'] . "'");
        if ($usernameCheck != 'rowCountFalse') {
            Utils::result(true, array(
                'message' => 'Username exists'
            ));
        }

        if (strlen($_POST['password']) < 6 || strlen($_POST['password']) > 20) {
            Utils::result(true, array(
                'message' => 'Password must between 6 and 20 characters'
            ));
        }

        if ($_POST['password'] !== $_POST['password2']) {
            Utils::result(true, array(
                'message' => 'Password and confirm password not match'
            ));
        }
        $_POST['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);

        if (trim($_POST['profileImage']) != '') {
            $_POST['profileImage'] = Utils::uploadImage($_POST['profileImage']);
            if (!$_POST['profileImage']) {
                Utils::result(true, array(
                    'message' => 'Error uploading profile image'
                ));
            }
        }

        $insert = $operation->insert(
            'users',
            array(
                'name' => $_POST['name'],
                'family' => $_POST['family'],
                'username' => $_POST['username'],
                'password' => $_POST['password'],
                'profileImage' => $_POST['profileImage'],
                'bio' => $_POST['bio'],
                'linkedin' => $_POST['linkedin'],
                'instagram' => $_POST['instagram'],
                'telegram' => $_POST['telegram'],
                'github' => $_POST['github']
            )
        );
        if (is_array($insert) && $insert[0] == 'true') {
            Utils::result(false, array(
                'message' => 'User created successfully',
                'userId' => $insert[1]
            ));
        }
        Utils::result(true, array(
            'message' => 'Server error'
        ));
        break;
    case 'sign-in':
        if (!isset($_POST['username']) || !isset($_POST['password'])) {
            Utils::result(true, array(
                'message' => 'Missing post parameters'
            ));
        }

        $select = $operation->select(
            'users',
            array(
                'id',
                " CONCAT(name, ' ', family) AS name ",
                'password'
            ),
            " username = '" . $_POST['username'] . "'"
        );
        if ($select != 'rowCountFalse') {
            $select = $select[0];
            if (password_verify($_POST['password'], $select['password'])) {
                session_regenerate_id();
                $_SESSION['signed-in'] = true;
                $_SESSION['userId'] = $select['id'];
                $_SESSION['username'] = $_POST['username'];
                $_SESSION['name'] = $select['name'];

                Utils::result(false, array(
                    'message' => 'Signed in successfully',
                ));
            }
        }
        Utils::result(true, array(
            'message' => 'Incorrect username or password'
        ));
        break;
}
