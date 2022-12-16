<template>
  <!-- Nav Bar Start  -->
  <nav
    class="flex z-50 items-center justify-between dark:text-white bg-transparent backdrop-blur-md px-1 md:px-3 sticky top-0 py-2"
  >
    <div class="flex items-center">
      <div class="mr-6 md:hidden">
        <i class="fa-solid fa-bars text-xl" @click="navBar"></i>
      </div>
      <h1
        class="uppercase font-serif text-center text-xl font-semibold"
        @click="$router.push('/')"
      >
        <div class="">The</div>
        <div>Guardian</div>
      </h1>
    </div>

    <ul
      id="menu"
      class="z-50 items-center justify-center dark:bg-sky-800 dark:md:bg-transparent bg-sky-300 md:bg-transparent w-3/4 md:w-full top-0 min-h-screen md:min-h-full fixed md:static flex-col md:flex-row flex gap-8 font-bold -left-full transition-all ease-in-out duration-500"
    >
      <li @click="$router.push('/')">Home</li>
      <li @click="$router.push('/contact')">Contact</li>
      <li>
        <span
          class="inline-block py-1.5 px-1.5 leading-none text-center whitespace-nowrap align-baseline bg-sky-600 text-white rounded-full"
        >
          <i class="fa-regular fa-bookmark mx-2 md:mx-3" @click="savePage"></i
          ><span class="font-bold">{{ $store.state.postCount }}</span></span
        >
      </li>
      <li>
        <div class="uppercase font-semibold">
          <!-- <i class="fa-solid fa-moon "></i> -->
          <span
            class="btn hover:bg-sky-500 hover:text-white"
            v-if="loginUserData == null"
            @click="toAuth('login')"
            >Login</span
          >
          <span
            class="btn hover:bg-sky-500 hover:text-white"
            v-if="loginUserData == null"
            @click="toAuth('register')"
            >Sign Up</span
          >
        </div>
      </li>
      <span class="absolute right-10 top-10 md:hidden" @click="hideMenu"
        ><i class="fa-solid fa-xmark fa-2x"></i
      ></span>
    </ul>

    <div class="flex text-lg items-center justify-center">
      <i
        class="fa fa-search mx-2 md:mx-3"
        aria-hidden="true"
        @click="search"
      ></i>

      <Vue3Lottie
        :animationData="Sun"
        class="w-12"
        v-if="currentMode == 'dark'"
        @click="changeMode('light')"
      />
      <Vue3Lottie
        :animationData="Moon"
        class="w-12"
        v-if="currentMode == 'light'"
        @click="changeMode('dark')"
      />

      <div class="dropdown relative select-none" v-if="loginUserData != null">
        <a
          class="select-none"
          href="#"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="
              loginUserData.profile_photo_path == null
                ? loginUserData.profile_photo_url
                : 'http://127.0.0.1:8000/storage/' +
                  loginUserData.profile_photo_path
            "
            alt=""
            class="rounded-full object-cover object-center w-14 mt-2"
          />
        </a>
        <ul
          class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
          aria-labelledby="dropdownMenuButton2"
        >
          <li>
            <a
              class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              @click="$router.push('/user/profile/manage')"
              >Profile</a
            >
          </li>
          <li>
            <span
              class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              @click="logout"
              v-if="loginUserData != null"
              >Logout</span
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Nav Bar End  -->
</template>

<script>
import Sun from "../../assets/Animation/sun.json";
import Moon from "../../assets/Animation/moon.json";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      currentMode: "light",
      Sun,
      Moon,
    };
  },
  computed: {
    ...mapState(["loginUserData"]),
  },
  methods: {
    changeMode(mode) {
      this.currentMode = mode;
      localStorage.setItem("mode", this.currentMode);

      if (this.currentMode == "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    },
    navBar() {
      let menu = document.getElementById("menu");
      menu.classList.add("left-[0px]");
    },
    hideMenu() {
      menu.classList.remove("left-[0px]");
    },
    toAuth(to) {
      if (to == "login") {
        this.$router.push("/login");
      } else {
        this.$router.push("/register");
      }
    },
    logout() {
      this.$store.dispatch("deleteLoginData");
      localStorage.removeItem("loginToken");
      localStorage.removeItem("userData");
      if (this.$route.fullPath != "/") {
        this.$router.push("/");
      }
    },
    search() {
      this.$router.push("/search/post");
    },
    getCurrentMode() {
      if (localStorage.getItem("mode")) {
        this.currentMode = localStorage.getItem("mode");
        if (localStorage.getItem("mode") == "light") {
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.add("dark");
        }
      }
    },
    savePage() {
      if (this.$store.state.loginUserData != null) {
        this.$router.push("/save/post");
      } else {
        this.$swal
          .fire({
            title: "You Need To Login",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Go To Login Page",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/login");
            }
          });
      }
    },
    setSavePostCount() {
      if (this.$store.state.loginUserData != null) {
        axios
          .get("http://127.0.0.1:8000/api/user/get/savePost", {
            headers: {
              Authorization: `Bearer ${this.$store.state.userToken}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.$store.dispatch("setPostCount", res.data.savePost.length);
            }
          });
      }
    },
  },
  mounted() {
    this.getCurrentMode();
    this.setSavePostCount();
  },
};
</script>

<style scoped></style>
