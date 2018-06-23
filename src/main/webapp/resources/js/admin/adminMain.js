//////////// $(document).ready() ////////////
$(function() {
	// 프로그래밍 언어 차트 표시
	//showLanguageChart();
	showLanguageZingChart();
	
	// 이메일 차트 표시
	showEmailChart();
	
	// 통계 차트 표시
	showStatsChart();
	
	allUserCount();
	allProjectCount();
	// allLanguageCount();
	
	
}); //end - jQuery

//////////// 차트 구성 ////////////
//프로그래밍 언어 차트
function showLanguageZingChart() {
	// 프로그래밍 언어
	var text = 'Eiffel, VHDL, Scala, Emacs Lisp, Delphi, Ada, Vim, Perl, Lua, Objective-C'
	+ 'Rebol, Verilog, Factor, loke, Erlang, Nu, D, Shell, Assembly, Turing'
	+ 'TypeScript, Arduino, Dart, CoffeScript, Arc, Elixir, Groovy, R, Clojure'
	+ 'Rust, Prolog, Gosu, FORTRAN, Fancy, Haskell, Vala, Smaltalk, Scheme, Matlab';
	var lines = text.split(/[,. ]+/g);
	
	// 초기데이터
	var languageData = [];
	$.each(lines, function(index, obj) {
		languageData.push({
			"text": obj,
			"count": 1
		});
	});

	
/*	var languageData = [
		{"text": "Eiffel", "count": 1, "color": '#946d57'},
		{"text": "VHDL", "count": 1, "color": '#543978'},
		{"text": "Scala", "count": 1, "color": '#7dd3b0'},
		{"text": "Emacs Lisp", "count": 1, "color": '#7dd3b0'},
		{"text": "Delphi", "count": 1, "color": '#7dd3b0'},
		{"text": "Ada", "count": 1, "color": '#7dd3b0'},
		{"text": "Vim", "count": 1, "color": '#7dd3b0'},
		{"text": "Perl", "count": 1, "color": '#7dd3b0'},
		{"text": "Lua", "count": 1, "color": '#7dd3b0'},
		{"text": "Rebol", "count": 1, "color": '#7dd3b0'},
		{"text": "Verilog", "count": 1, "color": '#7dd3b0'},
		{"text": "Factor", "count": 1, "color": '#7dd3b0'},
		{"text": "loke", "count": 1, "color": '#7dd3b0'},
		{"text": "Erlang", "count": 1, "color": '#7dd3b0'},
		{"text": "Nu", "count": 1, "color": '#7dd3b0'},
		{"text": "D", "count": 1, "color": '#7dd3b0'},
		{"text": "Shell", "count": 1, "color": '#7dd3b0'},
		{"text": "Assembly", "count": 1, "color": '#7dd3b0'},
		{"text": "Turing", "count": 1, "color": '#7dd3b0'},
		{"text": "TypeScript", "count": 1, "color": '#7dd3b0'},
		{"text": "Arduino", "count": 1, "color": '#7dd3b0'},
		{"text": "Dart", "count": 1, "color": '#7dd3b0'},
		{"text": "CoffeScript", "count": 1, "color": '#7dd3b0'},
		{"text": "Arc", "count": 1, "color": '#7dd3b0'},
		{"text": "Elixir", "count": 1, "color": '#7dd3b0'},
		{"text": "Groovy", "count": 1},
		{"text": "R", "count": 1},
		{"text": "Clojure", "count": 1},
		{"text": "Rust", "count": 1},
		{"text": "Prolog", "count": 1},
		{"text": "Gosu", "count": 1},
		{"text": "FORTRAN", "count": 1},
		{"text": "Fancy", "count": 1},
		{"text": "Haskell", "count": 1},
		{"text": "Vala", "count": 1},
		{"text": "Smaltalk", "count": 1},
		{"text": "Scheme", "count": 1},
		{"text": "Matlab", "count": 1},
	];*/

	$.ajax({
		url: "allLanguageCount",
		datatype: "JSON",
		async:false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				languageData.push({
					"text": obj.languageMain,
					"count": obj.languageCount,
					"color": obj.languageColor
				});
			});
		}
	});	
	
	var myConfig = {
	  "graphset": [{
	    "type": "wordcloud",
	    "options": {
	      "style": {
	        "tooltip": {
	          visible: true,
	          text: '%text: %hits'
	        }
	      },
	      "words": languageData,
	    "rotate":true,
	    }
	  }]
	};

	zingchart.render({
	  id: 'languageRank',
	  data: myConfig,
	  height: '100%',
	  width: '100%'
	});
}

// 프로그래밍 언어 차트
function showLanguageChart() {
	var text = 'Java, C#, C, Ruby, Python, Go, ASP, VisualBasic, PHP, JavaScript, '
		+ 'Eiffel, VHDL, Scala, Emacs Lisp, Delphi, Ada, Vim, Perl, Lua, Objective-C'
		+ 'Rebol, Verilog, Factor, loke, Erlang, Nu, D, Shell, Assembly, Turing'
		+ 'TypeScript, Arduino, Dart, CoffeScript, Arc, Elixir, Groovy, R, Clojure'
		+ 'Rust, Prolog, Gosu, FORTRAN, Fancy, Haskell, Vala, Smaltalk, Scheme, Matlab';
	
	var languageData = [
			{name: "Eiffel", weight: 1},
			{name: "VHDL", weight: 5}
		];
	
	$.ajax({
		url: "allLanguageCount",
		datatype: "JSON",
		async:false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				languageData.push({
					name: obj.languageMain,
					weight: obj.languageCount
				});
			});
		}
	});
	
	console.log("입구");
	
	var convert = JSON.stringify(languageData);
	console.log(convert);
	
	$.each(languageData, function(index, obj) {
		console.log("언어: " + obj.name);
		console.log("숫자: " + obj.weight);
	});
	
	console.log("출구");
	
	//var jsonData = JSON.stringify(testList);

	
	/*console.log("데이터: " + testList);
	console.log("데이터: " + jsonData);*/
	
	//////////
	/*var text = 'Java, C#, C, Ruby, Python, Go, ASP, VisualBasic, PHP, JavaScript, '
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
	}, []);*/
	
	/*Highcharts.chart('container', {
	  series: [{
	    type: 'wordcloud',
	    data: data,
	    name: 'Occurrences'
	  }],
	  title: {
	    text: ''
	  }
	});*/
	//////////
	Highcharts.chart('container', {
	  series: [{
	    type: 'wordcloud',
	    data: languageData,
	    name: 'Count'
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
	$.ajax({
		url: "allLanguageCount",
		datatype: "JSON",
		success: function(data) {
			$.each(data.count, function(index, obj) {
				console.log("랭귀지메인: " + obj.languageMain);
				console.log("랭귀지카운트: " + obj.languageCount);
			});
		}
	});
}

//////////// 유틸 ////////////
// 3자리 숫자 이상에 콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

