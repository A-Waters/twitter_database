import style from './style.module.css'
import ProfileBox from '../../componentes/profileBox/profileBox'
import HomeCenter from '../../componentes/homeCenter/homeCenter'

function Home() {
    return (
        <div className={style.background}>
            <HomeCenter/>
        </div>
    );
}

export default Home;