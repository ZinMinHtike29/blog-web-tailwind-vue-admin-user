<template>
  <div class="w-full relative">
    <div class="flex justify-center items-center w-full">
      <Vue3Lottie :animationData="aniLoader" class="w-52" />
    </div>
  </div>
</template>

<script>
import aniLoader from "@/assets/Animation/loader.json";
export default {
  name: "loader",
  data() {
    return {
      aniLoader,
    };
  },
};
</script>

<style lang="stylus" scoped></style>
