import Master from "@/views/Admin/layout/Master.vue"
import axios from "axios"

export default {
    name: "HomePage",
    components: {
        Master,
    },
    data() {
        return {
            webVisitCount: 0,
            trendPost: []
        }
    },
    methods: {
        getVisitCount() {
            axios.get("http://127.0.0.1:8000/api/add/website/view/count").then(res => {
                this.webVisitCount = res.data.count
            });
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
        this.getVisitCount();
        this.getTrendPost();
        document.title = this.$route.meta.title;
    },
};