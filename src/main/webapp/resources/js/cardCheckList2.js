//체크를 클릭했을 때 바로 업데이트 하기
function checkClick(obj, checkNum){
	var checked = 0;
	var content = $(obj).parent().children('label').text();
	
	$(obj).change(function(){
        if($(obj).is(":checked")) checked = 1;
        else checked = 0;
        
        checkUpdate(checked, content, checkNum);
    });
}

//체크박스 업데이트
function checkUpdate(checked, content, checkNum){
	$.ajax({
		url:"checkedUpdate",
		datatype:"text",
		data:{isChecked:checked, checkContent:content, checkNum:checkNum},
		success:function(data){
			showCardCheckList();
		}
	});
}