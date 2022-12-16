
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//USer
import UserHome from '@/views/User/HomePage.vue'
import NewsDetails from "@/views/User/NewsDetails.vue"
import ViewAll from "@/views/User/ViewAll.vue"
import FilterPost from "@/views/User/FilterPost.vue"
import UserProfile from "@/views/User/ProfilePage.vue"
import SearchPage from "@/views/User/SearchPage.vue"
import SavePost from "@/views/User/SavePost.vue"
import ContactPage from "@/views/User/ContactPage.vue"


//Admin
import AdminHome from "@/views/Admin/HomePage.vue"
import AdminProfile from "@/views/Admin/ProfilePage.vue"
import AdminList from "@/views/Admin/AdminList.vue"
import UserList from "@/views/Admin/UserList.vue"
import Category from "@/views/Admin/CategoryPage.vue"
import Post from "@/views/Admin/PostPage.vue"
import PostUpdate from "@/views/Admin/PostUpdate.vue"
import ContactList from "@/views/Admin/ContactList.vue"
import ContactDetails from "@/views/Admin/ContactDetails.vue"

//Store
import store from '@/store'
//Auth
import RegisterPage from "@/views/Auth/RegisterPage.vue"
import LoginPage from "@/views/Auth/LoginPage.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: UserHome,
    meta: { for: "user", title: "The Guardian Media" },
  },
  {
    path: '/news/details/:id',
    name: 'newsDetails',
    component: NewsDetails,
    meta: { for: "user", title: "News Details" },
  },
  {
    path: '/all/news/',
    name: 'allNews',
    component: ViewAll,
    meta: { for: "user" },
  },
  {
    path: '/filter/news/category=:id',
    name: 'FilterPost',
    component: FilterPost,
    meta: { for: "user", title: "Filter Post With Category" },
  },
  {
    path: '/user/profile/manage',
    name: 'prfileManage',
    component: UserProfile,
    meta: { for: "user", title: "Manage Profile", "auth": true },
  },
  {
    path: '/search/post',
    name: 'searchPage',
    component: SearchPage,
    meta: { for: "user", title: "Manage Profile" },
  },
  {
    path: '/save/post',
    name: 'savePost',
    component: SavePost,
    meta: { for: "user", title: "Save Post", "auth": true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: { for: "user", title: "Contact" },
  },
  //Admin

  //Admin Home
  {
    path: "/admin/home",
    name: "adminHome",
    component: AdminHome,
    meta: {
      title: "Admin Home",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/list",
    name: "adminList",
    component: AdminList,
    meta: {
      title: "Admin List",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/userlist",
    name: "userList",
    component: UserList,
    meta: {
      title: "User List",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/category",
    name: "Category",
    component: Category,
    meta: {
      title: "Manage Category",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/post",
    name: "Post",
    component: Post,
    meta: {
      title: "Manage Post",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/update/post/:id",
    name: "PostUpdate",
    component: PostUpdate,
    meta: {
      title: "Manage Post",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/contact/",
    name: "ContactList",
    component: ContactList,
    meta: {
      title: "Contact List",
      for: "admin",
      auth: true,
    }
  },
  {
    path: "/admin/contact/details/:id",
    name: "ContactDetails",
    component: ContactDetails,
    meta: {
      title: "Contact Detials",
      for: "admin",
      auth: true,
    }
  },
  //Admin Profile
  {
    path: "/admin/profile",
    name: "profilePage",
    component: AdminProfile,
    meta: {
      title: "Admin Profile",
      for: "admin",
      auth: true
    }
  },


  //Auth
  {
    path: "/register",
    name: "registerPage",
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      if (store.state.loginUserData != null) {
        next(from.fullPath)
      } else {
        next()
      }
    }
  },
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (store.state.loginUserData != null) {
        next(from.fullPath)
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.loginUserData == null) {
      next("/login")
    } else {
      let user = store.getters.getUserData
      if (to.meta.for == 'admin') {
        if (user.role != 'admin') {
          next('/')
        } else {
          next()
        }
      } else {
        if (user.role != 'user') {
          next('/admin/home')
        } else {
          next()
        }
      }
    }
  } else {
    if (from.fullPath.match('admin/.*') && store.state.loginUserData != null) {
      next(from.fullPath)
    } else {
      next()
    }
  }
})

export default router
