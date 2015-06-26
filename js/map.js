//declare namespace
		var content = {};
 
		//declare map
		var map;
 
		function trace(message) 
		{
			if (typeof console != 'undefined') 
			{
				console.log(message);
			}
		}
 
		//Function that gets run when the document loads
		content.initialize = function()
		{
			var latlng = new google.maps.LatLng(34.070264, -118.4440562);
			var myOptions = {
				zoom: 13,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				
		}
		var geocoder = new google.maps.Geocoder();

		content.geocode = function() 
		{
			var address = $('#address').val();
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) 
				{
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map, 
						position: results[0].geometry.location
					});
				} 
				else 
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
function getData(){
  $('.TB_COLLAPSE').html("<caption>查詢結果</caption><thead><tr><th>公司</th><th>店家</th><th>地址</th><th>電話</th><th>地圖</th></tr></thead>");
  $('.loading_area').append("<img src='img/loading.gif'  style='width:350px;height:350px;'>");
  
  //style="display:block; margin:auto;"
  var data1, data2, data3, data4;
  var dataset = [];
    $.when(
  // Get the HTML
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

 
  });
  
}