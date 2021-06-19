<template>
	<div class="container">
		<Headerafterlogin />
		<p>
			{{ info }}
		</p>
	</div>
</template>

<script>
// import axios from "axios";
import Headerafterlogin from "../../components/Headerafterlogin.vue";

export default {
	name: "Homeafterlogin",
	components: {
		Headerafterlogin
	},
	data() {
		return {
			info: null
		};
	}
	// created() {
	// 	axios
	// 		.get("http://www.prevision-meteo.ch/services/json/paris")
	// 		.then((response) => (this.info = response.data));
	// }
};
</script>
