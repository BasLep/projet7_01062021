<template>
	<div class="container">
		<div id="display_not_auth" v-if="userIdFromToken !== informationArticle.User.id">
			<div id="info_title_auth">
				<h2>{{ informationArticle.title }}</h2>
				<p>
					Ecrit par : {{ informationArticle.User.firstName }}
					{{ informationArticle.User.lastName }}
				</p>
			</div>
			<div id="info_article">
				<p>{{ informationArticle.textArticle }}</p>
			</div>
			<div id="created_updated">
				<p>
					Posté le {{ informationArticle.createdAt }} et modifié la dernière fois le
					{{ informationArticle.updatedAt }}
				</p>
			</div>
		</div>
		<div id="display_auth" v-if="userIdFromToken === informationArticle.User.id">
			<form @submit.prevent="formModifyArticle" id="form_modify_article">
				<div class="form-group">
					<label for="title">Titre</label>
					<input type="text" id="title" class="form-control" v-model="title" />
				</div>
				<div class="form-group">
					<label for="descripion">Description</label>
					<input
						type="text"
						id="description"
						class="form-control"
						v-model="description"
					/>
				</div>
				<div class="form-group">
					<label for="text_article">Texte</label>
					<textarea
						id="text_article"
						name="text_article"
						class="form-control"
						v-model="textArticle"
					></textarea>
				</div>
				<button type="submit">Modifier article</button>
			</form>
			<button @click="deleteArticle">Supprimer l'article</button>
		</div>
		<div id="post_comment">
			<form @submit.prevent="formPostComment" id="form_post_comment">
				<div class="class-group">
					<label for="post_comment">Commentez</label>
					<textarea
						name="post_comment"
						id="post_comment"
						class="form-control"
						v-model="content"
					></textarea>
				</div>
				<button type="submit" id="button_post_comment">Commentez</button>
			</form>
		</div>
		<button @click="displayComments">Afficher les commentaires</button>
		<div id="display_comments" v-show="showComment">
			<div class="comments" v-for="(comment, index) in informationComment" :key="comment.id">
				<h3>Commentaire #{{ index }}</h3>
				<h4>Posté par {{ comment.User.firstName }} {{ comment.User.lastName }}</h4>
				<p>{{ comment.content }}</p>
				<div class="comment_auth" v-if="userIdFromToken === comment.User.id">
					<router-link :to="{ name: 'onecomment', params: { id: comment.id } }"
						>Modifier commentaire</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "oneArticle",
	data() {
		return {
			articleId: null,
			informationArticle: null,
			userIdFromToken: "",
			title: null,
			description: null,
			textArticle: null,
			content: null,
			showComment: false,
			informationComment: null
		};
	},
	created() {
		let userData = JSON.parse(localStorage.getItem("dataUser"));
		let token = userData.token;
		this.userIdFromToken = userData.userId;
		this.articleId = this.$route.params.id;
		axios
			.get("http://localhost:3000/api/article/" + this.articleId, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.informationArticle = response.data))
			.then(
				(informationArticle) => (
					(this.title = informationArticle.title),
					(this.description = informationArticle.description),
					(this.textArticle = informationArticle.textArticle)
				)
			);
		axios
			.get("http://localhost:3000/api/comment/" + this.articleId, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.informationComment = response.data));
	},
	methods: {
		formModifyArticle() {
			this.articleId = this.$route.params.id;
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let userId = userData.userId;
			let token = userData.token;
			axios.put(
				"http://localhost:3000/api/article/" + this.articleId,
				{
					userId: userId,
					title: this.title,
					description: this.description,
					textArticle: this.textArticle
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
		},
		deleteArticle() {
			this.articleId = this.$route.params.id;
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let userId = userData.userId;
			let token = userData.token;
			axios
				.delete("http://localhost:3000/api/article/" + this.articleId, {
					data: {
						userId: userId
					},
					headers: { Authorization: `Bearer ${token}` }
				})
				.then(this.$router.push("homeafterlog"));
		},
		formPostComment() {
			this.articleId = this.$route.params.id;
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let userId = userData.userId;
			let token = userData.token;
			axios.post(
				"http://localhost:3000/api/comment/postcomment",
				{
					articleId: this.articleId,
					userId: userId,
					content: this.content
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
		},
		displayComments() {
			this.showComment = !this.showComment;
		}
	}
};
</script>

<style lang="scss" scoped>
#info_title_auth {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
#info_article {
	margin-top: 15px;
	border: 2px solid #ffd7d7;
	padding: 10px 25px;
	text-align: center;
}
#created_updated {
	margin-top: 15px;
}
#button_post_comment {
	margin-top: 10px;
}
</style>
