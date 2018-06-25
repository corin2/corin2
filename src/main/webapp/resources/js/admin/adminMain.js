//////////// $(document).ready() ////////////
$(function() {
	// 모든 회원 수
	allUserCount();
	// 모든 프로젝트 수
	allProjectCount();
	
	// 프로그래밍 언어 차트 표시
	showLanguageZingChart();
	// 이메일 차트 표시
	showEmailChart();
	// 통계 차트 표시
	showStatsChart();
	
}); //end - jQuery

//////////// 차트 구성 ////////////
//프로그래밍 언어 차트 - ZingChart
function showLanguageZingChart() {
	// 프로그래밍 언어
	var text = 'Eiffel, VHDL, Scala, Emacs Lisp, Delphi, Ada, Vim, Perl, Lua, Objective-C'
	+ 'Rebol, Verilog, Factor, loke, Erlang, Nu, D, Shell, Assembly, Turing'
	+ 'TypeScript, Arduino, Dart, CoffeScript, Arc, Elixir, Groovy, R, Clojure'
	+ 'Rust, Prolog, Gosu, FORTRAN, Fancy, Haskell, Vala, Smalltalk, Scheme, Matlab';
	var lines = text.split(/[,. ]+/g);
	
	// 초기데이터
	var languageData = [];
	$.each(lines, function(index, obj) {
		languageData.push({
			"text": obj,
			"count": 1
		});
	});
	
	// 프로젝트 언어별 수 카운트
	allLanguageCount(languageData);
	
	// 차트 데이터
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
	
	// 차트 표시
	zingchart.render({
	  id: 'languageRank',
	  data: myConfig,
	  height: '100%',
	  width: '100%'
	});
}

// 이메일 차트
function showEmailChart() {
	var chartMailRank = echarts.init(document.getElementById('emailRank'));
	
	var email = [];
	var emailCount = [];
	
	// 이메일 카운트
	allEmailCount(email, emailCount);
	
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
	        data: email
	    },
	    series: [
	        {
	            name: '2018년',
	            type: 'bar',
	            data: emailCount
	        },
	    ]
	};
	
	chartMailRank.setOption(option);
}

// 통계 차트
function showStatsChart() {
	var chartStats = echarts.init(document.getElementById('stats'));
	
	var userDate = [];
	var userCount = [];
	var projectDate = [];
	var projectCount = [];
	
	userCountByDate(userDate, userCount); // 날짜별 회원 수
	projectCountByDate(projectDate, projectCount); // 날짜별 프로젝트 수
	
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
	            data : userDate
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'회원 ',
	            type:'line',
	            areaStyle: {normal: {}},
	            data: userCount
	        },
	        {
	            name:'프로젝트 ',
	            type:'line',
	            areaStyle: {normal: {}},
	            data: projectCount
	        },
	    ],
	};
	
	chartStats.setOption(optionStats);
}


//////////// 기능 ////////////
	
// isDeleted = 0인 모든 회원 수
function allUserCount() {
	$.ajax({
		url: "allUserCount",
		datatype: "text",
		success: function(data) {
			$('#allUserCountResult').text(numberWithCommas(data.count));
		}
	})
}

// isDeleted = 0인 모든 프로젝트 수
function allProjectCount() {
	$.ajax({
		url: "allProjectCount",
		datatype: "text",
		success: function(data) {
			$('#allProjectCountResult').text(numberWithCommas(data.count));
		}
	})
}

// 프로젝트 언어별 수
function allLanguageCount(arr) {
	$.ajax({
		url: "allLanguageCount",
		datatype: "JSON",
		async: false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				arr.push({
					"text": obj.languageMain,
					"count": obj.languageCount,
					"color": obj.languageColor
				});
			});
		}
	});	
}

// isDeleted = 0인 회원의 모든 이메일 수
function allEmailCount(arr1, arr2) {
	$.ajax({
		url: "allEmailCount",
		datatype: "JSON",
		async: false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				arr1.push(obj.email);
				arr2.push(obj.emailCount);
			});
		}
	})
}


// 날짜별 회원 수
function userCountByDate(arr1, arr2) {
	$.ajax({
		url: "userCountByDate",
		datatype: "JSON",
		async: false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				arr1.push(obj.date);
				arr2.push(obj.count);
			});
		}
	})
}

//날짜별 프로젝트 수
function projectCountByDate(arr1, arr2) {
	$.ajax({
		url: "projectCountByDate",
		datatype: "JSON",
		async: false,
		success: function(data) {
			$.each(data.count, function(index, obj) {
				arr1.push(obj.date);
				arr2.push(obj.count);
			});
		}
	})
}

//////////// 유틸 ////////////
// 3자리 숫자 이상에 콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

