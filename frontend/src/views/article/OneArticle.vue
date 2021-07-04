<template>
	<div class="container">
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
		<p>{{ informationArticle }}</p>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "oneArticle",
	data() {
		return {
			articleId: null,
			informationArticle: null
		};
	},
	created() {
		this.articleId = this.$route.query.articleId;
		axios
			.get("http://localhost:3000/api/article/" + this.articleId)
			.then((response) => (this.informationArticle = response.data));
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
</style>
