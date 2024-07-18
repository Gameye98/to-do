<?php
$action = $_GET["action"];
$new = $_GET["new"];
$data = $_GET["data"];
$db = new SQLite3("todo_app.db");
$db->exec("create table if not exists todo_list (id integer primary key autoincrement, data text)");
if($action == "write") {
	$stmt = $db->prepare("insert into todo_list (data) values(:data)");
	$stmt->bindValue(":data", $data, SQLITE3_TEXT);
	$stmt->execute();
} elseif($action == "update") {
	$stmt = $db->prepare("update todo_list set data = :new where id = :data");
	$stmt->bindValue(":new", $new, SQLITE3_TEXT);
	$stmt->bindValue(":data", $data, SQLITE3_TEXT);
	$stmt->execute();
} elseif($action == "delete") {
	$stmt = $db->prepare("delete from todo_list where id = :data");
	$stmt->bindValue(":data", $data, SQLITE3_TEXT);
	$stmt->execute();
}
$results = $db->query("select * from todo_list");
$arr = array();
$count = 0;
while($row = $results->fetchArray()) {
	if($results === false) {
		break;
	}
	$arr[$count++] = array("id"=>$row[0],"data"=>$row[1]);
}
echo json_encode($arr);
$db->close();
?>
