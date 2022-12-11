<? if (! PAGEDOT ) exit; ?>
<!DOCTYPE html>
<html lang="en" id="PAGEDOT">
<head>
  
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGEDOT <?= $version ?></title>
  <link rel="stylesheet" href="<?= $pagedot_dir ?>/css/pagedot.css">
  <link rel="stylesheet" href="https://unpkg.com/@icon/themify-icons/themify-icons.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <style>
    body {
      background-color: #fff;
    }
    .login-form {
      background-color: #555555;
      padding: 60px 30px;
      border-radius: 0 0 20px 20px;
    }
    input.form-control {
      height: 55px!important;
      border: 0!important;
      line-height: 1;
    }
    button.btn {
      width: 100%;
      margin-top: 20px;
      height: 60px;
      background-color: #A1CD45;
      color: #000;
      border: 0;
      font-weight: 600;
    }
    .form-group {
      margin-bottom: 10px;
    }
    .pagedot-logo {
      font-size: 40px;
      line-height: 1;
      margin-top: 20px;
    }
    label {
      color: #fff;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .pagedot-logo-title {
      font-size: 13px;
    }
  </style>
</head>
<body>





<div class="container">
<div class="row">
<div class="col-md-4 offset-md-4">
  <div class="login-form">
    <form id="ajax-login-form">
      <div class="form-group">
        <label for="exampleInputEmail1">Логин</label>
        <input type="text" name="login" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите логин" autofocus required>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль" required>
      </div>
      <button type="submit" class="btn ajax-login-submit">Войти</button>
    </form>
  </div>
  <div class="text-center">
    <a class="pagedot-logo" href="https://pagedot.ru" target="_blank"><span>PAGE</span>DOT <span><?= $version ?></span></a></div>
  <div class="text-center pagedot-logo-title">Простое управление лэндингом</div>
</div>
</div>
</div>

  <script src="<?= $pagedot_dir ?>/js/jquery-1.5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

  <script>
	var pagedot_api_url = '<?=Config('api_url');?>';
	var pagedot_dir = '<?=Config('dir');?>';
  </script>

  <script src="<?= $pagedot_dir ?>/js/pagedot.js"></script>

</body>
</html>