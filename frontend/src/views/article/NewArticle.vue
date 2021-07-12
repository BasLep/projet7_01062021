<template>
	<div class="container">
		<h2>Poster un article</h2>
		<form @submit.prevent="formNewArticle">
			<div class="form-group">
				<label for="title">Titre</label>
				<input v-model="title" type="text" class="form-control" id="title" required />
			</div>
			<div class="form-group">
				<label for="description">Description</label>
				<input
					v-model="description"
					type="text"
					class="form-control"
					id="description"
					required
				/>
			</div>
			<div class="form-group">
				<label for="image">Ajouter une image</label> <br />
				<input type="file" name="image" id="image" @change="onFileSelected" /> <br />
			</div>
			<div class="form-group">
				<label for="textArticle">Texte de l'article</label> <br />
				<textarea
					v-model="textArticle"
					name="textArticle"
					id="text_article"
					class="form-control"
					placeholder="Tapez votre texte ici"
					required
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
	data() {
		return {
			selectedFile: null
		};
	},
	methods: {
		onFileSelected(event) {
			this.selectedFile = event.target.files[0];
		},
		formNewArticle() {
			let dataUser = JSON.parse(localStorage.getItem("dataUser"));
			let userId = dataUser.userId;
			let token = dataUser.token;
			axios
				.post(
					"http://localhost:3000/api/article/postarticle",
					{
						userId: userId,
						title: this.title,
						description: this.description,
						textArticle: this.textArticle
					},
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				)
				.then((res) => {
					if (res.status === 201) {
						this.$router.push("homeafterlog");
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
h2 {
	margin-bottom: 25px;
}
#button_upload {
	margin-top: 15px;
}
</style>
