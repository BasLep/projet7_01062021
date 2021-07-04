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
	},
	{
		path: "/homeafterlog",
		component: () => import("../views/main/Homeafterlog.vue"),
		name: "homeafterlog",
		meta: { requiresAuth: true }
	},
	{
		path: "/myaccount",
		component: () => import("../views/account/Myaccount.vue"),
		name: "myaccount",
		meta: { requiresAuth: true }
	},
	{
		path: "/newarticle",
		component: () => import("../views/article/NewArticle.vue"),
		name: "newarticle",
		meta: { requiresAuth: true }
	},
	{
		path: "/allarticle",
		component: () => import("../views/article/AllArticle.vue"),
		name: "allarticle",
		meta: { requiresAuth: true }
	},
	{
		path: "/onearticle",
		component: () => import("../views/article/OneArticle.vue"),
		name: "onearticle",
		meta: { requiresAuth: true }
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		if (JSON.parse(localStorage.getItem("dataUser") === null)) {
			next({
				name: "login"
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
