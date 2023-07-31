import axios from "axios"

const instance = axios.create({
    baseURL:"https://peerxpbackend-jnov.onrender.com",
    withCredentials:true,
})

export default instance