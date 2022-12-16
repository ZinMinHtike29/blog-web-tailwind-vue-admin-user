<template>
  <Master>
    <div class="block p-6 rounded-lg shadow-lg bg-white w-2/4 m-auto">
      <div class="mb-3">
        <span onclick="history.back()"
          ><i class="fa-solid fa-arrow-left-long fa-2x"></i
        ></span>
      </div>
      <div class="text-center">
        <h1 class="font-bold text-2xl">Contact Details</h1>
      </div>
      <div class="w-full relative">
        <Loader v-if="fetchStatus"></Loader>
      </div>
      <div class="mt-3 font-bold text-xl" v-if="!fetchStatus">
        <div class="flex mb-3">
          <div class="mr-3">
            <i class="fa-solid fa-signature mr-2"></i>Name:
          </div>
          <div>{{ details.name }}</div>
        </div>
        <div class="flex mb-3">
          <div class="mr-3"><i class="fa-solid fa-at mr-2"></i>Email:</div>
          <div>{{ details.email }}</div>
        </div>
        <div class="mb-3">
          <div class="mr-3">
            <i class="fa-solid fa-envelope mr-2"></i>Message:
          </div>
          <div class="break-words text-gray-500">
            {{ details.message }}
          </div>
        </div>

        <div class="flex mb-3">
          <div class="mr-3"><i class="fa-regular fa-clock mr-2"></i>Time:</div>
          <div>{{ details.date }}</div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import axios from "axios";
import Loader from "@/components/loader.vue";
export default {
  name: "ContactDetails",
  components: {
    Master,
    Loader,
  },
  data() {
    return {
      fetchStatus: false,
      details: {},
    };
  },
  methods: {
    GetContact() {
      this.fetchStatus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/oneContact", {
          params: { id: this.$route.params.id },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.fetchStatus = false;
          if (res.data.success) {
            this.details = res.data.contact;
          }
        });
    },
  },
  mounted() {
    this.GetContact();
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="stylus" scoped></style>
