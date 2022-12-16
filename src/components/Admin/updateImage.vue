<template>
  <div class="mb-3">
    <img
      :src="'http://127.0.0.1:8000/storage/' + image_path"
      class="block w-full rounded-t-lg"
      alt="Wild Landscape"
    />
    <div class="">
      <div class="mb-3">
        <input
          class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="file"
          @change="setImage"
          id="formFile"
        />
      </div>
    </div>
    <div class="text-end my-3">
      <button
        :disabled="image == ''"
        @click="emitData"
        type="button"
        class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "updateImage",
  props: {
    image_path: "",
    imageId: "",
    index: "",
  },
  data() {
    return {
      image: "",
    };
  },
  methods: {
    setImage(e) {
      this.image = e.target.files[0];
    },
    emitData() {
      let data = {
        id: this.imageId,
        image: this.image,
        index: this.index,
      };
      this.$emit("emitData", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
