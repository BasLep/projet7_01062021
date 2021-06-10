import { createRouter, createWebHashHistory } from "vue-router";
// import { path } from "../../../backend/app";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
	},
	{
		path: "/signup",
		component: () => import("../views/auth/Signup.vue"),
		name: "signup"
	},
	{
		path: "/login",
		component: () => import("../views/auth/Login.vue"),
		name: "login"
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
