<template>
	<div class="container">
		<Header />
		<h1>Notre réseau social</h1>
		<p id="presentation">
			Cher visiteur, bonjour et bienvenue sur le réseau social interne de l'entreprise
			Groupomania
		</p>
		<p>
			Si vous êtes nouveau sur le site, veuillez-vous créer un compte en cliquant ci-dessous
			<br />
			<router-link to="/signup">Je m'inscris </router-link> <br />
			<br />
			Sinon connectez-vous à votre compte <br />
			<router-link to="login">Je me connecte </router-link>
		</p>
	</div>
</template>

<script>
import Header from "@/components/Header";

export default {
	name: "App",
	components: {
		Header
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
#presentation {
	font-size: larger;
}
button {
	margin-right: 10px;
	background-color: #ffd7d7;
	font-weight: bold;
	margin-bottom: 20px;
}
</style>
