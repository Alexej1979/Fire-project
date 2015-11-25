$(function()
{        
    var prj =  window.location.search.toString().charAt(4);    
    var load = 
            {
                "userid":$.cookie('UserId'),
                "project": prj
            };
                 //-------- Забираем данные с сервера -------//
                 
    $.post("http://l.408dev.com/Fire-project/script.php", load,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
          .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
              {   
                   if ( a.data.length == 1) 
                  {
                     // $(".row").append($("<strong>").html("Добавьте элементы на структурной схеме и сохраните").css("padding-left","50px"));
                      $('#modalSpecification').modal({"backdrop":"static"});
                      $(".modal-dialog").css("left","0%");
                      $(".returnToShema").on("click",function()
                      {
                          console.info("grt")
                          $(location).attr('href', "http://l.408dev.com/Fire-project/shema.html?id="+window.location.search.toString().charAt(4));                          
                          
                      });
                  }
                  
                  console.log(a);  
                  //console.log(a.data);  
                //  console.log(a.data[a.data.length-1].allPPK);
                  
                //  console.log(a.data.length-1);
                  var specificationName = ["","С2000-КДЛ", "СИГНАЛ-20П","Яхонт-16И","ВЭРС-ПК-16"];                  
                  var specificationAdress = ["","ЗАО 'Болид' г. Королев","ЗАО 'Болид' г. Королев","ООО 'Спецприбор' г.Казань","ООО 'МПП ВЭРС' г.Новосибирск"];                
                  var specificationBTHSumm=[];
                  var specificationBTKSumm=[]; 
                  var specificationBTMSumm=[]; 
                  var specificationBTFSumm=[];
                  var specificationNoPPKSum=[0,0,0,0];
                  var ppkNumber=[];
                  var k = 1;                    //   счетчик для ППК котрых больше 4
                  var allNamePPK=[];
                  
                  for (var i=0; i<a.data.length-1; i++)                      
                    {
                        specificationBTHSumm[i]=0;
                        specificationBTKSumm[i]=0;
                        specificationBTMSumm[i]=0;
                        specificationBTFSumm[i]=0;
                        
                        if (a.data[i].selectPribor == "PPK")          // находим прибор ППК              
                        {
                                if(a.data[i].numberElement>4)      // делаем случайный выбор надписей в спецификации для ППК, если их количество больше чем у нас в массивах specificationName и specificationAdress
                           {
                              var rand = Math.floor((Math.random() * 3) + 1); 
                              var newSpecificationName = specificationName[rand];
                              var newSpecificationAdress = specificationAdress[rand];   
                              
                              $("tbody")
                                                       .append($("<tr>").attr("data-ppk",a.data[i].numberElement).attr("data-index",i)
                                                       .append($("<td>").html(a.data[i].numberElement))
                                                       .append($("<td>").html("Прибор приемо-контрольный охранно-пожарный"+"<br>"+"в составе:").css("color","midnightblue"))
                                                       .append($("<td>").html(a.data[i].selectPribor))
                                                       .append($("<td>").addClass("newNamePPK").html(newSpecificationName+" № "+(k+4)) )
                                                       .append($("<td>").html(newSpecificationAdress))
                                                       .append($("<td>").html("комплект"))
                                                       .append($("<td>").html("1"))
                                                       .append($("<td>").html(" "))                              
                                                              );   
                                                      
                                                      k++;
                           }
                            else
                            {
                            $("tbody")
                                                       .append($("<tr>").attr("data-ppk",a.data[i].numberElement).attr("data-index",i)
                                                       .append($("<td>").html(a.data[i].numberElement))
                                                       .append($("<td>").html("Прибор приемо-контрольный охранно-пожарный"+"<br>"+"в составе:").css("color","midnightblue"))
                                                       .append($("<td>").html(a.data[i].selectPribor))
                                                       .append($("<td>").addClass("newNamePPK").html(specificationName[a.data[i].numberElement]))
                                                       .append($("<td>").html(specificationAdress[a.data[i].numberElement]))
                                                       .append($("<td>").html("комплект"))
                                                       .append($("<td>").html("1"))
                                                       .append($("<td>").html(" "))                              
                                                              );
                           }              
                       // ----------------Считаем количество каждого типа извещателя в соответствии с каждым номером ППК ---------------//  // TODO  переписать цикл ниже с ифами через объекты и свойства
                           
                        for (var qw = 0; qw<a.data.length-1; qw++)
                            {
                                if (a.data[qw].selectPribor == "BTH" && a.data[qw].numberPribor == a.data[i].numberElement)
                                {
                                    specificationBTHSumm[i]++;                                    
                                }  
                                
                                if (a.data[qw].selectPribor == "BTK" && a.data[qw].numberPribor == a.data[i].numberElement)
                                {
                                    specificationBTKSumm[i]++;
                                } 
                                
                                if (a.data[qw].selectPribor == "BTM" && a.data[qw].numberPribor == a.data[i].numberElement)
                                {
                                    specificationBTMSumm[i]++;
                                } 
                                
                                if (a.data[qw].selectPribor == "BTF" && a.data[qw].numberPribor == a.data[i].numberElement)
                                {
                                    specificationBTFSumm[i]++;
                                }
                            } 
                            
                            ppkNumber[ppkNumber.length]=a.data[i].numberElement;  // массив номеров ППК 
                        
                        }
                    }
                    
                    
                     if (a.data[0].numberPribor == 0)    // рисуем строчку с существующим прибором
                        {
                           $("tbody")
                                                       .append($("<tr>").attr("data-ppk",0).attr("data-index",0)
                                                       .append($("<td>").html(a.data[i].numberElement))
                                                       .append($("<td>").html("Существующий прибор ППК"+"<br>"+"в составе:").css("color","midnightblue"))
                                                       .append($("<td>").html(""))
                                                       .append($("<td>").addClass("newNamePPK0").html(""))
                                                       .append($("<td>").html(""))
                                                       .append($("<td>").html(""))
                                                       .append($("<td>").html(""))
                                                       .append($("<td>").html(" "))                              
                                                              );
                        }
                        
                        
                for (var qww = 0; qww<a.data.length-1; qww++)  // считаем извещатели без приборов
                            {                                
                                if (a.data[qww].numberPribor==0 && a.data[qww].selectPribor == "BTH" )
                                {
                                    specificationNoPPKSum[0]++;
                                }
                               if (a.data[qww].numberPribor==0 && a.data[qww].selectPribor == "BTK" )
                                {
                                    specificationNoPPKSum[1]++;
                                }
                                if (a.data[qww].numberPribor==0 && a.data[qww].selectPribor == "BTF" )
                                {
                                    specificationNoPPKSum[2]++;
                                }
                                if (a.data[qww].numberPribor==0 && a.data[qww].selectPribor == "BTM" )
                                {
                                    specificationNoPPKSum[3]++;
                                }
                            }  
                            
                            console.info (specificationNoPPKSum)
                            
                            
                            
                            // -------------------  Если у нас есть извещатели без прибора ---------------//
                            
                            if (specificationNoPPKSum.length>0)                     
                            {
                                if (specificationNoPPKSum[0]>0)
                                {
                                    var smallNumber = $("body").find("[data-index='"+0+"']");
                                    smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))        //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный дымовой"))
                                                        .append($("<td>").html("BTH"))
                                                        .append($("<td>").html("ИП 212-73"))
                                                        .append($("<td>").html('«S.Sensor» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").addClass("noPPKBTHNumber").attr("data-numBTH",specificationNoPPKSum[0]).html(specificationNoPPKSum[0]))
                                                        .append($("<td>").html(" "))
                                                       )
                                    
                                }
                                
                                if (specificationNoPPKSum[1]>0)
                                {
                                    var smallNumber = $("body").find("[data-index='"+0+"']");
                                    smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))          //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный тепловой"))
                                                        .append($("<td>").html("BTK"))
                                                        .append($("<td>").html("ИП-101-1А-А3"))
                                                        .append($("<td>").html('«М-Контакт» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTK",specificationNoPPKSum[1]).html(specificationNoPPKSum[1]))
                                                        .append($("<td>").html(" "))
                                                       )                                    
                                }
                                
                                if (specificationNoPPKSum[2]>0)
                                {
                                    var smallNumber = $("body").find("[data-index='"+0+"']");
                                    smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))           //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный ручной"))
                                                        .append($("<td>").html("BTМ"))
                                                        .append($("<td>").html("ИПР-3СУ"))
                                                        .append($("<td>").html('«Ирсэт» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTM",specificationNoPPKSum[2]).html(specificationNoPPKSum[2]))
                                                        .append($("<td>").html(" "))
                                                       )                                    
                                }
                                
                                if (specificationNoPPKSum[3]>0)
                                {
                                    var smallNumber = $("body").find("[data-index='"+0+"']");
                                    smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))           //рисуем извещатели
                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный пламени"))
                                                        .append($("<td>").html("BTF"))
                                                        .append($("<td>").html("ИП 329/330-20"))
                                                        .append($("<td>").html("«Спецпож» г.Москва"))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTF",specificationNoPPKSum[3]).html(specificationNoPPKSum[3]))
                                                        .append($("<td>").html(" "))
                                                       )                                    
                                }
                                
                            }
                            
                     
                
                           // -------------------  Если у нас есть извещатели с прибором ---------------// 
                            
                
                for (var w = 0; w<specificationBTHSumm.length; w++)               // снова бегаем по массиву данных
                {
                
                    if (specificationBTHSumm[w]>0)
                    {
                        var smallNumber = $("body").find("[data-index='"+w+"']");
                            smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))        //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный дымовой"))
                                                        .append($("<td>").html("BTH"))
                                                        .append($("<td>").html("ИП 212-73"))
                                                        .append($("<td>").html('«S.Sensor» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTH",specificationBTHSumm[w]).html(specificationBTHSumm[w]))
                                                        .append($("<td>").html(" "))
                                                       )
                                        
                    }
                }   
                            
                for (var w = 0; w<specificationBTKSumm.length; w++)                 // снова бегаем по массиву данных
                {
                   
                    if (specificationBTKSumm[w]>0)
                    {
                        var smallNumber = $("body").find("[data-index='"+w+"']");
                        smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))          //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный тепловой"))
                                                        .append($("<td>").html("BTK"))
                                                        .append($("<td>").html("ИП-101-1А-А3"))
                                                        .append($("<td>").html('«М-Контакт» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTK",specificationBTKSumm[w]).html(specificationBTKSumm[w]))
                                                        .append($("<td>").html(" "))
                                                       )
                    }
                }                 
                for (var w = 0; w<specificationBTMSumm.length; w++)               // снова бегаем по массиву данных
                {
                 
                    if (specificationBTMSumm[w]>0)
                    {
                        var smallNumber = $("body").find("[data-index='"+w+"']");
                        smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))           //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный ручной"))
                                                        .append($("<td>").html("BTМ"))
                                                        .append($("<td>").html("ИПР-3СУ"))
                                                        .append($("<td>").html('«Ирсэт» г. Санкт-Петербург'))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTM",specificationBTMSumm[w]).html(specificationBTMSumm[w]))
                                                        .append($("<td>").html(" "))
                                                       )
                    }
                }                                 
                                   
                for (var w = 0; w<specificationBTFSumm.length; w++)                  // снова бегаем по массиву данных
                {
                 
                    if (specificationBTFSumm[w]>0)
                    {
                        var smallNumber = $("body").find("[data-index='"+w+"']");
                        smallNumber.after($("<tr>").attr("data-secondSmallNumber",smallNumber.data("ppk"))           //рисуем извещатели

                                                        .append($("<td>").addClass("num"+smallNumber.data("ppk")).html(""))
                                                        .append($("<td>").addClass("styleHtml").html("Извещатель пожарный пламени"))
                                                        .append($("<td>").html("BTF"))
                                                        .append($("<td>").html("ИП 329/330-20"))
                                                        .append($("<td>").html("«Спецпож» г.Москва"))
                                                        .append($("<td>").html("шт"))
                                                        .append($("<td>").attr("data-numBTF",specificationBTFSumm[w]).html(specificationBTFSumm[w]))
                                                        .append($("<td>").html(" "))
                                                       )
                    }
                }        
               
               $(".styleHtml").css("padding-left","50px");    // делаем отступы для извещателей
              
              
    $('tr').each(function()                                      // выравнивание колонок в таблице (кроме двух первых)
    {
        for (var ii = 2; ii<7;ii++)
        {
           this.cells[ii].style.textAlign = 'center';       
       }   
       
    });
    
    
        var numberSpecificationPribor = 1;   
        var specificationRowNumber = 5;
               for (var kk = 0; kk<specificationRowNumber; kk++ )  // делаем нумерацию извещателей в составе приборов, учитывая их количество в кажом приборе
              {                                           
                              $(".num"+kk).each(function()
                       {
                               $(this).html(kk+"."+numberSpecificationPribor).next();
                               numberSpecificationPribor++;
                       });                    
                    numberSpecificationPribor=1;
                }

    
                  
  $(".userNameFromCookie1").html($.cookie("Name"));
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
        
        $(".projectClick").attr('href', "http://l.408dev.com/Fire-project/project.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".specificationClick").on("click", function()
    {   
        $(".specificationClick").attr('href', "http://l.408dev.com/Fire-project/specification.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".eborder-top").on("click", function()
    {
        $.cookie("UserId","");
        $.cookie("Name", "");        
        $(location).attr('href', "http://l.408dev.com/Fire-project/index.html");    
    });
    

    console.info(specificationBTHSumm)
    projectData = makeProjectData();     - // создаем на дописываение на сервер информацию, которая пригодится в графиках: количество извещателей под однотипными приборами
    console.info(",,,,,")
    console.info(projectData);                            
                               $.post("http://l.408dev.com/Fire-project/script.php", projectData,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
                                                                         .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
                                                                        {   
                                                                              console.log(a);                                                        
                                                                        }).fail(function() // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
                                                                               {                            
                                                                                   console.log("нет связи с сервером"); 
                                                                               });
    
    
    //-------------Make data projectData for Save to Server ----------------//
   
function makeProjectData()
{
  var sumBTH = [0];
  var sumBTK = [0];
  var sumBTF = [0];
  var sumBTM = [0];
  var toSave=a.data[a.data.length-1]; 
  $("td").each(function()
  {  
      if ($(this).attr("data-numbth")!==undefined)      
          sumBTH[parseInt(($(this).parent().attr("data-secondsmallnumber")))] = $(this).attr("data-numbth");      
      if ($(this).attr("data-numbtk")!==undefined)      
          sumBTK[parseInt(($(this).parent().attr("data-secondsmallnumber")))] = $(this).attr("data-numbtk");  
      if ($(this).attr("data-numbtf")!==undefined)      
          sumBTF[parseInt(($(this).parent().attr("data-secondsmallnumber")))] = $(this).attr("data-numbtf");   
      if ($(this).attr("data-numbtm")!==undefined)      
          sumBTM[parseInt(($(this).parent().attr("data-secondsmallnumber")))] = $(this).attr("data-numbtm");      
  });
  
  $(".newNamePPK").each(function()
  {
      allNamePPK[allNamePPK.length] = $(this).html();
  })
  
  if ( $("td").hasClass("newNamePPK0") ) 
  {
      allNamePPK.unshift('Существующий ППК');
     // allNamePPK[allNamePPK.length] = "Существующий ППК";
  }
  
   console.info(sumBTH)  
   
   toSave["sumBTH"] = sumBTH;   
   toSave["sumBTK"] = sumBTK;
   toSave["sumBTF"] = sumBTF;
   toSave["sumBTM"] = sumBTM;
   toSave["allNamePPK"] = allNamePPK;
   toSave["allPPK"] = allNamePPK.length;
    var projectData =                                             // добавляем в последний элемент массива ДАТА значения количества извещателей для каждого прибора
    {    
    "userid": $.cookie('UserId'),
    "project":parseInt(prj),
    "projectData": a.data                                    
    };
    
 return projectData;  
};

var titlePrj = ["КС ИВДЕЛЬСКОЕ ЛПУ", "КС ТОРБЕЕВСКАЯ", "ГРС МОСТРАНСГАЗ", "КУЩЕВСКОЕ ПХГ"];          
               
           if(prj!=="")
        {
            var blueTitlePrj=$("<span>").addClass("lite").html(titlePrj[prj-1]);
            $("a.logo").html("ПРОЕКТ №"+prj+" ").append(blueTitlePrj);
            var a = $(".panel-heading").html();
            $(".panel-heading").html(a+titlePrj[prj-1]);
        };
        
       
    
    }).fail(function() // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
              {                            
                console.log("нет связи с сервером"); 
            }); 
            
            
    
});




