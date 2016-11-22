$(document).ready(function(){ 
    $('.js7').click(function(){
        $('.back_black_7').fadeIn();
        $('body').css('overflow','hidden');
        $('.back_black').css('overflow-y','auto');
    });
    $('.js-close-form').click(function(){
        $('.back_black_7').fadeOut();
        $('body').css('overflow','auto');
    });
    $(document).on('click', '.js-close-form', function(){ 
    $('.back_black_7').fadeOut();
        $('body').css('overflow','auto');
    });   

    
$('input').keyup(function(){
    $(this).css({'background':'#FFF'});
});    

$('form').find('.submit').click(function(){
        
        var form=$(this).parent();
        var button=$(this);
        
        var form_send=true;
      
        $(this).parent().find('input').each(function(){

            var value=$(this).val();
            if(value.length==0){
                $(this).css({'background':'tomato'});
                form_send=false;
            }
          
        }); 
         
        if(form_send==true){
            $.ajax({
                type     :'POST', 
                cache    : false,
                data: form.serialize(),
                url  : 'post.php',
                success  : function(response) { 
                    $(form).html('<div class="thanks">Спасибо! Заявка принята!</div><i class="fa fa-close js-close-form"></i>');
                }
            });            
        }
        
    });
$(".side-menu-trigger").click(function(){
    $(".side-menu").animate({marginLeft: '0px'});
		$(".volume-slider").animate({marginTop: '0px'}, 500);
}); 

$(".side-menu li a, .side-menu .close").click(function(){
    $(".side-menu").animate({marginLeft: '-310px'});
}); 

$('.volume-slider input[type="range"]').on('input', function () {
            var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
            console.log(this.min);
            $(this).css('background', '-webkit-linear-gradient(left, #e74c3c 0%, #e74c3c ' + percent + '%, #999 ' + percent + '%)');
        });

$(".volume-slider").slider({
    min: 0,
    max: 100,
    value: 0,
		range: "min",
		animate: true,
    slide: function(event, ui) {
      setVolume((ui.value) / 100);
    }
});

function setVolume(myVolume) {
    var myMedia = document.getElementByClass('audio-avalanche');
    myMedia.volume = myVolume;
}
});  
(function() {

  // lodash - основная функция для библиотеки
  function lodash(value) {
    // ...
  }

  // вспомогательная переменная
  var version = '2.4.1';
  // ... другие вспомогательные переменные и функции

  // код функции size, пока что доступен только внутри
  function size(collection) {
    return Object.keys(collection).length;
  }

  // присвоим в lodash size и другие функции, которые нужно вынести из модуля
  lodash.size = size
  // lodash.defaults = ...
  // lodash.cloneDeep = ...

  // "экспортировать" lodash наружу из модуля
  window._ = lodash; // в оригинальном коде здесь сложнее, но смысл тот же

}());

