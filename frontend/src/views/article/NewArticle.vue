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
				<div v-if="!image">
					<label for="image">Ajouter une image</label> <br />
					<input
						type="file"
						name="image"
						id="image"
						ref="file"
						@change="onFileSelected"
					/>
					<br />
				</div>
				<div v-else>
					<img :src="image" /> <br />
					<button @click="removeImage">Retirer l'image</button>
				</div>
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
			image: "",
			file: "",
			imageUrl: ""
		};
	},
	methods: {
		onFileSelected(event) {
			let files = event.target.files || event.dataTransferr.files;
			if (!files.length) return;
			this.createImage(files[0]);
			this.file = this.$refs.file.files[0];
		},
		createImage(file) {
			let reader = new FileReader();
			let vm = this;

			reader.onload = (event) => {
				vm.image = event.target.result;
			};
			reader.onloadend = () => {
				this.imageUrl = reader.result;
			};
			reader.readAsDataURL(file);
		},
		removeImage: function() {
			this.image = "";
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
						imageUrl: this.imageUrl,
						textArticle: this.textArticle,
						imageName: this.file.name
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
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
