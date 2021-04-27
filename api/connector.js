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
        console.log("bot of makeQuery");
        resolve(rows);
      })
      
    })
    
  },


  // USER RELATED GETS

  getUser(id) {
    var val = this.makeQuery('select * \
    from user \
      where user.UID = '+id+';')
    return val;
  },

  getTimelineOfUser(id) {
    var val = this.makeQuery('select * \
    from timeline \
    join tweet \
        on tweet_TID = TID \
    join user \
        on tweet_author_UID = user.UID \
    where user_UID = '+id+' \
    order by created_time;')
    return val;
  },

  getPostOfUser(id){
    var val =  this.makeQuery('select * from tweet\
    join user \
      on tweet.author_UID = user.UID\
      where tweet.author_UID = '+id+'\
      order by created_time;')
      return val;
  },

  getLikeOfUser(id){
    var val =  this.makeQuery('select * from likes \
    join tweet \
      on tweet_TID = TID \
    where user_UID = '+id+' \
    order by created_time desc;')
    return val;
  },

  getRepostOfUser(id){
    var val =  this.makeQuery('\
    select * from repost\
	    where repost.user_UID = '+id+';\
    ')
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
        id + '","' + 
        fn + '","' + 
        ln + '","' + 
        username + '","' + 
        pass_hash + '");'
    )
    val.catch( (err) => {
      console.error("TEST123",err)
    })
    console.log("Bottom of create");
    return val
  },

  //user likers tweet
  likeTweet(UID, TID, tweet_UID, when){
    var val = this.makeQuery('\
      insert into likes values( "' + 
        UID + '","' + 
        TID + '","' + 
        tweet_UID + '","' + 
        when + '");'
    )
    val.catch( (err) => {
      console.error(err)
    })
    return val
  },

  //user report tweet
  repostTweet(UID, TID, tweet_UID, when){
    var val = this.makeQuery('\
      insert into repost values( "' + 
        UID + '","' + 
        TID + '","' + 
        tweet_UID + '","' + 
        when + '"); \
      insert into timeline values( "' + 
        UID + '","' + 
        TID + '","' + 
        tweet_UID + '","' + 
        when + '");'
    )
    val.catch( (err) => {
      console.error(err)
    })
    return val;
  },

  //user follows another user
  likeTweet(followie, follower){
    var val = this.makeQuery('\
      insert into following values( "' + 
        followie + '","' + 
        follower + '","' + 
        when + '");'
    )
    val.catch( (err) => {
      console.error(err)
    })
    return val
  },

  createTweet(id, author_UID, text, datetime, response_tweet_TID, response_tweet_author_UID){
    var val = this.makeQuery('\
      insert into tweet values( "' + 
        id + '","' + 
        author_UID + '","' + 
        text + '","' + 
        datetime + '","' + 
        response_tweet_TID + '","' + 
        response_tweet_author_UID + '"); \
      insert into timeline values( "' +
        author_UID + '","' + 
        id + '","' + 
        author_UID + '","' + 
        datetime + '");'
    )
    val.catch( (err) => {
      console.error(err)
    })

    return val
  },
}

module.exports = DBconnection;
