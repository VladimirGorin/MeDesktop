<?php

session_start();

$config = include('../../pagedot-config.php');
include('PagedotController.php');
include('../functions.php');

if (!$_SESSION['pagedot-auth'] && $_POST['route'] != 'login-auth') {
	return false;
}

if (empty($_POST) && empty($_GET)) {
	return false;
}

if (empty($_POST['route']) && empty($_GET['route'])) {
	return false;
}

$post     = $_POST;
$get      = $_GET;
$session  = $_SESSION;
$files    = $_FILES;

$route = $post['route'];
if (!$route) {
	$route = $get['route'];
}
switch ($route) {
	case 'login-auth':
		LoginAuth();
		break;

	case 'config-save':
		ConfigSave();
		break;
	
	case 'file-upgrade':
		FileUpgrade();
		break;
	
	case 'start-upgrade':
		StartUpgrade();
		break;
	
	case 'stop-upgrade':
		StopUpgrade();
		break;
	
	case 'get-history':
		GetHistory();
		break;

	case 'get-upgrade':
		GetUpgrade();
		break;

	case 'page-save':
		PageSave();
		break;

	case 'delete-file':
		DeleteFile();
		break;

	case 'style-save':
		StyleSave();
		break;

	case 'style-replace':
		StyleReplace();
		break;

	case 'upload-file':
		UploadFile();
		break;

	case 'chunk-save':
		ChunkSave();
		break;

	case 'get-form':
		GetForm();
		break;

	case 'get-files':
		LoadFiles();
		break;

	case 'create-or-update-form':
		CreateOrUpdateForm();
		break;
	
	default:
		return false;
		break;
}
