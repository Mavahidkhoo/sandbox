var listurl = '../../server/api/user.php';
var loginurl = '../../server/api/account.php';
var radioValue;
var inputValue;
var userid;
$(document).ready(function() {
    checkLogin()
    $('body').on('click', '#searchbar', function() {
        $("#showUser").empty();
        // $("#search").val("");
        // $("#search").attr('placeholder', 'جست و جو ');
        radioValue = $('input[name=optradio]:checked', '#option').val();
        inputValue = $("#search").val();
        if (inputValue == "") {
            $("#error").removeClass('d-none');
            return;
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
    $("#showUser2").empty();
    //console.log(result.response.profileImage);
    // <img class='float-left  rounded rounded-circle' alt="Deleted Image" src=../../library/img/${result.response.profileImage} width=100 height=100>
    $('#showUser2').append(`
        <div class=box3>
            نام : ${result.response.name ? result.response.name : null}<br>
          ${result.response.bio ? `بیوگرافی : ${result.response.bio}<br>`:''}
      
            ${result.response.linkedIn ? `لینکدن : <a target="_blank" class=text-info href=https://www.linkedin.com/in/${result.response.linkedIn}>${result.response.linkedIn}</a><br>` : ''}
           ${result.response.instagram ?` اینستاگرام : <a target="_blank" class=text-info href=https://www.instagram.com/${result.response.instagram}>${result.response.instagram}</a><br>`:"" }
          ${result.response.telegram ? `  تلگرام : <a target="_blank" class=text-info href=https://t.me/${result.response.telegram} >${result.response.telegram}</a><br>`:""}
          ${result.response.github ? `  گیت هاب : <a target="_blank" class=text-info href=https://github.com/${result.response.github}>${result.response.github}</a><br> `: ""}
        </div>
`);

}

function checkLogin() {
    var data = {
        CRUD: 'check'
    };
    var result = send(loginurl, data);
    $("#username").html(result.response.displayName);
    $("#imgPro").attr("src", "../../library/img/" + result.response.profileImage);
    if (result.response.profileImage != undefined) {
        $("#imgPro").show();
    }

    // console.log(result.response.profileImage)
}