$(document).ready(function(){
 var total = 0;
 var dataset = [];
 
 	function getTotal(){
		$.when(
				$.ajax({ 
			        type:'GET', 
			        dataType:'jsonp', 
			      	url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=0&$top=1000&format=json',
			        success:function (data){
			           
			            data1 = data;
			          }
		  		}),

		  		$.ajax({ 
			        type:'GET', 
			        dataType:'jsonp', 
			       	url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=1000&$top=1000&format=json',
			         success:function (data){
			            
			            data2 = data;
			          }
		  		}),

				$.ajax({ 
				    type:'GET', 
				    dataType:'jsonp', 
				    url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=2000&$top=1000&format=json',
				    success:function (data){
				        data3 = data;
				    }
				 }),

				$.ajax({ 
				    type:'GET', 
				    dataType:'jsonp', 
				    url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=3000&$top=1000&format=json',
				    success:function (data){
				       data4 = data;
				    }
				})
		).then(function(){
				
			dataset.push(data1);
			dataset.push(data2);
			dataset.push(data3);
			dataset.push(data4);


			for(var i=0 ; i<4 ; i++){
				for(j=0 ; j<dataset[i].length ; j++){
						
					total++;
				}
			
			}
			$('.data').append('<p align="middle">目前本網站共收錄' + '<span>' + total + '</span>個回收點</p>')
			console.log(total);

			
		})
 	}

	getTotal();

});

