var editProfileurl = '../../server/api/account.php';
var userInformationurl = '../../server/api/account.php';
var loginurl = '../../server/api/account.php';
var changepasswordurl = '../../server/api/account.php';
$(document).ready(function() {
    userInformation();
    editProfile();
    checkLogin();
    changepassword();
    var name;
    var family;
    var username;
    var bio;
    var linkedIn;
    var instagram;
    var telegram;
    var github;
    $("#save").click(function() {
        name = $("#name").val();
        family = $("#family").val();
        username = $("#username").val();
        bio = $("#bio").val();
        linkedIn = $("#linkedIn").val();
        instagram = $("#instagram").val();
        telegram = $("#telegram").val();
        github = $("#github").val();


    });
    $("#PassChange").click(function() {


    })

});

function userInformation() {
    var data = {
        CRUD: 'get'
    };
    var profileImage = btoa($("#profileImage").val());
    var result = send(editProfileurl, data);
    $("#imgPro").removeClass("d-none");
    $("#userAcc").removeClass("d-none");
    $("#userAcc").html(result.response.name);
    $("#imgPro").attr("src", "../../library/img/" + result.response.profileImage);
    var name2 = (result.response.name).split(' ');
    name = name2[0];
    family = name2[1];
    $("#name").val(name2[0]);
    $("#family").val(name2[1]);
    $("#bio").val(result.response.bio);
    $("#linkedIn").val(result.response.linkedIn);
    $("#instagram").val(result.response.instagram);
    $("#telegram").val(result.response.telegram);
    $("#github").val(result.response.github);

};

function editProfile() {
    var data = {
        CRUD: 'edit-profile'
    };
    var result = send(editProfileurl, data);
};

function changepassword() {
    var data = {
        CRUD: 'change-password'
    };
    var result = send(editProfileurl, data);
    // console.log(result);
};

function checkLogin() {
    var data = {
        CRUD: 'check'
    };
    var result = send(loginurl, data);
    $("#username").val(result.response.username);
};