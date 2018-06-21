<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<link rel="stylesheet" type="text/css" href="resources/css/admin/adminMain.css">
<style>
	.admin-align-center {
		text-align: center;
	}
	.admin-chart-box {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-top {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-center {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-bottom {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-icon {
		font-size: 5em;
		padding: 50px 0;
	    text-align: center;
	}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<script src="resources/js/chart/echarts.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/wordcloud.js"></script>
<script>
$(function() {
	// 프로그래밍 언어 차트
	var text = 'Java, C#, C, Ruby, Python, Go, ASP, VisualBasic, PHP, JavaScript, '
				+ 'Eiffel, VHDL, Scala, Emacs Lisp, Delphi, Ada, Vim, Perl, Lua, Objective-C'
				+ 'Rebol, Verilog, Factor, loke, Erlang, Nu, D, Shell, Assembly, Turing'
				+ 'TypeScript, Arduino, Dart, CoffeScript, Arc, Elixir, Groovy, R, Clojure'
				+ 'Rust, Prolog, Gosu, FORTRAN, Fancy, Haskell, Vala, Smaltalk, Scheme, Matlab';
	var lines = text.split(/[,. ]+/g),
	  data = Highcharts.reduce(lines, function (arr, word) {
	    var obj = Highcharts.find(arr, function (obj) {
	      return obj.name === word;
	    });
	    if (obj) {
	      obj.weight += 1;
	    } else {
	      obj = {
	        name: word,
	        weight: 1
	      };
	      arr.push(obj);
	    }
	    return arr;
	  }, []);
	
	Highcharts.chart('container', {
	  series: [{
	    type: 'wordcloud',
	    data: data,
	    name: 'Occurrences'
	  }],
	  title: {
	    text: '프로그래밍 언어'
	  }
	});
	
	//샘플
    // based on prepared DOM, initialize echarts instance
    var myChart = echarts.init(document.getElementById('emailRank'));
    var chartStats = echarts.init(document.getElementById('stats'));

    // specify chart configuration item and data
    var option = {
   	    title: {
   	        text: '회원 이메일 순위',
   	        subtext: 'Rank of email domain'
   	    },
   	    tooltip: {
   	        trigger: 'axis',
   	        axisPointer: {
   	            type: 'shadow'
   	        }
   	    },
   	    legend: {
   	        data: ['2017년', '2018년']
   	    },
   	    grid: {
   	        left: '3%',
   	        right: '4%',
   	        bottom: '3%',
   	        containLabel: true,
   	    },
   	    xAxis: {
   	        type: 'value',
   	        boundaryGap: [0, 0.01]
   	    },
   	    yAxis: {
   	        type: 'category',
   	        data: ['Zum','Nate','Kakao','Naver','Facebook','Google']
   	    },
   	    series: [
   	        {
   	            name: '2017년',
   	            type: 'bar',
   	            data: [18203, 23489, 29034, 104970, 131744, 630230]
   	        },
   	        {
   	            name: '2018년',
   	            type: 'bar',
   	            data: [19325, 23438, 31000, 121594, 134141, 681807]
   	        }
   	    ]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
    
    var optionStats = {
   	    title: {
   	        text: '통계'
   	    },
   	    tooltip : {
   	        trigger: 'axis',
   	        axisPointer: {
   	            type: 'cross',
   	            label: {
   	                backgroundColor: '#6a7985'
   	            }
   	        }
   	    },
   	    legend: {
   	        data:['방문자 수','회원 수','프로젝트 수','코린이 수','지너니 수']
   	    },
   	    toolbox: {
   	        feature: {
   	            saveAsImage: {
   	            	title : 'Save',
   	            }
   	        },
   	    },
   	    grid: {
   	        left: '3%',
   	        right: '4%',
   	        bottom: '3%',
   	        containLabel: true
   	    },
   	    xAxis : [
   	        {
   	            type : 'category',
   	            boundaryGap : false,
   	            data : ['1','2','3','4','5','6','7']
   	        }
   	    ],
   	    yAxis : [
   	        {
   	            type : 'value'
   	        }
   	    ],
   	    series : [
   	        {
   	            name:'라인1',
   	            type:'line',
   	            stack: '总量',
   	            areaStyle: {normal: {}},
   	            data:[120, 132, 101, 134, 90, 230, 210]
   	        },
   	        {
   	            name:'라인2',
   	            type:'line',
   	            stack: '总量',
   	            areaStyle: {normal: {}},
   	            data:[220, 182, 191, 234, 290, 330, 310]
   	        },
   	        {
   	            name:'라인3',
   	            type:'line',
   	            stack: '总量',
   	            areaStyle: {normal: {}},
   	            data:[150, 232, 201, 154, 190, 330, 410]
   	        },
   	        {
   	            name:'라인4',
   	            type:'line',
   	            stack: '总量',
   	            areaStyle: {normal: {}},
   	            data:[320, 332, 301, 334, 390, 330, 320]
   	        },
   	        {
   	            name:'라인5',
   	            type:'line',
   	            stack: '总量',
   	            label: {
   	                normal: {
   	                    show: true,
   	                    position: 'top'
   	                }
   	            },
   	            areaStyle: {normal: {}},
   	            data:[820, 932, 901, 934, 1290, 1330, 1320]
   	        }
   	    ],
   	};
    
    chartStats.setOption(optionStats);

	
	

	
	
	
});
</script>

<div class="container">
	<!-- [1번째 단] -->
	<div class="row">
		<!-- 방문자 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>방문자</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1>3,854</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-eye-open"></i>
				</div>
			</div>
		</div>
		<!-- 회원 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>회원</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1>1,454</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-user"></i>
				</div>
			</div>
		</div>
		<!-- 프로젝트 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>프로젝트</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1>854</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-th-large"></i>
				</div>
			</div>
		</div>
	</div>
	<!-- [2번째 단] -->
	<div class="row">
		<!-- 프로그래밍 언어-->
		<div class="admin-chart-box col-md-6">
			<div class="row">
				<h1>프로그래밍 언어</h1>
			</div>
			<div class="row">
				<div id="container"></div>
			</div>
		</div>
		<!-- 회원 이메일 순위 -->
		<div class="admin-chart-box col-md-6">
			<div class="row">
				<h1>회원 이메일 순위</h1>
			</div>
			<div class="row">
				<div id="emailRank" style="width: 100%;height:400px;"></div>
			</div>
		</div>
	</div>
	<!-- [3번째 단] -->
	<div class="row">
		<!-- 통계 -->
		<div class="admin-chart-box col-md-12">
			<div class="row">
				<h1>통계</h1>
			</div>
			<div class="row">
				<div id="stats" style="width: 100%;height:400px;"></div>
			</div>
		</div>
	</div>
	
</div>
