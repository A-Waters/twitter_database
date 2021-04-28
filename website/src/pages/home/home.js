import style from './style.module.css'
import ProfileBox from '../../componentes/profileBox/profileBox'
import HomeCenter from '../../componentes/homeCenter/homeCenter'
import {Container, Row, Col} from 'react-bootstrap';

function Home() {
    return (
        <div className={style.background}>
            <div className = {style.contain}>
                <Container fluid>
                    <Row>
                        <Col xs={3}>
                            <ProfileBox/>
                        </Col>
                        <Col xs={9}>
                            <HomeCenter/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;