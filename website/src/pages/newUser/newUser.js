import NewUserBox from '../../componentes/newUserBox/newUserBox'
import style from './style.module.css'

function NewUser() {
    return (
        <div className={style.background}>
            <NewUserBox/>
        </div>
    );
}

export default NewUser;