<template>
	<div class="container">
		<h1>Test</h1>
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
		<p>{{ informationComment }}</p>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "oneComment",
	data() {
		return {
			commentId: null,
			informationComment: null,
			content: null
		};
	},
	created() {
		let userData = JSON.parse(localStorage.getItem("dataUser"));
		let token = userData.token;
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
			this.commentId = this.$route.params.id;
			axios.put(
				"http://localhost:3000/api/comment/onecomment/" + this.commentId,
				{
					userId: userId,
					content: this.content
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
			// .then(this.$router.push("homeafterlog"));
		},
		deleteComment() {
			this.commentId = this.$route.params.id;
			let userData = JSON.parse(localStorage.getItem("dataUser"));
			let userId = userData.userId;
			let token = userData.token;
			axios
				.delete("http://localhost:3000/api/comment/onecomment/" + this.commentId, {
					data: {
						userId: userId
					},
					headers: { Authorization: `Bearer ${token}` }
				})
				.then(this.$router.push("homeafterlog"));
		}
	}
};
</script>

<style lang="scss" scoped>
#button_modify {
	margin-top: 15px;
}
</style>
