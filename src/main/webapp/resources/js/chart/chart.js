$(function(){
	allList();
	checkListLength();
});

//리스트명 가져오기
function allList(){
	var lists = [];
	$.ajax({
		type : "post",
		url  : "showList",
		contentType: "application/json; charset=utf-8",
		success : function(data){
			$('#projectChart').remove();
			$('#pChart').append('<canvas id="projectChart"></canvas>');
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
		}
	});
}

//기본 체크리스트 개수
function checkListLength() {
	$.ajax({
		type : "post",
		url  : "checkListSelect",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			$('#checkListProceedChart').remove();
			$('#cChart').append('<canvas id="checkListProceedChart"></canvas>');
			var maxData = data.list.length;
			
			confirmCheckListLength(maxData);
		}
	});
}

//팀장이 만든 체크리스트 개수
function confirmCheckListLength(maxData) {
	$.ajax({
		type : "post",
		url  : "CheckListSelectAll",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			maxData += data.list.length;
			teamMemberUserIdSelect(maxData);
		}
	});
}

function teamMemberUserIdSelect(maxData) {
	$.ajax({
		url:"showMember",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			var chartData = [];
			$.each(data.data, function(index, elt) {
				chartData.push({name:elt.userId, length:0});
			});
			checkedConfirmLength(maxData, chartData);
		}
	});
}

//인원마다 기본 체크리스트를 체크 한 개수 
function checkedConfirmLength(maxData, chartData) {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
				$.each(chartData, function(i, elt2) {
					if(elt2.name == elt.userId){
						elt2.length += 1;
						return false;
					}
				});
			});
			checkListProceedChart(maxData, chartData);
		}
	});
}

//confirm 팀장이 만든 체크리스트를 인원수마다 체크한 개수 + 차트
function checkListProceedChart(maxData, chartData) {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
				$.each(chartData, function(i, elt2) {
					if(elt2.name == elt.userId){
						elt2.length += 1;
						return false;
					}
				});
			});
			
			var labels = [];
			var datas = [];
			$.each(chartData, function(i, elt) {
				labels.push(elt.name); datas.push(elt.length);
			});
			var ctx = document.getElementById("checkListProceedChart").getContext('2d');
			let chart = new Chart(ctx, {
				type: 'polarArea',
				data: {
					datasets: [{
						data: datas,
						backgroundColor: palette('tol', datas.length).map(function(hex) {
					        return '#' + hex;
					    })
					}],
					labels: labels
				},
				options: {
					scale: {
						ticks: {
							max: maxData,
							min: 0,
							stepSize: 5
						}
					}
				}
			});
		}
	});
}