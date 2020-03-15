//jquery Code For Sign_in page(account/index.html)
var url = "../../server/api/account.php";
var username = '';
var password = '';
$("Sing_in").ready(function() {
    $("#buton").click(function() {
        signIN();
    });
    $("#username").keypress(function(e) {
        if (e.keyCode === 13) {
            $("#buton").click();
            return;
        }
    });
    $("#Password").keypress(function(event) {
        if (event.keyCode === 13) {
            $("#buton").click();
        }
    });
})

function modalpage(e) {
    $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ورود</h4>
                    </div>
                    <div class="modal-body">
                 <p id='p'>${e}</p> 
                 </div> 
                 </div> 
                 </div> 
                 </div>`);
}

function signIN() {
    username = $("#username").val();
    password = $("#Password").val();
    var data = {
        CRUD: "sign-in",
        username: username,
        password: password
    };
    var result = send(url, data)
    console.log(result.response.message);

    if (result.error == false) {
        $("#userError").addClass('d-none');
        $("#passError").addClass("d-none");
        var s = username + "  " + "خوش آمدید.";
        modalpage(s);
        setTimeout(function() { window.location.href = "../../index.html"; }, 1000);

    } else {
        if (username == '') {
            $("#userError").html("فیلد نام کاربری را چک کنید");
            $("#userError").removeClass('d-none');
            return;
        } else { $("#userError").addClass('d-none'); }
        if (password == '') {
            $("#passError").html("فیلد گذرواژه را چک کنید ");
            $("#passError").removeClass("d-none");
            return;
        } else { $("#passError").addClass("d-none") }

        if (result.response.message == "Incorrect username or password") {
            $("#passError").html("نام کاربری / گذرواژه اشتباه است.");
            $("#userError").html("نام کاربری / گذرواژه اشتباه است.");
            $("#userError").removeClass('d-none');
            $("#passError").removeClass("d-none");
            return;

        } else {
            $("#userError").addClass('d-none');
            $("#passError").addClass("d-none");
        }


    }

}