package site.corin2.skill.dto;

public class SkillDTO {
	
	private String skillNum;
	private String skillName;
	private int skillUse;
	
	public SkillDTO() {}
	
	public String getSkillNum() {
		return skillNum;
	}
	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}
	public String getSkillName() {
		return skillName;
	}
	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}
	public int getSkillUse() {
		return skillUse;
	}
	public void setSkillUse(int skillUse) {
		this.skillUse = skillUse;
	}

}
