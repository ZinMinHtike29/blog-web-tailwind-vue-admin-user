import Master from "@/views/Admin/layout/Master.vue";
import axios from "axios"
import Loader from "@/components/loader.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "PostPage",
    components: {
        Master,
        Loader,
        Pagination
    },
    data() {
        return {
            post: {
                title: "",
                description: "",
                image: [],
                category: ""
            },
            categoryList: [],
            catchError: [],
            createStatus: false,
            categoryFetctStatus: false,
            postFetchStatus: false,
            postList: [],
            pagLinks: "",
            searchKey: ""
        }
    },
    methods: {
        createPost() {
            this.createStatus = true
            axios.post('http://127.0.0.1:8000/api/create/post', this.post, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                this.catchError = []
                if (res.data.success) {
                    this.getPost()
                    this.createStatus = false
                    Toast.fire({
                        icon: 'success',
                        title: ' Post Created successfully'
                    })
                    this.clearForm()
                    console.log(res.data)
                }

            }).catch(err => {
                this.createStatus = false
                this.post.image = []
                this.catchError = err.response.data.errors != null ? Object.values(err.response.data.errors) : []

            })
        },
        setImage(e) {
            Object.values(e.target.files).forEach(e => {
                this.post.image.push(e)
            })
        },
        getAllCategory() {
            this.categoryFetctStatus = true
            axios.get('http://127.0.0.1:8000/api/get/all/category', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                },
            }).then(res => {
                this.categoryList = res.data.category
                this.categoryFetctStatus = false
            })
        },
        clearForm() {
            this.post.title = ""
            this.post.description = ""
            this.post.image = []
            this.post.category = ""
        },
        getAllpost() {
            this.postFetchStatus = true
            this.getPost()
        },
        getPost() {
            axios.get('http://127.0.0.1:8000/api/get/all/post', {
                headers: {
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                },
            }).then(res => {
                if (res.data.success) {
                    this.postFetchStatus = false
                    this.pagLinks = res.data.post.links
                    this.postList = res.data.post.data
                }
            })
        },
        deletePost(id, index) {
            let data = {
                id: id
            }
            axios.post('http://127.0.0.1:8000/api/delete/post', data, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                },
            }).then(res => {
                if (res.data.success) {
                    Toast.fire({
                        icon: "success",
                        title: "Delete Success",
                    });
                    if (this.postList.length == 1) {
                        this.getPost()
                    } else {
                        this.postList.splice(index, 1)
                    }
                }
            })

        },
        getEmitData(e) {
            this.postList = e.post.data;
            this.pagLinks = e.post.links;
        },
        formatDate(dbDate) {
            let getDate = new Date(dbDate);
            let year = getDate.getFullYear();
            let month = getDate.getMonth();
            let day = getDate.getDay();
            let formatDate = `${day}-${month}-${year}`;
            return formatDate;
        },
        search() {
            axios.get('http://127.0.0.1:8000/api/get/all/post', {
                params: { "searchKey": this.searchKey },
                headers: {
                    Authorization: `Bearer ${this.$store.state.userToken}`,
                },
            }).then(res => {
                if (res.data.success) {
                    this.pagLinks = res.data.post.links
                    this.postList = res.data.post.data
                }
            })
        }
    },
    mounted() {
        document.title = this.$route.meta.title;
        this.getAllCategory()
        this.getAllpost()
    },
};