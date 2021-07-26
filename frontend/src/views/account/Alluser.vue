<template>
	<div class="container">
		<div id="not_admin" v-if="isAdmin === false">
			<h2>Vous n'êtes pas autorisé à voir le contenu de cette page.</h2>
		</div>

		<div id="if_admin" v-else>
			<div class="user" v-for="user in userInformation" :key="user.userId">
				<h3>{{ user.firstName }} {{ user.lastName }}</h3>
				<p>
					Cet utilisateur a créé son compte le <strong>{{ user.createdAt }}</strong>
				</p>
				<p v-if="user.isAdmin === true">
					Cet utilisateur <strong>possède</strong> aussi le statut d'administrateur
				</p>
				<p v-else>
					Cet utilisateur <strong>ne possède pas</strong> le statut d'administrateur
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Alluser",
	data() {
		return {
			isAdmin: "",
			userInformation: null
		};
	},
	created() {
		let dataUser = JSON.parse(localStorage.getItem("dataUser"));
		let token = dataUser.token;
		this.isAdmin = dataUser.isAdmin;
		axios
			.get("http://localhost:3000/api/auth", {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.userInformation = response.data));
	}
};
</script>
