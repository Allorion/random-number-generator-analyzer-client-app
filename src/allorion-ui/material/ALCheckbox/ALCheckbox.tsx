import React, {FC, useState} from "react";
import "./ALCheckbox.css"

interface IAlCheckbox {
    label?: React.ReactChild | React.ReactNode,
    onClick: (opt: boolean) => void,
    defaultChecked?: boolean | undefined
    className?: string
    id?: string
    st?: React.CSSProperties | undefined,
    checked?: boolean | undefined,
    disabled?: boolean
}

const AlCheckbox: FC<IAlCheckbox> = (
    {
        label,
        onClick,
        defaultChecked,
        className,
        id,
        st,
        checked,
        disabled
    }
) => {

    const [valueCheck, setValueCheck] = useState<boolean>(checked !== undefined ? checked : false)

    return (
        <React.Fragment>
            <div className={`al-checkbox-block ${className !== undefined ? className : ''}`} id={id} style={st}>
                <input
                    defaultChecked={defaultChecked}
                    type={'checkbox'}
                    checked={valueCheck}
                    disabled={disabled}
                />
                <div
                    className="al-checkbox-slider"
                    onClick={() => {
                        onClick(!valueCheck)
                        setValueCheck(state => !state)
                    }}
                >
                    <div className="al-checkbox-knob"/>
                </div>
                {label !== undefined &&
                    <span className="al-checkbox-title">{label}</span>
                }
            </div>
        </React.Fragment>
    )
};

export default AlCheckbox;