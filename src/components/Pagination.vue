<template>
  <div>
    <div class="flex justify-end">
      <nav aria-label="Page navigation example">
        <ul class="flex list-style-none">
          <li
            class="page-item disabled"
            v-for="(l, i) in pagLink"
            :key="i"
            @click="changePage(l)"
          >
            <a
              v-if="l.url != null"
              class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full pointer-events-none focus:shadow-none dark:text-white"
              href="#"
              tabindex="-1"
              :class="l.active ? 'bg-blue-600 text-white' : 'text-black'"
              >{{ l.label }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pagination",
  props: {
    links: {},
  },
  data() {
    return {};
  },
  computed: {
    pagLink() {
      if (this.links.length > 0) {
        this.links[0].label = "Previous";
        this.links[this.links.length - 1].label = "Next";
      }
      return this.links;
    },
  },
  methods: {
    changePage(v) {
      axios
        .get(`${v.url}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.$emit("data", res.data);
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped></style>
