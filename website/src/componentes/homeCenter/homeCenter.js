import {useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DBclient from '../../DBclient';
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from '../tweet/tweet'




function HomeCenter(props) {
    const [timelineData, setTimelineData] = useState([])
    const [type, setType] = useState("home")
    const profileData = props.profileData

    let history = useHistory();

    //https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    async function TweetPrommisesToData(func, userID){

        const {data} = await func.call(DBclient,userID);
        
        const requests = data.map((data2) => {
            
            if (data2.hasOwnProperty("TID")){
                    return DBclient.getTweetByID(data2.TID)
                }
                else if (data2.hasOwnProperty("tweet_TID"))
                {
                    return DBclient.getTweetByID(data2.tweet_TID)
                }
            })
        
        const about_to_return =  await Promise.all(requests);
        return about_to_return.map((dat) => { return dat.data[0]})
            
    }



    useEffect( () => {
        if (profileData === null){
            history.push('/')
        }
        else{
            setTimelineData([])

            if (type == "Profile") {
                // tweets retweets replies
                let Orignial = []
                let replies = []
                let repost = []
                

            TweetPrommisesToData(DBclient.getNoReplyTweetsByUser, profileData.UID).then((res1) => {
                Orignial = res1.map((res11)=>{
                    res11.type = "Original"
                    return res11;
                })

                TweetPrommisesToData(DBclient.getReplyTweetsByUser, profileData.UID).then((res2) => {
                    replies = res2.map((res22)=>{
                        res22.type = "Reply"
                        return res22;
                    })

                        TweetPrommisesToData(DBclient.getUserRepost, profileData.UID).then((res3) => {
                            repost = res3.map((res33)=>{
                                res33.type = "Repost"
                                return res33;
                            })

                            let final = sortByKey(Orignial.concat(replies, repost),"created_time");
                            setTimelineData(final)


                        })
                    })

                })                
            }

            if (type == "likes") {
                TweetPrommisesToData(DBclient.getUserLikes, profileData.UID).then((res) => {
                    
                    let likes = res.map((dat)=>{
                        dat.type = "Like"
                        return dat
                    })

                    setTimelineData(likes)
                })
            }

            if (type == "repost") {
                TweetPrommisesToData(DBclient.getUserRepost, profileData.UID).then((res) => {
                    let repost = res.map((dat)=>{
                        dat.type = "Repost"
                        return dat
                    })

                    setTimelineData(repost)
                })
            }

            if (type == "home") {
                if (profileData.UID != DBclient.currentUser.UID) {
                    props.onChange(DBclient.currentUser)
                }
                DBclient.getFollowing(DBclient.currentUser.UID).then((res) => {

                    let done = res.data.flatMap(async (single_follow) =>  {
                        let arr = []
                        await DBclient.getNoReplyTweetsByUser(single_follow.UID).then((follower_tweets) => {
                            arr = follower_tweets.data.map((dat)=>{
                                dat.type = "Original"
                                return dat
                            })
                        })
                        return arr
                    })

                    Promise.all(done).then((res) => {
                        setTimelineData(sortByKey([].concat(...res), "created_time"));
                    });

                    
                })
            }

            
        }
        
    }, [type, profileData]);

    return (
        <div className={styles.outside_container}>
            <Button variant="link" onClick={() => setType("home")}>My Timeline</Button>
            <Button variant="link" onClick={() => setType("likes")}>Profile Likes</Button>
            <Button variant="link" onClick={() => setType("repost")}>Profile Repost</Button>
            <Button variant="link" onClick={() => setType("Profile")}>Profile Tweets</Button>
            { timelineData != null ? (
                <Container>
                    {
                    
                    (timelineData.length > 0) ? 
                    
                    (
                        <InfiniteScroll className={styles.scroller}
                            dataLength={timelineData.length}
                            next={() => {}}
                            hasMore={false}
                            loader={<h4>Loading...</h4>}
                            >
                            
                            {timelineData.map((i, index) => (
                                <Row key={index}>
                                    <Col>
                                        <Tweet UprofileData={profileData} tweetData={timelineData[index]} onChange={props.onChange} onProfile={setType}/>
                                    </Col>
                                </Row>
                            ))}
                            
                        </InfiniteScroll>
                    ) 
                                  
                    : 
                    
                    (
                        <Row>
                            <Col>
                                <div>No Tweets to display</div>
                            </Col>
                        </Row>
                    )
                    }
                    
                </Container>
            ) : (<></>)
            }
        </div>

            
            
    );
}

export default HomeCenter;