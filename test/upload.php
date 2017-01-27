<?php 
$link = mysqli_connect('localhost', 'root', 'admin', 'images');
?>

<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_img[]" multiple />
<input type="submit" name="btn_upload" value="Upload">	
</form>

<?php
if(isset($_POST['btn_upload']))
{
	for($i = 0; $i < count($_FILES['file_img']['name']); $i++)
	{
		$filetmp = $_FILES["file_img"]["tmp_name"][$i];
		$filename = $_FILES["file_img"]["name"][$i];
		$filetype = $_FILES["file_img"]["type"][$i];
		$filepath = "photo/".$filename;
	
	move_uploaded_file($filetmp,$filepath);
	
	$sql = "INSERT INTO upload_img (img_name,img_path,img_type) VALUES ('$filename','$filepath','$filetype')";
	$result = mysqli_query($link,$sql);

	
	}
}
?>

</body>
</html>
