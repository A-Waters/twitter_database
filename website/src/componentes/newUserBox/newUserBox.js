import {useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import DBclient from '../../DBclient';

function NewUserBox() {

    const [DBerror, setError] = useState("null")
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const onSubmit = (data) => {
        DBclient.createNewUser(data).then( res => {
            console.log(res)
            if (res.status === 200){
                console.log("success")
                window.location.replace("http://localhost:3000/");
            }
            else
            {
                console.log("Account not made")
                setError("Uh oh something went fucky wucky")
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
                    <Col className = {styles.ceneterText}><h1>Sign Up</h1></Col>
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

                <Row>
                    <Col className = {styles.ceneterText}><label htmlFor="firstname">Firstname</label></Col>
                </Row>

                <Row>
                    <Col className = {styles.ceneterText}>
                        <input {...register('firstname', { required: true })} />
                        {errors.firstname && <p>Firstname is required.</p>}
                    </Col>
                </Row>

                <Row>
                    <Col className = {styles.ceneterText}><label htmlFor="lastname">Lastname</label></Col>
                </Row>

                <Row>
                    <Col className = {styles.ceneterText}>
                        <input {...register('lastname', { required: true })} />
                        {errors.lastname && <p>lastname is required.</p>}
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
            </Container>
                
                
                
                
                
                
                
                
                
            </form>
        </div>
    );
}

export default NewUserBox;