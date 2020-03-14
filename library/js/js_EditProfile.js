var editProfileurl = '../../server/api/account.php';
var userInformationurl = '../../server/api/account.php';
var loginurl = '../../server/api/account.php';
var changepasswordurl = '../../server/api/account.php';
var profileImage = '';
var name = '';
var family = '';
var username = '';
var bio = '';
var linkedIn = '';
var instagram = '';
var telegram = '';
var github = '';
var password = '';
var newPassword = '';
var password2 = '';

$(document).ready(function() {
    userInformation();
    checkLogin();
    $("#name").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#family").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#username").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#bio").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#profileImage").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#linkedIn").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#telegram").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#instagram").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#github").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#save").click();
            return;
        }
    });
    $("#save").click(function() {
        editPro();
    });

    $("#oldPass").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#PassChange").click();
            return;
        }
    });
    $("#newPass").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#PassChange").click();
            return;
        }
    });
    $("#confPass").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#PassChange").click();
            return;
        }
    });
    $("#PassChange").click(function() {
        passChange();
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
}


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

function editPro() {
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
    var result = send(editProfileurl, data);
    console.log(result.error);
    if (bio == '') {
        $("#bioError").html("  فیلد را تکمیل کنید.");
        $("#bioError").removeClass('d-none');
        return;
    } else { $("#bioError").addClass('d-none'); }
    if (result.error == false) {
        var s = "پروفایل شما با موفقیت ویرایش شد."
        modalpage(s);
    } else {
        console.log(result.response);

    }

    setTimeout(function() {
        location.reload();
        window.location.href = "../../index.html";
    }, 1200);


}


function passChange() {
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
        $("#passError").html("گذرواژه فعلی صحیح نیست.");
        $("#passError").removeClass('d-none');
        return;
    } else { $("#passError").addClass('d-none'); }
    if (result.response.message == "Password must between 6 and 20 characters") {
        $("#newPassError").html("گذرواژه باید بین 6 تا 20 حرف باشد.");
        $("#newPassError").removeClass('d-none');
        return;
    } else { $("#newPassError").addClass('d-none'); }
    if (newPassword != password2) {
        $("#confirmError").html("گذرواژه جدید با تایید گذرواژه مطابقت ندارد");
        $("#confirmError").removeClass('d-none');
        return;
    } else { $("#confirmError").addClass('d-none'); }
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
        setTimeout(function() { window.location.href = "index.html"; }, 1000);

    }

}