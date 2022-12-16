<template>
  <div class="font-Nunito box-border bg-sky-200 min-h-screen">
    <div class="md:grid grid-cols-5">
      <side-bar></side-bar>
      <div class="sm:col-span-3 md:col-span-4">
        <nav-bar class="w-full"></nav-bar>
        <div class="px-5 py-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Admin/SideBar.vue";
import NavBar from "@/components/Admin/NavBar.vue";
export default {
  name: "Master",
  components: {
    SideBar,
    NavBar,
  },
};
NavBar;
</script>

<style lang="scss" scoped></style>
