// const user = JSON.parse(localStorage.getItem("user"));

export const auth = {
	actions: {
		login(user) {
			console.log(localStorage.getItem("user"));
			localStorage.setItem("user", JSON.stringify(user));
			console.log(user);
			console.log("test");
		}
	}
};
