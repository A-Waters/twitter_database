import {useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient';
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from '../tweet/tweet'

function HomeCenter() {
    const [userData, setUserData] = useState(null)
    const [timelineData, setTimelineData] = useState([])
    let history = useHistory();

    useEffect( () => {
        if (DBclient.currentUser === null){
            history.push('/')
        }
        else{
            DBclient.currentUser = 2
            DBclient.getUserbyID(DBclient.currentUser).then((res) => {
                setUserData(res.data[0])
                DBclient.getUserTimeline(res.data[0].UID).then( (res) => {
                    setTimelineData(res.data)
                })
            })
        }
    }, []);

    return (
        <div className={styles.outside_container}>
            { userData != null ? (
                <Container>
                    <InfiniteScroll className={styles.scroller}
                        dataLength={timelineData.length}
                        next={() => {}}
                        hasMore={false}
                        loader={<h4>Loading...</h4>}
                        >
                        {timelineData.map((i, index) => (
                            <Row key={index}>
                                <Col>
                                    <Tweet uData={userData} TLData={timelineData[index]}/>
                                </Col>
                            </Row>
                        ))}
                    </InfiniteScroll>
                </Container>
            ) : (<></>)
            }
        </div>

            
            
    );
}

export default HomeCenter;