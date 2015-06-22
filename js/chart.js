$(document).ready(function(){

	function getChart(){
		var company = ["燦坤","愛買","大眾電信","亞太","LG","中華電信",
						"遠傳","全虹通信","震旦","聯強","台灣大哥大","拓勤","HTC","諾基亞",
						"SONY","宏碁","台灣之星","Samsung","APPLE","神腦"];
		//var count1, count2, count3, count4, count5, count6, count7, count8, count9, count10,
			//count11, count12, count13, count14, count15, count16, count17, count18, count19; 
		var count = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

		var Cdata1, Cdata2, Cdata3, Cdata4;
		var Cdataset = [];

		$.when(
			$.ajax({ 
		        type:'GET', 
		        dataType:'jsonp', 
		      	url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=0&$top=1000&format=json',
		        success:function (data){
		           
		            Cdata1 = data;
		          }
	  		}),

	  		$.ajax({ 
		        type:'GET', 
		        dataType:'jsonp', 
		       	url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=1000&$top=1000&format=json',
		         success:function (data){
		            
		            Cdata2 = data;
		          }
	  		}),

			$.ajax({ 
			    type:'GET', 
			    dataType:'jsonp', 
			    url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=2000&$top=1000&format=json',
			    success:function (data){
			        Cdata3 = data;
			    }
			 }),

			$.ajax({ 
			    type:'GET', 
			    dataType:'jsonp', 
			    url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=3000&$top=1000&format=json',
			    success:function (data){
			       Cdata4 = data;
			    }
			})
		).then(function(){
			//var temp = 'temp';

			Cdataset.push(Cdata1);
			Cdataset.push(Cdata2);
			Cdataset.push(Cdata3);
			Cdataset.push(Cdata4);


			for(var i=0 ; i<4 ; i++){
				for(j=0 ; j<Cdataset[i].length ; j++){
					for(k=0 ; k<20 ; k++){
					//$('.chart').append(Cdataset[i][j].RecycleCompany);
					
					/*
					if(Cdataset[i[j]].RecycleCompany == temp){
						console.log(Cdata4[i].RecycleCompany);
						
					}
					else{
						temp = Cdataset[i][j].RecycleCompany;
						console.log(temp);
						//console.log(Cdataset[i][j].RecycleCompany)
					}
					*/
					//測試店名種類
					
						if (Cdataset[i][j].RecycleCompany.indexOf(company[k])>-1){
							count[k]++;
						}
					}
				}
			}
			
			console.log(count);

			
			var w = 1000, h = 280, padding = 30, barMargin = 2;

			
			var Ymax = d3.max(count, function(d){return d}),
				Ymin = d3.min(count, function(d){return d})
				

			var xScale = d3.scale.linear() 
				.domain([0, count.length]) 
				.range([padding , w - padding]) 
				

			var yScale = d3.scale.linear()
				.domain([Ymin, Ymax])
				.range([padding, h - padding])
				

			var barWidth = (w - padding*2) / count.length - barMargin;
			
			var svg = d3.select('.chart').append('svg').attr({'width': w,'height': h})

			
			svg.selectAll('rect').data(count).enter()
			.append('rect')
			.attr('x', function(d, i){return xScale(i)})
			.attr('y', function(d){return h - yScale(d) - 40})
			.attr('width', barWidth)
			.attr('height',function(d){return yScale(d)})
			.attr('fill', function(d){
							var color = 0.2 + d * 0.002;
							return  d3.hsl(100 ,color, color);
							} )

			svg.selectAll('text').data(count).enter() 
			.append('text') 
			.text(function(d){ return d})
			.attr({
				'x': function(d, i){return xScale(i) + barWidth/2},
				'y': function(d){return h - yScale(d) - 18}, 
				'fill': 'red',
				'text-anchor': 'middle', 
				'font-size': '10px' 
			});	


			

	

			var	xAxis = d3.svg.axis();
			xAxis
				.orient('bottom')
				.scale(xScale)
				.tickSize(0)
				.tickFormat(function(d,i){ return company[i]; })
				.tickValues(d3.range(50));

			var x_xis = svg.append('g')
						.attr("transform", "translate(22,250)")
						.attr('id','xaxis')
						.attr("x", w / 2)
    					.attr("y", 220)
						.call(xAxis);
			
			
		
		});

		
	}

	getChart();

});

