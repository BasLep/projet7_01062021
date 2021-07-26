import { createRouter, createWebHistory } from "vue-router";
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
		name: "signup",
		component: () => import(/* webpackChunkName: "signup" */ "../views/auth/Signup.vue")
	},
	{
		path: "/login",
		name: "login",
		component: () => import(/* webpackChunkName: "login" */ "../views/auth/Login.vue")
	},
	{
		path: "/homeafterlog",
		name: "homeafterlog",
		component: () =>
			import(/* webpackChunkName: "homeafterlog" */ "../views/main/Homeafterlog.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/myaccount",
		name: "myaccount",
		component: () =>
			import(/* webpackChunkName: "myaccount" */ "../views/account/Myaccount.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/alluser",
		name: "alluser",
		component: () => import(/* webpackChunkName: "alluser" */ "../views/account/Alluser.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/newarticle",
		name: "newarticle",
		component: () =>
			import(/* webpackChunkName: "newarticle" */ "../views/article/NewArticle.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/allarticle",
		name: "allarticle",
		component: () =>
			import(/* webpackChunkName: "allarticle" */ "../views/article/AllArticle.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/onearticle/:id",
		name: "onearticle",
		component: () =>
			import(/* webpackChunkName: "onearticle" */ "../views/article/OneArticle.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/onecomment/:id",
		name: "onecomment",
		component: () =>
			import(/* webpackChunkName: "onecomment" */ "../views/article/Onecomment.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/:catchAll(.*)",
		name: "notFound",
		component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
		meta: { requiresAuth: true }
	}
];

const router = createRouter({
	history: createWebHistory(),
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
