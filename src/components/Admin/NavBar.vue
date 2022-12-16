<template>
  <div class="px-2 py-3 backdrop-blur-sm sticky top-0 md:hidden">
    <div>
      <i class="fa-solid fa-bars fa-2x" @click="showSideBar"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    showSideBar() {
      const sideBar = document.getElementById("sideBar");
      sideBar.classList.remove("-left-full");
      sideBar.classList.add("left-0");
    },
  },
};
</script>

<style lang="scss" scoped></style>
