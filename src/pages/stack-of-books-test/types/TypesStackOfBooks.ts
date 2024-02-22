export interface IStackOfBooksGenAnalysis {
    nameFile: string,
    alpha: number,
    blockSize: number,
    bitstreams: number,
    numberOfBits: number,
    uid: string
}

export  interface IResultBookStackTest {
    frequencies: number[],
    chi: string,
    df: number,
    alpha: number,
    passed: boolean,
    pValue: number,
    resultPValue: 'FAILURE' | 'SUCCESS'
}

export interface IRespDataStackOfBooks {
    result: IResultBookStackTest[],
    nameFile: string,
    blockSize: number,
    bitstreams: number,
    numberOfBits: number,
    quantityCompletedTests: number,
    alpha: number,
    uid: string
}