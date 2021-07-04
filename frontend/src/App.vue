<template>
	<div @modificate-state="modificateState">
		<Header />
		<Headerafterlogin />
		<router-view />
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Headerafterlogin from "@/components/Headerafterlogin.vue";

export default {
	components: {
		Header,
		Headerafterlogin
	},
	data() {
		return {
			state: "default"
		};
	},
	methods: {
		modificateState() {
			// this.state = "connected";
			console.log("test");
		}
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
