import {useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DBclient from '../../DBclient';
import { useHistory } from "react-router-dom";



function ProfileBox(props) {
    const profileData = props.profileData
    const [followers, setfollowers] = useState(null)
    const [following, setfollowing] = useState(null)
    const [isFollowing, setIsFollowing] = useState(true)
    let history = useHistory();

    useEffect( () => {
        if (DBclient.currentUser === null){
            history.push('/')
        }
        else{
            DBclient.getFollowing(props.profileData.UID).then((res)=>{
                setfollowers(res.data.length)
            })
            DBclient.getFollowers(props.profileData.UID).then((res)=>{
                setfollowing(res.data.length)
            })


            DBclient.getFollowers(DBclient.currentUser.UID).then((res)=>{
                let found = false
                res.data.map((person)=>{
                    if (person.UID == profileData.UID){
                        found = true
                    }
                })

                console.log(res.data)
                console.log(profileData)
                console.log(found)
                setIsFollowing(found)
            })
        }
    }, [profileData, isFollowing]);


    function FollowEvent(){
        DBclient.FollowEvent(DBclient.currentUser.UID, profileData.UID)
    }

    return (
        <div className={styles.outside_container}>
            { profileData != null ? (
                <Container>
                    <div className={styles.inside_container}>
                        <Row>
                            <Col><h1>{profileData.u_handle}</h1></Col>
                        </Row>
                        <Row>
                            <Col><h3>{profileData.ufn} {profileData.uln}</h3> </Col>
                        </Row>
                        <Row>
                            <Col><p>followers: </p> <p>{followers} </p> </Col>
                            <Col><p>following: </p> <p>{following}</p> </Col>
                        </Row>

                        <Row>
                            <Col>
                                {isFollowing ? (<Button > Already Following </Button>) : (<Button onClick={() => FollowEvent()}> Follow this person </Button>)}
                            </Col>
                        </Row>
                    </div>
                </Container>
            ) : (<></>)
            }
        </div>

            
            
    );
}

export default ProfileBox;