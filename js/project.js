      /* ---------- On load ---------- */
          
        $(function()
        {
             /* ---------- Project check ---------- */
          
             if(window.location.search.toString().charAt(4)=="")
                {
                    console.info("egtrgrt");
                    $(".sidebar-menu li:not(:first-child)").css({"pointer-events":"none", "opacity":"0.4"});
                }   
                
             else
             {
             $(".layer-"+window.location.search.toString().charAt(4)).css("border","5px solid #E0C9C9");
             $(".poster"+window.location.search.toString().charAt(4)).css("border","5px solid #D87979");
             $(".sidebar-menu li:last-child").css({"pointer-events":"none", "opacity":"0.4"});
             }
         
         
         /* ---------- Project Title ---------- */ 
         
          var prj =  window.location.search.toString().charAt(4);
          var titlePrj = ["КС ИВДЕЛЬСКОЕ ЛПУ", "КС ТОРБЕЕВСКАЯ", "ГРС МОСТРАНСГАЗ", "КУЩЕВСКОЕ ПХГ"];          
               
           if(prj!=="")
        {
            var blueTitlePrj=$("<span>").addClass("lite").html(titlePrj[prj-1]);
            $("a.logo").html("ПРОЕКТ №"+prj+" ").append(blueTitlePrj);
        }
        else
        {
            var blueTitlePrj=$("<span>").addClass("lite").html('Стадия Проект');
            $("a.logo").html("ПРОЕКТ №"+prj+" ").append(blueTitlePrj);
        }
          
           /* ---------- menu click ---------- */
          
           $(".graphClick").on("click", function()
          {            
              $(".graphClick").attr('href', "http://l.408dev.com/Fire-project/graph.html?id="+window.location.search.toString().charAt(4));
          });
          
    $(".shemaClick").on("click", function()
    {      
        
        $(".shemaClick").attr('href', "http://l.408dev.com/Fire-project/shema.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".projectClick").on("click", function()
    {   
        if (window.location.search.toString().charAt(4)!=="")
        {
           
           $(".projectClick").attr('href', "http://l.408dev.com/Fire-project/project.html?id="+window.location.search.toString().charAt(4));
        }
        else
        {
          
           $(".projectClick").attr('href', "http://l.408dev.com/Fire-project/project.html");
        }
    });
    
    $(".specificationClick").on("click", function()
    {   
        $(".specificationClick").attr('href', "http://l.408dev.com/Fire-project/specification.html?id="+window.location.search.toString().charAt(4));
    });
          
          
       
          
            
            //-------------- picture on Project 1 --------//
                          
var $poster1 = $('.poster1'),
$shine = $('.shine'),
$layer = $(".layer-1"),
w = $poster1.width(), //window width
h = $poster1.height(); //window height
var $this;
$('.poster1').on('mousemove', function(e) 
{
var offsetX = 0.5 - e.pageX / w, //cursor position X
offsetY = 0.5 - e.pageY / h, //cursor position Y
dy = e.pageY - h / 2, //@h/2 = center of poster
dx = e.pageX - w / 2, //@w/2 = center of poster
theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
angle = theta * 180 / Math.PI - 90, //convert rad in degrees
offsetPoster = $poster1.data('offset'),
transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

//get angle between 0-360
if (angle < 0) {
angle = angle + 360;
}

//gradient angle and opacity
$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

//poster transform
$poster1.css('transform', transformPoster);

//parallax foreach layer
$layer.each(function() {
$this = $('.poster1'),
offsetLayer = $this.data('offset')+10 || 0,
transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

$this.css('transform', transformLayer);
});

});   

 //-------------- tooltips on picture project --------//
           
           $('.poster1').poshytip
           ({ 
               followCursor: true,
               slide: false,
               content: function(updateCallback) 
               {
                   window.setTimeout(function()
                   {
                       updateCallback('КС ИВДЕЛЬСКОЕ ЛПУ');
                   }, 1000);
                   return 'Проект....';
               }
           });
           
           
            $('.poster2').poshytip
           ({ 
               followCursor: true,
               slide: false,
               content: function(updateCallback) 
               {
                   window.setTimeout(function()
                   {
                       updateCallback('КС ТОРБЕЕВСКАЯ');
                   }, 1000);
                   return 'Проект....';
               }
           });
           
           $('.poster3').poshytip
           ({ 
               followCursor: true,
               slide: false,
               content: function(updateCallback) 
               {
                   window.setTimeout(function()
                   {
                       updateCallback('ГРС МОСТРАНСГАЗ');
                   }, 1000);
                   return 'Проект....';
               }
           });   

           $('.poster4').poshytip
           ({ 
               followCursor: true,
               slide: false,
               content: function(updateCallback) 
               {
                   window.setTimeout(function()
                   {
                       updateCallback('КУЩЕВСКОЕ ПХГ');
                   }, 1000);
                   return 'Проект....';
               }
           });  
          

$('.poster').on('mouseleave', function() 
{
    
    $shine.css('background', '');
    $poster.css('transform', "");
    $this.css('transform', "");
});

                
   
            //-------------- picture on Project 2 --------//
                          
var $poster2 = $('.poster2'),
$shine2 = $('.shine2'),
$layer2 = $('.layer-2'),
w = $(window).width(), //window width
h = $(window).height(); //window height
var $this2;
$('.poster2').on('mousemove', function(e) 
{
var offsetX = 0.5 - e.pageX / w, //cursor position X
offsetY = 0.5 - e.pageY / h, //cursor position Y
dy = e.pageY - h / 2, //@h/2 = center of poster
dx = e.pageX - w / 2, //@w/2 = center of poster
theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
angle = theta * 180 / Math.PI - 90, //convert rad in degrees
offsetPoster = $poster2.data('offset'),
transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

//get angle between 0-360
if (angle < 0) {
angle = angle + 360;
}

//gradient angle and opacity
$shine2.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

//poster transform
$poster2.css('transform', transformPoster);

//parallax foreach layer
$layer2.each(function() {
$this2 = $(this),
offsetLayer = $this2.data('offset')+10 || 0,
transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

$this2.css('transform', transformLayer);
});

});  

$('.poster2').on('mouseleave', function() 
{
    
    $shine2.css('background', '');
    $poster2.css('transform', "");
    $this2.css('transform', "");
});
            
  //-------------- picture on Project 3 --------//
                          
var $poster3 = $('.poster3'),
$shine3 = $('.shine3'),
$layer3 = $('.layer-3'),
w = $(window).width(), //window width
h = $(window).height(); //window height
var $this3;
$('.poster3').on('mousemove', function(e) {
var offsetX = 0.5 - e.pageX / w, //cursor position X
offsetY = 0.5 - e.pageY / h, //cursor position Y
dy = e.pageY - h / 2, //@h/2 = center of poster
dx = e.pageX - w / 2, //@w/2 = center of poster
theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
angle = theta * 180 / Math.PI - 90, //convert rad in degrees
offsetPoster = $poster2.data('offset'),
transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

//get angle between 0-360
if (angle < 0) {
angle = angle + 360;
}

//gradient angle and opacity
$shine3.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

//poster transform
$poster3.css('transform', transformPoster);

//parallax foreach layer
$layer3.each(function() {
$this3 = $(this),
offsetLayer = $this3.data('offset')+10 || 0,
transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

$this3.css('transform', transformLayer);
});

});        

$('.poster3').on('mouseleave', function() 
{
    
    $shine3.css('background', '');
    $poster3.css('transform', "");
    $this3.css('transform', "");
});
            
            //-------------- picture on Project 4 --------//
                          
var $poster4 = $('.poster4'),
$shine4 = $('.shine4'),
$layer4 = $('.layer-4'),
w = $(window).width(), //window width
h = $(window).height(); //window height
var $this4;
$('.poster4').on('mousemove', function(e) {
var offsetX = 0.5 - e.pageX / w, //cursor position X
offsetY = 0.5 - e.pageY / h, //cursor position Y
dy = e.pageY - h / 2, //@h/2 = center of poster
dx = e.pageX - w / 2, //@w/2 = center of poster
theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
angle = theta * 180 / Math.PI - 90, //convert rad in degrees
offsetPoster = $poster2.data('offset'),
transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

//get angle between 0-360
if (angle < 0) {
angle = angle + 360;
}

//gradient  angle and opacity
$shine4.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

//poster transform
$poster4.css('transform', transformPoster);

//parallax foreach layer
$layer4.each(function() {
$this4 = $(this),
offsetLayer = $this4.data('offset')+8 || 0,
transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

$this4.css('transform', transformLayer);
});

});                 
            
     $('.poster4').on('mouseleave', function() 
{
    
    $shine4.css('background', '');
    $poster4.css('transform', "");
    $this4.css('transform', "");
});       
            
            
         $(".userNameFromCookie").html($.cookie("Name"));
            
        $(".knob").knob({
          'draw' : function () { 
            $(this.i).val(this.cv + '%');
          }
        });
      

      //carousel
      
          $("#owl-slider").owlCarousel({
              navigation : true,
              slideSpeed : 300,
              paginationSpeed : 400,
              singleItem : true

          });

      //custom select box

      
          $('select.styled').customSelect();
     
	  
	  /* ---------- Map ---------- */
	
	  $('#map').vectorMap
          ({
	    map: 'world_mill_en',
	    series: {
	      regions: [{
	        values: gdpData,
	        scale: ['#000', '#000'],
	        normalizeFunction: 'polynomial'
	      }]
	    },
		backgroundColor: '#eef3f7',
	    onLabelShow: function(e, el, code){
	      el.html(el.html()+' (GDP - '+gdpData[code]+')');
	    },
            scaleColors: ['#C8EEFF', '#0071A4'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false,
    markerStyle: {
      initial: {
        fill: '#F8E23B',
        stroke: '#383f47'
      }
    },
    backgroundColor: 'white',
    markers: [
      {latLng: [55.4507, 37.3656], name: 'Мострансгаз'},
      {latLng: [60.3744, 60.2040], name: 'Ивдельское ЛПУ'},
      {latLng: [54.141702, 43.260603], name: 'КС Торбеевская'},
      {latLng: [46.546991, 39.829494], name: 'Кущевское ПХГ'}      
    ]
    });
    
   /* ---------- COOKIE ---------- */ 
    
    
                        
   // $.cookie("Project", "");
    console.info("Password="+$.cookie('Password'));
    console.info("Name="+$.cookie('Name'));     
    $(".selectProject").on("click", function()
    {
        
        var i = $(this).data('offset');
        $.cookie('Project', i);       
       $(location).attr('href', "http://l.408dev.com/Fire-project/shema.html?id="+i);
    });
    
    
    /* ---------- Account Exit ---------- */
    
    $(".eborder-top>a").css("cursor","pointer");
    $(".toIndex").on("click", function()
    {
        $.cookie("UserId","");
        $.cookie("Name", "");        
        $(location).attr('href', "http://l.408dev.com/Fire-project/index.html");    
    });
    
    });
