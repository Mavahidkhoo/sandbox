function send(urlInput, dataInput) {
    if (urlInput != 'undefined' && dataInput != 'undefined') {
        var returned = "";
        var options = {
            url: urlInput,
            async: false,
            dataType: "json",
            type: "POST",
            data: dataInput,
            success: function(data) {
                returned = {
                    error: data['error'],
                    response: data['response']
                };
                // if (typeof(data) == 'object') {
                //     if (data['message'][0] == 'success') {
                //         if (data['message'][2] == 1) {
                //             showMessage('success', data['message'][1]);
                //         }
                //     } else if (data['message'][0] == 'error') {
                //         if (data['message'][2] == 1) {
                //             showMessage('error', data['message'][1]);
                //         }
                //     } else {
                //         console.log('faildMassege');
                //         return false;
                //     }
                // } else {
                //     console.log('faild');
                //     return false;
                // }
            },
            error: function(xhr, status, error) {
                console.log('* ERROR IN BRIDGE REQUEST *');
                console.log(xhr['responseText']);
            }
        };
        $.ajax(options);
        return returned;
    } else {
        console.log('faild');
        return false;
    }
}