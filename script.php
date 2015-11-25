<?php
    header("Access-Control-Allow-Origin: *");

    $name = isset($_REQUEST['name'])?$_REQUEST['name']:"";
    $pass = isset($_REQUEST['password'])?$_REQUEST['password']:"";
    $userid = isset($_REQUEST['userid'])?$_REQUEST['userid']:"";
    $project = isset($_REQUEST['project'])?intval($_REQUEST['project']):0;
    $project_data = isset($_REQUEST['projectData'])?$_REQUEST['projectData']:"";

    $db = @mysql_connect("localhost", "root", "db408adminpass", true);
    @mysql_select_db("l.Mywork", $db);

    if ($name && $pass)
    {
    	// check name & pass
    	$error = "Неправильный логин или пароль";
    	$userid = "";
    	$result = @mysql_query("SELECT id FROM users WHERE name='".@mysql_real_escape_string($name, $db)."' AND password='".@mysql_real_escape_string($pass, $db)."'", $db);
    	if ($result && ($row = @mysql_fetch_array($result, MYSQL_ASSOC)))
    	{
    		$error = "";
    		$userid = md5($name.time());

    		// write userid to DB
    		@mysql_query("UPDATE users SET userid='".$userid."' WHERE id=".$row["id"], $db);
    	}
		print json_encode(array("userID" => $userid,"Error" => $error));
		exit;
    }
    else
    {
    	// check userid and work with data
        $result = @mysql_query("SELECT id FROM users WHERE userid='".@mysql_real_escape_string($userid, $db)."'", $db);
        $row = @mysql_fetch_array($result, MYSQL_ASSOC);

        if (!$result || !$row || !$project)
        {
            print json_encode(array("Error" => "Неправильный userid или проект"));
            exit;
        }

        $result = @mysql_query("SELECT * FROM project_data  WHERE userid=".$row["id"]." AND projectid=".$project, $db);
        $row2 = @mysql_fetch_array($result, MYSQL_ASSOC);

        if ($project_data)
        {
            // write project_data
            if (!$result || !$row2)
                @mysql_query("INSERT INTO project_data (userid, projectid, data) VALUES (".$row["id"].",".$project.",'".@mysql_real_escape_string(json_encode($project_data), $db)."')", $db);
            else
                @mysql_query("UPDATE project_data SET data='".@mysql_real_escape_string(json_encode($project_data), $db)."' WHERE userid=".$row["id"]." AND projectid=".$project, $db);

            print json_encode(array("Error" => ""));
            exit;
        }
        else
        {
            // get project_data
            print json_encode(array("data" => (($row2 && $row2['data'])?json_decode($row2['data']):""),"Error" => ""));
            exit;
        }
    }
?>