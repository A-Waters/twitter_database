import style from './style.module.css'
import ProfileBox from '../../componentes/profileBox/profileBox'
import HomeCenter from '../../componentes/homeCenter/homeCenter'
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient'
import { useState } from 'react';
import NewPost from '../../componentes/newPost/newPost'

function Home() {
    const [profileUser, setProfileUser] = useState(DBclient.currentUser);

    function changeProfileView(new_Profile){
        setProfileUser(new_Profile)
    }


    return (
        <div className={style.background}>
            <div className = {style.contain}>
                <Container fluid>
                    <Row>
                        <Col>
                            <NewPost></NewPost>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <ProfileBox profileData={profileUser} onChange={changeProfileView}></ProfileBox>
                        </Col>
                        <Col xs={8}>
                            <HomeCenter profileData={profileUser} onChange={changeProfileView}></HomeCenter>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;