<template>
	<div class="container">
		<h1>Mon compte</h1>
		<form @submit.prevent="formModify" id="form_modifyaccount">
			<div class="form-group">
				<label for="firstname">Prénom</label>
				<input type="text" class="form-control" id="firstname" v-model="firstName" />
			</div>
			<div class="form-group">
				<label for="lastname">Nom</label>
				<input type="text" class="form-control" id="lastname" v-model="lastName" />
			</div>
			<div class="form-group">
				<label for="job">Travail</label>
				<input type="text" class="form-control" id="job" v-model="job" />
			</div>
			<div class="form-group">
				<label for="desk">Bureau</label>
				<input
					type="text"
					class="form-control"
					id="desk"
					placeholder="Etage, bureau, etc."
					v-model="desk"
				/>
			</div>
			<p>Vous êtes inscrit depuis le {{ info.createdAt }}</p>
			<p>Vous avez modifié votre compte la dernière fois le {{ info.updatedAt }}</p>
			<button type="submit">Mettre à jour mes informations</button>
			<button @click="deleteAccount">Supprimer mon compte</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Myaccount",
	data() {
		return {
			info: null,
			firstName: null,
			lastName: null,
			job: null,
			desk: null
		};
	},
	created() {
		let user = JSON.parse(localStorage.getItem("dataUser"));
		let id = user.userId;
		let token = user.token;
		axios
			.get("http://localhost:3000/api/auth/" + id, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.info = response.data))
			.then(
				(info) => (
					(this.firstName = info.firstName),
					(this.lastName = info.lastName),
					(this.job = info.job),
					(this.desk = info.desk)
				)
			);
	},
	methods: {
		formModify() {
			let user = JSON.parse(localStorage.getItem("dataUser"));
			let id = user.userId;
			let token = user.token;
			axios
				.put(
					"http://localhost:3000/api/auth/" + id,
					{
						userId: id,
						firstName: this.firstName,
						lastName: this.lastName,
						job: this.job,
						desk: this.desk
					},
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				)
				.then((res) => {
					if (res.stauts === 201) {
						this.$router.go(1);
					}
				});
		},
		deleteAccount() {
			let user = JSON.parse(localStorage.getItem("dataUser"));
			let id = user.userId;
			let token = user.token;
			if (confirm("Voulez-vous vraiment supprimé votre compte ?")) {
				axios
					.delete("http://localhost:3000/api/auth/" + id, {
						data: {
							userId: id
						},
						headers: { Authorization: `Bearer ${token}` }
					})
					.then((res) => {
						if (res.status === 201) {
							this.$router.push("Signup");
						}
					});
			}
		}
	}
};
</script>

<style lang="scss">
h1 {
	margin-bottom: 20px;
}
</style>
