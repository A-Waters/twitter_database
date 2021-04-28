import { useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient'

function Tweet(props) {
    const [tweetData, setTweetData] = useState(null)
    const [ownerData, setOwnerData] = useState(null)
    const [likes, setLikes] = useState()
    const [replies, setReplies] = useState()
    const [retweets, setRetweets] = useState()

    useEffect(() => {
        setTweetData(props.TLData)
        setOwnerData(props.uData)
        //console.log(props.TLData)
    },[] )

    

    return (
        <div className={styles.outerBounds}>
            {tweetData !== null ? (
                <Container>
                    <Row>
                        <Col xs>
                            {ownerData.ufn} {ownerData.uln}
                        </Col>
                        <Col xs>
                            {ownerData.u_handle}
                        </Col>
                    </Row>
                    <Row>

                    {
                        tweetData.response_tweet_TID !== null ? 
                        
                        (
                        <Col>
                            <p className={styles.username}> replying to {tweetData.u_handle} </p>
                        </Col>
                        )
                        :
                        (<></>)
                     }
                    </Row>
                    <Row>
                        <Col>
                            <p className={styles.tweettext}> {tweetData.text} </p>
                        </Col>
                    </Row>
                </Container>
            ) : (<></>)  
            }

        </div>
    );
}

export default Tweet;