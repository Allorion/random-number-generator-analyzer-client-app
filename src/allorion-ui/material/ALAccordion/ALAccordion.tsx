import React, {CSSProperties, FC} from "react";
import "./ALAccordion.css"
import {generateUniqueId} from "../../dop-function/generateUniqueId";

interface IProps {
    children?: React.ReactChild | React.ReactNode,
    st?: CSSProperties,
    fullWidth?: boolean,
    defaultOpen?: boolean,
    id?: string,
    title: string
}

const AlAccordion: FC<IProps> = (
    {
        children,
        st,
        fullWidth,
        defaultOpen,
        id,
        title
    }
) => {

    const style: CSSProperties = st !== undefined ? st : {}

    if (fullWidth) {
        style.width = '100%'
    }

    const uid = generateUniqueId()

    const handlerVisibleContent = () => {

        let flag = false

        const el = window.document.querySelector(`#al-accordion-block-content-${uid}`)

        if (el !== null) {

            el.classList.forEach(opt => {
                if (opt === 'al-accordion-block-content-active') flag = true
            })

            if (flag) {
                el.classList.remove('al-accordion-block-content-active')
            } else {
                const listActiveEl = window.document.querySelectorAll('.al-accordion-block-content-active')

                listActiveEl.forEach((opt, index) => {
                    opt.classList.remove('al-accordion-block-content-active')
                })

                el.classList.add('al-accordion-block-content-active')
            }
        }


    }

    return (
        <React.Fragment>
            <div className={'al-accordion'} style={style} id={id}>
                <div className={'al-accordion-input'} onClick={handlerVisibleContent}>
                    <div className={'al-accordion-label-block'}>
                        {title}
                    </div>
                    <div className={'al-accordion-right-block'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-down-fill"
                             viewBox="0 0 16 16">
                            <path
                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                </div>
                <div id={`al-accordion-block-content-${uid}`}
                     className={`al-accordion-block-content ${defaultOpen ? 'al-accordion-block-content-active' : ''}`}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
};

export default AlAccordion;