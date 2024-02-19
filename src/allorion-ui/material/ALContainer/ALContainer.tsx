import React, {FC} from "react";
import "./ALContainer.css"

export interface IFContainer {
    maxWidth?: 'container-xs' | 'container-sm' | 'container-md' | 'container-lg' | 'container-xl' | 'container-xxl' | 'container-fluid'
    children?: React.ReactChild | React.ReactNode,
    className?: string,
    st?: React.CSSProperties,
    id?: string
}

const ALContainer: FC<IFContainer> = ({
                                         children,
                                         className,
                                         st,
                                         id,
                                         maxWidth = 'container-xs'
                                     }) => {

    return (
        <React.Fragment>
            <div
                className={`${className !== undefined ? className : ''} ${maxWidth} f-container`}
                style={st}
                id={id}
            >
                {children}
            </div>
        </React.Fragment>
    )
}

export default ALContainer