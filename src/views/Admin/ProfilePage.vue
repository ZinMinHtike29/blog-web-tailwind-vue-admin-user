<template>
  <Master>
    <Profile></Profile>
  </Master>
</template>

<script>
import Master from "@/views/Admin/layout/Master.vue";
import Profile from "@/components/Profile.vue";
export default {
  name: "ProfilePage",
  components: {
    Master,
    Profile,
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="stylus" scoped></style>
