<?php
require_once 'master.php';
switch ($_POST['CRUD']) {
    case 'check':
        /*
            @desc   This CRUD use check if user signed in or not
            @method POST
        */
        authenticate();
        Utils::result(false, array(
            'userId' => $_SESSION['userId'],
            'username' => $_SESSION['username'],
            'displayName' => $_SESSION['name'],
        ));
        break;
    case 'sign-up';
        /*
            @desc   This CRUD use for create new account in system
            @method POST
            @params name        (first name of new user)
                    family      (last name of new user)
                    username    (username of new user between 4 and 40 characters)
                    password    (password of new user between 6 and 20 characters)
                    password2   (confirm of password that should match password)
        */
        # Check POST parameters
        if (
            !isset($_POST['name']) || !isset($_POST['family'])  || !isset($_POST['username'])  || !isset($_POST['password']) || !isset($_POST['password2'])
        ) {
            Utils::result(true, array(
                'message' => 'Missing post parameters'
            ));
        }

        # Check username length (must between 4 and 40 chars)
        if (strlen($_POST['username']) < 4 || strlen($_POST['username']) > 40) {
            Utils::result(true, array(
                'message' => 'Username must between 4 and 40 characters'
            ));
        }

        # Check username in database (should be unique)
        $usernameCheck = $operation->select('users', array('id'), " username = '" . $_POST['username'] . "'");
        if ($usernameCheck != 'rowCountFalse') {
            Utils::result(true, array(
                'message' => 'Username exists'
            ));
        }

        # Check password length (must between 6 and 20 chars)
        if (strlen($_POST['password']) < 6 || strlen($_POST['password']) > 20) {
            Utils::result(true, array(
                'message' => 'Password must between 6 and 20 characters'
            ));
        }

        # Check password and confirm password (must match)
        if ($_POST['password'] !== $_POST['password2']) {
            Utils::result(true, array(
                'message' => 'Password and confirm password not match'
            ));
        }

        # Hash password
        $_POST['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $insert = $operation->insert(
            'users',
            array(
                'name' => $_POST['name'],
                'family' => $_POST['family'],
                'username' => $_POST['username'],
                'password' => $_POST['password']
            )
        );
        # Check to see inserted or not
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
        /*
            @desc   This CRUD use to sign in user
            @method POST
            @params username
                    password
        */
        # Check POST parameters
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
                # Store account information into session for future uses
                session_regenerate_id();
                $_SESSION['signedIn'] = true;
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
    case 'sign-out':
        /*
            @desc   This CRUD use to sign out user
            @method POST
            @params destination [optional] (if set, after signing out redirect to this address)
        */
        # Destroy session if exists
        if (isset($_SESSION['signedIn'])) {
            session_destroy();
        }
        if (isset($_POST['destination']) && trim($_POST['destination']) != '') {
            header('Location: ' . $_POST['destination']);
        }
        Utils::result(false, array(
            'message' => 'Signed out successfully'
        ));
        break;
    case 'get':
        /*
            @desc   This CRUD use to get the current user full information 
            @method POST
        */

        authenticate();

        $select = $operation->select(
            'users',
            array(
                " CONCAT(name, ' ', family) AS name",
                'profileImage',
                'bio',
                'linkedIn',
                'instagram',
                'telegram',
                'github'
            ),
            ' id = ' . $_SESSION['userId']
        );
        if ($select != 'rowCountFalse') {
            Utils::result(false, $select[0]);
        }
        Utils::result(true, array(
            'message' => 'Server error'
        ));
        break;
    case 'edit-profile':
        /*
            @desc   This CRUD use for edit information of current user
            @method POST
            @params name
                    family
                    username
                    profileImage [base46 image]
                    bio 
                    linkedin
                    instageam
                    telegram
                    github
        */

        authenticate();

        # Check POST parameters
        if (
            !isset($_POST['name']) || !isset($_POST['family'])  || !isset($_POST['username'])  || !isset($_POST['profileImage']) || !isset($_POST['bio']) || !isset($_POST['linkedin']) || !isset($_POST['instagram']) || !isset($_POST['telegram']) || !isset($_POST['github'])
        ) {
            Utils::result(true, array(
                'message' => 'Missing post parameters'
            ));
        }

        # Check emptiness of name, family and username 
        if (trim($_POST['name']) == '') {
            Utils::result(true, array(
                'message' => 'Name can not be empty'
            ));
        }
        if (trim($_POST['family']) == '') {
            Utils::result(true, array(
                'message' => 'Family can not be empty'
            ));
        }
        if (trim($_POST['username']) == '') {
            Utils::result(true, array(
                'message' => 'Username can not be empty'
            ));
        }

        # Check username length (must between 4 and 40 characters)
        if (strlen($_POST['username']) < 4 || strlen($_POST['username']) > 40) {
            Utils::result(true, array(
                'message' => 'Username must between 4 and 40 characters'
            ));
        }

        $select = $operation->select('users', '*', ' id = ' . $_SESSION['userId']);
        if ($select != 'rowCountFalse') {
            # Check username in database (should be unique)
            $usernameCheck = $operation->select(
                'users',
                array('id'),
                " username = '" . $_POST['username'] . "' AND id != " . $_SESSION['userId']
            );
            if ($usernameCheck != 'rowCountFalse') {
                Utils::result(true, array(
                    'message' => 'Username exists'
                ));
            }

            # Check profileImage (if empty: set the default profile, if ___NO_CHANGE___: set the old profile)
            if (trim($_POST['profileImage']) != '') {
                if ($_POST['profileImage'] == '___NO_CHANGE___') {
                    $_POST['profileImage'] = $select['profileImage'];
                } else {
                    $_POST['profileImage'] = Utils::uploadImage($_POST['profileImage']);
                    if (!$_POST['profileImage']) {
                        Utils::result(true, array(
                            'message' => 'Error uploading profile image'
                        ));
                    }
                }
            } else {
                $_POST['profileImage'] = 'skeleton.png';
            }

            $update = $operation->update(
                'users',
                array(
                    'name' => $_POST['name'],
                    'family' => $_POST['family'],
                    'username' => $_POST['username'],
                    'profileImage' => $_POST['profileImage'],
                    'bio' => $_POST['bio'],
                    'linkedin' => $_POST['linkedin'],
                    'instagram' => $_POST['instagram'],
                    'telegram' => $_POST['telegram'],
                    'github' => $_POST['github'],
                    'id' => $_SESSION['userId']
                )
            );

            # If update successful, update $_SESSION values that may be changed
            if ($update === 'true') {
                $_SESSION['username'] = $_POST['username'];
                $_SESSION['name'] = $_POST['name'] . ' ' . $_POST['family'];
                Utils::result(false, array(
                    'message' => 'Profile edited successfully'
                ));
            }
        }
        Utils::result(true, array(
            'message' => 'Server error'
        ));
        break;
    case 'change-password':
        /*
            @desc   This CRUD use for change password of current user
            @method POST
            @params password (the old password)
                    newPassword
                    password2
        */

        authenticate();

        if (!isset($_POST['password']) || !isset($_POST['newPassword'])  || !isset($_POST['password2'])) {
            Utils::result(true, array(
                'message' => 'Missing post parameters'
            ));
        }

        $select = $operation->select('users', array('password'), ' id = ' . $_SESSION['userId']);
        if ($select != 'rowCountFalse') {

            if (password_verify($_POST['password'], $select[0]['password'])) {
                if (strlen($_POST['newPassword']) < 6 || strlen($_POST['newPassword']) > 20) {
                    Utils::result(true, array(
                        'message' => 'Password must between 6 and 20 characters'
                    ));
                }

                if ($_POST['newPassword'] !== $_POST['password2']) {
                    Utils::result(true, array(
                        'message' => 'Password and confirm password not match'
                    ));
                }
                # Hash new password
                $_POST['newPassword'] = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);
                $update = $operation->update(
                    'users',
                    array(
                        'password' => $_POST['newPassword'],
                        'id' => $_SESSION['userId']
                    )
                );
                if ($update === 'true') {
                    Utils::result(false, array(
                        'message' => 'Password changed successfully'
                    ));
                }
            } else {
                Utils::result(true, array(
                    'message' => 'Incorrect password'
                ));
            }
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
