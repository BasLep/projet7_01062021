<template>
	<div class="container">
		<Header />
		<h1>Mon compte</h1>
		<form @submit="formModify" id="form_modifyaccount">
			<div class="form-group">
				<label for="firstname">Prénom</label>
				<input type="text" class="form-control" id="firstname" v-model="firstName" />
			</div>
			<div class="form-group">
				<label for="lastname">Nom</label>
				<input type="text" class="form-control" id="lastname" v-model="lastName" />
			</div>
			<p>Vous êtes inscrit depuis le {{ info.createdAt }}</p>
			<p>Vous avez modifié votre compte la dernière fois le {{ info.updatedAt }}</p>
			<button type="submit">Mettre à jour mes informations</button>
			<button @click="deleteAccount">Supprimer mon compte</button>
		</form>

		<p>{{ info }}</p>
	</div>
</template>

<script>
import axios from "axios";
import Header from "../../components/Headerafterlogin.vue";

export default {
	name: "Myaccount",
	components: {
		Header
	},
	data() {
		return {
			info: null,
			firstName: null,
			lastName: null
		};
	},
	created() {
		let user = JSON.parse(localStorage.getItem("dataUser"));
		let id = user.userId;
		axios
			.get("http://localhost:3000/api/auth/" + id)
			.then((response) => (this.info = response.data))
			.then((info) => ((this.firstName = info.firstName), (this.lastName = info.lastName)));
	},
	methods: {
		formModify() {
			let user = JSON.parse(localStorage.getItem("dataUser"));
			let id = user.userId;
			let firstName = document.getElementById("firstname").value;
			let lastName = document.getElementById("lastname").value;
			axios
				.put("http://localhost:3000/api/auth/" + id, {
					firstName,
					lastName
				})
				.then.status(201)
				.json({ message: "requête envoyée" });
		},
		deleteAccount() {
			let user = JSON.parse(localStorage.getItem("dataUser"));
			let id = user.userId;
			axios.delete("http://localhost:3000/api/auth/" + id);
			this.$router.push("Signup");
		}
	}
};
</script>

<style lang="scss">
h1 {
	margin-bottom: 20px;
}
</style>
