var listurl = '../../server/api/user.php';
var radioValue;
var inputValue;
var userid;
$(document).ready(function() {
    $('body').on('click', '#searchbar', function() {
        $("#showUser").empty();
        $("#search").val("");
        $("#search").attr('placeholder', 'جست و جو ');
        radioValue = $('input[name=optradio]:checked', '#option').val();
        inputValue = $("#search").val();
        if (inputValue == "") {
            $("#error").removeClass('d-none');
        } else { $("#error").addClass('d-none'); }
        if (inputValue.length <= 2) {
            $("#error").html("کلمه مورد نظر کوتاه است");
            $("#error").removeClass('d-none');
        } else { $("#error").addClass('d-none'); }
        userList();
    })
    $('body').on('click', '.box2', function() {
        userid = $(this).attr('id');
        get();

    })
    userList();

});

function userList() {
    var data = {
        CRUD: 'list',
        searchColumn: radioValue,
        searchString: inputValue
    };
    var result = send(listurl, data);

    // console.log(result);

    if (result.error == false) {
        $.each(result.response, function(index, value) {
            $('#showUser').append(`
                <div class=box2 btn style="cursor:pointer" id="${value.id}">
               نام: ${value.name}
                <img class="float-left rounded-circle" src="../../library/img/${value.profileImage}" style="height: 50px; width: 50px;">
                </br>${value.username}
                </div>
    `);
            console.log(value.id)
        });
    }
    if (result.error == true) {
        if (result.response.message == 'No user yet') {
            $("#error").html("چنین کاربری وجود ندارد");
            $("#error").removeClass('d-none');
            return;
        } else { $("#error").addClass('d-none'); }
        if (result.response.message == 'Invalid search parameter') {
            $("#error").html("ورودی جست و جو غلط است");
            $("#error").removeClass('d-none');
            return;
        } else { $("#error").addClass('d-none'); }
    }
};

function get() {
    var data = {
        CRUD: 'get',
        userId: userid
    };
    var result = send(listurl, data);
    console.log(result.response);
    $('#showUser2').append(`
        <div class=box3>
       نام : ${result.response.name}<br>
      بیوگرافی :  ${result.response.bio}<br>
    لینکدن :    ${result.response.linkedIn}<br>
    اینستاگرام :    ${result.response.instagram}<br>
     تلگرام :   ${result.response.telegram}<br>
     گیت هاب :   ${result.response.github }<br>
        </div>
`);

}