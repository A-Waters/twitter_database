import {useEffect, useState } from 'react';
import styles from './style.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient';
import { useHistory } from "react-router-dom";



function ProfileBox() {
    const [userData, setUserData] = useState(null)
    let history = useHistory();

    useEffect( () => {
        if (DBclient.currentUser === null){
            history.push('/')
        }
        else{
            console.log(DBclient.currentUser)
            DBclient.getUserbyID(DBclient.currentUser).then((res) => {
                setUserData(res.data[0])
                console.log(res)
            })
        }
    }, []);

    return (
        <div className={styles.outside_container}>
            { userData != null ? (
                <Container>
                    <div className={styles.inside_container}>
                        <Row>
                            <Col><h1>{userData.u_handle}</h1></Col>
                        </Row>
                        <Row>
                            <Col><h3>{userData.ufn} {userData.uln}</h3> </Col>
                        </Row>
                    </div>
                </Container>
            ) : (<></>)
            }
        </div>

            
            
    );
}

export default ProfileBox;