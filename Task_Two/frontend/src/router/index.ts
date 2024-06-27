import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import BlogView from '@/views/BlogView.vue'
import CreateView from '@/views/CreateView.vue'
import MyBlogsView from '@/views/MyBlogsView.vue'
import MyBlogView from '@/views/MyBlogView.vue'
import MyProfileView from '@/views/MyProfileView.vue'

import { useAuthStore } from '@/stores/useAuth'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-blogs',
      name: 'my-blogs',
      component: MyBlogsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-blogs/:id',
      name: 'my-blog',
      component: MyBlogView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/me',
      name: 'me',
      component: MyProfileView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let token = Cookies.get("token");

  let authStore = useAuthStore()
  let { checkAuth } = authStore

  let res = await checkAuth()

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ path: '/' });
    }
    
    if (res.valid) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router
