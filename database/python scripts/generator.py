
#================================================================================== SETTINGS ==================================================================================
FILENAME = "insert.sql"
ALL_USERS = 50
MAX_TWEETS_PER_USER = 20
#==================================================================================== CODE ==================================================================================


import random
from datetime import datetime, timedelta
import string
import hashlib
import time 


with open("lastnames") as f:
    last_names = f.readlines()

last_names = [x[:1] + x[1:].strip().lower() for x in last_names] 


with open("firstnames") as f:
    first_names = f.readlines()

first_names = [x.strip() for x in first_names] 


with open("passwords") as f:
    passwords_raw = f.readlines()

passwords_raw = [x.strip() for x in passwords_raw] 


# https://gist.github.com/rg3915/db907d7455a4949dbe69
def gen_datetime(min_year=1900, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1, 00, 00, 00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return start + (end - start) * random.random()


# printing letters
letters = string.ascii_letters
# printing digits
digits = string.digits


tweets = []


def create_new_user(user_id):
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    return {"ID": user_id,
            "fn": fn,
            "ln": ln,
            "handel":(''.join(random.choice(letters) for i in range(random.randrange(0,3)))) + fn + ln + (''.join(random.choice(digits) for i in range(random.randrange(0,5)))),
            "pass_hash": hashlib.md5(random.choice(passwords_raw).encode()).hexdigest(),
            "#tweets": random.randrange(MAX_TWEETS_PER_USER),
            "Following": random.randrange(ALL_USERS/2)
            }


def generate_new_tweet(author):

    if random.random() > 0.7 and len(tweets) > 0:
        #random response
        response_ID = (random.choice(tweets))["TID"]
    else:
        response_ID = None
    return {
        "TID": len(tweets) + 1, 
        "author": author,
        "content": ''.join(random.choice(letters) for i in range(random.randrange(1,45))),
        "create_time": gen_datetime(min_year=2012),
        "response_ID": response_ID
    }


#create 1000 users
users = [create_new_user(user_id) for user_id in range(ALL_USERS)]

for user in users:
    for tweet in range(user['#tweets']):
        tweets.append(generate_new_tweet(user["ID"]))





with open("insert.sql","w") as f:

    f.write("use twitter; \n\n\n " +
        "# clear tables \n " +
        "SET SQL_SAFE_UPDATES = 0; \n " + 
        "SET FOREIGN_KEY_CHECKS = 0; \n" + 
        "delete from user where 1=1; \n" + 
        "delete from tweet where 1=1; \n" + 
        "delete from likes where 1=1; \n" + 
        "delete from repost where 1=1; \n" + 
        "delete from following where 1=1; \n" +   
        "delete from timeline where 1=1; \n" +    
        "SET FOREIGN_KEY_CHECKS = 1; \n" + 
        "SET SQL_SAFE_UPDATES = 1; \n\n\n"
        )


    print("creating users")
    f.write("# create all users\n\n")

    for user in users:
        f.write('insert into user values('+str(user["ID"])+', "'+user["fn"]+'", "'+user["ln"]+'", "'+user["handel"]+'", "'+user["pass_hash"]+'");'+'\n')

    print("done adding users, creating tweets")
    f.write("\n\n\n\n # create all tweets\n\n")

    for tweet in tweets:
        date_time = str(gen_datetime(min_year=2012))
        if tweet["response_ID"] != None:
            f.write('insert into tweet values('+str(tweet["TID"])+', '+str(tweet["author"])+', "'+tweet["content"]+'", "'+str(tweet["create_time"])+'", '+ str(tweets[tweet["response_ID"]]["TID"])+', '+ str(tweets[tweet["response_ID"]]["author"]) + ');'+'\n')
        else:
            f.write('insert into tweet values('+str(tweet["TID"])+', '+str(tweet["author"])+', "'+tweet["content"]+'", "'+str(tweet["create_time"])+'", null, null);'+'\n')
        
        f.write('insert into timeline values('+str(tweet['author'])+', '+str(tweet["TID"])+', '+ str(tweet["author"]) +', "'+ date_time + '");\n')

    print("done adding tweets, creating followers")

    f.write("\n\n\n\n # create followers\n\n")
    for user in users:
        already = []
        for new_follow in range(user["Following"]):
            follower = user["ID"]

            while follower == user["ID"] or follower in already:
                follower = random.randrange(len(users))        
            already.append(follower)
            

            f.write("insert into following values("+str(user["ID"])+", "+ str(follower) + ");\n")

    print("done adding followers, creating likes")

    f.write("\n\n\n\n # create likes\n\n")
    for user in users:
        already = []
        for like in range(random.randrange(0,len(tweets))):
            tweet_to_like = random.choice(tweets)
            while tweet_to_like in already:
                tweet_to_like = random.choice(tweets)
            
            already.append(tweet_to_like)

            f.write('insert into likes values('+ str(user["ID"])+', '+ str(tweet_to_like["TID"]) +', ' + str(tweet_to_like["author"]) +', "'+ str(gen_datetime(min_year=2012))+'");\n')

    print("done adding likes, creating repost")

    f.write("\n\n\n\n # create repost\n\n")
    for user in users:
        for like in range(random.randrange(0,len(tweets))):
            tweet_to_repost = random.choice(tweets)

            date_time = str(gen_datetime(min_year=2012))
            
            f.write('insert into repost values('+ str(user["ID"])+', '+ str(tweet_to_repost["TID"]) +', ' + str(tweet_to_repost["author"]) +', "'+ date_time+'");\n')
            f.write('insert into timeline values('+ str(user["ID"])+', '+ str(tweet_to_repost["TID"]) +', ' + str(tweet_to_repost["author"]) +', "'+ date_time+'");\n')




    f.write("\n\n\n " +
        "select * from user; \n " +
        "select * from tweet; \n " + 
        "select * from timeline; \n" + 
        "select * from likes; \n" + 
        "select * from repost; \n" + 
        "select * from following; \n"
        )

