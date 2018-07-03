<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.0/lodash.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!-- gridstack -->
	<link rel="stylesheet" href="resources/css/position/gridstack.min.css"/>
	<script src="resources/js/position/gridstack.min.js"></script>
	<script src="resources/js/position/gridstack.jQueryUI.min.js"></script> 
	<script>
		  $(document).ready(function() {
		    var options = {
		        cellHeight: 80,
		        verticalMargin: 10,
		        animate: true
		        
		    };
		    $('.grid-stack').gridstack(options);
	    	var grid = $(".grid-stack").data("gridstack");
		    
		    new function () { 
		    	var dragID = '';
			    
		    	//insert
		    	$(function(){
				    //menu drag drop
				    $("#calendaricon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    	});
				    $("#checklisticon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    	});
				    $("#charticon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    	});
				    $("#filesicon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    	});
				    $("#troubleshootingicon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    });
				    $("#kanbanicon").draggable({
				    	 revert : true,
				    	 drag: function( event, ui ) {
				    		 dragID = $(this).attr("id");
				    	 }
				    });
				    
				    $(".grid-stack").droppable({
				    	accept:".sidebaricon",
				    	drop : $(this).addNewWidget = function () {
				    		if(dragID == 'calendaricon'){
				    			 grid.addWidget($('<div><div class="grid-stack-item-content"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 8, 0, 4, 4);
				    			 $(".grid-stack").children().last().children().attr("id","calendar");
			    				 $("#calendar").load("position.calendar");
			    				 
				    		}else if(dragID == 'checklisticon'){
				    			 grid.addWidget($('<div><div class="grid-stack-item-content"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 4, 0, 4, 4);
				    			 $(".grid-stack").children().last().children().attr("id","checklist");
			    				 $("#checklist").load("position.checklist");
				    		}else if(dragID == 'charticon'){
				    			 grid.addWidget($('<div><div class="grid-stack-item-content"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 0, 0, 4, 4);
				    			 $(".grid-stack").children().last().children().attr("id","chart");
			    				 $("#chart").load("position.chart");
				    		}else if(dragID == 'filesicon'){
				    			 grid.addWidget($('<div><div class="grid-stack-item-content"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 6, 4, 6, 6);
				    			 $(".grid-stack").children().last().children().attr("id","files");
			    				 $("#files").load("position.files");
				    		}else if(dragID == 'troubleshootingicon'){
				    			 grid.addWidget($('<div><div class="grid-stack-item-content"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 0, 4, 6, 6);
				    			 $(".grid-stack").children().last().children().attr("id","troubleshooting");
			    				 $("#troubleshooting").load("position.troubleshooting");
				    		}else if(dragID == 'kanbanicon') {
				    			 grid.addWidget($('<div style="min-height:440px; min-width:100%;"><div class="grid-stack-item-content" style="min-height:440px; min-width:100%;"></div><i class="fa fa-close"></i><i class="fa fa-star"></i><i class="fa fa-bell"></i><i class="fa fa-heart"></i></div>'), 0, 10, 12, 8);
				    			 $(".grid-stack").children().last().children().attr("id","kanban");
				    			 $("#kanban").load("position.kanban?projectNum=1");
				    		}
				    		<!--save-->
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
						
						       /* $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
						       var items = GridStackUI.Utils.sort(this.serializedData);
						       localStorage.setItem("items", JSON.stringify(items));
								 */
				    		$.ajax({
							    	type: "post",
						 			url:  "positioninsert",
						 			data: { "projectNum" : sessionProjectNum,
							 				"userId" : $('#hiddenUserId').val().trim(),
							 				"X" : this.serializedData[0].x,
						 					"y" : this.serializedData[0].y,
						 					"width" : this.serializedData[0].width,
						 					"height" :  this.serializedData[0].height},
						 			contentType: "application/json; charset=utf-8",
						 		    success:function(data){
						 		    },
						 		    error:function(){
						 		    }
					    		}); 
				    	}.bind(this)
				    });
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
			
			       /* $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
			       var items = GridStackUI.Utils.sort(this.serializedData);
			       localStorage.setItem("items", JSON.stringify(items));
					 */
			       return this.serializedData;
			   }.bind(this);
			   $('#save-grid').click(this.saveGrid);
			   
			    <!--remove-->
			    $('body').on('click', '.fa-close', function (e) {
			        e.preventDefault();
			            el = $(this).closest('.grid-stack-item')
			        grid.removeWidget(el);
			    });
			    
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
		   
			   <!--Load-->
			   loadGrid = function () {
			       grid.removeAll();
			       var jsonData = JSON.parse(localStorage.getItem("items"));
			       var items = GridStackUI.Utils.sort(jsonData);
			       _.each(items, function (node) {
			           grid.addWidget($('<div><div class="grid-stack-item-content">'+node.content.trim()+'</div></div>'),
			           node.x, node.y, node.width, node.height);
			       }.bind(this));
			       return false;
			   }.bind(this);
			   $('#load-grid').click(loadGrid); 
			 
			   <!--resize-->
			   $('body').on('click', '.fa-heart', function (e) {
				 
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
			height:200%;
			width: 200%;
		}
		.grid-stack {
			background: #00ff0000;
			width: 370% !important;
			min-height: 200px !important;
			position: absolute;
		}
		.grid-stack-item-content {
			color: #2c3e50;
			text-align: center;
			border-color : #000000;
			background-color: none;
			-ms-overflow-style: none;
		}
		::-webkit-scrollbar {
			display: none;
		}
	</style>
	
		<div>
	            <a class="btn btn-default" id="save-grid" href="#">Save Grid</a>
	            <a class="btn btn-default" id="load-grid" href="#">Load Grid</a>
	            <a class="btn btn-default" id="clear-grid" href="#">Clear Grid</a>
	            <a class="btn btn-default" id="fix" href="#">allfix</a>
	            <a class="btn btn-default" id="unfix" href="#">allunfix</a>
	            <a class="btn btn-default" id="resize" href="#">resize</a>
	    </div>
	
		<div id="grid" class="grid-stack" style="data-gs-current-height:1;">
		<!-- 기능 들어가는 곳 -->
		</div>
	
