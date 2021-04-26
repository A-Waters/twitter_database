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
        if ( err ) return reject( err );
        resolve(rows);
      })
    })
  },

  getTweetsByUserID() {
    var call = this.makeQuery('select text, user.ufn, user.uln, created_time \
    from timeline \
    join tweet \
        on tweet_TID = TID \
    join user \
        on tweet_author_UID = user.UID \
    where user_UID = 1 \
    order by created_time;')
    return call
  }
}

module.exports = DBconnection;
