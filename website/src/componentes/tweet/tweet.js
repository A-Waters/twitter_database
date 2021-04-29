import { useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DBclient from '../../DBclient'

function Tweet(props) {
    
    function getUser(ID) {
        return DBclient.getUserbyID(ID)
    }

    const tweetData = props.tweetData
    const ProfileData = props.UprofileData
    const [TweetAuthorData, setTweetAuthorData] = useState(null)
    const [likes, setLikes] = useState()
    const [replies, setReplies] = useState()
    const [retweets, setRetweets] = useState()
    
    useEffect(()=>{
        getUser(tweetData.author_UID).then((res) => {
            setTweetAuthorData(res.data[0])
        });

        DBclient.getLikesOfTweet(tweetData.TID).then(res =>{
            setLikes(res.data.length)
        })

        DBclient.getRepostsOfTweet(tweetData.TID).then(res =>{
            setRetweets(res.data.length)
        })
    }, [])
    
   
    function updatedProfile(user_data){
        props.onChange(user_data);
        props.onProfile("Profile")
    }

    function likeTweet(){
        DBclient.UserLikeTweetEvent(DBclient.currentUser.UID, tweetData.TID, tweetData.author_UID)
        setLikes(likes + 1)
    }

    function repostTweet(){
        DBclient.UserRepostTweetEvent(DBclient.currentUser.UID, tweetData.TID, tweetData.author_UID)
        setRetweets(retweets + 1)
    }



    
    return (
        <div className={styles.outerBounds}>
            
            {TweetAuthorData != null ? (<>
            
                {tweetData.type === "Original" ? 
                (
                <>
                    <Row>
                        <Col>
                            <Button variant="link" onClick={() => updatedProfile(TweetAuthorData)}>{TweetAuthorData.ufn} {TweetAuthorData.uln}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{tweetData.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{likes}</p> <Button onClick={() => likeTweet()}>Likes</Button>
                        </Col>
                        <Col>
                            <p>{retweets}</p> <Button onClick={() => repostTweet()}>Repost</Button>
                        </Col>
                    </Row>

                    
                </>
                )

                :

                (
                <>
                
                {tweetData.type === "Repost" ? 
                (
                <>
                    <Row>
                        <Col>
                            <Button variant="link" onClick={() => updatedProfile(TweetAuthorData)}>{TweetAuthorData.ufn} {TweetAuthorData.uln}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Reposted by {ProfileData.ufn} {ProfileData.uln}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{tweetData.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{likes}</p> <Button onClick={() => likeTweet()}>Likes</Button>
                        </Col>
                        <Col>
                            <p>{retweets}</p> <Button onClick={() => repostTweet()}>Repost</Button>
                        </Col>
                    </Row>
                    
                </>
                )

                :

                (
                <>
                    {tweetData.type === "Like" ? 
                (
                <>
                    <Row>
                        <Col>
                            <Button variant="link" onClick={() => updatedProfile(TweetAuthorData)}>{TweetAuthorData.ufn} {TweetAuthorData.uln}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Liked by {ProfileData.ufn} {ProfileData.uln}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{tweetData.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{likes}</p> <Button onClick={() => likeTweet()}>Likes</Button>
                        </Col>
                        <Col>
                            <p>{retweets}</p> <Button onClick={() => repostTweet()}>Repost</Button>
                        </Col>
                    </Row>
                    
                </>
                )

                :

                (
                <>

                    
                
                
                
                
                </>
                )
                }
                    
                
                
                
                
                </>
                )
                }











                
                
                
                
                
                </>
                )
                }


            
            </>) 
            
            : 
            
            (<><p>Loading</p></>)
            
            }
            
        </div>
    );
}

export default Tweet;