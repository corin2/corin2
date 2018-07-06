<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="resources/css/checklist/checklist.css">
<link rel="stylesheet" href="resources/css/checklist/icheck/flat/green.css">
<script src="resources/js/checklist/checklist.js"></script>
<script src="resources/js/checklist/skillchecklist.js"></script>
<link rel="stylesheet" href="resources/css/checklist/util.css">
<div id="tabs" class="checkbackdiv">
  <h2 id='checklisttitle'> 체크리스트 </h2>
  <hr>
  <ul class="nav nav-tabs">
    <li><a href="#tabs-1" onclick="userGradeCheckList()">공통체크리스트</a></li>
    <li><a href="#tabs-2" onclick="userGradeCheckList()">사용자체크리스트</a></li>
    <li id="tab3"><a id="3tab" href="#tabs-3" onclick="userGradeCheckList()">공통체크리스트확인</a></li>
    <li id="tab4"><a id="4tab" href="#tabs-4" onclick="userGradeCheckList()">사용자체크리스트확인</a></li>
  </ul>
  
   <div class="tab-content">
    <div id="tabs-1" class="tab-pane fade in active">
    </div>
    <div id="tabs-2" class="tab-pane fade">
    </div>
    <div id="tabs-3" class="checklistFlow tab-pane fade">
    </div>
    <div id="tabs-4" class="checklistFlow tab-pane fade">
    </div>
  </div>
</div>
