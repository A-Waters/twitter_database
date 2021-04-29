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

    async getAllTweetsByUser(userID){
        return await this.makeGetRequest('get/allUserPost/'+userID)
    },

    async getNoReplyTweetsByUser(userID){
        return await this.makeGetRequest('get/NoReplyPost/'+userID)
    },

    async getReplyTweetsByUser(userID){
        return await this.makeGetRequest('get/ReplyPost/'+userID)
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

    async getTweetByID(TweetID){
        return await this.makeGetRequest('get/tweet/'+TweetID)
    },

    async getFollowers(userID){
        return await this.makeGetRequest('get/followers/'+userID)
    },

    async getFollowing(userID){
        return await this.makeGetRequest('get/following/'+userID)
    },

    async getLikesOfTweet(TweetID){
        return await this.makeGetRequest('get/tweet/likes/'+TweetID)
    },

    async getRepostsOfTweet(TweetID){
        return await this.makeGetRequest('get/tweet/repost/'+TweetID)
    },

    async getAllTweets(){
        return await this.makeGetRequest('get/post/all/')
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
    },

    async UserLikeTweetEvent(userID,TweetID,aUID){
        return await this.makePutRequest('like/user/'+userID+'/tweet/'+TweetID+'/Author/'+aUID+'')
    },

    async UserRepostTweetEvent(userID,TweetID,aUID){
        return await this.makePutRequest('repost/user/'+userID+'/tweet/'+TweetID+'/Author/'+aUID+'')
    },

    async CreatePost(TweetID,userID,text){
        return await this.makePutRequest('post/'+TweetID+'/'+userID+'/'+text+'/')
    },

    async FollowEvent(followie,follower){
        return await this.makePutRequest('follow/'+followie+'/'+follower+'/')
    },

}


export default DBclient

