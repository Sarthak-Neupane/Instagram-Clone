import { createRouter, createWebHistory } from "vue-router";
// import { auth } from "../firebase";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    redirect: "/:id/feed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:id/feed",
    name: "Feed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:id/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let isAuthenticated;
  if(localStorage.getItem('User')){
    isAuthenticated = JSON.parse(localStorage.getItem('User'))
  }else {
     isAuthenticated = store.getters["auth/get_the_user"];
  }
  if (requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
  console.log("isauthenticated", JSON.parse(localStorage.getItem('User')));
});

export default router;
