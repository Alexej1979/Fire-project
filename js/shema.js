      var posL = 0; // координата левая
      var posT = 0; // координата верхняя
      var i = 0;
      var imgClass = "";
      var blockImg = "";
      var flag;    // переключатель значения был ли элемент удален (добавлен) или нет
      var text="";
      var legendPriborRemove="";
      var numberPribor = 1; // номер прибора
      var numberShleif = 1; // номер шлейфа
      var numberElement =0; // номер извещателя в шлейфе
      var blockText="";
      var blockDiv="";
      var number=0;
      var img='';
      var flag2=0;
      var backgroundImg;
      var prj =  window.location.search.toString().charAt(4); // номер текущего - выбранного проекта
      var lengthShlif=""; // длинна шлейфа
      var noPPK = 0;
           
 /* ---------- drag & drop ---------- */


    function makeImgDragable(blockImg, flag, selectPribor, numberElement)
    {  
       blockText = $("<span>"); 
       var option = $("<option>");
       
        
        blockImg.draggable
        ({
          
           grid: [20,20], // сетка перетаскивания в 20 пикселей
           helper: "clone", // создание клона перетаскиваемого элемента для визуализации           
         
           stop: function (event, ui)   // отработка завершения перемещения элемента
           {
                numberPribor = $("select.prybor option:selected").html();               
                numberShleif = $("select.shleif").val();
                if(selectPribor=="PPK")                    // включаем выбор номера приборов
                {  
                    $(".prybor, .shleif").prop('disabled', false).css("color","white");                    
                    noPPK = 1;                      
                }
                
                
                posL = ui.offset.left.toFixed()-$(".imageScheme").offset().left;     // определяем координаты элемента относительно нашей структурной схемы (.imageSheme), где (ui.offset.left.toFixed() - координаты перетаскиваемого элемента относительно документа). $(".imageScheme").offset() - координаты div схемы относительно документа)
                posT = ui.offset.top.toFixed()-$(".imageScheme").offset().top+blockImg.height()/2.3;
                                                
             if (posT  < 0 || posT > $(".imageScheme").height() || posL < 0 || posL > $(".imageScheme").width()) // проверка координат (положение перетаскиваемого элемента) относительно структурной схемы
            {
                return;
            }
            
       if (flag==true)    // переменная flag отвечает за то, был ли тот же самый элемент перетащен вновь или удален (false) или нет (true)
            {               
                
               console.info("attr= "+$(".imageScheme .PPK span").html())
              
                   if ( $(".imageScheme").find(".PPK").length==0)    // если мы перетаскиваем первый ППК на схему - добавляем в селект выбора элементов первый прибор
                {
                    $(".prybor>option").remove();
                    $(".prybor").append( $("<option>").attr("value",1).html("0"));
                    $(".prybor").append( $("<option>").attr("value",1).html("1")); 
                } 
                   
                   if ( $(".imageScheme ."+selectPribor).length==0)  // здесь мы выщитываем номер извещателя, если он новый на схеме то номер =1 если нет, то вычисляем функцией
                {                   
                   numberElement = 1;   
                  
                }                
                else
                {                  
                    numberElement = matchElement(selectPribor, numberPribor, numberShleif); 
                }
                
              /*  if (noPPK==0)                 
                    numberPribor = 0;*/
                
                if((selectPribor=="PPK") && (matchElement("PPK", numberPribor, numberShleif)>1))
                {                    
                    $(".prybor").append( $("<option>").attr("value",numberElement).html(numberElement)); 
                      
                  //  console.info ($(".prybor option:eq(1)").data("PPK"));
                }
                            
                blockDiv = $("<div>").addClass(selectPribor)
                        .data({"selectPribor":selectPribor, "numberElement": numberElement, "numberPribor": numberPribor, "numberShleif":numberShleif, "posT":posT, "posL":posL}).css
                                    ({
                                        "position":"absolute"

                                    }).offset
                                    ({
                                       top:posT,
                                       left:posL
                                    });  
                                    
               // console.info(blockImg);
                img = blockImg.clone().css
                                    ({
                                       "top": "25px",
                                       "left": "15px",
                                       "height": "20px"
                                    });
                $(".imageScheme").append(blockDiv);
                if(selectPribor=="PPK")
                     blockDiv.append((blockText).html(numberElement+selectPribor));
                else
                     blockDiv.append((blockText).html(numberPribor+selectPribor+numberShleif+"."+numberElement));              
                
                blockDiv.append(img); 
                
           /*     toSave[toSave.length] = 
                    {
                            "selectPribor":selectPribor,
                            "numberPribor":parseInt(numberPribor),
                            "numberShleif":parseInt(numberShleif),
                            "numberElement":numberElement,
                            "posL":posL,
                            "posT":posT                            
                    };     */                
              //     console.log(toSave);
                   
                   console.info (blockDiv.attr('class'));
                   removeElement(img,blockDiv,numberElement);
                   makeImgDragable(img, false);
            }
            else // если мы перетаскиваем элемент на схеме
            {
                 
                $(this).parent().css   // находим родителя перетаскиваемо элемента - это div от нашего img
                                    ({
                                       "top": posT, // меняем ему координаты с помощью css. С помощью offset не получается - считает заново с 0,0
                                       "left": posL
                                    });
                   
               $(this).parent().data({"posT":posT, "posL":posL});
              /*   toSave[toSave.length] = 
                    {
                            "selectPribor":selectPribor,
                            "numberPribor":parseInt(numberPribor),
                            "numberShleif":parseInt(numberShleif),
                            "numberElement":numberElement,
                            "posL":posL,
                            "posT":posT                            
                    };    */  
            };          
        }
    });
};

     // ---------- Вычисление номера последнего извещателя на схеме - чо бы узнать какой номер извещателя ставить следующим с учетом номера прибора и номера шлейфа ---------//
     
  
   function  matchElement(selectPribor, numberPribor, numberShleif)
   {
       console.info("numberPribor="+numberPribor);
       
      var numbersElements=[];   
      var selectPribor1 = ".imageScheme ."+selectPribor;      
            $(selectPribor1).each(function()
        {       
            
            if (selectPribor=="PPK")
            {              
                numbersElements[numbersElements.length] = $(this).data("numberElement");
            }
            else if ( ($(this).data("numberPribor")==numberPribor ) && ($(this).data("numberShleif")==numberShleif) )
                numbersElements[numbersElements.length] = $(this).data("numberElement");               
        });
    
     
      numbersElements.sort(function(a, b){return a-b;});    // сортировка массива числе по возрастанию
      
      
      if (numbersElements[0]!==1)
          return 1;
      
      for (var j=1; j<numbersElements.length; j++)
      {
          if ((numbersElements[j]-numbersElements[j-1]) !== 1)      // если есть пропуски в массиве (удаленные приборы - извещатели в середине массива)                
              return numbersElements[j-1]+1;                   
      }
      
      return numbersElements.length+1;
   }

               
