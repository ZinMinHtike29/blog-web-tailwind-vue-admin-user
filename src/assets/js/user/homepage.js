import Master from "@/views/User/layout/Master.vue";
import axios from "axios";
import Loader from "@/components/loader.vue";
export default {
    components: {
        Master,
        Loader
    },
    data() {
        return {
            latestPost: [],
            categoryList: [],
            currentCategory: "",
            filterPostList: [],
            trendPost: [],
            status: {
                getLatestPost: false,
                getCategory: false,
                filterWithCategory: false
            }
        }
    },

    methods: {
        getLatestPost() {
            this.status.getLatestPost = true
            axios.get('http://127.0.0.1:8000/api/get/latest/post').then(res => {
                if (res.data.success) {
                    this.latestPost = res.data.latestPost
                    this.status.getLatestPost = false
                }
            })
        },
        getAllCategory() {
            this.status.getCategory = true
            axios.get('http://127.0.0.1:8000/api/get/all/category').then(res => {
                this.status.getCategory = false
                if (res.data.category.length != 0) {
                    this.categoryList = res.data.category
                    this.currentCategory = this.categoryList[0].id
                    this.postFilterWithCategory();
                }
            })
        },
        postFilterWithCategory() {
            this.status.filterWithCategory = true
            this.fetchPost(this.currentCategory)
        },
        filterWithCategory(id) {
            this.currentCategory = id
            this.fetchPost(id);
        },
        fetchPost(categoryId) {
            axios.get("http://127.0.0.1:8000/api/user/get/all/post", {
                params: { "categoryId": categoryId }
            }).then(res => {
                if (res.data.success) {
                    this.filterPostList = res.data.post.data
                    this.status.filterWithCategory = false
                }
            })
        },
        getTrendPost() {
            axios.get("http://127.0.0.1:8000/api/get/trendPost").then(res => {
                if (res.data.success) {
                    this.trendPost = res.data.post
                }
            });
        },
    },
    mounted() {
        document.title = this.$route.meta.title;
        this.getLatestPost();
        this.getAllCategory();
        this.getTrendPost();
    },
};