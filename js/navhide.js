    //Codigo Para ajustar logo
var scrolllast = 0;
    $(document).scroll(function(){
        var scrollatual = $(window).scrollTop();
        if(scrollatual > 260 && scrolllast < scrollatual){
            $("#teste").fadeOut();
        }
        if (scrolllast > scrollatual){
            $("#teste").fadeIn(); 
        }
        scrolllast = scrollatual;
        });