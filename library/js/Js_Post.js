$(document).ready(function() {
    url = '../../server/api/post.php'
    var body;
    var title;
    $("#creatPost").click(function() {
        body = $("#PostText").val();
        title = $("#title").val();
        var data = {
            CRUD: 'create',
            body: body,
            title: title
        };
        var result = send(url, data);
        //console.log(result.response)
        // console.log(title)
        // console.log(body) 
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



        }
    });
});