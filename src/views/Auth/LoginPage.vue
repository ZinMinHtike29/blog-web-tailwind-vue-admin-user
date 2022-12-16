<template>
  <div>
    <div class="bg-sky-200 min-h-screen flex justify-center items-center">
      <div class="container p-5 md:grid grid-cols-4">
        <div class="md:col-span-2">
          <Vue3Lottie :animationData="Login" />
        </div>
        <div class="md:col-span-2 flex flex-col justify-center">
          <div class="mb-6 md:mb-12 mt-4">
            <h1 class="text-4xl font-bold text-sky-700">Login Here!</h1>
          </div>
          <div
            class="bg-red-400 text-white rounded-lg py-5 px-6 mb-3 text-base inline-flex items-center md:w-3/4"
            role="alert"
            v-if="isRegister || passNotSame"
          >
            <span v-if="isRegister"
              ><i class="fa-solid fa-envelope"></i> Email isn't register.
            </span>
            <span v-if="passNotSame"
              ><i class="fa-solid fa-lock mr-2"></i> Password Not Same.
            </span>
          </div>
          <div class="text-sky-700">
            <div class="flex flex-col mb-2">
              <label for="" class="my-1 text-lg">Email</label>
              <input
                type="email"
                class="form-control shadow-md md:w-3/4 focus:outline-8 focus: outline-sky-700"
                placeholder="Enter Your Email"
                v-model="email"
              />

              <small class="text-red-500 my-3" v-if="validate.email"
                >Need To Fill The Email.</small
              >
            </div>
            <div class="flex flex-col mb-2">
              <label for="" class="my-1 text-lg">Password</label>
              <input
                type="password"
                class="form-control shadow-md md:w-3/4 focus:outline-8 focus: outline-sky-700"
                placeholder="Enter Your Password"
                v-model="password"
              />
              <small class="text-red-500 my-3" v-if="validate.password"
                >Need To Fill The Password.</small
              >
            </div>

            <div class="flex mt-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-sky-500 focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  v-model="rememberStatus"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexSwitchCheckChecked"
                  >Remember Me</label
                >
              </div>
            </div>

            <div class="mt-6 md:w-3/4 text-center">
              <button
                type="button"
                class="w-2/4 inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                :disabled="loginStaus"
                @click="login"
              >
                <div
                  class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                  role="status"
                  v-if="loginStaus"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-if="loginStaus">Loading</span>
                <span v-if="!loginStaus">Login</span>
              </button>
              <div class="text-center my-3">
                <small
                  >You Don't Have An Account!
                  <span
                    class="uppercase font-semibold underline text-blue-600"
                    @click="toRegister"
                    >Register Here</span
                  >
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../../assets/Animation/login.json";
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      loginStaus: false,
      isRegister: false,
      passNotSame: false,
      rememberStatus: false,
      Login,
      validate: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    toRegister() {
      this.$router.push("register");
    },
    login() {
      this.validaionData();
      if (!this.validate.email && !this.validate.password) {
        this.loginStaus = true;
        let data = {
          email: this.email,
          password: this.password,
        };
        axios.post("http://127.0.0.1:8000/api/login", data).then((res) => {
          this.loginStaus = false;
          if (!res.data.isRegister) {
            this.isRegister = true;
          } else {
            if (!res.data.samePass) {
              this.isRegister = false;
              this.passNotSame = true;
            } else {
              this.isRegister = false;
              this.passNotSame = false;
              this.storeAtVuex(res.data.userData, res.data.token);
              this.setItem(
                res.data.userData,
                res.data.token,
                this.rememberStatus
              );
              Toast.fire({
                icon: "success",
                title: "Login successfully",
              });
            }
          }
        });
      }
    },
    storeAtVuex(userData, token) {
      this.$store.dispatch("setUserData", userData);
      this.$store.dispatch("setToken", token);
    },
    setItem(userData, token, status) {
      if (status) {
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("loginToken", token);
        this.$router.push(userData.role == "admin" ? "/admin/home" : "/");
      } else {
        this.$router.push(userData.role == "admin" ? "/admin/home" : "/");
      }
    },
    validaionData() {
      this.validate.email = this.email == "" ? true : false;
      this.validate.password = this.password == "" ? true : false;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
