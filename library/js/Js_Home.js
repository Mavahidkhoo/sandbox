//jquery Code For Home page(Home/index.html)
//--------------------------------------------------------------------After Login
var postEndPoint = 'server/api/post.php';
var loginurl = 'server/api/account.php';
var modal = document.getElementById('myModal');
var postid;
var profileImage;
var widthw;
var widthd
$(document).ready(function () {
    widthw = $(window).width();
    widthd = $(document).width();
    userInformation();
    showPosts();
    checkLogin();
   nav();
    $('body').on('click', '#exit', function() {
        var data = {
            CRUD: 'sign-out'
        };
        var result = send('server/api/account.php', data);
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
    $("#searchUser").click(function() { window.location.href = 'Pages/User/index.html'; })



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
                    <div class="text-info">${value.title}<br></div>
                    <div class="mr-2">${value.body}<br></div>
                    <div class="text-left mb-2">نویسنده : 
                    <span class="text-danger">${value.displayName}</span>
                    </div>
                    <div id="edit">
                    ${value.postOwner ? `<a style='text-decoration:none' href=Pages/Post/index2.html?postid=${value.id} class=pl-4 '> ویرایش </a>   
                    <a class='text-primary action-delete' postid=${value.id} style='cursor: pointer;'> حذف </a>` : ''}
                    </div>
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
  //  console.log(result);
    if (!result.error) {
        $("#exit").removeClass("d-none");
        $("#Enter").addClass("d-none");
        $("#addAcc").addClass("d-none");
        $("#imgPro").removeClass("d-none");
        $("#userAcc").removeClass("d-none");
        $("#userAcc").html(result.response.displayName);
        $("#editPro").removeClass("d-none");
        $("#creatPost").removeClass("d-none");
        $("#editPro").click(function() { window.location.href = 'Pages/UserEditProfile/index.html'; })
        $("#creatPost").click(function () { window.location.href = 'Pages/Post/index.html'; })
        $("#searchUser").click(function () { window.location.href = 'Pages/User/index.html';})
    }
};
function Deletepost(postid) {
    var data = {
        CRUD: 'delete',
        postId:postid
    };
    var result = send(postEndPoint, data);
   // console.log(postid);
  //  console.log(result);
    
};
function userInformation() {
    var data = {
        CRUD: 'get'
    };
    var result = send(loginurl, data);
   
    $("#imgPro").attr("src", "library/img/" + result.response.profileImage);
    

};

function nav() {
    

     if (widthw <= 300 || widthd <= 300) {
         $("#navBar").addClass('d-none');
    }
    if (widthw <= 550) { 
      
        $("#posts").css("font-size", "15px");
    }
    if (widthw <= 500) { 
      
        $("#posts").css("font-size", "10px");
    }
    if (widthw <= 400) { 
      
        $("#posts").css("font-size", "5px");
    }
 }