//jquery Code For Sign_in page(account/index.html)
$("Sing_in").ready(function() {
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
    $("#buton").click(function(e) {
        var username = $("#username").val();
        var password = $("#Password").val();
        var dataInput = {
            CRUD: "sign-in",
            username: username,
            password: password
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
                console.log(dataInput);
                if (response.error == false) {
                    var s = username + "  " + "خوش آمدید.";
                    modalpage(s);
                    setTimeout(function() { window.location.href = "http://localhost/sandbox/Pages/Home/index.html"; }, 1000);

                } else {
                    if (dataInput.username == '') {
                        var s = "فیلد نام کاربری را چک کنید";
                        modalpage(s);
                    }
                    if (dataInput.password == '') {

                        var s = "فیلد گذرواژه را چک کنید.";
                        modalpage(s);
                    }
                    if (response.response.message == "Incorrect username or password") {
                        var s = "نام کاربری / گذرواژه اشتباه است.";
                        modalpage(s);

                    }

                }
            },
            error: function(xhr, status, error) {
                console.log('* ERROR IN BRIDGE REQUEST *');
                console.log(xhr['responseText']);
            }
        };

        $.ajax(options);
        return returned;




    });
});