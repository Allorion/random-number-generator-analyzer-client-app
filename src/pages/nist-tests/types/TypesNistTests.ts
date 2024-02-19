export type INameTests =
    'frequencyTest' |
    "blockFrequency" |
    "cumulativeSums" |
    'runTest' |
    'longestRunOfOnes' |
    'rankTest' |
    'discreteFourierTransform' |
    'nonOverlappingTemplateMatchings' |
    'overlappingTemplateMatchings' |
    'universal' |
    'approximateEntropy' |
    'randomExcursions' |
    'randomExcursionsVariant' |
    'serialTest' |
    'linearComplexity' |
    'universalStatisticalTest' |
    'cumulativeSumsForwardTest' |
    'cumulativeSumsBackwardTest' |
    'randomExcursionTest' |
    'randomExcursionVariantTest'


export type TNameDopParam = 
    'bftParam'|
    'nottParam'|
    'ottParam'|
    'aetParam'|
    'stParam'|
    'lctParam'


interface IDopParams {
    bftParam: number | undefined,
    nottParam: number | undefined,
    ottParam: number | undefined,
    aetParam: number | undefined,
    stParam: number | undefined,
    lctParam: number | undefined
}

export interface IGeneratorAnalysisFilterData {
    nameFile: string,
    listTests: INameTests[],
    alpha: number,
    dopParams: IDopParams,
    bitstreams: number,
    numberOfBits: number,
    uid: string
}

export interface ICombinePValue {
    frequencyTest?: number,
    blockFrequency?: number,
    cumulativeSums?: { forward: number, backwards: number },
    runTest?: number,
    longestRunOfOnes?: number,
    rankTest?: number,
}

interface IResFrequency {
    "a": number,
    "b": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IResBlockFrequency {
    "a": number,
    "b": number,
    "c": number,
    "d": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IResCumulativeSums {
    'forward': {
        "a": number,
        "pValue": number,
        "result": "FAILURE" | "SUCCESS",
        "warningRange": boolean
    },
    'backwards': {
        "a": number,
        "pValue": number,
        "result": "FAILURE" | "SUCCESS",
        "warningRange": boolean
    }
}

interface IResRunsTest {
    "a": number,
    "b": number | undefined,
    "c": number | undefined,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS" | undefined,
}

interface IAssignment {
    [key: string]: number
}

interface IResLongestRunOfOnes {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    'assignment': IAssignment | undefined,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IResRankTest {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    "d": number | undefined,
    "e": number | undefined,
    "f": number | undefined,
    "g": number | undefined,
    "h": number | undefined,
    "i": number | undefined,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IResCumulativeSumsForward {
    "a": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
    "warningRange": boolean
}

interface IResCumulativeSumsBackwards {
    "a": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
    "warningRange": boolean
}

export interface IDataAnalysisNistTests {
    nameFile: string,
    listTests: INameTests[],
    alpha: number,
    dopParams: IDopParams,
    bitstreams: number,
    numberOfBits: number,
    frequencyTest?: Array<IResFrequency | string>,
    blockFrequency?: Array<IResBlockFrequency | string>,
    cumulativeSums?: {
        forward: Array<IResCumulativeSumsForward | string>,
        backwards: Array<IResCumulativeSumsBackwards | string>,
    },
    runTest?: Array<IResRunsTest | string>,
    longestRunOfOnes?: Array<IResLongestRunOfOnes | string>,
    rankTest?: Array<IResRankTest | string>,
    combinePValue: ICombinePValue,
    uid: string
}
