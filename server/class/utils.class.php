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
}
