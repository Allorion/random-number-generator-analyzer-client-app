import React, {FC} from "react";
import "./static/home.css"

interface IProps {

}

// “Randomness Statistics” (Статистика Случайности)

const Home: FC<IProps> = ({}) => {



    return (
        <React.Fragment>
            <div className="home-container">
                <div className="header">
                    <h1 className={'color-title-home '}>RandStat</h1>
                    <p className={'color-text-home'}>Анализатор Статистической Независимости Генераторов Случайных Чисел</p>
                </div>
                <div className="main-content">
                    <h2 className={'color-title-home'}>Добро пожаловать в мир случайности!</h2>
                    <p className={'color-text-home'}>Программа RandStat поможет вам исследовать статистическую независимость генерируемых чисел.</p>
                    <p className={'color-text-home'}>Мы поможем определить, насколько значения, генерируемые различными генераторами случайных чисел, являются статистически независимыми.</p>
                    <p className={'color-text-home'}>Начните анализировать свои последовательности прямо сейчас</p>
                </div>
                <div className="footer">
                    <p className={'color-text-home'}>© 2024 RandStat by ALLORION. Все права защищены.</p>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Home;