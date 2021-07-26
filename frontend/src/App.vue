<template>
	<div>
		<Header v-if="token === null" />
		<Headerafterlogin v-if="token !== null" />
		<router-view />
		<!-- :key="$route.path" v-slot="{ Component }"> -->
		<!-- <transition name="slide" mode="out-in">
				<component :is="Component"></component>
			</transition> -->
		<!-- </router-view> -->
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
			token: null
		};
	},
	created() {
		let userData = JSON.parse(localStorage.getItem("dataUser"));
		if (userData !== null) {
			this.token = userData.token;
		}
	},
	methods: {}
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
			color: red;
		}
	}
}
.slide-enter-active,
.slide-leave-active {
	transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to {
	opacity: 0;
	transform: translateX(-30%);
}
</style>
