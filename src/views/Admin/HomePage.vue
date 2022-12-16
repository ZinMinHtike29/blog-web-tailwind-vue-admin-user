<template>
  <Master>
    <div
      class="bg-purple-100 rounded-lg py-5 px-6 my-4 text-base text-purple-700"
      role="alert"
    >
      <div class="font-bold">
        <i class="fa-solid fa-plus mr-2"></i>Website Total Visit
      </div>
      <div class="">
        <span class="font-bold text-3xl">{{ webVisitCount }}</span>
      </div>
    </div>
    <div class="w-full">
      <div
        class="bg-green-100 rounded-lg py-5 px-6 my-4 text-base text-green-700"
        role="alert"
      >
        <h1 class="font-bold text-2xl text-green-700 my-3">Trending Post</h1>
        <div
          class="bg-green-100 md:w-2/4 rounded-lg py-5 px-6 my-4 text-base text-green-700"
          role="alert"
          v-if="trendPost.length == 0"
        >
          No Trend Post Here!
        </div>
        <div class="" v-if="trendPost.length > 0">
          <div
            class="flex relative mb-2 bg-green-200 shadow-sm px-1 py-1"
            v-for="t in trendPost"
            :key="t"
          >
            <div class="w-1/4">
              <img
                :src="
                  'http://127.0.0.1:8000/storage/' + t.post.images[0].image_path
                "
                alt=""
              />
            </div>
            <div class="text-black ml-2">
              <h1 class="font-bold text-lg">{{ t.post.title }}</h1>
              <p>{{ t.post.description.slice(0, 40) }}..</p>
            </div>
            <div class="absolute right-4 top-3">
              <h5
                class="text-xl font-medium leading-tight text-gray-800 mb-2.5"
              >
                <span
                  class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
                >
                  <i class="fa-solid fa-eye"></i>
                  {{ t.post_view_count }}
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script src="../../assets/js/Admin/HomePage.js"></script>

<style lang="stylus" scoped></style>
