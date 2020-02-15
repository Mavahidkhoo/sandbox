<?php
class Utils
{
    public static function result($error, $data)
    {
        print_r(
            json_encode(
                array(
                    'error' => $error,
                    'response' => $data
                )
            )
        );
        exit();
    }

    public static function uploadImage($base64Image)
    {
        $fileName = uniqid('', true) . ".png";
        $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
        if (file_put_contents('../../library/img/' . $fileName, $data)) {
            return $fileName;
        } else {
            return false;
        }
    }
}
