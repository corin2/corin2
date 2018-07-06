/**
* @함수명 : fnChkByte(obj, maxByte)
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 몇 byte 까지의 글자를 허용 할 지 파라미터로 받아주고 그이상으로 넘어가면 
* 		지정한 byte의 수만큼으로 되돌린다
* @param obj - 자신태그(this)
* @param maxByte - 최대 바이트 수
**/
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;
	
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";
	
	for(var i=0; i<str_len; i++){
		one_char = str.charAt(i);
		
		if(escape(one_char).length > 4){
		    rbyte += 2;                                         // 한글2Byte
		}else{
		    rbyte++;                                            // 영문 등 나머지 1Byte
		}
		
		if(rbyte <= maxByte){
		    rlen = i+1;                                          // return할 문자열 갯수
		}
	}
	
	if(rbyte > maxByte){
		swal({title:"한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다."});
	    str2 = str.substr(0,rlen);                                  // 문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}
}

/**
* @함수명 : fnChkByte(str)
* @작성일 : 2018. 06. 19.
* @작성자 : 김 진 원
* @설명 : 파라미터로 받은 문자열이 몇 byte인지 확인하기 위한 함수
* @param str - 문자열
**/
function byteInt(str){
	var str_len = str.length;
	
	var rbyte = 0;
	var one_char = "";
	
	for(var i=0; i<str_len; i++){
		one_char = str.charAt(i);
		
		if(escape(one_char).length > 4){
		    rbyte += 2;                                         // 한글2Byte
		}else{
		    rbyte++;                                            // 영문 등 나머지 1Byte
		}
	}
	
	return rbyte;
}

/**
* @함수명 : fnChkLength(obj, maxLength)
* @작성일 : 2018. 06. 24.
* @작성자 : 김 진 원
* @설명 : 몇 문자열 길이까지의 글자를 허용 할 지 파라미터로 받아주고 그이상으로 넘어가면 
* 		지정한 문자열 길이의 수만큼으로 되돌린다
* @param obj - 자신태그(this)
* @param maxLength - 최대 길이 수
**/
function fnChkLength(obj, maxLength){
	var str = obj.value;
    var str_len = str.length;
    
    if(str_len > maxLength){
        swal({title:"글자수가 "+maxLength+"자를 초과 입력할 수 없습니다."});
        var str2 = str.substr(0, maxLength-1);                   // 문자열 자르기
        obj.value = str2;
        fnChkLength(obj, maxLength);
    }
}