<template>
  <div>
    <Master>
      <div
        class="w-full relative min-h-screen"
        v-if="
          status.getLatestPost ||
          status.getCategory ||
          status.filterWithCategory
        "
      >
        <Loader></Loader>
      </div>
      <div
        class=""
        v-if="
          !status.getLatestPost &&
          !status.getCategory &&
          !status.filterWithCategory
        "
      >
        <!-- All News  -->
        <section class="mt-4 md:mt-7">
          <div
            class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white"
          >
            <div class="flex justify-between items-center">
              <h1 class="font-bold text-2xl">All News</h1>
              <div
                class="text-sky-700 underline dark:text-white"
                @click="$router.push('all/news/')"
                v-if="latestPost.length != 0"
              >
                View All
              </div>
            </div>
            <div
              class="bg-purple-100 rounded-lg py-5 px-6 my-4 text-base text-purple-700"
              role="alert"
              v-if="latestPost.length == 0"
            >
              No Post Here!
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-3">
              <div
                class="shadow-lg rounded-md"
                v-for="l in latestPost"
                :key="l"
              >
                <div class="">
                  <img
                    class="aspect-video object-cover object-top rounded-t-md w-full"
                    :src="
                      'http://127.0.0.1:8000/storage/' + l.images[0].image_path
                    "
                    alt=""
                  />
                </div>
                <div class="mt-3 px-3 pb-2">
                  <h1 class="font-bold text-2xl mb-2">
                    {{ l.title }}
                  </h1>
                  <small>{{ l.date }} | {{ l.category.title }}</small>
                  <p class="md:min-h-[150px] mt-2">
                    {{ l.description.slice(0, 260) }}...
                  </p>
                  <div
                    class="mt-2 flex items-center justify-end text-sky-600 dark:text-sky-50"
                  >
                    <span @click="$router.push(`/news/details/${l.id}`)">
                      <span>See more</span
                      ><i class="fa-solid fa-arrow-right-long ml-2"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- ALl News  End -->
        <!-- News In Category  -->
        <section class="mt-2 md:mt-3">
          <div
            class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white"
          >
            <div class="">
              <h1 class="font-bold text-2xl">News In Category</h1>
            </div>
            <div class="md:grid md:grid-cols-4 gap-10 mt-3">
              <div class="col-auto md:col-span-1 min-h-fit">
                <div class="flex flex-col items-center justify-between">
                  <div
                    class="my-3 transition-all duration-300 ease-in-out"
                    :class="
                      c.id == currentCategory ? 'text-sky-500 text-2xl' : ''
                    "
                    @click="filterWithCategory(c.id)"
                    v-for="c in categoryList"
                    :key="c"
                  >
                    {{ c.title }}
                  </div>
                </div>
              </div>
              <div class="col-auto md:col-span-3 mt-3 md:mt-0">
                <div class="overflow-auto flex snap-mandatory md:w-full">
                  <div
                    class="shadow-lg rounded-md ml-2 snap-center flex-exsm-flex sm:flex-sm-flex md:flex-md-flex"
                    v-for="post in filterPostList"
                    :key="post"
                  >
                    <div class="">
                      <img
                        class="aspect-video object-cover object-top rounded-t-md w-full"
                        :src="
                          'http://127.0.0.1:8000/storage/' +
                          post.images[0].image_path
                        "
                        alt=""
                      />
                    </div>
                    <div class="mt-3 px-3 pb-2">
                      <h1 class="font-bold text-2xl mb-2">
                        {{ post.title }}
                      </h1>
                      <small>{{ post.date }} | {{ post.category.title }}</small>
                      <p class="md:min-h-[100px] mt-2">
                        {{ post.description.slice(0, 180) }}...
                      </p>
                      <div
                        class="mt-2 flex items-center justify-end text-sky-600 dark:text-sky-50"
                      >
                        <span @click="$router.push(`/news/details/${post.id}`)">
                          <span>See more</span
                          ><i class="fa-solid fa-arrow-right-long ml-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="shadow-lg rounded-md ml-2 snap-center flex-exsm-flex sm:flex-sm-flex md:flex-md-flex flex justify-center items-center md:min-full"
                    v-if="filterPostList.length == 0"
                  >
                    <div class="">
                      <i class="fa-solid fa-xmark mr-2"></i>No Post For This
                      Category
                    </div>
                  </div>

                  <div
                    class="shadow-lg rounded-md ml-2 snap-center flex-exsm-flex sm:flex-sm-flex md:flex-md-flex flex justify-center items-center md:min-full"
                    v-if="filterPostList.length > 0"
                  >
                    <div
                      class="border-sky-500 w-24 h-24 border flex justify-center hover:bg-sky-500 hover:text-white items-center rounded-full font-bold transition duration-200 ease-in"
                    >
                      <span
                        @click="
                          $router.push(
                            `filter/news/category=${currentCategory}`
                          )
                        "
                        >View All</span
                      >
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- News In Category  -->
        <!-- Trending News  -->
        <section class="mt-4 md:mt-7">
          <div
            class="container bg-sky-100 mx-auto p-4 md:p-5 dark:bg-sky-900 dark:text-white"
          >
            <div class="">
              <h1 class="font-bold text-2xl">Trending News</h1>
            </div>
            <div
              class="bg-purple-100 rounded-lg py-5 px-6 my-4 text-base text-purple-700"
              role="alert"
              v-if="trendPost.length == 0"
            >
              No Trend Post Here!
            </div>
            <div
              class="grid md:grid-cols-3 gap-10 mt-3"
              v-if="trendPost.length > 0"
            >
              <div class="shadow-lg rounded-md" v-for="t in trendPost" :key="t">
                <div class="">
                  <img
                    class="aspect-video object-cover object-top rounded-t-md w-full"
                    :src="
                      'http://127.0.0.1:8000/storage/' +
                      t.post.images[0].image_path
                    "
                  />
                </div>
                <div class="mt-3 px-3 pb-2">
                  <h1 class="font-bold text-2xl mb-2">
                    {{ t.post.title }}
                  </h1>
                  <small>{{ t.post.date }} | {{ t.post.category.title }}</small>
                  <p class="md:min-h-[100px] mt-2">
                    {{ t.post.description.slice(0, 180) }}...
                  </p>
                  <div
                    class="mt-2 flex items-center justify-end text-sky-600 dark:text-sky-50"
                  >
                    <span @click="$router.push(`/news/details/${t.post.id}`)">
                      <span>See more</span
                      ><i class="fa-solid fa-arrow-right-long ml-2"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Trending News  End -->
      </div>
    </Master>
  </div>
</template>

<script src="@/assets/js/user/homepage.js"></script>

<style lang="scss" scoped></style>
