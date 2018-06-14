<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.0/jquery-ui.js"></script>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.0/lodash.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!--  full calender-->
	<link href='resources/css/fullcalendar/fullcalendar.min.css' rel='stylesheet' />
	<link href='resources/css/fullcalendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
	<script src='resources/js/fullcalendar/moment.min.js'></script>
	<script src='resources/js/fullcalendar/fullcalendar.min.js'></script>
	<!-- gridstack -->
	<link rel="stylesheet" href="resources/css/position/gridstack.min.css"/>
	<script src="resources/js/position/gridstack.min.js"></script>
	<script src="resources/js/position/gridstack.jQueryUI.min.js"></script> 
	<script>
		  $(document).ready(function() {
			$('#cal').click(function(){
			 $('#calendar').fullCalendar({
		      header: {
		        left: 'prev,next today',
		        center: 'title',
		        right: 'month,agendaWeek,agendaDay,listMonth'
		      },
		      defaultDate: '2018-03-12',
		      navLinks: true, // can click day/week names to navigate views
		      businessHours: true, // display business hours
		      editable: true,
		      contentHeight: 'auto',
			    height: 'auto'
		    });
			});
		
		    var options = {
		        cellHeight: 80,
		        verticalMargin: 10,
		        animate: true
		        
		    };
		    $('.grid-stack').gridstack(options);
		    
		    <!--remove-->
		    $('body').on('click', '.fa-close', function (e) {
		        e.preventDefault();
		        var grid = $('.grid-stack').data('gridstack'),
		            el = $(this).closest('.grid-stack-item')
		
		        grid.removeWidget(el);
		    });
		    new function () { 
		    	var grid = $(".grid-stack").data("gridstack");
		    	<!--add-->
		   	
			    this.addNewWidget = function () {
			    	grid.addWidget($('<div><div class="grid-stack-item-content"><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i><div id="calendar"></div></div></div>'), 0, 0, 4, 5, true)
			    }.bind(this);
		    	
		    	$('#add-new-widget').click(this.addNewWidget);
		    	 
			    <!--removeall-->
			    this.clearGrid = function () {
			        grid.removeAll();
			        return false;
			    }.bind(this);
		   
		    	$('#clear-grid').click(this.clearGrid);
		    
			    <!--고정-->
			    $('body').on('click', '.fa-star', function (e) {
			        e.preventDefault();
			            el = $(this).closest('.grid-stack-item')
			            grid.movable(el, false);
			   	 		grid.resizable(el, false);
			   	 	    grid.disableResize(true);
			    });
			   
			    	 
			    <!--고정풀기-->
			    $('body').on('click', '.fa-bell', function (e) {
			        e.preventDefault();
			            el = $(this).closest('.grid-stack-item')
			            grid.movable(el, true);
			      	 	grid.resizable(el, true);
			    });	
			    <!--전체고정-->
			    $('body').on('click', '#fix', function (e) {
			        e.preventDefault();
			            el = $('.grid-stack-item')
			            grid.movable(el, false);
			   	 		grid.resizable(el, false);
			    });
			    <!--전체고정풀기-->
			    $('body').on('click', '#unfix', function (e) {
			        e.preventDefault();
			            el = $('.grid-stack-item')
			            grid.movable(el, true);
			      	 	grid.resizable(el, true);
			    });	
		   
			   	<!--save-->
			    this.saveGrid = function () {
			       this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
			           el = $(el);
			           var node = el.data('_gridstack_node');
			           return {
			               x: node.x,
			               y: node.y,
			               width: node.width,
			               height: node.height,
			               content: $('.grid-stack-item-content', el).parent().html()
			           };
			       }, this);
			
			       $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
			
			       var items = GridStackUI.Utils.sort(this.serializedData);
			       localStorage.setItem("items", JSON.stringify(items));
			
			       console.log('grid is saved');
			       return false;
			   }.bind(this);
			   $('#save-grid').click(this.saveGrid);
			   
			   <!--Load-->
			   loadGrid = function () {
			       grid.removeAll();
			       console.log("gg");   
			       var jsonData = JSON.parse(localStorage.getItem("items"));
			       var items = GridStackUI.Utils.sort(jsonData);
			       console.log(items);
			       _.each(items, function (node) {
			    	   console.log(node.content.trim());
			           grid.addWidget($('<div><div class="grid-stack-item-content">'+node.content.trim()+'</div></div>'),
			           node.x, node.y, node.width, node.height);
			       }.bind(this));
			       return false;
			   }.bind(this);
			   $('#load-grid').click(loadGrid); 
			 
			   <!--resize-->
			   $('body').on('click', '.fa-heart', function (e) {
				 
					   console.log("1");
					    var grid = $('.grid-stack').data('gridstack');
					    grid.batch_update();
					    el = $(this).closest('.grid-stack-item');
			
					    grid.move(el, 0, 0)
					    grid.resize(el, 12, 12);
					    
					    el2 = $('.grid-stack-item').not(el);
					    grid.removeWidget(el2);
					    	
					    grid.commit();
				   
			   });
			   
		    };
		       
		 });
		</script>
	<style type="text/css">
		body {
			padding: 0;
			font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
			font-size: 14px;
			position: absolute;
			height: 100%;
			width: 100%;
		}
		
		#calendar {
			width: auto%;
			margin: 0 auto;
		}
		
		.grid-stack {
			background: #FFF;
			width: 90%;
			height: 100%;
			position: absolute; 
		
		}
		
		.grid-stack-item-content {
			color: #2c3e50;
			text-align: center;
			background-color: #e0e3da;
			-ms-overflow-style: none;
		}
		
		::-webkit-scrollbar {
			display: none;
		}
	</style>
	<div class="content-wrapper" style="width:1900px;">
		<div>
	        	<a class="btn btn-default" id="add-new-widget" href="#">Add Widget</a>
	            <a class="btn btn-default" id="save-grid" href="#">Save Grid</a>
	            <a class="btn btn-default" id="load-grid" href="#">Load Grid</a>
	            <a class="btn btn-default" id="clear-grid" href="#">Clear Grid</a>
	            <a class="btn btn-default" id="cal" href="#">addcal</a>
	            <a class="btn btn-default" id="fix" href="#">allfix</a>
	            <a class="btn btn-default" id="unfix" href="#">allunfix</a>
	            <a class="btn btn-default" id="resize" href="#">resize</a>
	    </div>
	
		<div class="grid-stack">
		    <div class="grid-stack-item" id="c"
		        data-gs-x="0" data-gs-y="0" 
		        data-gs-width="4" data-gs-height="2" id="first">
		            <div class="grid-stack-item-content">
		            <i class="fa fa-close"></i>
		            <i class="fa fa-star"></i>
		            <i class="fa fa-bell"></i>
		            <i class="fa fa-heart"></i>
		              <div id='calendar'></div>
		              </div>
		    </div>
		</div>
	</div>
