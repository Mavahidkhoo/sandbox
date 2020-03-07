var editProfileurl = '../../server/api/account.php';
var userInformationurl = '../../server/api/account.php';
var loginurl = '../../server/api/account.php';
var changepasswordurl = '../../server/api/account.php';
var profileImage = '';
$(document).ready(function() {
    userInformation();
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
        //profileImage
        bio = $("#bio").val();
        linkedIn = $("#linkedIn").val();
        instagram = $("#instagram").val();
        telegram = $("#telegram").val();
        github = $("#github").val();
        var data = {
            CRUD: 'edit-profile',
            name: name,
            family: family,
            username: username,
            profileImage: profileImage,
            bio: bio,
            linkedin: linkedIn,
            instagram: instagram,
            telegram: telegram,
            github: github

        };
        // console.log(data);
        var result = send(editProfileurl, data);
        console.log(result)
    });
    $("#PassChange").click(function() {})
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
    $("#name").val(result.response.name);
    $("#family").val(result.response.family);
    $("#bio").val(result.response.bio);
    $("#linkedIn").val(result.response.linkedIn);
    $("#instagram").val(result.response.instagram);
    $("#telegram").val(result.response.telegram);
    $("#github").val(result.response.github);

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
    //console.log(result.response.username)
};


function encodeImagetoBase64(element) {

    var file = element.files[0];

    var reader = new FileReader();

    reader.onloadend = function() {
        profileImage = reader.result;
        //console.log(profileImage);
    }

    reader.readAsDataURL(file);

}