/* ---------- Удаление элемента (на котором клацнули правой кнопкой мыши) ---------- */


    function removeElement(img,blockDiv,number) 
    {
    $(img).bind("mousedown", function(event)
                    {
                        if(event.button == 2)
                        {                          
                         
                         if (blockDiv.attr('class')=="PPK")                      // удаляем прибор с выпадающего списка option
                             $(".prybor>option[value='"+number+"']").remove();
                             
                           
                             blockDiv.remove();
                          
                     }
                    });    
    }; 
      
      /* ---------- Отработка на загрузке страницы ---------- */
                
              $(function()
         { 
             
              $(".sidebar-menu li:last-child").css({"pointer-events":"none", "opacity":"0.4"});
             
             $(".startElement").each(function()
          {  
              makeImgDragable($(this).find("img"), true, $(this).data("selectpribor")); 
          });     
          
            $(".prybor, .shleif").prop('disabled', true).css("color","red");
               
             var load = 
            {
                "userid":$.cookie('UserId'),
                "project": prj
            };
                 //-------- Забираем данные с сервера и продолжаем работать на онлоаде когда есть положительный ответ с сервера -------//
                 
          $.post("http://l.408dev.com/Fire-project/script.php", load,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
          .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
              {   
                                                                       // TODO крутилка во время ожидания ответа сервака!
              
              if (a.data.length==0)
                  
              {     
                  backgroundImg = "http://4sport.ua/_upl/2/1440/2.jpg";  
              }
      
            else
              {    
                backgroundImg = a.data[a.data.length-1].img;       // TODO если мы на серваке уже сохраняли проект, нужно добавить на черетеж сохраненные извещатели!
                onLoad(a.data);                
              }    
              
              
          $(".imageScheme").css
                    ({
                     "background": "url("+backgroundImg+") no-repeat",
                     "background-size": "100% 80%"
                    });
           
             // console.info(backgroundImg);
            
             
             $(".userNameFromCookie1").html($.cookie("Name"));
             $(".linkToShemaId").attr("href",location.href);                 
             var titlePrj = ["КС ИВДЕЛЬСКОЕ ЛПУ", "КС ТОРБЕЕВСКАЯ", "ГРС МОСТРАНСГАЗ", "КУЩЕВСКОЕ ПХГ"];          
               
           if(prj!=="")
           {
               var blueTitlePrj=$("<span>").addClass("lite").html(titlePrj[prj-1]);
               $("a.logo").html("ПРОЕКТ №"+prj+" ").append(blueTitlePrj);
           };
           
          $(".graphClick").on("click", function()
          {          
              $(".graphClick").attr('href', "http://l.408dev.com/Fire-project/graph.html?id="+prj);
          });
          
          $(".projectClick").on("click", function()
          {   
             
              $(".projectClick").attr('href', "http://l.408dev.com/Fire-project/project.html?id="+prj);
          });
          
          $(".specificationClick").on("click", function()
          {                 
              $(".specificationClick").attr('href', "http://l.408dev.com/Fire-project/specification.html?id="+prj);
          });
          
          
          /* ---------- EMPTY SHEMA ---------- */
          
         
         
         
              $('.empty').on('click', function ()                        
              {
                 
        
                    //  $("body").append(div1);
                  
                  
                  
                  
                  $("body").append(buildModal("Удалить все элементы со схемы?", "Очистить схему",1));                                               // вызываем модальное окно
                  $('#Modal1').modal({"backdrop":"static"});
                  
                  
                  $(".saveChange").on("click", function(){
                      
                      $(".imageScheme div").remove();        // удаляем все элементы со схемы
                      $(".prybor>option:not(:eq(0))").remove();  // очищаем выбор приборов кроме первого   $(".prybor>option:not(:[value='onload'])").remove();  // очищаем выбор приборов кроме первого
                      $("#exampleInputAmount").val("");         // очищаем длину кабелей
                  }); 
               //  $("body").append(div1);
               //   $(this).attr("data-dismiss","modal");
                  //$('#myInput').focus();
                  
             });

                                                             // добавляем бутстраповское окно
         
        
            
          //$(".imageScheme div").remove();
              
      
          
          
          
          /* ---------- SAVE ---------- */
          
          $(".eborder-top .floppy").on("click",function() 
            {
               $("body").append(buildModal("Сохранить работу на сервер?","Сохранить",2));                                               // вызываем модальное окно
                  $('#Modal2').modal({"backdrop":"static"});
                  
                  
                  $(".saveChange").on("click", function()                           // кнопка Да, сохранить на сервер
                    {
                      if ($("#exampleInputAmount").val()=="" || $("#exampleInputAmount").val()=="0" )                          // если количество шлейфа не введено
                        {
                            $("body").append(buildModal("Введите длину шлейфа!","Ошибка длинны шлейфа",4));
                            $('#Modal4').modal({"backdrop":"static"});
                       
                            $(".cancelChange").on("click", function()                   // кнопка Нет, на вводе количества шлейфа
                            {
                          
                                $("#exampleInputAmount").val("0");                                     // устанавливаем длину шлейфа
                                lengthShleif = 0;
                                projectData = makeProjectData();    
                                
                                $.post("http://l.408dev.com/Fire-project/script.php", projectData,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
                                                                         .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
                                                                        {   
                                                                            //  console.log(a);                                                        
                                                                        }).fail(function() // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
                                                                               {                            
                                                                                   console.log("нет связи с сервером"); 
                                                                               });
                                
                           });
                           
                          /* $(".saveChange").on("click", function()                   // кнопка Да, на вводе количества шлейфа
                            {
                          
                                lengthShleif = $("#exampleInputAmount").val(); 
                                projectData = projectData();                                           
                           });*/
                         
                     } 
                  else
                    {
                        lengthShleif = $("#exampleInputAmount").val();                                     // устанавливаем длину шлейфа          
                        
                        projectData = makeProjectData();    
                                
                                $.post("http://l.408dev.com/Fire-project/script.php", projectData,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
                                                                         .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
                                                                        {   
                                                                            //  console.log(a);                                                        
                                                                        }).fail(function() // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
                                                                               {                            
                                                                                   console.log("нет связи с сервером"); 
                                                                               });
                        
                    }
                    
                    
                    
                    
                    
                    }).fail(function()                                // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
                        {                            
                            console.log("нет связи с сервером"); 
                        });
                
            });
        });          
    
     /* ---------- Account Exit ---------- */
    
    $(".exitAccount").css("cursor","pointer");
    $(".exitAccount").on("click", function()
    {
        
        $("body").append(buildModal("Закончить работу над проектом?","Выход",3));                                               // вызываем модальное окно
        $('#Modal3').modal({"backdrop":"static"});
        
        $(".saveChange").on("click", function()
        {
        $.cookie("Name", "");  
         $.cookie("UserId","");
        $(location).attr('href', "http://l.408dev.com/Fire-project/index.html");    
    });    
    });
    
   /* ---------- Project page ---------- */
   
   $(".project").on("click", function()
   {
       $.cookie("Project", "");   
   });
   
   
});
    
    
   /* ---------- Load Schema ---------- */
   
   function onLoad(data)
   
      {     
          
       // восстанавливаем на онлоаде сохраненные ранее извещатели
          var blockDivonLoad=[];
          if (data[0].numberPribor == 0)
          {
           //   $(".prybor").append( $("<option>").attr("value",1).html(1)); 
          }
          for (var i=0; i<data.length-1; i++)
          {
          //  toSave[i] = data[i];
        //    console.info(data[i].selectPribor,data[i].numberElement,data[i].numberPribor,data[i].numberShleif );
            
            blockDivonLoad[i] = $("<div>").addClass(data[i].selectPribor)
                          .data({"selectPribor":data[i].selectPribor, "numberElement": parseInt(data[i].numberElement), "numberPribor": data[i].numberPribor, "numberShleif": data[i].numberShleif, "posL":data[i].posL, "posT":data[i].posT}).css
                                      ({
                                          "position":"absolute"

                                      }).offset
                                      ({
                                         top:data[i].posT,
                                         left:data[i].posL
                                      });
                                      
                if(data[i].selectPribor=="PPK")
                {
                   //$(".prybor>option:not(:eq(0))").remove();;
                 
                   blockDivonLoad[i].append($("<span>").attr("value",data[i].numberElement).html(data[i].numberElement+data[i].selectPribor));                                                     
                   $(".prybor, .shleif").prop('disabled', false).css("color","white");
                  
                   $(".prybor").append($("<option>").attr("value",data[i].numberElement).html(data[i].numberElement));
                }
                else
                     blockDivonLoad[i].append($("<span>").html(data[i].numberPribor+data[i].selectPribor+data[i].numberShleif+"."+data[i].numberElement));    
                 
                
                 img = $("."+data[i].selectPribor+" img").clone().css
                                    ({
                                       "top": "25px",
                                       "left": "15px",
                                       "height": "20px"
                                    });
                                    
         var r = blockDivonLoad[i].append(img);
                                      
         $(".imageScheme").append(r);
         
         makeImgDragable(img, false, data[i].selectPribor); 
            
         
         removeElement(img,blockDivonLoad[i],data[i].numberElement);
                
         }
      }
      
     
      //------------------- создем модальное бутстраповское окно ------------
      
