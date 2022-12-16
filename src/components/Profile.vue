<template>
  <div class="w-full">
    <div class="p-5 rounded-lg shadow-lg bg-white md:w-3/4 mx-auto">
      <ul
        class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist"
      >
        <li class="nav-item" role="presentation">
          <a
            href="#tabs-home"
            class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            id="tabs-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-home"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true"
            >Profile</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            href="#tabs-profile"
            class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-profile"
            role="tab"
            aria-controls="tabs-profile"
            aria-selected="false"
            >Update Profile</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            href="#tabs-messages"
            class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-messages"
            role="tab"
            aria-controls="tabs-messages"
            aria-selected="false"
            >Change Password</a
          >
        </li>
      </ul>
      <div class="tab-content" id="tabs-tabContent">
        <div
          class="tab-pane fade show active"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
        >
          <div class="md:grid grid-cols-12" v-if="getUserData != null">
            <div class="p-4 col-span-4">
              <img
                :src="
                  getUserData.profile_photo_path == null
                    ? getUserData.profile_photo_url
                    : 'http://127.0.0.1:8000/storage/' +
                      getUserData.profile_photo_path
                "
                alt=""
                class="rounded-full object-cover object-center w-full"
              />
            </div>
            <div class="col-span-8 md:px-4 flex flex-col justify-center">
              <div class="grid grid-cols-5 font-bold text-lg">
                <div class="col-span-2 md:col-span-1">Name</div>
                <div class="col-3">{{ getUserData.name }}</div>
              </div>
              <div class="grid grid-cols-5 font-bold text-lg">
                <div class="col-span-2 md:col-span-1">Email</div>
                <div class="col-3">{{ getUserData.email }}</div>
              </div>
              <div class="grid grid-cols-5 font-bold text-lg">
                <div class="col-span-2 md:col-span-1">Role</div>
                <div class="col-3">{{ getUserData.role }}</div>
              </div>
              <div class="grid grid-cols-5 font-bold text-lg">
                <div class="col-span-2 md:col-span-1">Joined At</div>
                <div class="col-span-3">
                  {{ formatDate(getUserData.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="tabs-profile"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <div class="md:grid grid-cols-12" v-if="getUserData != null">
            <div class="p-4 col-span-4">
              <img
                :src="
                  getUserData.profile_photo_path == null
                    ? getUserData.profile_photo_url
                    : 'http://127.0.0.1:8000/storage/' +
                      getUserData.profile_photo_path
                "
                alt=""
                class="rounded-full object-cover object-center w-full"
              />
            </div>
            <div class="col-span-8 md:px-4">
              <div class="">
                <div class="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Name</label
                  >
                  <input
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Name"
                    v-model="userData.name"
                  />
                  <small class="text-red-500" v-if="validate.name"
                    >Need To Fill The Name Field</small
                  >
                </div>
              </div>
              <div class="">
                <div class="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Email</label
                  >
                  <input
                    type="email"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Email"
                    v-model="userData.email"
                  />
                  <small class="text-red-500" v-if="validate.email"
                    >Need To Fill The Email Field</small
                  >
                </div>
              </div>
              <div class="">
                <div class="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Role</label
                  >
                  <input
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    disabled
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Role"
                    v-model="userData.role"
                  />
                </div>
              </div>
              <div class="">
                <div class="mb-3 xl:w-96">
                  <label
                    for="formFile"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Update Image</label
                  >
                  <input
                    @change="setImage"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  @click="updateData"
                >
                  <span v-if="updateStatus">
                    <div
                      class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </span>
                  <span v-if="updateStatus">Loading</span>
                  <span v-if="!updateStatus">Update</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="tabs-messages"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <div class="flex justify-center">
            <div class="md:px-4 md:w-3/4">
              <div class="">
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Old Password</label
                  >
                  <input
                    type="password"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Old Password"
                    v-model="password.oldPassword"
                  />
                  <small
                    class="text-red-500"
                    v-if="passwordValidate.oldPassword"
                    >Need To Fill The Name Field</small
                  >
                  <small
                    class="text-red-500"
                    v-if="passwordValidate.oldPasswordSame"
                    >Old Password Not Match</small
                  >
                </div>
              </div>
              <div class="">
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >New Password</label
                  >
                  <input
                    type="password"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your New Password"
                    v-model="password.newPassword"
                  />
                  <small
                    class="text-red-500"
                    v-if="passwordValidate.newPassword"
                    >Need To Fill The New Password</small
                  >
                </div>
              </div>
              <div class="">
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Confirm Password</label
                  >
                  <input
                    type="password"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Confirm Your New Password"
                    v-model="password.confirmPassword"
                  />
                  <small
                    class="text-red-500"
                    v-if="passwordValidate.confirmPassword"
                    >Need To Fill The Confirm Password</small
                  >
                  <small
                    class="text-red-500"
                    v-if="passwordValidate.samePassword"
                    >Confirm Password Not Match</small
                  >
                </div>
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  @click="changePassword"
                >
                  <span v-if="passwordStatus">
                    <div
                      class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </span>
                  <span v-if="passwordStatus">Loading</span>
                  <span v-if="!passwordStatus">Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/Admin/profile.js"></script>

<style lang="stylus" scoped></style>
