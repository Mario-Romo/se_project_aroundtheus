// Responsible for rendering info about the user on the page

class UserInfo {
	constructor(profileNameElement, profileJobElement) {
		this._profileName = profileNameElement;
		this._profileJob = profileJobElement;
	}

	//  public method returns object with info about user
	getUserInfo() {
		return {
			name: this._profileName.textContent,
			job: this._profileJob.textContent,
		};
	}

	//  public method that takes new user data and adds it to the page
	setUserInfo(name, job) {
		this._profileName.textContent = name;
		this._profileJob.textContent = job;
	}
}

export default UserInfo;
