<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/checklist/checklist.css">
<link rel="stylesheet" href="resources/css/checklist/icheck/flat/green.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="resources/js/checklist/checklist.js"></script>
<script src="resources/js/checklist/skillchecklist.js"></script>
<div id="tabs">
  <ul>
    <li><a href="#tabs-1" onclick="userGradeCheckList()">CHECKLIST</a></li>
    <li><a href="#tabs-2" onclick="userGradeCheckList()">USERCHECKLIST</a></li>
    <li id="tab3"><a id="3tab" href="#tabs-3" onclick="userGradeCheckList()">CHECKLIST CONFIRM</a></li>
    <li id="tab4"><a id="4tab" href="#tabs-4" onclick="userGradeCheckList()">USERCHECKLIST CONFIRM</a></li>
    
  </ul>
  <div id="tabs-1">
  </div>
  <div id="tabs-2">
  
  </div>
  <div id="tabs-3">
  </div>
  <div id="tabs-4">
  </div>

</div>