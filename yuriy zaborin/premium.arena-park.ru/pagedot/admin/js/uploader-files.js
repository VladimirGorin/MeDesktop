$(document).ready(function() {

  var dropZone = $('#pagedot-dropZone')
    // Проверка поддержки браузером
  if (typeof(window.FileReader) == 'undefined') {
    dropZone.text('Не поддерживается браузером!');
    dropZone.addClass('error');
  }
  // Добавляем класс hover при наведении
  dropZone[0].ondragover = function() {
    dropZone.addClass('hover');
    return false;
  };
  // Убираем класс hover
  dropZone[0].ondragleave = function() {
    dropZone.removeClass('hover');
    return false;
  };
  // Обрабатываем событие Drop
  dropZone[0].ondrop = function(event) {
    event.preventDefault();
    dropZone.removeClass('hover');
    dropZone.addClass('drop');
    document.getElementById("pagedot-image").files = event.dataTransfer.files;
    for (var i = 0; i < 1; i++) {
      var file = event.dataTransfer.files.item(i);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // browser completed reading file - display it
        // console.log($('#imagePreview'),e.target.result);
        $('#pagedot-upload-image').trigger('submit');
      };
    }

  };


 
  function printMessage(destination, msg) {
 
    $(destination).removeClass();
 
    if (msg == 'success') {
      $(destination).addClass('alert alert-success').text('Файл успешно загружен.');
    }
 
    if (msg == 'error') {
      $(destination).addClass('alert alert-danger').text('Произошла ошибка при загрузке файла.');
    }
 
  }
 
$('#pagedot-upload-image').unbind('submit');
$('.btn-dot-files-upload').unbind('click');
$('#pagedot-image').unbind('change');

  $('.btn-dot-files-upload').click(function(){
    $('#pagedot-image').trigger('click');
  });

  $('#pagedot-image').change(function(){
    $('#pagedot-upload-image').trigger('submit');
    //readImage(this);
  });
 


$('#pagedot-upload-image').on('submit',(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type:'POST', // Тип запроса
      url: pagedot_dir+"/ajax/Pagedot.php",
      data: formData, // Данные которые мы передаем
      cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
      contentType: false, // Тип кодирования данных мы задали в форме, это отключим
      processData: false, // Отключаем, так как передаем файл
      success:function(json){
        //alert(json)
        //var data = JSON.parse(json);
        //data.forEach(function(index, item) {
          $('.pagedot-images-error').remove();
          $('.pagedot-file-items').prepend(json);

        //});
        //printMessage('#result', data);
      },
      error:function(data){
        console.log(data);
      }
    });
  }));

});




function loadMore(e, offset, take) {
    var btn = $(e);
    var offset = btn.attr('data-offset');
    var take   = btn.attr('data-take');
    var form   = $('form#pagedot-upload-image');
    $.ajax({
        type:'GET', // Тип запроса
        url: '/admin/fileload/' + offset + '/' + take,
        data: form.serialize(),
        success:function(json){
          var data = JSON.parse(json);
          if (data.result == 'ok') {
            $('.pagedot-file-items').append(data.message);
            var takeNew = parseFloat(offset) + parseFloat(take);
            if (data.message != '') {
              btn.attr('data-offset', takeNew);
            } else {
              btn.html('Больше файлов нет...');
            }
          }
        },
        error:function(data){
          console.log(data);
        }
      });
}

function PageDotFileRemove(id, path) {
    res = confirm('Удалить?');
    if (res) {
      $.ajax({
        type:'POST', // Тип запроса
        url: pagedot_dir+"/ajax/Pagedot.php",
        data: {
          route: 'delete-file',
          id: id,
          path: path,
        },
        success:function(json){
          var data = JSON.parse(json);
          if (data.result == 'ok') {
            $('#pagedot-file-item-' + id).remove();
          }
        },
        error:function(data){
          console.log(data);
        }
      });
    }
}

function PageDotFileChoose(e, path, type = false) {
  if (!type) {
    var type = $('.PageDotFileType').val();
  }
  $('.js--modal').modal('hide');

  if (type == 'backgroundImage') {
    var element = global_pagedot_element;
    var tag = $(element)[0].tagName;
    $(element).css('backgroundImage', 'url('+path+')');
    $('#pagedot-style-value-backgroundImage').val(path);
    $('.pagedot-control-panel-img').html('<img src="'+path+'" alt="" class="pagedot-control-panel-backgroundImage w-100">');
    $('#pagedot-style-value-backgroundImage').trigger('blur');
    
    return false;
  }

  if (type == 'ogImage') {
    $('#pagedot-style-value-ogImage').val(path);
    $('.pagedot-control-panel-img-ogImage').html('<img src="'+path+'" alt="" class="pagedot-control-panel-ogImage w-100">');
    $('#pagedot-style-value-ogImage').trigger('blur');
    
    return false;
  }
  
  if (type == 'image') {
    var element = global_pagedot_element;
    var tag = $(element)[0].tagName;
    if (tag != 'IMG') {
      element = element.find('img');
      tag = $(element)[0].tagName;
    }
    if (tag == 'IMG') {
      $(element).attr('src', path);
      PagedotInit($(element), 'src', path);
    }
  }
}
