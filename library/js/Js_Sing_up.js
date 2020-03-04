//jquery Code FOr Sign_up Page(account/index2.html)
$("#Sign_up").ready(function() {
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
                    if (dataInput.name == '' || dataInput.family == '') {
                        var s = "فیلد نام و نام خانوادگی را چک کنید.";
                        modalpage(s);
                    }
                    if (response.response.message == 'Username must between 4 and 40 characters') {

                        var s = "نام کاربری باید ببین 4 تا 40 کاراکتر باشد.";
                        modalpage(s);
                    }
                    if (response.response.message == 'Username exists') {
                        var s = "این نام کاربری قبلا ثبت شده است.";
                        modalpage(s);
                    }
                    if (dataInput.password == '') {
                        var s = "پسورد باید بین 6 تا 20 کاراکتر باشد.";
                        modalpage(s);
                    }
                    if (dataInput.password != dataInput.password2) {
                        var s = "پسورد ها با یکدیگر همخوانی ندارند."
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

})