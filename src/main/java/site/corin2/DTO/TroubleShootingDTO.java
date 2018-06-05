/* 
    파일명: TroubleShootingDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.DTO;

public class TroubleShootingDTO {
	
	private int boardNum;
	private String skillNum;
	private int projectNum;
	private String problem;
	private String solution;
	
	public TroubleShootingDTO() {}

	public int getBoardNum() {
		return boardNum;
	}

	public void setBoardNum(int boardNum) {
		this.boardNum = boardNum;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getProblem() {
		return problem;
	}

	public void setProblem(String problem) {
		this.problem = problem;
	}

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
	}

	
}
