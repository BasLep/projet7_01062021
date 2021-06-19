<template>
	<div class="container">
		<Header />
		<h2>Connexion à son compte</h2>
		<br />
		<form @submit="formLogin" id="form_login">
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" />
			</div>
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" class="form-control" id="password" />
			</div>
			<button type="submit">Me connecter</button>
		</form>
	</div>
</template>

<script>
import Header from "../../components/Header";
import axios from "axios";

export default {
	name: "Login",
	components: {
		Header
	},
	methods: {
		formLogin() {
			let email = document.getElementById("email").value;
			let password = document.getElementById("password").value;
			axios
				.post("http://localhost:3000/api/auth/login", {
					email,
					password
				})
				.then((res) => {
					localStorage.setItem("dataUser", JSON.stringify(res.data));
					if (res.status === 200) {
						this.$router.push("homeafterlog");
					}
				});
		}
	}
};
</script>
