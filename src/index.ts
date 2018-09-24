import * as CryptoJS from "crypto-js";

class Block {
    static calcHash = (
        index: number,
        preHash: string,
        timestmp: number,
        data: string
    ): string =>
        CryptoJS.SHA256(index + preHash + timestmp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.preHash === "string" &&
        typeof aBlock.timestmp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public preHash: string;
    public data: string;
    public timestmp: number;

    constructor(
        index: number,
        hash: string,
        preHash: string,
        data: string,
        timestmp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.preHash = preHash;
        this.data = data;
        this.timestmp = timestmp;
    }
}

const genesisBlock: Block = new Block(0, "202022020", "", 'Hello', 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLateset = (): Block => blockChain[blockChain.length - 1];

const getTimeStmp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const preBlock: Block = getLateset();
    const newIndex: number = preBlock.index + 1;
    const newTimeStmp: number = getTimeStmp();
    const newHash: string = Block.calcHash(
        newIndex,
        preBlock.hash,
        newTimeStmp,
        data
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        preBlock.hash,
        data,
        newTimeStmp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHash = (aBlock: Block): string =>
    Block.calcHash(aBlock.index, aBlock.preHash, aBlock.timestmp, aBlock.data);

const isBlockValid = (candidateBlcok: Block, preBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlcok)) {
        return false;
    } else if (preBlock.index+1 !== candidateBlcok.index) {
        return false;
    } else if (preBlock.hash !== candidateBlcok.preHash) {
        return false;
    } else if (getHash(candidateBlcok) !== candidateBlcok.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLateset())) {
        blockChain.push(candidateBlock);
    }
};

createNewBlock("second-block");
createNewBlock("third-block");
createNewBlock("fourth-block");

console.log(blockChain);

export { };
