//jquery Code For Home page(Home/index.html)
//--------------------------------------------------------------------After Login
var postEndPoint = '../../server/api/post.php';
var loginurl = '../../server/api/account.php';
var modal = document.getElementById('myModal');
var postid;
$(document).ready(function() {
    showPosts();
    checkLogin();
    $('body').on('click', '#exit', function() {
        var data = {
            CRUD: 'sign-out'
        };
        var result = send('../../server/api/account.php', data);
        //onsole.log(result);
        location.reload();
    });
    $('body').on('click', '.action-delete', function() {
        modal.style.display = 'block';
        postid = $(this).attr('postid');
    });
    $('body').on('click', '#no', function() {
        modal.style.display = 'none';
    });
    $('body').on('click', '#yes', function() {
        Deletepost(postid);
        location.reload();
    });



});

function showPosts() {
    var data = {
        CRUD: 'list'
    };
    var result = send(postEndPoint, data);
    if (result.error) {

    } else {
        $.each(result.response, function(index, value) {

                    $('#posts').append(`
            <div class="row col-12 box">
                <div class="container col-8 mt-5">
                    <hr>
                    <div class="text-info">${value.title}<br></div>
                    <div class="mr-5">${value.body}<br></div>
                    <div class="text-left">نویسنده : 
                    <span class="text-danger">${value.displayName}</span>
                    </div>
                    <div id="edit">
                    ${value.postOwner ? `<a style='text-decoration:none' href=../post/index2.html?postid=${value.id} class=pl-4 '> ویرایش </a>   
                    <a class='text-primary action-delete' postid=${value.id} style='cursor: pointer;'> حذف </a>` : ''}
                    </div>
                    <hr>
                </div>
            </div>
        `);
        });
    }
}

function checkLogin() {
    var data = {
        CRUD: 'check'
    };
    var result = send(loginurl, data);
    //console.log(result);
    if (!result.error) {
        $("#exit").removeClass("d-none");
        $("#Enter").addClass("d-none");
        $("#addAcc").addClass("d-none");
        $("#imgPro").removeClass("d-none");
        $("#userAcc").removeClass("d-none");
        $("#userAcc").html(result.response.displayName);
        $("#imgPro").attr("src", "../../library/img/" + result.response.profileImage);
        $("#editPro").removeClass("d-none");
        $("#creatPost").removeClass("d-none");
        $("#editPro").click(function() { window.location.href = '../UserEditProfile/index.html'; })
        $("#creatPost").click(function() { window.location.href = '../post/index.html'; })
    }
};
function Deletepost(postid) {
    var data = {
        CRUD: 'delete',
        postId:postid
    };
    var result = send(postEndPoint, data);
    console.log(postid);
    console.log(result);
    
};