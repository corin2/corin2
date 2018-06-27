$(function () {
	 $('.leantextareasize').focus();
	allSelectLeanCanvas();
})

function problemClick(string) {
		console.log("2"+string);
		html = "<br><div class='leanpdiv'><textarea class='leantextarea leantextareasize1' id='"+string+"text'></textarea></div>"
		$("#"+string).empty();
		$("#"+string).append(html);
		$("#"+string+"text").focus();
	
}

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
			console.log("삽입성공")
			allSelectLeanCanvas();
		}
		
	})
}

function allSelectLeanCanvas(){
	$.ajax({
		url:"leanCanvasAllSelect",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			console.log(data.list);
			$.each(data.list, function(index, elt) {
				console.log(elt.teamName!="")
				if(elt.teamName!=""){
					$("#leanheader").empty();
				var html='<h2 class="leanh2"><input type="text" id="leanTeamName" readonly value="'+elt.teamName+'" class="search"><span class="glyphicon close1 kanbanCheckMod" onclick="teamNameEditClick(\''+elt.teamName+'\')" >&#xe065;</span></h2>'
						+'<br>'
						+'<br>'
						+'<br>';
					$("#leanheader").append(html);
				}else{
					$("#leanheader").empty();
				var html='<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="팀명을 입력하세요" class="search"></h2>'
						+'<br>'
						+'<input type="button" value="팀명수정" class="btn btn-success" onclick="teamNameEditClick(\''+elt.teamName+'\')" style="float: right; margin-right: 8%">'
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
				var	html1 ='<a class="leanatag" onclick="problemEditClick(\'problem\')">add...</a>'
					$("#problem").append(html1);
				}
				if(elt.solution!=null && elt.solution!='undefined' && elt.solution!=""){
					var enter = elt.solution.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#solution").empty();
				var solution = '<div class="leanpdiv" onclick="problemEditClick(\'solution\')">'+enter+'</div>'
					$("#solution").append(solution);
				}else{
					$("#solution").empty();
					var	solution ='<a class="leanatag" onclick="problemEditClick(\'solution\')">add...</a>'
						$("#solution").append(solution);
					}
				if(elt.uniqueValue!=null && elt.uniqueValue!='undefined' && elt.uniqueValue!=""){
					var enter = elt.uniqueValue.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#uniquevalue").empty();
				var uniquevalue = '<div class="leanpdiv" onclick="problemEditClick(\'uniquevalue\')">'+enter+'</div>'
					$("#uniquevalue").append(uniquevalue);
				}else{
					$("#uniquevalue").empty();
					var	uniquevalue ='<a class="leanatag" onclick="problemEditClick(\'uniquevalue\')">add...</a>'
						$("#uniquevalue").append(uniquevalue);
					}
				if(elt.competitiveAdvantage!=null && elt.competitiveAdvantage!='undefined' && elt.competitiveAdvantage!=""){
					var enter = elt.competitiveAdvantage.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#compettive").empty();
				var compettive = '<div class="leanpdiv" onclick="problemEditClick(\'compettive\')">'+enter+'</div>'
					$("#compettive").append(compettive);
				}else{
					$("#compettive").empty();
					var	compettive ='<a class="leanatag" onclick="problemEditClick(\'compettive\')">add...</a>'
						$("#compettive").append(compettive);
					}
				if(elt.customer!=null && elt.customer!='undefined' && elt.customer!=""){
					var enter = elt.customer.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#customer").empty();
				var customer = '<div class="leanpdiv" onclick="problemEditClick(\'customer\')">'+enter+'</div>'
					$("#customer").append(customer);
				}else{
					$("#customer").empty();
					var	customer ='<a class="leanatag" onclick="problemEditClick(\'customer\')">add...</a>'
					$("#customer").append(customer);
					}
				if(elt.alterNatives!=null && elt.alterNatives!='undefined' && elt.alterNatives!=""){
					var enter = elt.alterNatives.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#alternatives").empty();
				var html21 = '<div class="leanpdiv" onclick="problemEditClick(\'alternatives\')">'+enter+'</div>'
					$("#alternatives").append(html21);
				}else{
					$("#alternatives").empty();
				var	html21 ='<a class="leanatag" onclick="problemEditClick(\'alternatives\')">add...</a>';
					$("#alternatives").append(html21);
					}
				if(elt.mainPoint!=null && elt.mainPoint!='undefined' && elt.mainPoint!=""){
					var enter = elt.mainPoint.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#mainpoint").empty();
				var mainPoint = '<div class="leanpdiv" onclick="problemEditClick(\'mainpoint\')">'+enter+'</div>'
					$("#mainpoint").append(mainPoint);
				}else{
					$("#mainpoint").empty();
					var	mainpoint ='<a class="leanatag" onclick="problemEditClick(\'mainpoint\')">add...</a>'
					$("#mainpoint").append(mainpoint);
					}
				if(elt.parentConcept!=null && elt.parentConcept!='undefined' && elt.parentConcept!=""){
					var enter = elt.parentConcept.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#parentconcept").empty();
				var parentConcept = '<div class="leanpdiv" onclick="problemEditClick(\'parentconcept\')">'+enter+'</div>'
					$("#parentconcept").append(parentConcept);
				}else{
					$("#parentconcept").empty();
					var	parentconcept ='<a class="leanatag" onclick="problemEditClick(\'parentconcept\')">add...</a>'
					$("#parentconcept").append(parentconcept);
					}
				if(elt.channel!=null && elt.channel!='undefined' && elt.channel!=""){
					var enter = elt.channel.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#channel").empty();
				var channel = '<div class="leanpdiv" onclick="problemEditClick(\'channel\')">'+enter+'</div>'
					$("#channel").append(channel);
				}else{
					$("#channel").empty();
					var	channel ='<a class="leanatag" onclick="problemEditClick(\'channel\')">add...</a>'
					$("#channel").append(channel);
					}
				if(elt.earlyAdopter!=null && elt.earlyAdopter!='undefined' && elt.earlyAdopter!=""){
					var enter = elt.earlyAdopter.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#earlyadopter").empty();
				var earlyAdopter = '<div class="leanpdiv" onclick="problemEditClick(\'earlyadopter\')">'+enter+'</div>'
					$("#earlyadopter").append(earlyAdopter);
				}else{
					$("#earlyadopter").empty();
					var	earlyadopter ='<a class="leanatag" onclick="problemEditClick(\'earlyadopter\')">add...</a>'
					$("#earlyadopter").append(earlyadopter);
					}
				if(elt.costStructure!=null && elt.costStructure!='undefined' && elt.costStructure!=""){
					var enter = elt.costStructure.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#coststructuer").empty();
				var costStructure = '<div class="leanpdiv" onclick="problemEditClick(\'coststructuer\')">'+enter+'</div>'
					$("#coststructuer").append(costStructure);
				}else{
					$("#coststructuer").empty();
					var	coststructuer ='<a class="leanatag" onclick="problemEditClick(\'coststructuer\')">add...</a>'
					$("#coststructuer").append(coststructuer);
					}
				if(elt.profit!=null && elt.profit!='undefined' && elt.profit!=""){
					var enter = elt.profit.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#profit").empty();
				var profit = '<div class="leanpdiv" onclick="problemEditClick(\'profit\')">'+enter+'</div>'
					$("#profit").append(profit);
				}else{
					$("#profit").empty();
					var	profit ='<a class="leanatag" onclick="problemEditClick(\'profit\')">add...</a>'
					$("#profit").append(profit);
					}
			})
		}
	})
}
function teamNameEditClick(string) {
	$("#leanheader").empty();
	var html='<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="'+string.split('/')+'" class="search" onkeypress="if(event.keyCode==13) {leanUpdate();}"></h2>'
			+'<br>'
			+'<br>'
			+'<br>'
		$("#leanheader").append(html);
	
}
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
			console.log("수정성공")
			allSelectLeanCanvas()
		}
		
	})
}