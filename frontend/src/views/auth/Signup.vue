<template>
	<div class="container">
		<Header />
		<h2>Créez un nouveau compte</h2>
		<br />
		<form @submit="formSignup" id="form_signup">
			<div class="form-group">
				<label for="firstname">Prénom</label>
				<input type="text" class="form-control" id="firstname" />
			</div>
			<div class="form-group">
				<label for="lastname">Nom</label>
				<input type="text" class="form-control" id="lastname" />
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" />
			</div>
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" class="form-control" id="password" />
			</div>
			<button type="submit">Créez mon compte</button>
		</form>
	</div>
</template>

<script>
import Header from "../../components/Header.vue";
import axios from "axios";

export default {
	name: "Signup",
	components: {
		Header
	},
	methods: {
		formSignup() {
			// let signup = [];
			let firstName = document.getElementById("firstname").value;
			let lastName = document.getElementById("lastname").value;
			let email = document.getElementById("email").value;
			let password = document.getElementById("password").value;
			axios
				.post(" http://localhost:3000/api/auth/signup", {
					firstName,
					lastName,
					email,
					password
				})
				.then((res) => {
					res.status(201).json({ message: "requête envoyé" });
				});
			// .catch((error) => {

			this.$router.push("Login");
		}
	}
};
</script>
