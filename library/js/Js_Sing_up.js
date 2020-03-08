//jquery Code FOr Sign_up Page(account/index2.html)

$("#Sign_up").ready(function() {
    $("#buton").click(function(e) {
        var name = $("#name").val();
        var family = $("#family").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var password2 = $("#password2").val();
        var dataInput = {
            CRUD: "sign-up",
            name: name,
            family: family,
            username: username,
            password: password,
            password2: password2
        }
        var returned = "";
        var options = {
            url: "../../server/api/account.php",
            async: false,
            dataType: "json",
            type: "POST",
            data: dataInput,
            success: function(response) {
                console.log(response.response.message);

                if (response.error == false) {
                    var s = "اکانت شما با موفقیت ثبت شد.";
                    modalpage(s);
                    setTimeout(function() { window.location.href = "http://localhost/sandbox/Pages/Account/index.html"; }, 1000);

                } else {
                    if (dataInput.name == '') {
                        $("#1name").removeClass("d-none");
                        return;
                    } else {
                        $("#1name").addClass('d-none');
                    }
                    if (dataInput.family == '') {
                        $("#2family").removeClass("d-none");
                        return;
                    } else {
                        $("#2family").addClass("d-none");
                    }
                    if (response.response.message == 'Username must between 4 and 40 characters') {

                        $("#3username").html("نام کاربری باید بین 4 تا 40 حرف باشد");
                        $("#3username").removeClass('d-none');
                        return;
                    } else {
                        $("#3username").addClass("d-none");
                    }
                    if (response.response.message == 'Username exists') {
                        $("#3username").html("این نام کاربری ثبت شده است.");
                        $("#3username").removeClass("d-none");
                        return;
                    } else {
                        $("#3username").addClass("d-none");
                    }
                    if (dataInput.password == '' || response.response.message == 'Password must between 6 and 20 characters') {
                        $("#4password").html("گذرواژه باید بین 6 تا 20 کاراکتر باشد");
                        $("#4password").removeClass("d-none");
                        return;
                    } else {
                        $("#4password").addClass("d-none");
                    }
                    if (dataInput.password != dataInput.password2) {
                        $("#5password2").html("تایید گذرواژه درست نمیباشد");
                        $("#5password2").removeClass("d-none");
                        return;

                    } else {
                        $("#5password2").addClass("d-none");
                    }

                }

            },
            error: function(xhr, status, error) {
                console.log('* ERROR IN BRIDGE REQUEST *');
                console.log(xhr['responseText']);
            }
        };

        $.ajax(options);
        // setTimeout(function() {
        //     location.reload();
        // }, 4000);
        return returned;



    });


})


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