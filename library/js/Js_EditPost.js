url = '../../server/api/post.php'
var postId;
$(document).ready(function() {

    geturl();
    get();
    //console.log(postId);
    $("#EditPost").click(function() {
        update();

        $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ویرایش پست</h4>
                    </div>
                    <div class="modal-body">
                 <p id='p'>پست شما با موفقیت ویرایش شد.</p> 
                 </div> 
                 </div> 
                 </div> 
                 </div>`);
        setTimeout(function() { window.location.href = "http://localhost/sandbox/index.html"; }, 1000);

    })


});

function get() {
    var data = {
        CRUD: 'get',
        postId: postId,
    };
    var result = send(url, data);
    //console.log(result.response[0].body);
    $("#title").val(result.response[0].title);
    $("#PostText").val(result.response[0].body); {

    }
}

function update() {
    var data = {
        CRUD: 'update',
        postId: postId,
        title: $('#title').val(),
        body: $('#PostText').val()
    };
    var result = send(url, data);
    console.log(result.response);
}

function geturl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    postId = urlParams.get('postid');
}