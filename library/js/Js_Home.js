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
            // console.log(response.error);
            // console.log(response.response.userId);
            // console.log(response.response.username);
            // console.log(response.response.displayName);
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

//-----------------------------------------------------------------------------------
$("#home").ready(function() {
    var dataInput = { CRUD: "list" }
    var returned = "";
    var options = {
        url: "../../server/api/post.php",
        async: false,
        dataType: "json",
        type: "POST",
        data: dataInput,
        success: function(response) {
            // console.log(response.response.length);

            if (response.error == false) {
                for (var i = 0; i < response.response.length; i++) {
                    $("#home").append(`
                <div class="row col-12">
                    <div class="container col-8 mt-5">
                        <hr>
                        <div class="text-info">${response.response[i].title}<br></div>
                        <div class="mr-5">${response.response[i].body}<br></div>
                        <div class="text-left">نویسنده : 
                        <span class="text-danger">${response.response[i].displayName}</span>
                        </div>
                        <div id="edit">
                        ${response.response[i].postOwner ? '<a href=# class=pl-4> ویرایش </a>   <a href=#> حذف </a>' : ''}
                        </div>
                        <hr>
                    </div>
                </div> 
            `);
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



})