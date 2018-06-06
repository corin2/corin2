//카드를 추가하는 텍스트박스를 생성한다
function addCardView(org,listNum, projectNum) {
	$(org).parent().find("#addcard").remove();
	console.log("프넘은 " + projectNum);
	var div = "<div class='card' id='addcard'>" +
			"<input class='inputtext' type='text' placeholder='card title' name='title' " +
			"'{addCard($(this).parent().children(\"a\"), "+ listNum +","+projectNum+");}' " +
			">" +
			"<a onclick='addCard(this, "+ listNum +", "+ projectNum +")'>완료</a></div>";
	$(org).before(div);
}

//카드 등록 성공
function addCard(obj, listNum, projectNum){
	var parent = $(obj).closest('div')
	console.log("프로젝트 넘버 " + projectNum);
	var value = parent[0].firstChild.value //cardname
	if(value.trim() != ""){
		$.ajax({
			url:"cardInsert",
			datatype:"JSON",
			data:{listNum:listNum, cardName:value, projectNum:projectNum},
			success:function(data){
				console.log("메로롱");
				$(parent).remove();
				$('#contentDetail').empty();
			}
		});
	}
}

//카드 디테일에 내용 뿌려주기
function selectCard(cardNum){
	console.log(cardNum);
	$.ajax({
		url:"cardSelect",
		datatype:"JSON",
		data:{cardNum:cardNum},
		success:function(data){
			console.log("메롱메롱");
			console.log(data.dto);
			console.log(data.dto.cardName);
			$("#modalHeader").html(data.dto.cardName);
			$("#contentDetail").val(data.dto.cardContent);
		}
	});
}

function updateCardDetail(userId){
	console.log(userId);
	console.log($("#contentDetail").val())
	console.log($("#modalHeader").html())
	$.ajax({
		url:"cardUpdate",
		datatype:"JSON",
		data:{userId:userId, cardContent:$("#contentDetail").val(), cardName:$("#modalHeader").html()},
		success:function(data){
			console.log("메메메로오로옹")
		}
	})	
}