function buildModal(textHeader,textTitle,currentId)
{
    var buttonModal = $("<button>").attr("type","button").addClass("close")
                .attr("data-dismiss","modal").attr("aria-label","Close")
                .append($("<span>").attr("aria-hidden","true"));                 //.html("x"))
        var h4 = $("<h4>").addClass("modal-title").html(textTitle);
        var div4 = $("<div>").addClass("modal-header").append(buttonModal).append(h4);
        var p = $("<p>").html(textHeader).css(
                {
                    "text-align": "center",
                    "font-size": "16px",
                    "font-weight": "800",
                    "padding-top": "30px"                    
                });        
        var div5 = $("<div>").addClass("modal-body").append(p);
        var div7 = $("<button>").attr("type","button").addClass("btn btn-danger cancelChange").attr("data-dismiss","modal").html("Нет").css(
                                                            {"position":"absolute",
                                                            "left": "10px"}
                                                            );
        var div8 = $("<button>").attr("type","button").addClass("btn btn-primary saveChange").attr("data-dismiss","modal").html("Да");
        var div6 = $("<div>").addClass("modal-footer").append(div7).append(div8);
        var div3 = $("<div>").addClass("modal-content").css(
                                                            {"width": "400px"                                                            
                                                            })
                .append(div4).append(div5).append(div6);
        var div2 = $("<div>").addClass("modal-dialog").append(div3);
        var div1 = $("<div>").addClass("modal fade").append(div2).attr("id","Modal"+currentId);
        
        return div1;
}
   
   
   //-------------Make data projectData for Save to Server ----------------//
   
