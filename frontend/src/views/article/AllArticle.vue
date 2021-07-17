<template>
	<div class="container">
		<h2>Tous les articles</h2>
		<div id="all_article" v-for="article in dataArticle.reverse()" :key="article.title">
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
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "AllArticle",
	data() {
		return {
			dataArticle: null
		};
	},
	created() {
		let userData = JSON.parse(localStorage.getItem("dataUser"));
		let token = userData.token;
		axios
			.get("http://localhost:3000/api/article", {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.dataArticle = response.data));
	}
};
</script>

<style lang="scss" scoped>
#all_article {
	border: 2px solid black;
	margin: 10px 0;
}
</style>
