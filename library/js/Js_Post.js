url = '../../server/api/post.php';
var body = '';
var title = '';
$(document).ready(function() {
    $("#creatPost").click(function() {
        creatpost();
    });
});

function creatpost() {
    body = $("#PostText").val();
    title = $("#title").val();
    var data = {
        CRUD: 'create',
        body: body,
        title: title
    };
    var result = send(url, data);
    if (result.response.message == "Post created successfully") {
        $("#modalsabt").append(`<div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">پست جدید</h4>
                    </div>
                    <div class="modal-body">
                 <p id='p'>پست شما با موفقیت ثبت شد.</p> 
                 </div> 
                 </div> 
                 </div> 
                 </div>`);
        setTimeout(function() { window.location.href = "http://localhost/sandbox/index.html"; }, 1000);
    } else {
        if ("#titlePost" == '') {
            $("#titleError").html("موضوع  خود را تایپ کنید");
            $("#titleError").removeClass('d-none');
            return;
        } else { $("#titleError").addClass('d-none'); }
        if (body == '') {
            $("#bodyError").html("متن خود را تایپ کنید.");
            $("#bodyError").removeClass("d-none");
            return;
        } else { $("#bodyError").addClass("d-none"); }


    }

}