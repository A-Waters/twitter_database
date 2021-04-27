import axios from 'axios'

const DBclient = {
    
    makeRequest(urlpath){
        return axios.get('http://localhost:7536/api/'+urlpath)
    },

    async getUserbyID(userID){
        return await this.makeRequest('get/user/'+userID)
    },

    async getTweetsByUser(userID){
        return await this.makeRequest('get/userPost/'+userID)
    },

    async getUserTimeline(userID){
        return await this.makeRequest('get/timeline/'+userID)
    },

    async getUserRepost(userID){
        return await this.makeRequest('get/repost/'+userID)
    },

    async getUserLikes(userID){
        return await this.makeRequest('get/likes/'+userID)
    },

}


export default DBclient

