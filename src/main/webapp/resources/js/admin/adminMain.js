//////////// $(document).ready() ////////////
$(function() {
	// 프로그래밍 언어 차트 표시
	showLanguageChart();
	
	// 이메일 차트 표시
	showEmailChart();
	
	// 통계 차트 표시
	showStatsChart();
	
	allUserCount();
	allProjectCount();
	allLanguageCount();
	
	
}); //end - jQuery

//////////// 차트 구성 ////////////
// 프로그래밍 언어 차트
function showLanguageChart() {
	var countData =[];
	
	
	
	
	
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
	
	console.log("라인스: " + lines)
	console.log("데이타: " + data)
	
	Highcharts.chart('container', {
	  series: [{
	    type: 'wordcloud',
	    data: data,
	    name: 'Occurrences'
	  }],
	  title: {
	    text: ''
	  }
	});
}

// 이메일 차트
function showEmailChart() {
	var chartMailRank = echarts.init(document.getElementById('emailRank'));
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
	
	chartMailRank.setOption(option);
}

// 통계 차트
function showStatsChart() {
	var chartStats = echarts.init(document.getElementById('stats'));
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
}


//////////// 기능 ////////////
	
// isDeleted = 0인 모든 회원 수
function allUserCount() {
	$.ajax({
		url: "allUserCount",
		datatype:"text",
		success: function(data) {
			$('#allUserCountResult').text(numberWithCommas(data.count));
		}
	})
}

// isDeleted = 0인 모든 프로젝트 수
function allProjectCount() {
	$.ajax({
		url: "allProjectCount",
		datatype:"text",
		success: function(data) {
			$('#allProjectCountResult').text(numberWithCommas(data.count));
		}
	})
}

// 프로젝트 언어별 수
function allLanguageCount() {
	var countData = []; 
	
	$.ajax({
		url: "allLanguageCount",
		datatype: "JSON",
		success: function(data) {
			$.each(data.count, function(index, obj) {
				console.log("랭귀지메인: " + obj.languageMain);
				console.log("랭귀지카운트: " + obj.languageCount);
				countData.push(obj.languageMain);
			});
		}
	});
	
	
}

//////////// 유틸 ////////////
// 3자리 숫자 이상에 콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

