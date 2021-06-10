<template>
	<div class="container">
		<Header />
		<h2>Connexion à son compte</h2>
		<br />
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" />
			</div>
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" class="form-control" id="password" />
			</div>
			<button type="submit">Me connecter</button>
		</form>
	</div>
</template>

<script>
import Header from "../../components/Header";

export default {
	name: "Login",
	components: {
		Header
	}
};
</script>
