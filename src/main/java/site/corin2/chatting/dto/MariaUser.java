package site.corin2.chatting.dto;

public class MariaUser {
    private String email;
    private String profileImg;
    private String userName;
    private String password;

    public MariaUser() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfileImg() {
		return profileImg;
	}

	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public MariaUser(String email, String profileImg, String userName) {
		this.email = email;
		this.profileImg = profileImg;
		this.userName = userName;
	}

	public MariaUser(String email, String profileImg, String userName, String password) {
		this.email = email;
		this.profileImg = profileImg;
		this.userName = userName;
		this.password = password;
	}

	@Override
	public String toString() {
		return "FirebaseUser [email=" + email + ", profileImg=" + profileImg + ", userName=" + userName + ", password="
				+ password + "]";
	}
}