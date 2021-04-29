import { useForm } from 'react-hook-form';
import {Container, Row, Col} from 'react-bootstrap';
import styles from './style.module.css'
import DBclient from './../../DBclient'

function NewPost() {
     
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        DBclient.getAllTweets().then((res)=>{
            let TID = res.data.length + 1

            DBclient.CreatePost(TID,DBclient.currentUser.UID, data.post).then((res) =>{
                console.log(res)
            })
        })
    }

    return (
        <div className={styles.outerBox}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Row>
                        <Col>
                            <label htmlFor="post">Create A New Post</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input {...register('post', { required: true })} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="submit" />
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default NewPost;