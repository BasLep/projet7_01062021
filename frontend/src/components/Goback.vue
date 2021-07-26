<template>
	<div class="container">
		<span class="go-back">
			<button @click="goBack">Retour</button>
		</span>
	</div>
</template>

<script>
export default {
	name: "Goback",
	methods: {
		goBack() {
			return this.$router.go(-1);
		}
	}
};
</script>
