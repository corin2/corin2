package site.corin2.skill.dto;

public class PositionDTO {

	private int projectNum;
	private String userId;
	private String skillNum;
	private int x;
	private int y;
	private int width;
	private int height;
	
	public PositionDTO() {}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}

	@Override
	public String toString() {
		return "PositionDTO [projectNum=" + projectNum + ", userId=" + userId + ", skillNum=" + skillNum + ", x=" + x
				+ ", y=" + y + ", width=" + width + ", height=" + height + "]";
	}
	
}
