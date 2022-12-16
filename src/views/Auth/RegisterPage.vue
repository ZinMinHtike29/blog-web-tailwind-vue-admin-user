<template>
  <div>
    <div class="bg-sky-200 min-h-screen flex justify-center items-center">
      <div class="container p-5 md:grid grid-cols-4">
        <div class="md:col-span-2">
          <Vue3Lottie :animationData="Register" />
        </div>
        <div class="md:col-span-2">
          <div class="mb-6 md:mb-14 mt-4">
            <h1 class="text-4xl font-bold text-sky-700">Register Now!</h1>
          </div>
          <div class="text-sky-700">
            <div class="flex flex-col mb-2">
              <label for="" class="my-1 text-lg">Name</label>
              <input
                type="text"
                class="form-control shadow-md md:w-3/4 focus:outline-8 focus:outline-sky-700"
                placeholder="Enter Your Name"
                v-model="userData.name"
              />
              <small class="text-red-500 my-3" v-if="validate.name"
                >Need To Fill The Name.</small
              >
            </div>
            <div class="flex flex-col mb-2">
              <label for="" class="my-1 text-lg">Email</label>
              <input
                type="email"
                class="form-control shadow-md md:w-3/4 focus:outline-8 focus: outline-sky-700"
                placeholder="Enter Your Email"
                required
                v-model="userData.email"
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
                v-model="userData.password"
              />
              <small class="text-red-500 my-3" v-if="validate.password"
                >Need To Fill The Password.</small
              >
            </div>
            <div class="flex flex-col mb-2">
              <label for="" class="my-1 text-lg">Confirm Password</label>
              <input
                type="password"
                class="form-control shadow-md md:w-3/4 focus:outline-8 focus: outline-sky-700"
                placeholder="Confirm Your Password"
                v-model="userData.confirmPassword"
              />
              <small class="text-red-500 my-3" v-if="validate.confirmPassword"
                >Need To Fill The ConfirmPassword.</small
              >
              <small class="text-red-500 my-3" v-if="validate.samePassword"
                >Password Must Be Same.</small
              >
            </div>

            <div class="flex mb-2">
              <div class="mb-3 md:w-3/4">
                <label
                  for="formFile"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Profile</label
                >
                <input
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-sky-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="formFile"
                  @change="setImage"
                />
              </div>
            </div>

            <div class="mt-6 md:w-3/4 text-center">
              <button
                @click="register"
                type="button"
                class="md:w-2/4 inline-block px-6 py-2.5 bg-sky-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-800 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-900 active:shadow-lg transition duration-150 ease-in-out"
                :disabled="registerStaus"
              >
                <div
                  class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                  role="status"
                  v-if="registerStaus"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-if="registerStaus">Loading</span>
                <span v-if="!registerStaus">Register</span>
              </button>
            </div>
            <div class="text-center my-3">
              <small
                >Already Have An Account!
                <span
                  class="uppercase font-semibold underline text-blue-600"
                  @click="toLogin"
                  >Login Here</span
                >
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from "../../assets/Animation/register.json";
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      registerStaus: false,
      userData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      },
      validate: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        samePassword: false,
      },
      Register,
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    register() {
      this.validationUserData();
      if (
        !this.validate.name &&
        !this.validate.email &&
        !this.validate.password &&
        !this.validate.confirmPassword &&
        !this.validate.samePassword
      ) {
        this.registerStaus = true;
        axios
          .post("http://127.0.0.1:8000/api/register", this.userData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.registerStaus = false;
              this.clearForm();
              this.storeUserData(res.data.userData, res.data.token);
              this.confirmData(res.data.userData, res.data.token);
            }
          });
      }
    },
    setImage(e) {
      this.userData.image = e.target.files[0];
    },
    confirmData(userData, token) {
      this.$swal
        .fire({
          title: "Register Suceess!",
          text: "You Don't Want To Login Next Time Click Remember Me!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Remember Me",
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("loginToken", token);
            this.$router.push("/");
          } else {
            this.$router.push("/");
          }
        });
    },
    storeUserData(userData, token) {
      this.$store.dispatch("setUserData", userData);
      this.$store.dispatch("setToken", token);
    },
    clearForm() {
      this.userData.name = "";
      this.userData.email = "";
      this.userData.password = "";
      this.userData.confirmPassword = "";
      this.userData.image = "";
    },
    validationUserData() {
      this.validate.name = this.userData.name == "" ? true : false;
      this.validate.email = this.userData.email == "" ? true : false;
      this.validate.password = this.userData.password == "" ? true : false;
      this.validate.confirmPassword =
        this.userData.confirmPassword == "" ? true : false;
      if (!this.validate.password && !this.validate.confirmPassword) {
        this.validate.samePassword =
          this.userData.password === this.userData.confirmPassword
            ? false
            : true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped></style>
