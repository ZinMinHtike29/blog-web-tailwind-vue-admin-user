<template>
  <Master>
    <div class="w-full relative">
      <Loader v-if="fetchStaus"></Loader>
    </div>
    <user-manage
      :List="fetchData"
      current="user"
      @search="getEmitData"
      v-if="!fetchStaus"
    ></user-manage>
    <pagination :links="pagLinks" @data="getEmitData"></pagination>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import UserManage from "@/components/UserManage.vue";
import Loader from "@/components/loader.vue";
import axios from "axios";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "UserList",
  components: {
    Master,
    UserManage,
    Loader,
    Pagination,
  },

  data() {
    return {
      fetchData: {},
      fetchStaus: false,
      pagLinks: {},
    };
  },
  methods: {
    getData() {
      this.fetchStaus = true;
      axios
        .get("http://127.0.0.1:8000/api/get/user/list", {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          //   console.log(res.data.userList.links);
          this.fetchStaus = false;
          if (res.data.success) {
            this.pagLinks = res.data.userList.links;
            this.fetchData = res.data.userList.data;
          }
        });
    },
    getEmitData(e) {
      this.pagLinks = e.userList.links;
      this.fetchData = e.userList.data;
    },
  },
  mounted() {
    this.getData();
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss" scoped></style>
