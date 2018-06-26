<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="resources/js/chart/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<script src="https://codepen.io/anon/pen/aWapBE.js"></script>

<div class="container">
<nav class="navbar navbar-default">
	<div>
		<div style="float: left; border: solid; 1px; margin: 5px; width: 45%;">
			<h1>프로젝트 진행상태</h1>
			<hr>
			<canvas id="projectChart"></canvas>
		</div>
		<div style="float: right; border: solid; 1px; margin: 5px; width: 45%;">
			<h1>작업일 진행</h1>
			<hr>
			<canvas id="projectProceedChart"></canvas>
			<progress id="animationProgress" max="1" value="0" style="width: 100%"></progress>
		</div>
	</div>
</nav>
</div>