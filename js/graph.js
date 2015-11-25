$(function()
{
    var prj =  window.location.search.toString().charAt(4);    
    var load = 
            {
                "userid":$.cookie('UserId'),
                "project": prj
            };
    var numberForPPK;        
            //-------- Забираем данные с сервера -------//
            
          $.post("http://l.408dev.com/My_Work/script.php", load,"","json") // $post  - короткая запись работы с Аджаксом, передаем скрипт, данные, пустую строку (потому что мы с succes работаем отдельно и формат данных)
          .done(function(a) // done  - метод deffered объекта, который срабатывает когда Аджакс ответил не ошибкой (вместо старой записи "success: function (a)")
              {   
              console.info(a.data[a.data.length-1])
              var x = a.data[a.data.length-1];
              var allNamePPK = a.data[a.data.length-1].allNamePPK;              
              console.info(allNamePPK);
              var allPPK = a.data[a.data.length-1].allPPK;
              console.info(allPPK);
              var allPribor =[];
              
                           
             allPribor = allPribor.concat(x.sumBTH,x.sumBTM, x.sumBTK, x.sumBTF)
              
             allPribor = _.sum(allPribor, function (x) //вычисляем количество извещателей по всем приборам: сперва склеиваем массивы извещателей в один, затем переводим занчения в числа, затем убираем все нечисловые элементы  и 0, затем считаем сумму
              { 
                 return +x;
              }); 
              
              
              if ( a.data[a.data.length-1].sumBTM==undefined)
              {
                  sumBTM=[];
              }
              else
              {
                 var sumBTM=(a.data[a.data.length-1].sumBTM.map(function (x) 
              { 
                 return x==""?0:+x;
                 })); 
              }
              console.info(sumBTM)
              
              if ( a.data[a.data.length-1].sumBTK==undefined)
              {
                  sumBTK=[];
              }
              else
              {
                 var sumBTK=(a.data[a.data.length-1].sumBTK.map(function (x) 
              { 
                 return x==""?0:+x;
                 })); 
              }
            
            if ( a.data[a.data.length-1].sumBTF==undefined)
              {
                  sumBTF=[];
              }
              else
              {
                 var sumBTF=(a.data[a.data.length-1].sumBTF.map(function (x) 
              { 
                 return x==""?0:+x;
                 })); 
              }
            
             if ( a.data[a.data.length-1].sumBTH==undefined)
              {
                  sumBTH=[];
              }
              else
              {
                 var sumBTH=(a.data[a.data.length-1].sumBTH.map(function (x) 
              { 
                 return x==""?0:+x;
                 }));                 
              }
           
           if (sumBTM.length < allPPK)
           {
               var p = allPPK - (sumBTM.length);
              for (var k = 0; k<p; k++)
               {
                sumBTM[sumBTM.length] = 0;
               }
           }          
              
               if (sumBTK.length < allPPK)
           {
               var p = allPPK - (sumBTK.length);
               for (var k = 0; k<p; k++)
               {
                sumBTK[sumBTK.length] = 0;
               }
           }
           
            if (sumBTH.length < allPPK)
           {
               var p = allPPK - (sumBTH.length);
               for (var k = 0; k<p; k++)
               {
                sumBTH[sumBTH.length] = 0;
               }
           }
           
            if (sumBTF.length < allPPK)
           {
               var p = allPPK - (sumBTF.length);
               for (var k = 0; k<p; k++)
               {
                sumBTF[sumBTF.length] = 0;
               };
                console.info (p, sumBTF,sumBTF.length)
           }
           
          
            var titlePrj = ["КС ИВДЕЛЬСКОЕ ЛПУ", "КС ТОРБЕЕВСКАЯ", "ГРС МОСТРАНСГАЗ", "КУЩЕВСКОЕ ПХГ"];          
               
           if(prj!=="")
        {
            var blueTitlePrj=$("<span>").addClass("lite").html(titlePrj[prj-1]);
            $("a.logo").html("ПРОЕКТ №"+prj+" ").append(blueTitlePrj);
            var aa = $(".panel-heading").html();
            $(".headingStyle").html(aa+titlePrj[prj-1]);
        };
       console.log("м"); 
      
            Graph1(sumBTH,sumBTK,sumBTF,sumBTM, allNamePPK); // визуализация количества извещателей
             
            Graph2(allPribor,allPPK,allNamePPK);                             // амперметр  
        
            Graph3(sumBTH,sumBTK,sumBTF,sumBTM, allPPK,allNamePPK);                             // 3D потреблене тока
            
            console.info(numberForPPK);
        
  $(".userNameFromCookie1").html($.cookie("Name"));
  $(".graphClick").on("click", function()
          {            
              $(".graphClick").attr('href', "http://l.408dev.com/My_Work/graph.html?id="+window.location.search.toString().charAt(4));
          });
          
    $(".shemaClick").on("click", function()
    {            
        $(".shemaClick").attr('href', "http://l.408dev.com/My_Work/shema.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".projectClick").on("click", function()
    {   
      
        $(".projectClick").attr('href', "http://l.408dev.com/My_Work/project.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".specificationClick").on("click", function()
    {   
        $(".specificationClick").attr('href', "http://l.408dev.com/My_Work/specification.html?id="+window.location.search.toString().charAt(4));
    });
    
    $(".eborder-top").on("click", function()
    {
        
        
        $.cookie("Name", "");  
         $.cookie("UserId","");
        $(location).attr('href', "http://l.408dev.com/My_Work/index.html");    
    });
    
    
    
              }).fail(function() // fale - метод deffered объекта, который срабатывает когда Аджакс ответил ошибкой (вместо старой записи "error: function(){}")
              {                            
                console.log("нет связи с сервером"); 
            });
    
    
});



function Graph1 (sumBTH,sumBTK,sumBTF,sumBTM,allNamePPK) // визуализация количества извещателей
{    
    console.info(sumBTH,sumBTK,sumBTF,sumBTM,allNamePPK)
    
    $('.graph1').highcharts
    ({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Визуализация извещателей и приборов приемо-контрольных',
            align: "left"
        },
        xAxis: {
            categories: allNamePPK //TODO передать с спецификации имена приборов..
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
                text: 'Количество извещателей'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: 
                {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: 
                {                    
            formatter: function () 
            {
                numberForPPK = '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Всего извещателей: ' + this.point.stackTotal;
                return numberForPPK; 
            }                       
        },         
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: 
        [
            {
            name: 'BTH',
            data: sumBTH
            }, 
            {
            name: 'BTK',
            data: sumBTK
            }, 
            {
            name: 'BTF',
            data: sumBTF
            }, 
            {
            name: 'BTM',
            data: sumBTM
            }
            
        ]
    });  
};

function Graph2 (allPribor,allPPK,allNamePPK)  // амперметр
{ 
    if( $.inArray("Существующий ППК", allNamePPK)!==-1)
    {
        var ampermeter = ((allPPK-1)*2) + 0.1 + allPribor*0.1;
    }    
    else
    {
    var ampermeter = (allPPK*2) + 0.1 + allPribor*0.1;
    }
    if (ampermeter>17)
        ampermeter = 17.5;
    
$('.ampermeter').highcharts({

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Токопотребление системы'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 17,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 10,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'A*h'
            },
            plotBands: [{
                from: 0,
                to: 10,
                color: '#55BF3B' // green
            }, {
                from: 10,
                to: 150,
                color: '#DDDF0D' // yellow
            }, {
                from: 15,
                to: 17,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Потребляемая мощность',
            data: [ampermeter],  //(allPPK*2) + 0,1 + allPribor*0,1
            tooltip: {
                valueSuffix: ' A*h'
            }
        }]

    },
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
               
                var point = chart.series[0].points[0],
                    newVal,
                    inc = Math.random();  
                    newVal = point.y + inc;
              
                if (newVal>ampermeter-inc*0.1)
                    newVal=ampermeter-(Math.random()*0.2);
                else
                    newVal=ampermeter+(Math.random()*0.2);
                

                point.update(+newVal.toFixed(1));

            }, 150);
        }
    }
            
            );

};


