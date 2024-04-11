import React, {FC, useState} from "react";
import "./static/css/GeneratorBinaryFiles.css"
import {ALStack} from "../../allorion-ui";

interface IProps {

}

interface IReqData {
    "status": number,
    "text": string,
    "method": string
}

type tpMethod = 'mtg' | 'mathRandGen' | 'cryptoSequence' | 'linearCongruentialGenerator' | '#null'

const GeneratorBinaryFiles: FC<IProps> = ({}) => {

    const [mtgLength, setMtgLength] = useState<number | undefined>(undefined)
    const [method, setMethod] = useState<tpMethod>('#null')
    const [frequency, setFrequency] = useState<number | undefined>(undefined)
    const [modulus, setModulus] = useState<number | undefined>(undefined)
    const [multiplier, setMultiplier] = useState<number | undefined>(undefined)
    const [increment, setIncrement] = useState<number | undefined>(undefined)
    const [seed, setSeed] = useState<number | undefined>(undefined)
    const [generation, setGeneration] = useState<{
        data: {
            "status": number,
            "text": string,
            "method": string
        } | undefined,
        flag: boolean
    }>({data: undefined, flag: false})

    const generateFile = () => {

        if (mtgLength === undefined) {
            alert('Введите длину последовательности')
            return
        }
        if (method === '#null') {
            alert('Не выбран метод')
            return
        }
        if (method === 'mathRandGen' && frequency === undefined) {
            alert('Не выбрана частота повторения символов')
            return
        }

        const fetchGenerationBinaryFile = async () => {

            setGeneration({data: undefined, flag: true,})

            let urlMethod = ''

            switch (method) {
                case 'mtg':
                    urlMethod = 'mersenne-twister-generate'
                    break
                case 'mathRandGen':
                    urlMethod = 'math-random-generate'
                    break
                case 'cryptoSequence':
                    urlMethod = 'crypto-random-generate'
                    break
                case 'linearCongruentialGenerator':
                    urlMethod = 'linear-congruential-generator'
                    break
            }

            const obj: {
                length: number;
                frequency: number | undefined;
                modulus: number | undefined;
                multiplier: number | undefined;
                increment: number | undefined;
                seed: number | undefined;
            } = {
                length: mtgLength,
                frequency,
                modulus,
                multiplier,
                increment,
                seed
            }

            return await fetch(`http://localhost:3001/api/binary-sequence-generation/${urlMethod}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json; charset=utf-8'
                },
                body: JSON.stringify(obj)
            })
        }


        fetchGenerationBinaryFile()
            .then(async (resp) => {
                if (resp.status !== 500) {
                    alert('Выполнено')
                } else {
                    const respJson = await resp.json()
                    alert(respJson?.text)
                }
            })
            .finally(() => {
                setGeneration({...generation, flag: false})
            })
            .catch(() => {
                alert('Ошибка выполнения')
                setGeneration({data: undefined, flag: false})
            })
    }

    return (
        <React.Fragment>
            <div className={'section-generator-bin-files'}>
                <div className={'paper'} style={{width: 600}}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8
                    }}>
                        <select
                            onChange={(e) => {
                                //@ts-ignore
                                const data: tpMethod = e.target.value
                                setMethod(data)
                            }}
                        >
                            <option value={'#null'}>-</option>
                            <option value={'mtg'}>Генерация файла методом Mersenne Twister 19937</option>
                            <option value={'mathRandGen'}>Генерация файла c заданной вероятностью</option>
                            <option value={'cryptoSequence'}>Генерация файла методом Сrypto</option>
                            <option value={'linearCongruentialGenerator'}>Линейный конгруэнтный ГПСЧ (LCPRNG)</option>
                        </select>
                        <h3></h3>
                        <input
                            disabled={method === "#null"}
                            placeholder={'Укажите длину последовательности длиной не более 10 миллиардов и кратное 10'}
                            type={"number"}
                            onBlur={(e) => {
                                if (e.target.value !== '') {
                                    const num = +e.target.value
                                    if (num <= 10000000000) {
                                        if (num % 100000 === 0) {
                                            setMtgLength(num)
                                        } else {
                                            setMtgLength(100000)
                                            alert("Число должно быть кратно 100 тысячам")
                                        }
                                    }
                                } else {
                                    setMtgLength(undefined)
                                }
                            }}
                        />
                        {method === 'mathRandGen' &&
                            <input
                                placeholder={'Укажите частоту повторения символов от 0.1 до 1'}
                                type={"number"}
                                onBlur={(e) => {
                                    if (e.target.value !== '') {
                                        const num = +e.target.value
                                        if (num >= 0.1 && num <= 1) {
                                            setFrequency(num)
                                        } else {
                                            setFrequency(0.5)
                                        }
                                    } else {
                                        setFrequency(undefined)
                                    }
                                }}
                            />
                        }
                        {
                            method === 'linearCongruentialGenerator' &&
                            <ALStack direction={'row'} spacing={2}>
                                <input
                                    placeholder={'Укажите модуль'}
                                    type={"number"}
                                    onBlur={(e) => {
                                        if (e.target.value !== '') {
                                            const num = +e.target.value
                                            if (num >= 1) {
                                                setModulus(num)
                                            } else {
                                                setModulus(1)
                                            }
                                        } else {
                                            setModulus(undefined)
                                        }
                                    }}
                                />
                                <input
                                    placeholder={'Укажите множитель'}
                                    type={"number"}
                                    onBlur={(e) => {
                                        if (e.target.value !== '') {
                                            const num = +e.target.value
                                            if (num >= 1) {
                                                setMultiplier(num)
                                            } else {
                                                setMultiplier(1)
                                            }
                                        } else {
                                            setMultiplier(undefined)
                                        }
                                    }}
                                />
                                <input
                                    placeholder={'Укажите приращение'}
                                    type={"number"}
                                    onBlur={(e) => {
                                        if (e.target.value !== '') {
                                            const num = +e.target.value
                                            if (num >= 1) {
                                                setIncrement(num)
                                            } else {
                                                setIncrement(1)
                                            }
                                        } else {
                                            setIncrement(undefined)
                                        }
                                    }}
                                />
                                <input
                                    placeholder={'Укажите начальное значение (семя)'}
                                    type={"number"}
                                    onBlur={(e) => {
                                        if (e.target.value !== '') {
                                            const num = +e.target.value
                                            console.log(num)
                                            if (num >= 1) {
                                                setSeed(num)
                                            } else {
                                                setSeed(1)
                                            }
                                        } else {
                                            setSeed(undefined)
                                        }
                                    }}
                                />
                            </ALStack>
                        }
                        <button
                            onClick={generateFile}
                        >
                            Сгенерировать
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default GeneratorBinaryFiles;