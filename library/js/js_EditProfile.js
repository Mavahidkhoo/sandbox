var editProfileurl = '../../server/api/account.php';
var userInformationurl = '../../server/api/account.php';
var loginurl = '../../server/api/account.php';
var changepasswordurl = '../../server/api/account.php';
var profileImage = '';
var name;
var family;
var username;
var bio;
var linkedIn;
var instagram;
var telegram;
var github;
var password;
var newPassword;
var password2;
$(document).ready(function() {
    userInformation();
    checkLogin();
    $("#save").click(function() {

        name = $("#name").val();
        family = $("#family").val();
        username = $("#username").val();
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
        var s = "پروفایل شما با موفقیت ویرایش شد."
        modalpage(s);
        setTimeout(function() {
            location.reload();
        }, 1000);


        // console.log(result)
    });
    $("#PassChange").click(function() {
        password = $("#oldPass").val();
        newPassword = $("#newPass").val();
        password2 = $("#confPass").val();

        var data = {
            CRUD: 'change-password',
            password: password,
            newPassword: newPassword,
            password2: password2

        };

        var result = send(changepasswordurl, data);
        //        console.log(result.response)
        if (result.response.message == 'Incorrect password') {
            alert("گذرواژه فعلی صحیح نیست.");
        }
        if (newPassword != password2) {
            alert("گذرواژه جدید با تایید گذرواژه مطابقت ندارد");
        }
        if (result.response.message == "Password must between 6 and 20 characters") {
            alert("گذرواژه باید بین 6 تا 20 حرف باشد.");

        }
        if (result.response.message == "Password changed successfully") {
            $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title"> تغییر گذرواژه</h4>
                </div>
                <div class="modal-body">
             <p id='p'>گذرواژه تغییر کرد.</p> 
             </div> 
             </div> 
             </div> 
             </div>`);
            setTimeout(function() { window.location.href = "http://localhost/sandbox/Pages/UserEditProfile/index.html"; }, 1000);

        }



    })
});

function userInformation() {
    var data = {
        CRUD: 'get'
    };
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

function modalpage(s) {
    $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">ساخت اکانت</h4>
            </div>
            <div class="modal-body">
         <p id='p'>${s}</p> 
         </div> 
         </div> 
         </div> 
         </div>`);

}