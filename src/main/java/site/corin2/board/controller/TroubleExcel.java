package site.corin2.board.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;


import site.corin2.board.dto.TroubleShootingDTO;

@SuppressWarnings("deprecation")
public class TroubleExcel extends AbstractExcelView {

	protected void buildExcelDocument(Map<String, Object> model,
			HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition", "attachment; filename=\"TroubleShooting.xls\";");

		HSSFSheet sheet = createFirstSheet(workbook);
		createColumnLabel(sheet);

		List<TroubleShootingDTO> troubleShootingDTOs = (List<TroubleShootingDTO>) model.get("data");
		int rowNum = 1;
		for (TroubleShootingDTO rank : troubleShootingDTOs) {
			createPageRankRow(sheet, rank, rowNum++);
		}
	}

	private HSSFSheet createFirstSheet(HSSFWorkbook workbook) {
		HSSFSheet sheet = workbook.createSheet();
		workbook.setSheetName(0, "TroubleShooting");
		sheet.setColumnWidth(1, 256 * 20);
		sheet.setColumnWidth(2, 256 * 15);
		sheet.setColumnWidth(3, 256 * 40);
		sheet.setColumnWidth(4, 256 * 40);
		sheet.setColumnWidth(5, 256 * 15);
		return sheet;
	}

	private void createColumnLabel(HSSFSheet sheet) {
		HSSFRow firstRow = sheet.createRow(0);
		HSSFCell cell = firstRow.createCell(0);
		cell.setCellValue("날짜");
		cell = firstRow.createCell(1);
		cell.setCellValue("태그");
		cell = firstRow.createCell(2);
		cell.setCellValue("이름");
		cell = firstRow.createCell(3);
		cell.setCellValue("내용");
		cell = firstRow.createCell(4);
		cell.setCellValue("트러블슈팅");
		cell = firstRow.createCell(5);
		cell.setCellValue("비고");
		
	}

	private void createPageRankRow(HSSFSheet sheet, TroubleShootingDTO rank,
			int rowNum) {
		HSSFRow row = sheet.createRow(rowNum);
		HSSFCell cell = row.createCell(0);
		cell.setCellValue(rank.getBoardDate());

		cell = row.createCell(1);
		cell.setCellValue(rank.getHashtag());
		cell = row.createCell(2);
		cell.setCellValue(rank.getUserName());
		cell = row.createCell(3);
		cell.setCellValue(rank.getProblem());
		cell = row.createCell(4);
		cell.setCellValue(rank.getSolution());
		cell = row.createCell(5);
		cell.setCellValue("");
		

	}

	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
	}

}

