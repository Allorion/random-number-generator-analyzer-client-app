import React, {FC} from "react";
import "./ALStack.css"

export interface IFStack {
    direction?: 'row' | "row-reverse" | 'column' | "column-reverse",
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline",
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly",
    spacing?: number,
    children?: React.ReactChild | React.ReactNode,
    className?: string,
    st?: React.CSSProperties,
    id?: string
}

const ALStack: FC<IFStack> = ({
                                 children,
                                 alignItems,
                                 justifyContent,
                                 direction = 'column',
                                 spacing = 0,
                                 className,
                                 st,
                                 id
                             }) => {

    let style: React.CSSProperties = {
        gap: `${+spacing * 8}px`,
        display: 'flex',
        flexDirection: direction,
        // @ts-ignore
        WebkitBoxPack: justifyContent,
        justifyContent: justifyContent,
        // @ts-ignore
        WebkitBoxAlign: alignItems,
        alignItems: alignItems,
    }

    if (st !== undefined) {
        style = Object.assign(style, st);
    }

    return (
        <React.Fragment>
            <div
                className={className}
                style={style}
                id={id}
            >
                {children}
            </div>
        </React.Fragment>
    )
}

export default ALStack