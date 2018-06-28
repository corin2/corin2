<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="resources/css/checklist/checklist.css">
<link rel="stylesheet" href="resources/css/checklist/icheck/flat/green.css">
<script src="resources/js/checklist/checklist.js"></script>
<script src="resources/js/checklist/skillchecklist.js"></script>
<h2 id='checklisttitle'>체크리스트</h2>
<hr>
<div id="tabs">
  <ul>
    <li><a href="#tabs-1" onclick="userGradeCheckList()">공통체크리스트</a></li>
    <li><a href="#tabs-2" onclick="userGradeCheckList()">사용자체크리스트</a></li>
    <li id="tab3"><a id="3tab" href="#tabs-3" onclick="userGradeCheckList()">공통체크리스트확인</a></li>
    <li id="tab4"><a id="4tab" href="#tabs-4" onclick="userGradeCheckList()">사용자체크리스트확인</a></li>
    
  </ul>
  <div id="tabs-1">
  </div>
  <div id="tabs-2">
  
  </div>
  <div id="tabs-3" class="checklistFlow">
  </div>
  <div id="tabs-4" class="checklistFlow">
  </div>

</div>
