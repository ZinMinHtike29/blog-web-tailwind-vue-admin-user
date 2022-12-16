import { mapGetters } from 'vuex';
import axios from "axios"



export default {
    name: "Profile",
    data() {
        return {
            userData: {
                name: this.$store.state.loginUserData.name,
                email: this.$store.state.loginUserData.email,
                role: this.$store.state.loginUserData.role,
                image: ""
            },
            validate: {
                name: false,
                email: false
            },
            password: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            passwordValidate: {
                oldPassword: false,
                newPassword: false,
                confirmPassword: false,
                samePassword: false,
                oldPasswordSame: false
            },
            passwordStatus: false,
            updateStatus: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserData',
        ]),
    },
    methods: {
        formatDate(dbDate) {
            let getDate = new Date(dbDate)
            let year = getDate.getFullYear()
            let month = getDate.getMonth()
            let day = getDate.getDay()
            let formatDate = `${day}-${month}-${year}`
            return formatDate
        },
        setImage(e) {
            this.userData.image = e.target.files[0]
        },
        updateData() {
            this.validateData()
            if (!this.validate.name && !this.validate.email) {
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You Data Will Be Updated.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Update it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.updateStatus = true
                        axios.post('http://127.0.0.1:8000/api/update/profile', this.userData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": `Bearer ${this.$store.state.userToken}`
                            }
                        }).then(res => {
                            if (res.data.success) {
                                this.updateStatus = false
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Updated data successfully'
                                })
                                this.$store.dispatch('setUserData', res.data.updateData[0])
                                let token = localStorage.getItem("loginToken");
                                let userData = localStorage.getItem("userData");
                                if (token != null && userData != null) {
                                    localStorage.setItem('userData', JSON.stringify(res.data.updateData[0]))
                                }
                            }
                        })
                    }
                })
            }
        },

        changePassword() {
            this.validationPassword()
            if (!this.passwordValidate.oldPassword && !this.passwordValidate.newPassword && !this.passwordValidate.confirmPassword && !this.passwordValidate.samePassword) {
                this.passwordStatus = true
                axios.post('http://127.0.0.1:8000/api/change/password', this.password, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.$store.state.userToken}`
                    }
                }).then(res => {
                    this.passwordValidate.oldPasswordSame = res.data.success == true ? false : true
                    if (res.data.success) {
                        this.passwordStatus = false
                        Toast.fire({
                            icon: 'success',
                            title: 'Change Password successfully'
                        })
                        this.passwordFormClear()
                    } else {
                        this.passwordStatus = false
                        this.passwordFormClear()
                    }
                })
            }
        },
        passwordFormClear() {
            this.password.oldPassword = ""
            this.password.newPassword = ""
            this.password.confirmPassword = ""
        },
        validationPassword() {
            this.passwordValidate.oldPassword = this.password.oldPassword == "" ? true : false
            this.passwordValidate.newPassword = this.password.newPassword == "" ? true : false
            this.passwordValidate.confirmPassword = this.password.confirmPassword == "" ? true : false

            if (!this.passwordValidate.oldPassword && !this.passwordValidate.newPassword && !this.passwordValidate.confirmPassword) {
                this.passwordValidate.samePassword = this.password.newPassword === this.password.confirmPassword ? false : true
            }
        },

        validateData() {
            this.validate.name = this.userData.name == "" ? true : false
            this.validate.email = this.userData.email == "" ? true : false
        }
    },
};