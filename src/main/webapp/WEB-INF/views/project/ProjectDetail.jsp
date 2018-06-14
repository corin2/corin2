<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" id="myModal2" role="dialog">
	<div class="modal-dialog modal-lg">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 id="modalHeader" class="modal-title"></h4>
			</div>
			
			<input type="hidden" id="hiddenCardNum">
			
			<div class="modal-body container">
				<div id="detailButton" class="flex2">
					<div id="projectDetail" class="form-group">
					<h3>프로젝트제목입력:</h3>
					<input id ="ProjectName" type="text">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

