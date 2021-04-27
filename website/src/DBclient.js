import axios from 'axios'

const DBclient = {
    currentUser : null,

    // gets
    makeGetRequest(urlpath){
        return axios.get('http://localhost:7536/api/'+urlpath)
    },

    async login(data){
        return await this.makeGetRequest('login/'+data.username+"/"+data.password +"/")
    },

    async getUserbyID(userID){
        return await this.makeGetRequest('get/user/'+userID)
    },

    async getTweetsByUser(userID){
        return await this.makeGetRequest('get/userPost/'+userID)
    },

    async getUserTimeline(userID){
        return await this.makeGetRequest('get/timeline/'+userID)
    },

    async getUserRepost(userID){
        return await this.makeGetRequest('get/repost/'+userID)
    },

    async getUserLikes(userID){
        return await this.makeGetRequest('get/likes/'+userID)
    },


    // puts
    makePutRequest(urlpath){
        return axios.put('http://localhost:7536/api/put/'+urlpath)
    },

    async createNewUser(data) {
        return await this.getUserbyID("user.UID").then(async (res) =>{
            var new_id = res.data.length+1
            console.log(res)
            return await this.makePutRequest("user/"
            + new_id + "/" 
            + data.firstname + "/" 
            + data.lastname + "/" 
            + data.username + "/"
            + data.password + "/")
        })        
    }


}


export default DBclient

