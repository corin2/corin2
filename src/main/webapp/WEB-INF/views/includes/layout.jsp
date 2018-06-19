<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <title>corin2</title>
  <meta charset="utf-8">
  <!-- 모바일 반응형을 위한 viewport 설정 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Bootstrap core CSS -->
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
  <link href="resources/css/layout/bootstrap.min.css" rel="stylesheet">
  <link href="resources/fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="resources/css/layout/animate.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="resources/css/layout/custom.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="resources/css/layout/maps/jquery-jvectormap-2.0.3.css" />
  <link href="resources/css/layout/icheck/flat/green.css" rel="stylesheet" />
  <link href="resources/css/layout/floatexamples.css" rel="stylesheet" type="text/css" />

  <!-- CSS 세부설정 변경을 위한 external CSS 링크 -->
  <!-- <link rel="stylesheet" type="text/css" href="resources/css/sidebar/sidebar.css"> -->

  <!-- jQuery library -->
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  <!-- Bootstrap JavaScript 파일 -->
  <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->

  <script src="resources/js/layout/jquery.min.js"></script>
  
  <script src="resources/js/layout/nprogress.js"></script>
  
  <style>
    .top_nav {
		width: 100%;
    }
  </style>
  
</head>

<body class="nav-md">

  <div class="container body">


    <div class="main_container">

      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">
          <!-- sidebar -->
          <tiles:insertAttribute name="sidebar" />
        </div>
      </div>

      <!-- top navigation -->
      <div class="top_nav">
      	<!-- header -->
	    <tiles:insertAttribute name="header" />

      </div>
      <!-- /top navigation -->


      <!-- page content -->
      <div class="right_col" role="main">
      	<div class="row tile_count">
		    <!-- content -->
			<tiles:insertAttribute name="content" />
      	</div>
      </div>
      <!-- /page content -->

    </div>

  </div>

  <div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
  </div>

  <script src="resources/js/layout/bootstrap.min.js"></script>

  <!-- gauge js -->
  <script type="text/javascript" src="resources/js/layout/gauge/gauge.min.js"></script>
  <script type="text/javascript" src="resources/js/layout/gauge/gauge_demo.js"></script>
  <!-- bootstrap progress js -->
  <script src="resources/js/layout/progressbar/bootstrap-progressbar.min.js"></script>
  <script src="resources/js/layout/nicescroll/jquery.nicescroll.min.js"></script>
  <!-- icheck -->
  <script src="resources/js/layout/icheck/icheck.min.js"></script>
  <!-- daterangepicker -->
  <script type="text/javascript" src="resources/js/layout/moment/moment.min.js"></script>
  <script type="text/javascript" src="resources/js/layout/datepicker/daterangepicker.js"></script>
  <!-- chart js -->
  <script src="resources/js/layout/chartjs/chart.min.js"></script>

  <script src="resources/js/layout/custom.js"></script>

  <!-- flot js -->
  <!--[if lte IE 8]><script type="text/javascript" src="js/excanvas.min.js"></script><![endif]-->
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.pie.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.orderBars.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.time.min.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/date.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.spline.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.stack.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/curvedLines.js"></script>
  <script type="text/javascript" src="resources/js/layout/flot/jquery.flot.resize.js"></script>
  <script>
    $(document).ready(function() {
      // [17, 74, 6, 39, 20, 85, 7]
      //[82, 23, 66, 9, 99, 6, 2]
      var data1 = [
        [gd(2012, 1, 1), 17],
        [gd(2012, 1, 2), 74],
        [gd(2012, 1, 3), 6],
        [gd(2012, 1, 4), 39],
        [gd(2012, 1, 5), 20],
        [gd(2012, 1, 6), 85],
        [gd(2012, 1, 7), 7]
      ];

      var data2 = [
        [gd(2012, 1, 1), 82],
        [gd(2012, 1, 2), 23],
        [gd(2012, 1, 3), 66],
        [gd(2012, 1, 4), 9],
        [gd(2012, 1, 5), 119],
        [gd(2012, 1, 6), 6],
        [gd(2012, 1, 7), 9]
      ];
      $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
        data1, data2
      ], {
        series: {
          lines: {
            show: false,
            fill: true
          },
          splines: {
            show: true,
            tension: 0.4,
            lineWidth: 1,
            fill: 0.4
          },
          points: {
            radius: 0,
            show: true
          },
          shadowSize: 2
        },
        grid: {
          verticalLines: true,
          hoverable: true,
          clickable: true,
          tickColor: "#d5d5d5",
          borderWidth: 1,
          color: '#fff'
        },
        colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
        xaxis: {
          tickColor: "rgba(51, 51, 51, 0.06)",
          mode: "time",
          tickSize: [1, "day"],
          //tickLength: 10,
          axisLabel: "Date",
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Verdana, Arial',
          axisLabelPadding: 10
            //mode: "time", timeformat: "%m/%d/%y", minTickSize: [1, "day"]
        },
        yaxis: {
          ticks: 8,
          tickColor: "rgba(51, 51, 51, 0.06)",
        },
        tooltip: false
      });

      function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
      }
    });
  </script>

  <!-- worldmap -->
  <script type="text/javascript" src="resources/js/layout/maps/jquery-jvectormap-2.0.3.min.js"></script>
  <script type="text/javascript" src="resources/js/layout/maps/gdp-data.js"></script>
  <script type="text/javascript" src="resources/js/layout/maps/jquery-jvectormap-world-mill-en.js"></script>
  <script type="text/javascript" src="resources/js/layout/maps/jquery-jvectormap-us-aea-en.js"></script>
  <!-- pace -->
  <script src="resources/js/layout/pace/pace.min.js"></script>
  <script>
    $(function() {
      $('#world-map-gdp').vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        series: {
          regions: [{
            values: gdpData,
            scale: ['#E6F2F0', '#149B7E'],
            normalizeFunction: 'polynomial'
          }]
        },
        onRegionTipShow: function(e, el, code) {
          el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
        }
      });
    });
  </script>
  <!-- skycons -->
  <script src="resources/js/layout/skycons/skycons.min.js"></script>
  <script>
    var icons = new Skycons({
        "color": "#73879C"
      }),
      list = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
      ],
      i;

    for (i = list.length; i--;)
      icons.set(list[i], list[i]);

    icons.play();
  </script>

  <!-- dashbord linegraph -->
  <script>
    Chart.defaults.global.legend = {
      enabled: false
    };

    var data = {
      labels: [
        "Symbian",
        "Blackberry",
        "Other",
        "Android",
        "IOS"
      ],
      datasets: [{
        data: [15, 20, 30, 10, 30],
        backgroundColor: [
          "#BDC3C7",
          "#9B59B6",
          "#455C73",
          "#26B99A",
          "#3498DB"
        ],
        hoverBackgroundColor: [
          "#CFD4D8",
          "#B370CF",
          "#34495E",
          "#36CAAB",
          "#49A9EA"
        ]

      }]
    };

    var canvasDoughnut = new Chart(document.getElementById("canvas1"), {
      type: 'doughnut',
      tooltipFillColor: "rgba(51, 51, 51, 0.55)",
      data: data
    });
  </script>
  <!-- /dashbord linegraph -->
  <!-- datepicker -->
  <script type="text/javascript">
    $(document).ready(function() {

      var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
      }

      var optionSet1 = {
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: '12/31/2015',
        dateLimit: {
          days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
          applyLabel: 'Submit',
          cancelLabel: 'Clear',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Custom',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          firstDay: 1
        }
      };
      $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
      $('#reportrange').daterangepicker(optionSet1, cb);
      $('#reportrange').on('show.daterangepicker', function() {
        console.log("show event fired");
      });
      $('#reportrange').on('hide.daterangepicker', function() {
        console.log("hide event fired");
      });
      $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
      });
      $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
        console.log("cancel event fired");
      });
      $('#options1').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
      });
      $('#options2').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
      });
      $('#destroy').click(function() {
        $('#reportrange').data('daterangepicker').remove();
      });
    });
  </script>
  <script>
    NProgress.done();
    var sessionProjectNum = "<%=(String)session.getAttribute("sessionProjectNum")%>";
  </script>
  <!-- /datepicker -->
  <!-- /footer content -->
</body>
</html>