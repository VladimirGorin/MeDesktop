<?php

function GetContent()
{
	
	eval(str_rot13(gzinflate(str_rot13(base64_decode('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')))));

	if (isset($_GET['preload']) && $_GET['preload'] == 'true') {
		eval(str_rot13(gzinflate(str_rot13(base64_decode('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')))));

	?>
	<div class="preloader"><span>Подождите... загружаю страницу</span></div><style>.preloader {position: fixed;width: 100%;height: 100%;background: #eee;color: #fff;z-index: 9999999;display: flex;align-items: center;justify-content: center;left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 999999; font-size: 14px;}.preloader span { display: block; margin: auto; text-align: center; color: #000;font-size: 30px;}</style>
	<script type="text/javascript">document.addEventListener('DOMContentLoaded', function(){fadeOut(".preloader");});function fadeOut(el) {var opacity = 1;var timer = setInterval(function() {if(opacity <= 0.1) {clearInterval(timer);document.querySelector(el).style.display = "none";}document.querySelector(el).style.opacity = opacity;opacity -= opacity * 0.1;}, 10);}</script>
	<? } else {
		eval(str_rot13(gzinflate(str_rot13(base64_decode('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')))));

	}

	$content = str_replace(array("\r\n\r\n", "\r\r", "\n\n"), '
',  $content);
	echo $content;

}

function my_file_get_contents($path) {
  $url = $path;
  $ch = curl_init();
  $timeout = 5; // set to zero for no timeout
  curl_setopt ($ch, CURLOPT_URL, $url);
  curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  $file_contents = curl_exec($ch);
  return $file_contents;
  curl_close($ch);
}

function Config($key, $value = false)
{

	$config = include('pagedot-config.php');
	if (!$value) {
		return $config[$key];
	}

}

function myscandir($dir, $sort=0)
{
	eval(str_rot13(gzinflate(str_rot13(base64_decode('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')))));

}

function get_html($html) {

	$html = preg_replace('# : data-pdeid="(.*)"}}#U', '}}', $html);
	$html = preg_replace('# data-pdeid="(.*)"#U', '', $html);
		
	return $html;
}
function getFolderPath() {

	$path  = __DIR__;
	$path  = explode('/', $path);
	$pathr = array_pop($path);
	$path  = implode('/', $path);
	return $path;
}
function getFolder() {

	eval(str_rot13(gzinflate(str_rot13(base64_decode('LUnFDu66EX6ao3u6C4O6CvMfxloVc+Y8fRO1ROTEUB4PfPZFD/ffrT/i9R7K5e84FAuG/HRepnFe/uZQRuX3/yf/KJoM5ptZmSq7+vAfVQdNwVhOwevjQRu0VyNfTdlg4wF3QU4SZvzcWkJ3SDpMcfnyjp5ejj+QHazvpD+etYXE/EiyX3C2XBMZOBYquURNN9+9CqaSFFKgN7Sm/MoPsqzfB67+Z+/qr+0sGWErfn0vKRpVSFJib7UBi4JeAMHO0BSc2nUxGW/G/yiz3wlXUV8jKh98Pp4TlUlMoEZUJZvhmDGrFdluEFtMq7583LN6y3paqOwHSp9Y1udJf5OPqj4qDM0a9/xSOekqhbM96w8Nj6K7xbXkWlnQZ+oa95PzapJjm9fW0zQ+uCPPrJ+YgTKO7oaStzcIQ5/q4yvdL4+arsnu5wRrkFio+QuNGrwOnEFTCnDVwfkN2Kg7dSogHsm0nudi55k3b82etMSzNe7mB2nakAN168FyKk+vLwCWvOk8oVP+8VWdhT94CrpYMxG8ffB0G+tK3+jr510th3gtzK5LhA+FbefO3Vk+nfVCYwS12I5WdYK06tfF+eU3wcFAewwIsl1RihTaPZObOzEc0RqeaTbLnYEM2GJ6OQoUmHZ3AdI1r3rxzdJTI5YQ+tuA0eOYYa8HlNklyb0qEgxU+m2T04IxLrHMweToGz1NWCLqwWsZu0OJGK83MDEY/dL4nH1rkWEUOFq695jG5f1SLRAJbzj2LqeZ2AtIsocwxnU2avTZylm1lIFfMtlKaO0uGSyAxf0l6I1ZGZ+N9bSeDU7W0BbeMFeVrhmTFEeQP9AUF4dilpfatlZlGMQqM3Qw44J0KJIvgFC7uqz2YXRMmrxktniW+RraVBRE+rymri52ozVUH6r3abYGnfhhE3hbvN5EF0xKcshxm27NACU9jugtvhUkbPjEfrS6qZivW8WPUGUuNywVTqe1ltekhrVxieeIaJ+GAWJyMqSzRkxm6O8qTAgiZS2beYWV82MKLTQenFeNE8sYIm7mhpGBxHmhNDsF6CTo92hRMXdQMZG0V739qZvc0Ry7tUVwqnXPjfycycukZhhpg9S+EuFM92GPfd4wVvTKZPaLJFf8IJcUAge4UHAJupMM1B2zqICcrYPDd4IgIi7dr5OD9C1lW0Ckt8f4Tn8pHd8n1qk2O/NHJfES4OFHenLefB0qOeNgG/WwjwInmAvpt3sO1B9jkQBC0Ik15Wv64VR6c0iJc5+ykDRmbV642cTP4kIkHl7xJNTFy8uibOk68c7m+wG0yNuzjk5Wn/Mn84OHRMC6rRPcHtU5ciad/bJWuSzxyS1oYMaEtB8bm8BkI/A5Qlb0sfNnf7JuzeECvDzlJ1SBI5bF3uZGIaGvhRRf13lDN8jFq5bc1d7t2o7uLLngrIOWpkrsOV/MgfEdKF9DSXbHyJUJoAgfMfBrTyRRcI+3wgeNwZA/OcA5Eyyn6KXksRxqa+mchsaYCLcb+ewqlEuagTllxVJB/J6qNyDgwdf2nvbpmRcmh6oSQ/y8pr5wGhno8xycDJPj041jHXQY1rAGEupz4OQ8CSX4yl+pAX+9HuYcDyx90xKdJU4zqVpbem1Q6g/HD/Yx+CVc9iMfz3Yqs5sdHa60h1jflZVmNi8iVLq8GjEzp52seQlXhohubLnNvQUO1HShwclk/xJJeiygnTr2I1LkveGJ6QmJm/6wx5/EtTY3LEg75kneXb0wvc3Ah+w1u1d5Go+NkWVpmQSQnN02LKGXwm7ZV8noXPy+4nD7qyMr4aGtHsEg7zURdITCPRHB11vayRqO+Q3aUSQsRWoGbjgOoX6zOmkHeXEyqLV8ktcDX/7iOoBOk4/rYL229i25L5F05qQxbtJH96bblOT0FabpCd/o+hNGp8rXXs82LUi5qK58Ex7QXE4zW9PLSyaluKB3OzhYau8AzPMTo2i0GBFIYdmOqrunD77eKUNOzZtjWCDLkLfR09MzDDWQ9+tJZZJBmIVnxYIMP9EREmfCANCd7Qbh+k2ri5a1gFvh+2gjV3ODNoZcvfVwUJfmRUsbF9XEJl07KikozYnEwdYUfsZgpbKrFDZENmYU+1cmC1fT3BNKy2Axj2LSbvrhtGYCr4P9cFWHMSJiRtkHidXK2RpS1HWeRoCTYkHgHjEnyyQPEIp+dVgHJWnGk2lt/sGoSf5xkbGx52X1K+J5i1FX17uMobrClB2KlpWnCMhbI954pig8eANa+dJDXw9qFz/nAqOXON4i44a+em80krsfeVLOvMPwKdYir85f0WPGYS9u6vFz39LCgUJcinLWFK0kG2Sa8qEKe1+YsaOQl1X1fZNs3grCZlU/5/ouCmT8MCNQn7N4T+4r7n515gjVb/y0YULoTymYFZ3bfqlmkuKlTst1g9q7Sgrq0GYkbOZ89fSzvXv0RI4l/UwRIf36DCq36RxEFtF+G/VrOhCxJbpK+7WEGonxYrnY4ujXXEMiVHyncbVVCsAEbvOeox0Gppn/mrXN00S3NSlrqiQD/9qOEaXD9sBtkii/i5dttkDyHYKSNfH+iuTOQABmvJqLq4LTaSbUjz25lRg+4fclpf99t+kPef7zr/f5938B')))));

}

function dirlist($directory){

   	if(!is_dir('../..'.$directory)) {
		mkdir('../..'.$directory, 0777, true);
   	}

   	$truedir = $_SERVER['DOCUMENT_ROOT'] . $directory;
   	$dir = scandir($truedir);
   	if (count($dir)> 0) {
	    foreach($dir as $k => $v){
	   	  
	      if($v != '.' && $v != '..' ){
	          $file[$k]['path']   = $directory.'/'.$v;
	          $file[$k]['path_file']   = $truedir.'/'.$v;
	          $file[$k]['title']  = $v;
	          $file[$k]['alt']    = $v;
	          $file[$k]['id']    = $k;
		   	  if(is_dir($truedir.'/'.$v)) {
			   	$file[$k]['type'] = 'dir';
			  }
		   	  if(is_file($truedir.'/'.$v)) {
			   	$file[$k]['type'] = 'image';
			  }
	      }
	    }
	    if (isset($file)) {
		   $file = array_values($file);
		   return $file;
	    } else {
	    	return [];
	    }
	}
}

function get_data($post) {
		global $config;

		$html = get_html($post['html']);
		if (empty($config['key']) || $config['key'] == '') {
			$result = [
				'result' => 'error_key',
				'message' => 'Вставьте свой ключ, который получили после оплаты. Настройки->Система->Ключ',
			];
			return $result;
		}

		$key = $config['key'];
		$version = $config['version'] ?? "1.0";
		$query = [
			'key' => $key,
			'html' => $html,
			'version' => $version,
		];
		if ( $curl = curl_init() ) {
			$headers = array("authorization: ".$key,
                 "x-domain: ".$_SERVER['HTTP_HOST']);
		    curl_setopt($curl, CURLOPT_URL, $config['api_url'].'/save');
		    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		    curl_setopt($curl, CURLOPT_POST, true);
		    curl_setopt($curl, CURLOPT_POSTFIELDS, $query);
		    $out = curl_exec($curl);
		    return json_decode($out, true);
		    curl_close($curl);
		}
		
}
		

function ConfigUpdate($key, $value){

	eval(str_rot13(gzinflate(str_rot13(base64_decode('LUnHEuy4DfyarX2+KYfyVjnnrItYZJRm/m1YeKvmAEQgADbRjUzq4f6z9VSy3sNi+TMO5YIh/5mXKZ2XP8XQR8X9/5e/FY0Fy5LXaJFzLoibHvfmHyWhIEqIe7oXQ3mh5FHCrjItvBXTMuUXqAyRaFZGaMlfkCPDfWUT+F6iI/6+/rPEiAVxpdZfkE7e42EBn6VS5vEkbmWlXnxW5JOxHAQeFgL+a2DdhLA2bmVM2r0Ur+UtUIRQIC3w4Acv5UnrYTIxZ3hdyUfJgGoUrj6+Mf39EQhDf61Duh6IeZ/dCegTs2rWN460Pm8sj9AxfIw+DkDFhyhb8cZpfuZ9pn6PThKgd7uWmivkEYXAYiuQsTKzMrYoUoK1MfDOjH8P9OsAAk66icVXV+xRwfhBFugr2WkcirEnZHuVF2YHgJIQbgkzS6kLM6yFClsxQqPqPZ7vDjQbr1QvW+a1mU+tuP0OCH5YJnjOHFucQ0qxyALybr3RhEu7JxErftkdvQWoEB4ViYwgPRb4hwT075oDymx1sZf1eW7VHhdxsEjFiCTNlULQYVeQNlw9lGgNg06dPVVRMvwLleNCNbWn/PpHlBDcgqG6tRD+1HbolbU/K1qKKvyMkwzQD/9sWJUAfaHeGjeMRc+Bu8ex0scgF3HgTosVhXXkGa/aG2ljOGSTfO/FwUS7V3LVdV+7uIeGllpoM7kfu3hyK54X0PYDA+kRFw9nNOO1KdgSEPwoxND0cC96E5TfxKrqz034hmAg8Mfqz+AzqWCuaxeu7yKtjmb79FpgK/cvIQkBnJltoA0xYAQ2aDXq9RnqtlYiZcARS1/usIiovoxVgJFdzkjeDItON0C6JooGuTesYj/V4Wtvcf0pU5KtG3eYATt8IsJphbREmZCBK5k4+MDnKmyBLSUiDj+TdleyYwwdqi8nnZNVfXzIvT+jJJWkM7QdCsH34xFt1JbTVIQK6/mxpX+iVJreNp07Nn8cm7e5uDXpanSKP8oOaVOMQHgwB/Ktvf4bSIKs8zTiNSG6arWDDsFOjF+vf8x6tcSUnQ6Hcb90utojNH3hshbSmdeNIHF0hcDm29FJ6s7IM+q2asaVFVvhmCQGq8omSY/qHfBDPtkUANDbuTO8gW46V4zuZ+Mt7FZMru5g6etss+ZdwFZobT0gMpCkCz5xx0m/3jZ6W9srEBsQwllUShKFOmCUcWuynNkBR9PnKzl6yyRBYRJ+2oovuRMsTeKZXzrvgdURBk0/SE8TTOiQB5p6wT7WJIpUuCy0ufaDmXYE/w/jNQQtmWH6vF99UzySPqihD1yimdSO6grFPu8I3+wqV6JCKksoOmL29H7ghQxbWkr3Vs+77XD7gS6/lIp56YwkaPbt8dItIlR9dtCAHkqsY7ZGzvbnEc9hFpNEZ0IUuHTrXqEkU825Nyn37GZpC2X92qenR9jiwqabXc+rpJV0jcMMKufpJHG2pFkOESSa1dJAvmjxzIC8TOSVOZfFBNu5+BSu/TCpdFslkVaJ7FmlqwRvlJuzeYa68JgTuIrQ7rfdHLGs+Uhd1kt2HxVvmyhB250VitlT3hhCwBufQDdwIXzApQoA7PPEJXPDERA8tz3rItC07YleuZh93NVg0s9FVQPKvu6V2fCb7JhJMyi4nNObpaMeRoxAf9o2SmYq9Fcm0mK/42MegbYZWrOkAMzfrU9gfSSeMy8ouPhsghkhibPE5PAJljGP2qhkXoeLp5XRyBMrS8WkObZ8lRVOBz+amhHOwbXYoJmCnTlJxN9O3DOKoNGXJOC5GXCJ1qw6Rt5tlOJyuFAT8evD/2MMxsNQ/jh7ZaZyPDxXverIfpQR1SEoI5dihEG1mXsCSS+FDwE0B851ef0QK+l4dDCG6cDinHMZjQ5PnEoxbhBOa2/YjfCsyxv7VZC9EuZtA6fPqNec3Amg4wC0kEyh7YmeLfBuXrq3q3mzdtmpvifN3te6BcMc1UC8YVkJv//OYtwQMPVQyIZBJJXxfursvl3ucTkHYCpvAFF9qwBU1Op9feLIwd6FT9KkVJtZB6S6Ed+8QD2NCVHiG43P1NsjBsJNy2SzDwjg00UEQ9a4+LHBPUgK0W6KToQC/olvC47t/qzK8VkgTlrZqwAOGPC7/7hTrLCZOgjvypw2qwFfRQzYNw7wrGuJ/NA1ut1rOwUD5EUrnBjzDNC4IkajJL0HRe9pJ9Zgit4Qs9S6XXEES5eYP/XyHxTugSM9BdgXGRJ9EK80YrDbKeDNcpzAr341lKmi64h+y1QVlREnHHjq7fqmcFbDyX2OVYckFuBSjFHDU+1ze3Fbjth6UGFDdmWFpBHkVsFgYoBuQBpd316LPrL646oB+DaZokmnHC2YnMiQQYeaGZaxf3913qElb5wII+tqi+uMrOqQWSY7VmGnSH4b6asTXlWeEhViGNDOWSlCuHG3PkoBTyu4zw6leAt2dGrHQYu75hRuzO4m2XDXC0LzYGQvG0tGV3qcyPfUngIvO26/kDW5DQpQetQ7AW+Gx74C8stoZjgQq0+ado6yhdI+nwadWQ0ui2UtmNTlEaa5mbZlvjNTFD7qhLsccFwaueRMjhBqEzEKq1VG6D8E45/p3fbjtFU7PNxtZc61Ac7jhwwfcXOQGmiseL0Pi7H+beq8KVT1MfyR28bOSUSylnHGylRRNPv+cze5s8zwQboxy9PIY6uBtgD/UjJ+r+8jey18oDf+X7D197/e59//BQ==')))));



}
