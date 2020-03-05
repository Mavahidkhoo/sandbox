var editProfileurl = '../../server/api/account.php';
$(document).ready(function() {


    $("#save").click(function() {
        var name = $("#name").val();
        var family = $("#family").val();
        var username = $("#username").val();
        var bio = $("#bio").val();
        var linkedIn = $("#linkedIn").val();
        var instagram = $("#instagram").val();
        var telegram = $("#telegram").val();
        var github = $("#github").val();
        if (!(name == "" || family == "" || username == "")) {
            editProfile();

        }

    });


    function editProfile() {
        var data = {
            CRUD: 'edit-profile'
        };
        var result = send(editProfileurl, data);
        console.log(result);
        console.log(result.response)
    };
})