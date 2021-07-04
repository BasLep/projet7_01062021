<template>
	<div class="container">
		<h2>Connexion à son compte</h2>
		<br />
		<form @submit.prevent="formLogin" id="form_login">
			<div class="form-group">
				<label for="email">Email</label>
				<input v-model="email" type="email" class="form-control" id="email" required />
				<p v-show="showErrorEmail">{{ errorEmail }}</p>
			</div>
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input
					v-model="password"
					type="password"
					class="form-control"
					id="password"
					required
				/>
				<p v-show="showErrorPassword">{{ errorPassword }}</p>
			</div>
			<button type="submit">Me connecter</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Login",
	data() {
		return {
			errorEmail: null,
			showErrorEmail: false,
			errorPassword: null,
			showErrorPassword: false
		};
	},
	methods: {
		formLogin() {
			this.errorEmail = null;
			this.errorPassword = null;
			axios
				.post("http://localhost:3000/api/auth/login", {
					email: this.email,
					password: this.password
				})
				.then((res) => {
					if (res.status === 202) {
						this.errorEmail = "Adresse mail non trouvée";
						this.showErrorEmail = true;
					} else if (res.status === 201) {
						this.errorPassword = "Mot de passe inccorecte";
						this.showErrorPassword = true;
					} else if (res.status === 200) {
						localStorage.setItem("dataUser", JSON.stringify(res.data));
						this.$emit("modificate-state");
						this.$router.push("homeafterlog");
					}
				});
		}
	}
};
</script>