function Graph3 (sumBTH,sumBTK,sumBTF,sumBTM,allPPK,allNamePPK)  // 3D потребелени тока
{     
    console.info(sumBTH,sumBTK,sumBTF,sumBTM,allPPK,allNamePPK)
    
    if(sumBTH[0]==0&&sumBTK[0]==0&&sumBTF[0]==0&&sumBTM[0]==0)
    {
       allNamePPK =_.drop(allNamePPK);
       sumBTH = _.drop(sumBTH);
       sumBTK = _.drop(sumBTK);
       sumBTM = _.drop(sumBTM);
       sumBTF = _.drop(sumBTF);
       
   }
  console.info(sumBTH,allPPK,allNamePPK)
  for (var rr =0; rr<allPPK; rr++)
  {
    if (sumBTF[rr]==undefined||sumBTF[rr]==-10) sumBTF[rr]=0;  
    if (sumBTH[rr]==undefined||sumBTH[rr]==-10) sumBTH[rr]=0;  
    if (sumBTM[rr]==undefined||sumBTM[rr]==-10) sumBTM[rr]=0;  
    if (sumBTK[rr]==undefined||sumBTK[rr]==-10) sumBTK[rr]=0;  
  }
  
  var zipped = _.zip(sumBTH,sumBTK,sumBTF,sumBTM)
  var data=[];
  
  for (var rr = 0; rr<zipped.length; rr++)
  {
      zipped[rr] = _.sum(zipped[rr], function (x) //вычисляем количество извещателей по всем приборам: сперва склеиваем массивы извещателей в один, затем переводим занчения в числа, затем убираем все нечисловые элементы  и 0, затем считаем сумму
              { 
                 return +x;
              });
              
      data[rr]=[allNamePPK[rr],(zipped[rr]*0.1)+2];
      console.info(zipped); 
  }
  if(allNamePPK[0]=="Существующий ППК")
  {
      data[0]=["Существующий ППК",zipped[0]*0.1];
  }
      
  console.info(allPPK)
  zipped = _.sum(zipped)*0.1+allPPK*2; // сумма всех извещателей
  
  console.info(zipped); 
 
 data[data.length] = {
                    name: 'Свободный остаток A*h',
                    y: 17-zipped,
                    sliced: true,
                    selected: true
                    };
  
  
  $('.3damper').highcharts
  (
          {   
              chart: {
               type: 'pie',
               options3d: {
                enabled: true,
                alpha: 45,
                beta: 0                
            }
        },
        title: {
            text: 'Токопотребление по приборам'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 40,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            },
            series: {
                animation: {
                    duration: 2000
                }
            }
        },
        series: 
        [{
            type: 'pie',
            name: 'токопотребление',
            data: data
        }]
});
};
    
    
