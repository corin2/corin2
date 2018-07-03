$(function () {
	 $('.leantextareasize').focus();
	allSelectLeanCanvas();
})

//각 칸마다 textarea 생성
function problemClick(string) {
		html = "<br><div class='leanpdiv'><textarea class='leantextarea leantextareasize1' id='"+string+"text'></textarea></div>"
		$("#"+string).empty();
		$("#"+string).append(html);
		$("#"+string+"text").focus();
	
}
//각칸의 내용 DB에 삽입
function insertLean() {
	$.ajax({
		url:"leanInsert",
		datatype:"JSON",
		data:{
			projectNum:sessionProjectNum,
			teamName:$("#leanTeamName").val(),
			problem:$("#problemtext").val(),
			alterNatives:$("#alternativestext").val(),
			solution:$("#solutiontext").val(),
			mainPoint:$("#mainpointtext").val(),
			uniqueValue:$("#uniquevaluetext").val(),
			parentConcept:$("#parentconcepttext").val(),
			competitiveAdvantage:$("#compettivetext").val(),
			channel:$("#channeltext").val(),
			customer:$("#customertext").val(),
			earlyAdopter:$("#earlyadoptertext").val(),
			costStructure:$("#coststructuertext").val(),
			profit:$("#profittext").val()
		},
		success: function (data) {
			allSelectLeanCanvas();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
		
	})
}

//leancanvas에 해당하는 내용 뿌려주기
function allSelectLeanCanvas(){
	$.ajax({
		url:"leanCanvasAllSelect",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
				if(elt.teamName!=""){
					$("#leanheader").empty();
				var html='<h2 class="leanh2"><input type="text" id="leanTeamName" readonly value="'+elt.teamName+'" class="search"><span class="glyphicon close1 kanbanCheckMod" onclick="teamNameEditClick(\''+elt.teamName+'\')" >&#xe065;</span></h2>'
						+'<br>'
						+'<br>'
						+'<br>';
					$("#leanheader").append(html);
				}else{
					$("#leanheader").empty();
				var html='<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="팀명을 입력하세요" class="search"><span class="glyphicon close1 kanbanCheckMod" onclick="teamNameEditClick(\''+elt.teamName+'\')" >&#xe065;</span></h2>'
						+'<br>'
						+'<br>'
						+'<br>';
					$("#leanheader").append(html);
				}
				if(elt.problem!=null && elt.problem!='undefined' && elt.problem!=""){
					var enter = elt.problem.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#problem").empty();
				var	html1 ='<div class="leanpdiv" onclick="problemEditClick(\'problem\')">'+enter+'</div>'
					$("#problem").append(html1);
				}else{
					$("#problem").empty();
				var	html1 ='<a class="leanatag" onclick="problemEditClick(\'problem\')">대상고객이 가지고 있는 문제 3가지<br>add..</a>'
					$("#problem").append(html1);
				}
				if(elt.solution!=null && elt.solution!='undefined' && elt.solution!=""){
					var enter = elt.solution.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#solution").empty();
				var solution = '<div class="leanpdiv" onclick="problemEditClick(\'solution\')">'+enter+'</div>'
					$("#solution").append(solution);
				}else{
					$("#solution").empty();
					var	solution ='<a class="leanatag" onclick="problemEditClick(\'solution\')">문제해결을 위한 3가지 대안<br>add..</a>'
						$("#solution").append(solution);
					}
				if(elt.uniqueValue!=null && elt.uniqueValue!='undefined' && elt.uniqueValue!=""){
					var enter = elt.uniqueValue.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#uniquevalue").empty();
				var uniquevalue = '<div class="leanpdiv" onclick="problemEditClick(\'uniquevalue\')">'+enter+'</div>'
					$("#uniquevalue").append(uniquevalue);
				}else{
					$("#uniquevalue").empty();
					var	uniquevalue ='<a class="leanatag" onclick="problemEditClick(\'uniquevalue\')">구입해야 하는 이유<br>차별성을 알기 쉽게<br>설득력있는<br>한문장의 메세지<br>add..</a>'
						$("#uniquevalue").append(uniquevalue);
					}
				if(elt.competitiveAdvantage!=null && elt.competitiveAdvantage!='undefined' && elt.competitiveAdvantage!=""){
					var enter = elt.competitiveAdvantage.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#compettive").empty();
				var compettive = '<div class="leanpdiv" onclick="problemEditClick(\'compettive\')">'+enter+'</div>'
					$("#compettive").append(compettive);
				}else{
					$("#compettive").empty();
					var	compettive ='<a class="leanatag" onclick="problemEditClick(\'compettive\')">쉽게 복제할 수 없는 강점<br>add...</a>'
						$("#compettive").append(compettive);
					}
				if(elt.customer!=null && elt.customer!='undefined' && elt.customer!=""){
					var enter = elt.customer.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#customer").empty();
				var customer = '<div class="leanpdiv" onclick="problemEditClick(\'customer\')">'+enter+'</div>'
					$("#customer").append(customer);
				}else{
					$("#customer").empty();
					var	customer ='<a class="leanatag" onclick="problemEditClick(\'customer\')">타겟고객<br>add...</a>'
					$("#customer").append(customer);
					}
				if(elt.alterNatives!=null && elt.alterNatives!='undefined' && elt.alterNatives!=""){
					var enter = elt.alterNatives.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#alternatives").empty();
				var html21 = '<div class="leanpdiv" onclick="problemEditClick(\'alternatives\')">'+enter+'</div>'
					$("#alternatives").append(html21);
				}else{
					$("#alternatives").empty();
				var	html21 ='<a class="leanatag" onclick="problemEditClick(\'alternatives\')">이전에 문제를 해결 하기 위해<br> 사용한 것 <br>add...</a>';
					$("#alternatives").append(html21);
					}
				if(elt.mainPoint!=null && elt.mainPoint!='undefined' && elt.mainPoint!=""){
					var enter = elt.mainPoint.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#mainpoint").empty();
				var mainPoint = '<div class="leanpdiv" onclick="problemEditClick(\'mainpoint\')">'+enter+'</div>'
					$("#mainpoint").append(mainPoint);
				}else{
					$("#mainpoint").empty();
					var	mainpoint ='<a class="leanatag" onclick="problemEditClick(\'mainpoint\')">검증이 필요한 항목 도출 <br>add...</a>'
					$("#mainpoint").append(mainpoint);
					}
				if(elt.parentConcept!=null && elt.parentConcept!='undefined' && elt.parentConcept!=""){
					var enter = elt.parentConcept.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#parentconcept").empty();
				var parentConcept = '<div class="leanpdiv" onclick="problemEditClick(\'parentconcept\')">'+enter+'</div>'
					$("#parentconcept").append(parentConcept);
				}else{
					$("#parentconcept").empty();
					var	parentconcept ='<a class="leanatag" onclick="problemEditClick(\'parentconcept\')">만들고자 하는 것에 대한 상위 개념<br>add...</a>'
					$("#parentconcept").append(parentconcept);
					}
				if(elt.channel!=null && elt.channel!='undefined' && elt.channel!=""){
					var enter = elt.channel.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#channel").empty();
				var channel = '<div class="leanpdiv" onclick="problemEditClick(\'channel\')">'+enter+'</div>'
					$("#channel").append(channel);
				}else{
					$("#channel").empty();
					var	channel ='<a class="leanatag" onclick="problemEditClick(\'channel\')">고객 접촉 가능 채널들 <br>add...</a>'
					$("#channel").append(channel);
					}
				if(elt.earlyAdopter!=null && elt.earlyAdopter!='undefined' && elt.earlyAdopter!=""){
					var enter = elt.earlyAdopter.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#earlyadopter").empty();
				var earlyAdopter = '<div class="leanpdiv" onclick="problemEditClick(\'earlyadopter\')">'+enter+'</div>'
					$("#earlyadopter").append(earlyAdopter);
				}else{
					$("#earlyadopter").empty();
					var	earlyadopter ='<a class="leanatag" onclick="problemEditClick(\'earlyadopter\')">누구에게 먼저 서비스를<br> 알릴지를 정한다<br>add...</a>'
					$("#earlyadopter").append(earlyadopter);
					}
				if(elt.costStructure!=null && elt.costStructure!='undefined' && elt.costStructure!=""){
					var enter = elt.costStructure.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#coststructuer").empty();
				var costStructure = '<div class="leanpdiv" onclick="problemEditClick(\'coststructuer\')">'+enter+'</div>'
					$("#coststructuer").append(costStructure);
				}else{
					$("#coststructuer").empty();
					var	coststructuer ='<a class="leanatag" onclick="problemEditClick(\'coststructuer\')">고객 획득 비용<br>유통 비용<br>서버 유지 비용<br>인건비 등<br>add...</a>'
					$("#coststructuer").append(coststructuer);
					}
				if(elt.profit!=null && elt.profit!='undefined' && elt.profit!=""){
					var enter = elt.profit.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#profit").empty();
				var profit = '<div class="leanpdiv" onclick="problemEditClick(\'profit\')">'+enter+'</div>'
					$("#profit").append(profit);
				}else{
					$("#profit").empty();
					var	profit ='<a class="leanatag" onclick="problemEditClick(\'profit\')">수익 창출 모델<br>고객 생애 가치<br>운영 수익<br>add...</a>'
					$("#profit").append(profit);
					}
			})
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

//팀명 수정하는 input태그 생성
function teamNameEditClick(string) {
	if(string != ""){
		$("#leanheader").empty();
		var html='<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="'+string.split('/')+'" class="search" onfocusout="allSelectLeanCanvas()" onkeypress="if(event.keyCode==13) {leanUpdate();}"></h2>'
		+'<br>'
		+'<br>'
		+'<br>'
		$("#leanheader").append(html);
	}else{
		$("#leanheader").empty();
		var html='<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="팀명을입력해주세요" class="search" onfocusout="allSelectLeanCanvas()" onkeypress="if(event.keyCode==13) {leanUpdate();}"></h2>'
		+'<br>'
		+'<br>'
		+'<br>'
		$("#leanheader").append(html);
	}
}

//해당 칸 수정하는 textarea생성
function problemEditClick(string) {
	if($("#"+string+">div").html()!=undefined){
		var enter = $("#"+string+">div").html().replace(/<br\s?\/?>/gi,'\n');
		var html = "<br><div class='leanpdiv'><textarea id='"+string+"text' class='leantextarea leantextareasize1' onfocusout='leanUpdate()' onkeyup='fnChkLength(this, 72)'>"+enter+"</textarea></div>"
		 $("#"+string).empty();
		 $("#"+string).append(html);
		 $("#"+string+"text").focus();
	}else{
		var html = "<br><div class='leanpdiv'><textarea id='"+string+"text' class='leantextarea leantextareasize1' onfocusout='leanUpdate()'></textarea></div>"
		 $("#"+string).empty();
		$("#"+string).append(html);
		$("#"+string+"text").focus();
	}
	
	
}

//해당칸의 내용 수정
function leanUpdate() {
	var teamName ="";
	var problem ="";
	var alterNatives ="";
	var solution ="";
	var mainPoint ="";
	var uniqueValue ="";
	var parentConcept ="";
	var competitiveAdvantage ="";
	var channel ="";
	var customer ="";
	var earlyAdopter ="";
	var costStructure ="";
	var profit ="";
	if($("#leanTeamName").val()==""){
		teamName += $("#leanTeamName").val();
	}else{
		teamName += $("#leanTeamName").val();
	}
	if($("#problemtext").val()==undefined){
		problem += $("#problem>div").html();
	}else{
		problem += $("#problemtext").val();
	}
	if($("#solutiontext").val()==undefined){
		solution += $("#solution>div").html();
	}else{
		solution += $("#solutiontext").val();
	}
	if($("#uniquevaluetext").val()==undefined){
		uniqueValue += $("#uniquevalue>div").html();
	}else{
		uniqueValue += $("#uniquevaluetext").val();
	}
	if($("#compettivetext").val()==undefined){
		competitiveAdvantage += $("#compettive>div").html();
	}else{
		competitiveAdvantage += $("#compettivetext").val();
	}
	if($("#customertext").val()==undefined){
		customer += $("#customer>div").html();
	}else{
		customer += $("#customertext").val();
	}
	if($("#alternativestext").val()==undefined){
		alterNatives += $("#alternatives>div").html();
	}else{
		alterNatives += $("#alternativestext").val();
	}
	if($("#mainpointtext").val()==undefined){
		mainPoint += $("#mainpoint>div").html();
	}else{
		mainPoint += $("#mainpointtext").val();
	}
	if($("#parentconcepttext").val()==undefined){
		parentConcept += $("#parentconcept>div").html();
	}else{
		parentConcept += $("#parentconcepttext").val();
	}
	if($("#channeltext").val()==undefined){
		channel += $("#channel>div").html();
	}else{
		channel += $("#channeltext").val();
	}
	if($("#earlyadoptertext").val()==undefined){
		earlyAdopter += $("#earlyadopter>div").html();
	}else{
		earlyAdopter += $("#earlyadoptertext").val();
	}
	if($("#coststructuertext").val()==undefined){
		costStructure += $("#coststructuer>div").html();
	}else{
		costStructure += $("#coststructuertext").val();
	}
	if($("#profittext").val()==undefined){
		profit += $("#profit>div").html();
	}else{
		profit += $("#profittext").val();
	}
	
	$.ajax({
		url:"leanUpdate",
		datatype:"JSON",
		data:{
			projectNum:sessionProjectNum,
			teamName:teamName,
			problem:problem,
			alterNatives:alterNatives,
			solution:solution,
			mainPoint:mainPoint,
			uniqueValue:uniqueValue,
			parentConcept:parentConcept,
			competitiveAdvantage:competitiveAdvantage,
			channel:channel,
			customer:customer,
			earlyAdopter:earlyAdopter,
			costStructure:costStructure,
			profit:profit
		},
		success: function (data) {
			allSelectLeanCanvas()
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
		
	})
}