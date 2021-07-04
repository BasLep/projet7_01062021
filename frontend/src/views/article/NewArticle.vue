<template>
	<div class="container">
		<h2>Poster un article</h2>
		<form @submit.prevent="formNewArticle">
			<div class="form-group">
				<label for="title">Titre</label>
				<input v-model="title" type="text" class="form-control" id="title" />
			</div>
			<div class="form-group">
				<label for="description">Description</label>
				<input v-model="description" type="text" class="form-control" id="description" />
			</div>
			<div class="form-group">
				<label for="textArticle">Texte de l'article</label> <br />
				<textarea
					v-model="textArticle"
					name="textArticle"
					id="text_article"
					class="form-control"
					placeholder="Tapez votre texte ici"
				>
				</textarea>
			</div>
			<button type="submit">Postez un article</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "newArticle",
	methods: {
		formNewArticle() {
			let dataUser = JSON.parse(localStorage.getItem("dataUser"));
			let userId = dataUser.userId;
			axios.post("http://localhost:3000/api/article/postarticle", {
				userId: userId,
				title: this.title,
				description: this.description,
				textArticle: this.textArticle
			});
		}
	}
};
</script>

<style lang="scss" scoped>
h2 {
	margin-bottom: 25px;
}
</style>
