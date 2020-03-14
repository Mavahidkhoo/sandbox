//jquery Code FOr Sign_up Page(account/index2.html)
var name = '';
var url = "../../server/api/account.php";
var family = '';
var username = '';
var password = '';
var password2 = '';
$("#Sign_up").ready(function() {

    $("#name").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }
    });
    $("#family").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }
    });
    $("#username").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }
    });
    $("#password").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }

    });
    $("#password2").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }

    });
    $("#buton").click(function(e) {
        sign_up();
    });
});

function sign_up() {
    name = $("#name").val();
    family = $("#family").val();
    username = $("#username").val();
    password = $("#password").val();
    password2 = $("#password2").val();
    var data = {
        CRUD: "sign-up",
        name: name,
        family: family,
        username: username,
        password: password,
        password2: password2
    }
    var result = send(url, data)
    console.log(result.response.message);

    if (result.error == false) {
        var s = "اکانت شما با موفقیت ثبت شد.";
        modalpage(s);
        setTimeout(function() { window.location.href = "http://localhost/sandbox/Pages/Account/index.html"; }, 1000);

    } else {
        if (name == '') {
            $("#1name").removeClass("d-none");
            return;
        } else {
            $("#1name").addClass('d-none');
        }
        if (family == '') {
            $("#2family").removeClass("d-none");
            return;
        } else {
            $("#2family").addClass("d-none");
        }
        if (result.response.message == 'Username must between 4 and 40 characters') {

            $("#3username").html("نام کاربری باید بین 4 تا 40 حرف باشد");
            $("#3username").removeClass('d-none');
            return;
        } else {
            $("#3username").addClass("d-none");
        }
        if (result.response.message == 'Username exists') {
            $("#3username").html("این نام کاربری ثبت شده است.");
            $("#3username").removeClass("d-none");
            return;
        } else {
            $("#3username").addClass("d-none");
        }
        if (password == '' || result.response.message == 'Password must between 6 and 20 characters') {
            $("#4password").html("گذرواژه باید بین 6 تا 20 کاراکتر باشد");
            $("#4password").removeClass("d-none");
            return;
        } else {
            $("#4password").addClass("d-none");
        }
        if (password != password2) {
            $("#5password2").html("تایید گذرواژه درست نمیباشد");
            $("#5password2").removeClass("d-none");
            return;

        } else {
            $("#5password2").addClass("d-none");
        }
    }
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