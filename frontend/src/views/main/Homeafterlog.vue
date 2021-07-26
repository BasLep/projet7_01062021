<template>
	<div class="container">
		<div id="welcome">
			<p>
				Bonjour {{ information.firstName }} {{ information.lastName }}, comment allez vous
				aujourd'hui ?
			</p>
		</div>
		<div id="div_article">
			<router-link to="newarticle">Poster un article</router-link>
		</div>
		<div v-if="!dataArticle">
			<p>Les membres de notre communautés n'ont pour le moment pas partagé de contenu</p>
		</div>
		<div v-if="dataArticle !== null">
			<div
				class="last_article"
				v-for="article in dataArticle.reverse().slice(0, 5)"
				:key="article.title"
			>
				<h3>{{ article.title }}</h3>
				<p>{{ article.description }}</p>
				<p>
					Cet article a été écrit par {{ article.User.firstName }}
					{{ article.User.lastName }} le {{ article.createdAt }}
				</p>
				<router-link :to="{ name: 'onearticle', params: { id: article.id } }"
					>Afficher l'article</router-link
				>
			</div>
			<!-- <router-view :key="$route.path" /> -->
			<button @click="pageAllArticle">Tous les articles</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Homeafterlogin",
	data() {
		return {
			information: null,
			dataArticle: null
		};
	},
	created() {
		this.$router.go(1);
		let user = JSON.parse(localStorage.getItem("dataUser"));
		let id = user.userId;
		let token = user.token;
		axios
			.get("http://localhost:3000/api/auth/" + id, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.information = response.data));
		axios
			.get("http://localhost:3000/api/article", {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.dataArticle = response.data));
	},
	methods: {
		pageAllArticle() {
			this.$router.push("allarticle");
		}
	}
};
</script>

<style lang="scss" scoped>
.last_article {
	border: 2px solid black;
	margin: 10px 0;
}
</style>
