<template>
  <Master>
    <div class="block p-6 rounded-lg shadow-lg bg-white">
      <div class="md:grid grid-cols-12">
        <div class="col-span-4 md:pr-2">
          <h1 class="font-bold text-lg">Create Post</h1>
          <div class="" v-if="catchError.length > 0">
            <div
              class="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
              role="alert"
            >
              <div class="mb-2" v-for="c in catchError" :key="c">
                <i class="fa-solid fa-triangle-exclamation mr-2"></i>{{ c[0] }}
              </div>
              <div class="mb-2">
                <i class="fa-solid fa-triangle-exclamation mr-2"></i> You Need
                To Rechoose Your Image!
              </div>
            </div>
          </div>
          <div class="my-3">
            <input
              type="text"
              class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Enter Category Title"
              v-model="post.title"
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea1"
              class="form-label inline-block mb-2 text-gray-700"
              >Post Description</label
            >
            <textarea
              class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              v-model="post.description"
              rows="6"
              placeholder="Post Description"
            ></textarea>
          </div>

          <div class="">
            <div class="mb-3">
              <label
                for="formFile"
                class="form-label inline-block mb-2 text-gray-700"
                >You Can Choose Multiple Photos</label
              >
              <input
                class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                multiple
                @change="setImage"
                id="formFile"
              />
            </div>
          </div>

          <div class="">
            <label
              for="exampleFormControlTextarea1"
              class="form-label inline-block mb-2 text-gray-700"
              >Choose Category</label
            >
            <div class="">
              <div
                class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                role="status"
                v-if="categoryFetctStatus"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="flex flex-wrap" v-if="!categoryFetctStatus">
              <div
                class="form-check border border-sky-400 px-3 py-1 mr-2 mb-2 rounded-sm"
                v-for="c in categoryList"
                :key="c"
              >
                <input
                  class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  :value="c.id"
                  name="flexRadioDefault"
                  :id="c.id"
                  v-model="post.category"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  :for="c.id"
                >
                  {{ c.title }}
                </label>
              </div>
            </div>
          </div>

          <div class="text-end">
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              @click="createPost"
              :disabled="createStatus"
            >
              <div
                class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                role="status"
                v-if="createStatus"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-if="createStatus">Loading</span>
              <span v-if="!createStatus">Create Post</span>
            </button>
          </div>
        </div>
        <div class="col-span-8 px-3">
          <div class="flex justify-end">
            <div class="md:w-2/4 flex" v-if="postList.length > 0">
              <input
                type="text"
                class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="Enter Search Key"
                v-model="searchKey"
              />
              <button
                @click="search"
                type="button"
                class="inline-block px-3 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Search
              </button>
            </div>
          </div>
          <div class="w-full relative">
            <Loader v-if="postFetchStatus"></Loader>
          </div>
          <div
            class="bg-purple-100 rounded-lg py-5 px-6 my-4 text-base text-purple-700"
            v-if="postList.length == 0 && !postFetchStatus"
            role="alert"
          >
            No Post Here!
          </div>

          <div class="overflow-x-auto">
            <table class="" v-if="postList.length != 0 && !postFetchStatus">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b" v-for="(p, i) in postList" :key="i">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ p.id }}
                  </td>
                  <td
                    class="py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    <img
                      :src="
                        'http://127.0.0.1:8000/storage/' +
                        p.images[0].image_path
                      "
                      alt=""
                      class="object-cover object-center"
                    />
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ p.title }}
                  </td>

                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{ p.description.slice(0, 30) }}...
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ p.category.title }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ formatDate(p.created_at) }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <button
                      type="button"
                      class="inline-block px-3 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      @click="deletePost(p.id, i)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      @click="$router.push(`/admin/update/post/${p.id}`)"
                      type="button"
                      class="inline-block px-3 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-2"
                    >
                      View & Update
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pagination
            :links="pagLinks"
            @data="getEmitData"
            v-if="postList.length != 0"
          ></pagination>
        </div>
      </div>
    </div>
  </Master>
</template>

<script src="@/assets/js/Admin/Post.js"></script>

<style lang="scss" scoped></style>
