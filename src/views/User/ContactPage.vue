<template>
  <Master>
    <div class="min-h-screen">
      <div class="flex justify-center">
        <div
          class="block p-6 rounded-lg shadow-lg w-full m-2 md:m-0 md:w-2/4 bg-sky-200 dark:bg-sky-600 dark:text-white"
        >
          <div class="">
            <div class="text-center">
              <h1 class="font-bold text-3xl">Contact Us</h1>
            </div>
            <div class="md:flex">
              <div class="mb-3 md:mr-2 md:w-2/4">
                <label
                  for="exampleFormControlInput1"
                  class="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >Name</label
                >
                <input
                  type="text"
                  class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Enter Your Name"
                  v-model="name"
                />
                <small class="text-red-500" v-if="validate.name"
                  >Need To Fill The Name Field</small
                >
              </div>
              <div class="mb-3 md:w-2/4">
                <label
                  for="exampleFormControlInput1"
                  class="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Enter Your Email"
                  v-model="email"
                />
                <small class="text-red-500" v-if="validate.email"
                  >Need To Fill The Email Field</small
                >
              </div>
            </div>
            <div class="">
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  class="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >Message</label
                >
                <textarea
                  class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Your message"
                  v-model="message"
                ></textarea>
                <small class="text-red-500" v-if="validate.message"
                  >Need To Fill The Message Field</small
                >
              </div>
            </div>
            <div class="text-end">
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                @click="send"
                :disabled="sendStatus"
              >
                <span v-if="sendStatus">
                  <div
                    class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </span>
                <span v-if="sendStatus">Sending</span>
                <span v-if="!sendStatus">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/User/layout/Master.vue";
import axios from "axios";
export default {
  name: "ContactPage",
  components: {
    Master,
  },
  data() {
    return {
      name: "",
      email: "",
      message: "",
      validate: {
        name: false,
        email: false,
        message: false,
      },
      sendStatus: false,
    };
  },
  methods: {
    send() {
      this.validateData();
      if (
        !this.validate.name &&
        !this.validate.email &&
        !this.validate.message
      ) {
        this.sendStatus = true;
        let data = {
          name: this.name,
          email: this.email,
          message: this.message,
        };
        axios
          .post("http://127.0.0.1:8000/api/create/contact/data", data)
          .then((res) => {
            if (res.data.success) {
              this.sendStatus = false;
              Toast.fire({
                icon: "success",
                title: "Contact Success",
              });
              this.clearForm();
            }
          });
      }
    },
    validateData() {
      this.validate.name = this.name == "" ? true : false;
      this.validate.email = this.email == "" ? true : false;
      this.validate.message = this.message == "" ? true : false;
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss" scoped></style>
