<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog modal-lg">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 id="modalHeader" class="modal-title"></h4>
			</div>
			<div class="modal-body container">
				<div class="flex2">
					<form action="#" method="post">
						
						<div class="form-group">
							<label for="content">상세 내용</label>
						</div>
						<textarea id="contentDetail" style="width: 868px; height: 400px;" onkeyup="fnChkByte(this, 1000)"></textarea>
						<p>
							<div class="form-group">
								<button id="detaiAddbtn" class="btn btn-success" onclick="updateCardDetail('jin@naver.com')">작성</button>
								
								<input class="detailbutton btn btn-primary" type="button" value="Check List" id="addCheckList" onclick="addCheckListForm()">
							</div>
						</p>
						<div class="form-group" id="fileUploadForm"></div>
						<div class="form-group">
							<label for="checklist">Check List</label>
							<div id="checkListForm">
								<p><input type="checkbox" id="checkbox1">
									<label for="checkbox1">체크리스트</label>
									<button type="button" class="close">&times;</button>
									<button type="button" class="glyphicon close">&#xe065;</button>
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

