<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.0/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.0/lodash.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<!--  full calender-->
	<link href='fullcalendar.min.css' rel='stylesheet' />
	<link href='fullcalendar.print.min.css' rel='stylesheet' media='print' />
	<script src='moment.min.js'></script>
	<script src='fullcalendar.min.js'></script>
	 <script type="text/javascript">

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
	      events: [
	        {
	          title: 'Business Lunch',
	          start: '2018-03-03T13:00:00',
	          constraint: 'businessHours'
	        },
	        {
	          title: 'Meeting',
	          start: '2018-03-13T11:00:00',
	          constraint: 'availableForMeeting', // defined below
	          color: '#257e4a'
	        },
	        {
	          title: 'Conference',
	          start: '2018-03-18',
	          end: '2018-03-20'
	        },
	        {
	          title: 'Party',
	          start: '2018-03-29T20:00:00'
	        },
	
	        // areas where "Meeting" must be dropped
	        {
	          id: 'availableForMeeting',
	          start: '2018-03-11T10:00:00',
	          end: '2018-03-11T16:00:00',
	          rendering: 'background'
	        },
	        {
	          id: 'availableForMeeting',
	          start: '2018-03-13T10:00:00',
	          end: '2018-03-13T16:00:00',
	          rendering: 'background'
	        },
	
	        // red areas where no events can be dropped
	        {
	          start: '2018-03-24',
	          end: '2018-03-28',
	          overlap: false,
	          rendering: 'background',
	          color: '#ff9f89'
	        },
	        {
	          start: '2018-03-06',
	          end: '2018-03-08',
	          overlap: false,
	          rendering: 'background',
	          color: '#ff9f89'
	        }
	      ]
	    });
		});
	  });
	</script>
	<!-- gridstack -->
	<link rel="stylesheet" href="gridstack.min.css"/>
    <script src="gridstack.min.js"></script>
    <script src="gridstack.jQueryUI.min.js"></script> 
    <style type="text/css">
    
		  body {
		    margin: 40px 10px;
		    padding: 0;
		    font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
		    font-size: 14px;
		  }
		
		  #calendar {
		    max-width: 500px;
		    margin: 0 auto;
		  }
		
		
	        .grid-stack {
	            background: #566270;
	        }
	
	        .grid-stack-item-content {
	            color: #2c3e50;
	            text-align: center;
	            background-color: #e0e3da;
	        }
    </style>
</head>
<body>
	<div class="container-fluid">
        <h1>Serialization demo</h1>
		
        <div>
        	<a class="btn btn-default" id="add-new-widget" href="#">Add Widget</a>
            <a class="btn btn-default" id="save-grid" href="#">Save Grid</a>
            <a class="btn btn-default" id="load-grid" href="#">Load Grid</a>
            <a class="btn btn-default" id="clear-grid" href="#">Clear Grid</a>
			<a class="btn btn-default" id="cal" href="#">addcal</a>
        </div>

        <br/>
		
        <div class="grid-stack">
        
        </div>

        <hr/>

        <textarea id="saved-data" cols="100" rows="20" readonly="readonly"></textarea>
    </div>
    <script>
        $(function () {
            var options = {
            		 
            };
            
            $('.grid-stack').gridstack(options);
			
            $('body').on('click', '.fa-close', function (e) {
                e.preventDefault();
                var grid = $('.grid-stack').data('gridstack'),
                    el = $(this).closest('.grid-stack-item')

                grid.remove_widget(el);
            });
            
            new function () {
                this.serializedData = [
                    {x: 0, y: 0, width: 2, height: 2},
                    {x: 3, y: 1, width: 1, height: 2},
                    {x: 4, y: 1, width: 1, height: 1},
                    {x: 2, y: 3, width: 3, height: 1},
                    {x: 1, y: 4, width: 1, height: 1},
                    {x: 1, y: 3, width: 1, height: 1},
                    {x: 2, y: 4, width: 1, height: 1},
                    {x: 2, y: 5, width: 1, height: 1}
                ];
                this.addNewWidget = function () {
                    var node = this.serializedData.pop() || {
                                x: 12 * Math.random(),
                                y: 5 * Math.random(),
                                width: 1 + 3 * Math.random(),
                                height: 1 + 3 * Math.random()
                            };
                    this.grid.addWidget($('<div><div class="grid-stack-item-content"><i class="fa fa-close"/></div></div>'),
                        node.x, node.y, node.width, node.height);
                    return false;
                }.bind(this);

                $('#add-new-widget').click(this.addNewWidget);
                
                this.grid = $('.grid-stack').data('gridstack');

                this.loadGrid = function () {
                    this.grid.removeAll();
                    var items = GridStackUI.Utils.sort(this.serializedData);
                    _.each(items, function (node) {
                        this.grid.addWidget($('<div><div class="grid-stack-item-content"><i class="fa fa-close"/></div><div id="calendar"></div></div>'),
                        node.x, node.y, node.width, node.height);
                    }.bind(this));
                    return false;
                }.bind(this);

                this.saveGrid = function () {
                    this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
                        el = $(el);
                        var node = el.data('_gridstack_node');
                        return {
                            x: node.x,
                            y: node.y,
                            width: node.width,
                            height: node.height
                        };
                    });
                    $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
                    return false;
                }.bind(this);

                this.clearGrid = function () {
                    this.grid.removeAll();
                    return false;
                }.bind(this);

                $('#save-grid').click(this.saveGrid);
                $('#load-grid').click(this.loadGrid);
                $('#clear-grid').click(this.clearGrid);

                this.loadGrid();
                
            };
        });
    </script>
</body>
</html>