"use strict";
// typescript
// 예측 가능한 함수 리턴 타입
// 예측 가능한 함수 인자 타입
// static과 같은 것을 할 수 있고
Object.defineProperty(exports, "__esModule", { value: true });
// 블록체인의 기반: 블록들이 자신의 전(previous) 블록으로의 링크가 있다는 것.
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => {
    return typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";
};
const genesisBlock = new Block(0, "20237489", "", "Hello", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1]; // 블록 체인 안에서 가장 최근의 블록
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) { // 구조 검증
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) { // 이전 블록의 인덱스 + 1 이 현재 블록 인덱스와 같은기
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) { // 이전 블록의 해쉬가 현재 블록이 가지고 있는 이전 블록의 해쉬 정보와 같은가
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) { // 우리가 해쉬를 계산 했는데 다른 해쉬를 갖고 있는가
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock); // 배열과 같은걸로 block이 아닌것을 push하지 않게 막을 수 있음.
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map