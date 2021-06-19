<template>
	<div class="container">
		<header>
			<img src="../assets/logo-groupomania.png" alt="Logo de l'entreprise" />
			<div id="nav">
				<router-link to="/myaccount">Mon compte</router-link> |
				<router-link to="/logout">Se déconnecter</router-link>
			</div>
		</header>
		<div id="welcome"></div>
	</div>
</template>

<script>
export default {
	name: "Header"
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
</style>