function makeProjectData()
{
    var toSave=[];
    $(".imageScheme div").each(function()
    {
      if ($(this).data("numberPribor")!==undefined)
          {
              toSave[toSave.length] =                                   // собираем массив объектов для передачи на сервак
                  {
                      "selectPribor":$(this).data("selectPribor"),
                      "numberPribor":$(this).data("numberPribor"),
                      "numberShleif":$(this).data("numberShleif"),
                      "numberElement":$(this).data("numberElement"),
                      "posL":$(this).data("posL"),
                      "posT":$(this).data("posT")   
                  };                
          }
    });
    for (var k=0; k<toSave.length; k++)
    {
    if ( (toSave[k].img!==undefined)) // ищем и если находим - удаляем с массива объекта элемент массива, который содержит в себе ссылку на картинку
       delete toSave[k].img;   
    if ( (toSave[k].lengthShleif!==undefined)) // ищем и если находим - удаляем с массива объекта элемент массива, который содержит в себе ссылку на картинку
       delete toSave[k].lengthShleif; 
    };
    toSave[toSave.length] = 
        {                                        
            "img":backgroundImg,  // всегда записываем картинку в последний элемент массива объектов!
            "lengthSleif":lengthShleif,
            "allPPK":$(".imageScheme .PPK").length
        };  
    var projectData =                                                    // собираем объект для передачи на сервер
    {
    "userid": $.cookie('UserId'),
    "project":parseInt(prj),
    "projectData":toSave                                     // наш массив объектов натасканных на картинку извещателей    
    };

    
 return projectData;  
};