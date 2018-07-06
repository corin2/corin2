<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 id="modalHeader" class="modal-title"></h4>
			</div>
			
			<input type="hidden" id="hiddenCardNum">
			
			<div class="modal-body">
				<div>
					<div class="form-group">
						<label for="content">상세 내용</label>
					</div>
					<textarea id="contentDetail" onchange="warningLabel()"></textarea>
					<br>
					<div class="form-group">
						
						<input id="detailAddbtn" class="btn btn-success" type="button" onclick="updateCardDetail()" value="저장">
						<label id="warningLabel"></label>
						<!-- <input class="detailbutton btn btn-primary" type="button" value="Check List" id="addCheckList" onclick="addCardCheckListView()"> -->
					</div>
					<div class="form-group" style="margin-bottom: 20px;">
						<label for="checklist">Check List</label><span class='glyphicon glyphicon-plus' style="margin-left: 20px;" onclick="addCardCheckListView()"></span>
						<div id="checkListForm" style="width: 100%">
							<p><input type="checkbox" id="checkbox1">
								<label for="checkbox1">체크리스트</label>
								<!-- <button type="button" class="close">&times;</button>
								<button type="button" class="glyphicon close">&#xe065;</button> -->
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

