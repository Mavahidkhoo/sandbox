<?php
class Operations
{
    #specs section
    private $servername = "";
    private $dbname = "";
    private $username = "";
    private $password = "";
    private $dbtype = "mysql";
    private $dsn;
    private $connect;

    public function __construct($servername, $dbname, $username, $password)
    {
        $this->servername = $servername;
        $this->dbname = $dbname;
        $this->username = $username;
        $this->password = $password;
    }
    #connection Section
    private function DBConnect()
    {
        try {
            $this->dsn = $this->dbtype . ":host=" . $this->servername . ";dbname=" . $this->dbname;
            $this->connect = new PDO($this->dsn, $this->username, $this->password);
            $this->connect->exec("SET CHARACTER SET utf8");
            $this->connect->exec("set names utf8");
        } catch (PDOException $error) {
            echo "Error:" . $error->__tostring();
        }
        return $this->connect;
    }
    #dbOpp
    public function select($table, $ArrayCoulmns, $condition, $fetchMode = 'ASSOC')
    {
        $connect = $this->DBConnect();
        if ($ArrayCoulmns != '*') {
            $ArrayCoulmns = implode(',', $ArrayCoulmns);
        }

        if ($fetchMode == 'ASSOC') {
            $fetchMode = PDO::FETCH_ASSOC;
        } else if ($fetchMode == 'NUM') {
            $fetchMode = PDO::FETCH_NUM;
        }

        $sql = "SELECT $ArrayCoulmns FROM $table WHERE $condition";
        $result = $connect->query($sql);
        $run = $result->execute();
        if ($run) {
            if ($result->rowCount() >= 1) {
                return $result->fetchAll($fetchMode);
            } else {
                return 'rowCountFalse';
            }
        } else {
            return $result->errorInfo();
        }
    }

    public function insert($table, $array)
    {
        $connect = $this->DBConnect();
        $columnString = implode(',', array_keys($array));
        $valueString = implode(',', array_fill(0, count($array), '?'));

        $result = $connect->prepare("INSERT INTO $table ({$columnString}) VALUES ({$valueString})");
        $run = $result->execute(array_values($array));
        if ($run) {
            return array(
                'true',
                $connect->lastInsertId(),
            );
        } else {
            return $result->errorInfo();
        }
    }

    public function update($table, $array)
    {
        $connect = $this->DBConnect();
        $counter = 1;
        $count = count($array);

        $sql = "UPDATE `$table` SET ";
        foreach ($array as $key => $value) {
            if ($counter == $count - 1) {
                $sql = $sql . " `$key` = ? ";
            } else if ($counter == $count) {
                $sql = $sql . " WHERE `$key` LIKE ? ";
            } else {
                $sql = $sql . " `$key` = ? ,";
            }
            $counter++;
        }
        $result = $connect->prepare($sql);

        $run = $result->execute(array_values($array));
        if ($run) {
            return 'true';
        } else {
            return $result->errorInfo();
        }
    }

    public function delete($table, $coulmnName, $coulmnValue)
    {
        $connect = $this->DBConnect();
        $result = $connect->query("DELETE FROM $table WHERE $coulmnName LIKE $coulmnValue");
        $run = $result->execute();
        if ($run) {
            return 'true';
        } else {
            return $result->errorInfo();
        }
    }
}
