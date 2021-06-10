<template>
	<header>
		<img src="../assets/logo-groupomania.png" alt="Logo de l'entreprise" />
		<div id="nav">
			<router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
			<router-link to="/signup">S'inscrire </router-link> |
			<router-link to="/login">Se connecter</router-link>
		</div>
	</header>
</template>

<script>
export default {
	name: "Header"
};
</script>

<style lang="scss">
header {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}
img {
	width: 25%;
}
</style>
