$(function(){
	allList();
	checkListLength();
});

/**
* @함수명 : allList()
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 차트에서 사용될 모든 리스트들을 배열에 담아주기위한 함수
**/
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
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : projectChart(lists)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 차트에서 사용될 리스트넘버당 들어있는 카드의 개수 배열에 담아 그 내용들로
* 		프로젝트진행률 차트를 만든다.
* @param lists - allList() 함수에서 만들어진 모든 리스트의 이름이 담긴 배열
**/
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
						backgroundColor: listColorData
					}]
			    },
				options : {
					title: {
						display: true,
						text: '프로젝트 진행상태',
						fontSize: 40
					}
				}
			});
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : checkListLength()
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 기본적으로 질문되는 기본체크리스트의 개수를 얻어오기 위함.
**/
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
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : confirmCheckListLength(maxData)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 팀장이 만든 체크리스트의 개수를 파라미터로 받은 maxData와 합하여 다시 정보를 갱신한다
* @param maxData - checkListLength()에서 얻어온 기본체크리스트총 개수
**/
function confirmCheckListLength(maxData) {
	$.ajax({
		type : "post",
		url  : "CheckListSelectAll",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			maxData += data.list.length;
			teamMemberUserIdSelect(maxData);
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : teamMemberUserIdSelect(maxData)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 프로젝트 팀원의 인원마다 배열에 json 형식으로 기본데이터를 저장한다. 
* @param maxData - 해당 프로젝트 체크리스트의 총 개수
**/
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
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : checkedConfirmLength(maxData, chartData)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 프로젝트 팀원의 인원마다 기본체크리스트를 체크한 개수를 배열에 json 형식으로 저장한다. 
* @param maxData - 해당 프로젝트 체크리스트의 총 개수
* @param chartData - 팀장이 만든 체크리스트를 체크한 각 인원의 개수를 담은 배열
**/
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
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : checkListProceedChart(maxData, chartData)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 프로젝트 팀원의 인원마다 기본체크리스트를 체크한 개수를 파라미터로 받은 배열에 같은 이름끼리는
* 		더하고 없는 인원은 추가하여 정보를 갱신하고 얻은 정보를 가지고 차트를 생성한다 
* @param maxData - 해당 프로젝트 체크리스트의 총 개수
* @param chartData - 팀장이 만든 체크리스트를 체크한 각 인원의 개수를 담은 배열
**/
function checkListProceedChart(maxData, chartData) {
	$.ajax({
		url:"CheckListSelectAll",
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
				animation: {
					animateRotate: false,
					animateScale: true
				},
				options: {
					responsive: true,
					scale: {
						ticks: {
							max: maxData,
							min: 0,
							stepSize: 5
						}
					},
					title: {
						display: true,
						text: '체크리스트 현황',
						fontSize: 40
					}
				}
			});
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}