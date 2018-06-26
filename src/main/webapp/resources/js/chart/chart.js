$(function(){
	allList();
});

//리스트명 가져오기
function allList(){
	var lists = [];
	$.ajax({
		type : "post",
		url  : "showList",
		contentType: "application/json; charset=utf-8",
		success : function(data){
			$.each(data.data, function(index, elt) {
				lists.push(elt);
			});
			projectChart(lists);
		}
	});
}

//프로젝트 진행률 차트
function projectChart(lists){
	$.ajax({
		type : "post",
		url  : "showCard",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(datas){
			var labels = [];
			var data = [];
			
			//label 명 넣어주기
			$.each(lists, function(index, elt2) { if(index != 1) labels.push(elt2.listName); });
			//data 초기배열 만들어주기
			$.each(lists, function(index, elt) { if(index != 1) data.push(0); });
			//data 값 넣어주기
			$.each(datas.data, function(index, elt) {
				if(elt.listNum > 1)	data[(Number(elt.listNum)-2)] = data[(Number(elt.listNum)-2)]+1;
				else data[(Number(elt.listNum)-1)] = data[(Number(elt.listNum)-1)]+1;
			});
			
			var ctx = document.getElementById("projectChart").getContext('2d');
			var myPieChart = new Chart(ctx,{
			    type: 'doughnut',
			    data: {
			    	labels : labels,
					datasets : [{
						data: data,
						backgroundColor: palette('tol', data.length).map(function(hex) {
					        return '#' + hex;
					    })
					}]
			    }
			});
			
			projectProceedChart(labels, data);
		}
	});
}

function projectProceedChart(labels, data) {
	var ctx = document.getElementById("projectProceedChart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data = {
	    	datasets: [{
	    		data: [10, 20, 30]
	    	}],
	    	labels: ['Red', 'Yellow', 'Blue']
	    }
	});
}