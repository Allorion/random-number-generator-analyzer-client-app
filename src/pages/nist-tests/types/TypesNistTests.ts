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
    'linearComplexity'


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

    overlappingTemplateMatchings?: number,
    universal?: number,
    approximateEntropy?: number,
    serialTest?: [number, number],
    linearComplexity?: number,
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

interface IOverlappingTemplateMatchings {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    "d": number | undefined,
    "e": number | undefined,
    "f": number | undefined,
    "0": number | undefined,
    "1": number | undefined,
    "2": number | undefined,
    "3": number | undefined,
    "4": number | undefined,
    "5": number | undefined,
    "Chi^2": number | undefined,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IUniversal {
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
    error: string | null
}

interface IApproximateEntropy {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    "d": number | undefined,
    "e": number | undefined,
    "f": number | undefined,
    "g": number | undefined,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
}

interface IListResultRandomExcursions {
    "x": number,
    "chi^2": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
    warning: string | undefined,
}

interface IRandomExcursions {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    'listResult': IListResultRandomExcursions[],
}

interface IListResultRandomExcursionsVariant {
    "x": number,
    "visits": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
    warning: string | undefined,
}

interface IRandomExcursionsVariant {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    'listResult': IListResultRandomExcursionsVariant[],
}

interface ISerialTest {
    "warning": string | undefined,
    "a": number | undefined,
    "b": number | undefined,
    "c": number | undefined,
    "d": number | undefined,
    "e": number | undefined,
    "f": number | undefined,
    "g": number | undefined,
    "pValue": [number, number],
    "result": ["FAILURE" | "SUCCESS", "FAILURE" | "SUCCESS"],
}

interface ILinearComplexity {
    "M": number,
    "N": number,
    "C0": number,
    "C1": number,
    "C2": number,
    "C3": number,
    "C4": number,
    "C5": number,
    "C6": number,
    "CHI2": number,
    "bits": number,
    "pValue": number,
    "result": "FAILURE" | "SUCCESS",
    "warning": string | undefined,
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

    overlappingTemplateMatchings?: Array<IOverlappingTemplateMatchings | string>,
    universal?: Array<IUniversal | string>,
    approximateEntropy?: Array<IApproximateEntropy | string>,
    randomExcursions?: Array<IRandomExcursions | string>,
    randomExcursionsVariant?: Array<IRandomExcursionsVariant | string>,
    serialTest?: Array<ISerialTest | string>,
    linearComplexity?: Array<ILinearComplexity | string>,
    combinePValue: ICombinePValue,
    uid: string,
}
