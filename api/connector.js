var  mysql_driver = require('mysql')
var connection = mysql_driver.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'twitter'
})
connection.connect()



const DBconnection = {

  async makeQuery(sql) {
    
    return new Promise( ( resolve, reject ) => { 
      connection.query( sql, 
      (err, rows, fields) => {
        if ( err ) { return reject( err );}
        resolve(rows);
      })
      
    })
    
  },


  // USER RELATED GETS
  
  //login
  login(username, password_hash){
    var val = this.makeQuery('select * \
    from user\
	    where u_handle = "'+username+'"  and u_pass_hash = "'+password_hash+'"')
    return val;
  },


  getUser(id) {
    var val = this.makeQuery('select * \
    from user \
      where user.UID = '+id+';')
    return val;
  },

  getTimelineOfUser(id) {
    var val = this.makeQuery(
    'select * from timeline \
	    where user_UID = '+id+'\
      order by timeline.when;'
    )
    return val;
  },

  getAllPostOfUser(id){
    var val =  this.makeQuery(
      'select * from tweet\
        where author_UID = '+id+'\
        order by created_time;'
      )
    return val;
  },

  getNoReplyPostOfUser(id){
    var val =  this.makeQuery(
      'select * from tweet\
        where author_UID = '+id+'\
        and response_tweet_TID is NULL\
        order by created_time;'
      )
    return val;
  },

  getRepliesPostOfUser(id){
    var val =  this.makeQuery(
    'select * from tweet \
      where author_UID = '+id+'\
      and response_tweet_TID is not NULL \
      order by created_time;'
    )
    return val;
  },



  getLikeOfUser(id){
    var val =  this.makeQuery(
    'Select * from likes\
	    where user_UID = '+id+';'
    )
    return val;
  },

  getRepostOfUser(id){
    var val =  this.makeQuery('\
    select * from repost\
	    where repost.user_UID = '+id+';\
    ')
    return val;
  },

  getLikesOfTweet(id){
    var val = this.makeQuery(
      'select * from user where UID IN (select user_UID from likes where tweet_TID = '+id+');'
      )
    return val
  },

  getRepostOfTweet(id){
    var val = this.makeQuery(
      'select * from user where UID IN (select user_UID from repost where tweet_TID = '+id+');'
      )
    return val
  },




  getFollowersOfID(id){
    var val =  this.makeQuery('select * from user \
      where UID IN (\
      select followie_UID from following\
      where follower_UID = '+id+');'
    )
    return val;
  },

  getFollowingOfID(id){
    var val =  this.makeQuery(
    'select * from user \
      where UID IN \
      (select follower_UID \
      from following\
      where followie_UID = '+id+'\
    );')
    return val;
  },


  getAllTweets(){
    var val = this.makeQuery('select * from tweet;')
    return val;
  },


  // TWEET RELATED GETS

  getTweetOfID(id){
    var val =  this.makeQuery('\
    select * from tweet\
	    where tweet.TID = '+id+';\
    ')
    return val;
  },
  
  getResponsesOfTweet(id){
    var val =  this.makeQuery('\
    select * from tweet\
	    where tweet.response_tweet_TID = '+id+';\
    ')
    return val;
  },


  // post requests
  creatUser(id, fn, ln, username, pass_hash){
    var val = this.makeQuery('\
      insert into user values( "' + 
        id + ',' + 
        fn + '","' + 
        ln + '","' + 
        username + '","' + 
        pass_hash + '");'
    )
    val.catch( (err) => {
      console.error("CreateUser",err)
    })
    return val
  },

  //user likers tweet
  likeTweet(UID, TID, author_UID){
    var val = this.makeQuery('\
      insert into likes values( ' + 
        UID + ',' + 
        TID + ',' + 
        author_UID + ',' + 
        'NOW()' + ');'
    )
    val.catch( (err) => {
      console.error(err)
    })
    return val
  },

  //user report tweet
  repostTweet(UID, TID, tweet_UID){
    var val = this.makeQuery('\
      insert into repost values( ' + 
        UID + ',' + 
        TID + ',' + 
        tweet_UID + ',' + 
        'NOW()' + ');'
    )
    val.catch( (err) => {
      console.error(err)
    })

    var val = this.makeQuery('\
      insert into timeline values( ' + 
      UID + ',' + 
      TID + ',' + 
      tweet_UID + ',' + 
      'NOW()' + ');'

    )
    val.catch( (err) => {
      console.error(err)
    })
    return val;
  },

  //user follows another user
  followUser(followie, follower){
    var val = this.makeQuery('\
      insert into following values( ' + 
        followie + ',' + 
        follower + ');'
    )
    val.catch( (err) => {
      console.error(err)
    })
    return val
  },

  createTweet(tid, author_UID, text, response_tweet_TID, response_tweet_author_UID){
    var val = this.makeQuery('\
      insert into tweet values( ' + 
        tid + ',' + 
        author_UID  + ',"' + 
        text + '",' + 
        'NOW()' + ',' + 
        response_tweet_TID + ',' + 
        response_tweet_author_UID + ');'
    )
    val.catch( (err) => {
      console.error(err)
    })

    var val = this.makeQuery('\
      insert into timeline values( ' +
      author_UID + ',' + 
      tid + ',' + 
      author_UID + ',' + 
      'NOW()' + ');'
    )
    val.catch( (err) => {
      console.error(err)
    })

    return val
  },


  
}

module.exports = DBconnection;
