import LoginBox from '../../componentes/loginbox/loginbox'
import style from './style.module.css'

function Login() {
    return (
        <div className={style.background}>
            <LoginBox/>
        </div>
    );
}

export default Login;