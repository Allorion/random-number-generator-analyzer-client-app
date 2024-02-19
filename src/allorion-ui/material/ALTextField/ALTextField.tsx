import React, {FC} from "react";
import {generateUniqueId} from "../../dop-function/generateUniqueId";
import "./ALTextField.css"
import {ALStack} from "../index";

interface IFTextField {
    label?: string,
    st?: React.CSSProperties,
    value?: string | number | readonly string[] | undefined | null,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    type?: 'text' | 'number' | 'email' | 'tel' | 'password',
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined,
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined,
    fullWidth?: boolean,
    disabled?: boolean,
    readOnly?: boolean | undefined,
    defaultValue?: string | number | readonly string[] | undefined,
    errText?: string[],
    helpText?: string,
    onInput?: React.FormEventHandler<HTMLInputElement> | undefined,
    id?: string,
    className?: string,
    load?: boolean,
    required?: boolean,
    min?: number,
    max?: number,
    placeholder?: string | undefined,
    width?: string | number | undefined
}

const ALTextField: FC<IFTextField> = (
    {
        label,
        value,
        onChange,
        type = 'text',
        onBlur,
        onFocus,
        fullWidth,
        disabled,
        readOnly,
        defaultValue,
        errText,
        helpText,
        onInput,
        st,
        id,
        className,
        load = false,
        min,
        max,
        placeholder=' ',
        required = true,
        width
    }
) => {

    if (value === null) {
        value = ''
    }

    if (type === 'number' && (value === undefined)) {
        value = ''
    }

    const idTextField = generateUniqueId()

    const handlerWidth = (): string | number => {

        if (fullWidth) {
            return '100%'
        } else if (width !== undefined) {
            return width
        } else {
            return '200px'
        }
    }

    return (
        <React.Fragment>
            <div className={`al-text-field-block ${className !== undefined ? className : ''}`} id={id} style={st}>
                <div className={'al-text-field-block-label'}>
                    <input
                        id={`al-text-field-input-${idTextField}`}
                        className={'al-text-field-input'}
                        placeholder={placeholder}
                        style={{
                            borderColor: errText !== undefined && errText.length > 0 ? 'red' : '#C4C4C4',
                            width: handlerWidth()
                        }}
                        min={min}
                        max={max}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        required={required}
                        onInput={onInput}
                        readOnly={readOnly || load}
                        value={value}
                        onChange={onChange}
                        type={type}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    />
                    <label className={'al-text-field-label'} form={`al-text-field-input-${idTextField}`}>{label}</label>
                </div>
                {helpText !== undefined &&
                    <span
                        style={{
                            color: '#a6a3a3',
                            fontSize: '12px'
                        }}
                    >
                                    {helpText}
                                </span>
                }
                {errText !== undefined && errText.length > 0 &&
                    <ALStack direction={'column'}>
                        {
                            errText?.map((opt, index) => {
                                return (
                                    <span
                                        key={index}
                                        style={{
                                            whiteSpace: 'initial',
                                            color: 'red'
                                        }}
                                    >
                                            {opt}
                                        </span>
                                )
                            })
                        }
                    </ALStack>
                }
            </div>
        </React.Fragment>
    )
};

export default ALTextField;