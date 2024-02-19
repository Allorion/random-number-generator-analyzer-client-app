import React, {FC} from "react";

export interface IFGrid {
    children?: React.ReactChild | React.ReactNode,
    className?: string,
    st?: React.CSSProperties,
    id?: string
    obj?: 'container' | 'item'
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number,
    colAuto?: 'col-sm-auto' | 'col-md-auto' | 'col-lg-auto' | 'col-xl-auto' | 'col-xxl-auto'
}

const ALGrid: FC<IFGrid> = ({
                               children,
                               className,
                               st,
                               id,
                               obj,
                               xs,
                               sm,
                               md,
                               lg,
                               xl,
                               xxl,
                               colAuto
                           }) => {

    let style: React.CSSProperties = {
        paddingBottom: '16px'
    }

    if (st !== undefined) {
        style = Object.assign(style, st);
    }


    return (
        <React.Fragment>
            {obj === 'container' &&
                <div
                    className={`container`}
                >
                    <div
                        className={`row ${className !== undefined ? className : ''}`}
                        style={st}
                        id={id}
                    >
                        {children}
                    </div>
                </div>
            }
            {obj === 'item' &&
                <div
                    className={`${className !== undefined ? className : ''} ${xs !== undefined ? `col-${xs}` : ''} ${sm !== undefined ? `col-sm-${sm}` : ''} ${md !== undefined ? `col-md-${md}` : ''} ${lg !== undefined ? `col-lg-${lg}` : ''} ${xl !== undefined ? `col-lg-${lg}` : ''} ${xxl !== undefined ? `col-xxl-${xxl}` : ''} ${colAuto !== undefined ? colAuto : ''}`}
                    style={style}
                    id={id}
                >
                    {children}
                </div>
            }
            {obj === undefined &&
                <div>
                    {children}
                </div>
            }
        </React.Fragment>
    )
}

export default ALGrid