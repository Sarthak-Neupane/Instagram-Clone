import { createRouter, createWebHistory } from "vue-router";
// import { auth } from "../firebase";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    redirect: `/feed`,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/feed",
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
    path: "/:id/profile/edit",
    name: "ProfileEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Edit.vue"),
    children: [
      {
        path: "edit",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/EditProfile.vue"
          ),
      },
      {
        path: "changepassword",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/ChangePassword.vue"
          ),
      },
      {
        path: "Apps and Websites",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/AppsWebsites.vue"
          ),
      },
      {
        path: "Email and SMS",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/EmailSms.vue"
          ),
      },
      {
        path: "Push Notifications",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/PushNotif.vue"
          ),
      },
      {
        path: "Manage Contacts",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/ManageContacts.vue"
          ),
      },
      {
        path: "Privacy and Security",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/PrivacySecurity.vue"
          ),
      },
      {
        path: "Login Activity",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/LoginActivity.vue"
          ),
      },
      {
        path: "Emails from Goalgram",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Child/EmailsGoalgram.vue"
          ),
      },
     
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/inbox",
    name: "Message",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Message.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/explore",
    name: "Explore",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Explore.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/saved",
    name: "Saved",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Saved.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
    meta: {
      hideNavbar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let isAuthenticated;
  if (localStorage.getItem("User")) {
    isAuthenticated = JSON.parse(localStorage.getItem("User"));
  } else {
    isAuthenticated = store.getters["auth/get_the_user"];
  }
  if (requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
  console.log("isauthenticated", JSON.parse(localStorage.getItem("User")));
});

export default router;
