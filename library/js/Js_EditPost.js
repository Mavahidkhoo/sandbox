url = '../../server/api/post.php'
var body;
var title;
var postId;
$(document).ready(function() {

    geturl();
    var data = {
        CRUD: 'get',
        postId: postId,
    };
    var result = send(url, data);
    //console.log(result.response[0].body);
    title = $("#title").val(result.response[0].title);
    body = $("#PostText").val(result.response[0].body);
    $("#EditPost").click(function() {
        PostUpdate();
    })


    // if (result.response.message == "Post created successfully") {
    //     $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
    //     <div class="modal-dialog">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h4 class="modal-title">ویرایش پست</h4>
    //             </div>
    //             <div class="modal-body">
    //          <p id='p'>پست شما با موفقیت ویرایش شد.</p> 
    //          </div> 
    //          </div> 
    //          </div> 
    //          </div>`);
    //     setTimeout(function() { window.location.href = "http://localhost/sandbox/Pages/home/index.html"; }, 1000);



    // }




});

function PostUpdate() {
    var data = {
        CRUD: 'update',
        postId: postId,
        title: title,
        body: body
    };
    var result = send(url, data);
    console.log(result);
}

function geturl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    postId = urlParams.get('postid');

}