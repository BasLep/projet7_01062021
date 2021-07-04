<template>
	<div class="container">
		<header>
			<img
				src="../assets/logo-groupomania.png"
				alt="Logo de l'entreprise"
				@click="returnHome"
			/>
			<div id="nav">
				<router-link to="/homeafterlog">Accueil</router-link> |
				<router-link to="/myaccount">Mon compte</router-link> |
				<p id="logout" @click="logout">Se déconnecter</p>
			</div>
		</header>
	</div>
</template>

<script>
export default {
	name: "Header",
	methods: {
		returnHome() {
			this.$router.push("Homeafterlog");
		},
		logout() {
			localStorage.clear("dataUser");
			this.$router.push("login");
		}
	}
};
</script>

<style lang="scss">
header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20px;
}
img {
	width: 25%;
}
#logout {
	font-weight: bold;
	color: #2c3e50;
	cursor: pointer;
}
#logout:hover {
	text-decoration: underline;
}
</style>
