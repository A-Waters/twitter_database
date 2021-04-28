import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient';
import {BrowserRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";

function LoginBox() {
     
    const [DBerror, setError] = useState("null")
    const { register, handleSubmit, formState: { errors }, } = useForm();
    let history = useHistory();
    
    const onSubmit = (data) => {
        DBclient.login(data).then( res => {
            console.log(res)
            if (res.data.length > 0){
                console.log("success")
                DBclient.currentUser = res.data[0].UID
                history.push('/home/')
            }
            else
            {
                console.log("No account found")
                setError("Invalid Username Or Password")
            }

        })
        .catch( err => {
            console.error(err)
        })
            
        
    };

    return (
        <div className={styles.centerScreenBox}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                { (DBerror !== "null" ? 
                    (<Row>
                        <Col className = {styles.error_msg}>{DBerror}</Col>
                    </Row>) : (<></>))

                }
                <Row>
                    <Col className = {styles.ceneterText}><h1>Not Twitter</h1></Col>
                </Row>
                <Row>
                    <Col className = {styles.ceneterText}><label htmlFor="username">Username</label></Col>
                </Row>
                <Row>
                    <Col className = {styles.ceneterText}>
                        <input {...register('username', { required: true })} />
                        {errors.username && <p>Username is required.</p>}
                    </Col>
                </Row>
                <Row >
                    <Col className = {styles.ceneterText}><label htmlFor="password">Password</label></Col>
                </Row>
                <Row>
                    <Col className = {styles.ceneterText}>
                        <input type="password" {...register('password', { required: true })} />
                        {errors.password && <p>Password is required.</p>}
                    </Col>
                </Row>
                <Row>
                    <Col className = {styles.ceneterText}><input type="submit" /></Col>
                </Row>
                <Row>
                    <Col className = {styles.ceneterText}>
                        <BrowserRouter>
                            <a href="/new_user">New User?</a>
                        </BrowserRouter>
                    </Col>
                </Row>
            </Container>
                
                
                
                
                
                
                
                
                
            </form>
        </div>
    );
}

export default LoginBox;