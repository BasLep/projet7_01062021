<template>
	<div class="container">
		<h2>Créez un nouveau compte</h2>
		<br />
		<form @submit.prevent="formSignup" id="form_signup">
			<div class="form-group">
				<label for="firstname">Prénom</label>
				<input
					v-model="firstName"
					type="text"
					class="form-control"
					id="firstname"
					required
				/>
			</div>
			<div class="form-group">
				<label for="lastname">Nom</label>
				<input v-model="lastName" type="text" class="form-control" id="lastname" required />
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input v-model="email" type="email" class="form-control" id="email" required />
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
			</div>
			<button type="submit">Créez mon compte</button>
			<p v-show="showErrors">{{ errors }}</p>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import validator from "validator";

export default {
	name: "Signup",
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			errors: null,
			showErrors: false
		};
	},
	methods: {
		formSignup() {
			this.errors = null;
			if (validator.matches(this.firstName, /^[A-Z][A-Za-zéèê-]+$/) === false) {
				this.errors =
					"Le prénom doit commencer par une majuscule et ne contenir que des lettres ou trait d'union";
				this.showErrors = true;
			} else if (validator.matches(this.lastName, /^[A-Z][A-Za-zéèê -]+$/) === false) {
				this.errors =
					"Le nom doit commencer par une majuscule et ne contenir que des lettres, trait d'union ou espace";
			} else if (validator.isEmail(this.email) === false) {
				this.errors = "L'adresse mail ne respecte pas le standard d'une adresse mail";
				this.showErrors = true;
			} else {
				axios
					.post(" http://localhost:3000/api/auth/signup", {
						firstName: this.firstName,
						lastName: this.lastName,
						email: this.email,
						password: this.password
					})
					.then((res) => {
						if (res.status === 201) {
							this.$router.push("Login");
						} else if (res.status === 200) {
							this.errors = "Cette adresse est déjà utilisée";
							this.showErrors = true;
						}
					});
			}
		}
	}
};
</script>
