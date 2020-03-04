//jquery Code For Home page(Home/index.html)
$("#home").ready(function() {

    var dataInput = {
        CRUD: "check"

    }
    var returned = "";
    var options = {
        url: "../../server/api/account.php",
        async: false,
        dataType: "json",
        type: "POST",
        data: dataInput,
        success: function(response) {
            console.log(response.error);
            console.log(response.response.userId);
            console.log(response.response.username);
            console.log(response.response.displayName);
            if (response.error == false) {
                $("#home").empty();
                $("#home").append(`<body class="container" id="home">
                <div class="row">
                    <div class="col">
                        <img src="../../library/img/skeleton.png " alt="عکس نمایه " class="mt-2 " style="width:50px; ">
                        <span class="mt-4 mr-3 text-muted position-absolute">${response.response.displayName}</span>
                    </div>
                    <div class="mt-3 ml-5">
                        <a href="index.html" class="text-primary">خروج</span>
                    </div>
                </div>
            </body>
            `);
            }
        },
        error: function(xhr, status, error) {
            console.log('* ERROR IN BRIDGE REQUEST *');
            console.log(xhr['responseText']);
        }
    };
    $.ajax(options);
    return returned;



})