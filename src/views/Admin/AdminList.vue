<template>
  <Master>
    <div class="w-full relative">
      <Loader v-if="fetchStaus"></Loader>
    </div>
    <user-manage
      :List="fetchData"
      current="admin"
      v-if="!fetchStaus"
    ></user-manage>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import UserManage from "@/components/UserManage.vue";
import Loader from "@/components/loader.vue";
import axios from "axios";

export default {
  name: "AdminList",
  components: {
    Master,
    UserManage,
    Loader,
  },

  data() {
    return {
      fetchData: {},
      fetchStaus: false,
    };
  },
  methods: {
    getData() {
      this.fetchStaus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/admin/list", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          this.fetchStaus = false;
          if (res.data.success) {
            this.fetchData = res.data.adminList;
          }
        });
    },
  },
  mounted() {
    this.getData();
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss" scoped></style>
