"<template>
	<div class="container">
		<div v-if="userId === informationComment.User.id || isAdmin === true">
			<form @submit.prevent="formModifyComment">
				<div class="class-group">
					<label for="post_comment">Commentez</label>
					<textarea
						name="post_comment"
						id="post_comment"
						class="form-control"
						v-model="content"
					></textarea>
				</div>
				<button type="submit" id="button_modify">Modifiez</button>
				<button @click="deleteComment"><i class="fas fa-trash"></i></button>
			</form>
		</div>
		<div v-else>
			<p>
				Vous n'êtes pas autorisé à accèder au contenu de cette page car vous n'êtes pas le
				créateur de ce commentaire.
			</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "oneComment",
	data() {
		return {
			commentId: null,
			userId: null,
			isAdmin: "",
			informationComment: null,
			content: null
		};
	},
	created() {
		let userData = JSON.parse(localStorage.getItem("dataUser"));
		let token = userData.token;
		this.userId = userData.userId;
		this.isAdmin = userData.isAdmin;
		this.commentId = this.$route.params.id;
		axios
			.get("http://localhost:3000/api/comment/onecomment/" + this.commentId, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => (this.informationComment = response.data))
			.then((informationComment) => (this.content = informationComment.content));
	},
	methods: {
		formModifyComment() {
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let token = userData.token;
			let userId = userData.userId;
			let isAdmin = userData.isAdmin;
			this.commentId = this.$route.params.id;
			if (confirm("Voulez-vous modifier ce commentaire ?")) {
				axios
					.put(
						"http://localhost:3000/api/comment/onecomment/" + this.commentId,
						{
							userId: userId,
							isAdmin: isAdmin,
							content: this.content
						},
						{
							headers: { Authorization: `Bearer ${token}` }
						}
					)
					.then((res) => {
						if (res.status === 201) {
							this.$router.go(0);
						}
					});
			}
		},
		deleteComment() {
			this.commentId = this.$route.params.id;
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let userId = userData.userId;
			let isAdmin = userData.isAdmin;
			let token = userData.token;
			if (confirm("Voulez-vous vraiment supprimé ce commentaire ?")) {
				axios
					.delete("http://localhost:3000/api/comment/onecomment/" + this.commentId, {
						data: {
							userId: userId,
							isAdmin: isAdmin
						},
						headers: { Authorization: `Bearer ${token}` }
					})
					.then((res) => {
						if (res.status === 201) {
							this.$router.push("../homeafterlog");
						}
					});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#button_modify {
	margin-top: 15px;
}
</style>
