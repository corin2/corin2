$(function(){
	
});

function showMsg(){
	$.ajax({
		type : "post",
		url  : "showMsg",
		datatype:"JSON",
		data : {receptionId : $('#hiddenUserId').val()},
		success : function(data){
			$('#inviteMsg').empty();
			
			var htmltext = '';
			$.each(data.data, function(index, elt) {
				htmltext += '<li><a><label>'+elt.projectName+'에 초대받았습니다</label>';
				var byte = byteInt(elt.projectName);
				if(byte > 1) htmltext += '<br>';
				htmltext += '<button class="btn-warning" onclick="msgaccept('+elt.projectNum+')">Y</button>'
						 + '<button class="btn-success" onclick="msgreject('+elt.projectNum+')">N</button>'
						 + '</a></li>';
			});
			
			$('#inviteMsg').html(htmltext);
		}
	});
}

//초대승락
function msgaccept(projectNum){
	var param = {userId : $('#hiddenUserId').val(), projectNum : projectNum}
	$.ajax({
          url:"msgagree",
          datatype:"JSON",
          data:param,
          success:function(data){
        	  showMsg();
          }
	})
}

//초대거절
function msgreject(projectNum){
	var param = {receptionId : $('#hiddenUserId').val(), projectNum : projectNum}
	$.ajax({
          url:"msgdel",
          datatype:"JSON",
          data:param,
          success:function(data){
        	  showMsg();
          }
	})
}