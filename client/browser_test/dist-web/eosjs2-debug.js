var eosjs2 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs2-api.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eosjs2-api.ts":
/*!***************************!*\
  !*** ./src/eosjs2-api.ts ***!
  \***************************/
/*! exports provided: serialize, Api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Api", function() { return Api; });
/* harmony import */ var _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eosjs2-serialize */ "./src/eosjs2-serialize.ts");
// copyright defined in eosjs2/LICENSE.txt

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

const transactionAbi = __webpack_require__(/*! ../src/transaction.abi.json */ "./src/transaction.abi.json");
const serialize = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__;
class Api {
    constructor(args) {
        this.contracts = new Map();
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.transactionTypes = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getTypesFromAbi"](_eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["createInitialTypes"](), transactionAbi);
    }
    async getContract(accountName, reload = false) {
        if (!reload && this.contracts.get(accountName))
            return this.contracts.get(accountName);
        let abi;
        try {
            abi = (await this.rpc.get_abi(accountName)).abi;
        }
        catch (e) {
            e.message = 'fetching abi for ' + accountName + ': ' + e.message;
            throw e;
        }
        if (!abi)
            throw new Error("Missing abi for " + accountName);
        let types = _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getTypesFromAbi"](_eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["createInitialTypes"](), abi);
        let actions = new Map();
        for (let { name, type } of abi.actions)
            actions.set(name, _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["getType"](types, type));
        let result = { types, actions };
        this.contracts.set(accountName, result);
        return result;
    }
    serialize(buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    }
    deserialize(buffer, type, value) {
        return this.transactionTypes.get(type).deserialize(buffer);
    }
    serializeTransaction(transaction) {
        let buffer = new _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["SerialBuffer"];
        this.serialize(buffer, 'transaction', Object.assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    }
    async serializeActions(actions) {
        return await Promise.all(actions.map(async ({ account, name, authorization, data }) => {
            return _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["serializeAction"](await this.getContract(account), account, name, authorization, data);
        }));
    }
    async pushTransaction(_a) {
        var { blocksBehind, expireSeconds, actions } = _a, transaction = __rest(_a, ["blocksBehind", "expireSeconds", "actions"]);
        let info;
        if (!this.chainId) {
            info = await this.rpc.get_info();
            this.chainId = info.chain_id;
        }
        if (blocksBehind !== undefined && expireSeconds !== undefined) {
            if (!info)
                info = await this.rpc.get_info();
            let refBlock = await this.rpc.get_block(info.head_block_num - blocksBehind);
            transaction = Object.assign({}, _eosjs2_serialize__WEBPACK_IMPORTED_MODULE_0__["transactionHeader"](refBlock, expireSeconds), transaction);
        }
        transaction = Object.assign({}, transaction, { actions: await this.serializeActions(actions) });
        let serializedTransaction = this.serializeTransaction(transaction);
        let availableKeys = await this.signatureProvider.getAvailableKeys();
        let requiredKeys = await this.authorityProvider.getRequiredKeys({ transaction, availableKeys });
        let signatures = await this.signatureProvider.sign({ chainId: this.chainId, requiredKeys, serializedTransaction: serializedTransaction });
        return await this.rpc.push_transaction({
            signatures,
            serializedTransaction,
        });
    }
} // Api


/***/ }),

/***/ "./src/eosjs2-numeric.ts":
/*!*******************************!*\
  !*** ./src/eosjs2-numeric.ts ***!
  \*******************************/
/*! exports provided: isNegative, negate, decimalToBinary, signedDecimalToBinary, binaryToDecimal, signedBinaryToDecimal, base58ToBinary, binaryToBase58, publicKeyDataSize, privateKeyDataSize, signatureDataSize, stringToPublicKey, publicKeyToString, stringToPrivateKey, privateKeyToString, stringToSignature, signatureToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNegative", function() { return isNegative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return decimalToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signedDecimalToBinary", function() { return signedDecimalToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binaryToDecimal", function() { return binaryToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signedBinaryToDecimal", function() { return signedBinaryToDecimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base58ToBinary", function() { return base58ToBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binaryToBase58", function() { return binaryToBase58; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicKeyDataSize", function() { return publicKeyDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateKeyDataSize", function() { return privateKeyDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signatureDataSize", function() { return signatureDataSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToPublicKey", function() { return stringToPublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicKeyToString", function() { return publicKeyToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToPrivateKey", function() { return stringToPrivateKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateKeyToString", function() { return privateKeyToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToSignature", function() { return stringToSignature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signatureToString", function() { return signatureToString; });
// copyright defined in eosjs2/LICENSE.txt

const ripemd160 = __webpack_require__(/*! ./ripemd */ "./src/ripemd.js").RIPEMD160.hash;
const base58_chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function create_base58_map() {
    let base58_map = Array(256).fill(-1);
    for (let i = 0; i < base58_chars.length; ++i)
        base58_map[base58_chars.charCodeAt(i)] = i;
    return base58_map;
}
const base58_map = create_base58_map();
function isNegative(bin) {
    return (bin[bin.length - 1] & 0x80) !== 0;
}
function negate(bin) {
    let carry = 1;
    for (let i = 0; i < bin.length; ++i) {
        let x = (~bin[i] & 0xff) + carry;
        bin[i] = x;
        carry = x >> 8;
    }
}
function decimalToBinary(size, s) {
    let result = new Uint8Array(size);
    for (let i = 0; i < s.length; ++i) {
        let srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0))
            throw new Error("invalid number");
        let carry = srcDigit - '0'.charCodeAt(0);
        for (let j = 0; j < size; ++j) {
            let x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry)
            throw new Error("number is out of range");
    }
    return result;
}
function signedDecimalToBinary(size, s) {
    let negative = s[0] === '-';
    if (negative)
        s = s.substr(1);
    let result = decimalToBinary(size, s);
    if (negative)
        negate(result);
    return result;
}
function binaryToDecimal(bin, minDigits = 1) {
    let result = Array(minDigits).fill('0'.charCodeAt(0));
    for (let i = bin.length - 1; i >= 0; --i) {
        let carry = bin[i];
        for (let j = 0; j < result.length; ++j) {
            let x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode(...result);
}
function signedBinaryToDecimal(bin, minDigits = 1) {
    if (isNegative(bin)) {
        let x = bin.slice();
        negate(x);
        return '-' + binaryToDecimal(x, minDigits);
    }
    return binaryToDecimal(bin, minDigits);
}
function base58ToBinary(size, s) {
    let result = new Uint8Array(size);
    for (let i = 0; i < s.length; ++i) {
        let carry = base58_map[s.charCodeAt(i)];
        if (carry < 0)
            throw new Error("invalid base-58 value");
        for (let j = 0; j < size; ++j) {
            let x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry)
            throw new Error("base-58 value is out of range");
    }
    result.reverse();
    return result;
}
function binaryToBase58(bin, minDigits = 1) {
    let result = [];
    for (let byte of bin) {
        let carry = byte;
        for (let j = 0; j < result.length; ++j) {
            let x = (base58_map[result[j]] << 8) + carry;
            result[j] = base58_chars.charCodeAt(x % 58);
            carry = (x / 58) | 0;
        }
        while (carry) {
            result.push(base58_chars.charCodeAt(carry % 58));
            carry = (carry / 58) | 0;
        }
    }
    for (let byte of bin)
        if (byte)
            break;
        else
            result.push('1'.charCodeAt(0));
    result.reverse();
    return String.fromCharCode(...result);
}
;
const publicKeyDataSize = 33;
const privateKeyDataSize = 32;
const signatureDataSize = 65;
;
function digestSuffixRipemd160(data, suffix) {
    let d = new Uint8Array(data.length + suffix.length);
    for (let i = 0; i < data.length; ++i)
        d[i] = data[i];
    for (let i = 0; i < suffix.length; ++i)
        d[data.length + i] = suffix.charCodeAt(i);
    return ripemd160(d);
}
function stringToKey(s, type, size, suffix) {
    let whole = base58ToBinary(size + 4, s);
    let result = { type, data: new Uint8Array(whole.buffer, 0, size) };
    let digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[size + 0] || digest[1] !== whole[size + 1] || digest[2] !== whole[size + 2] || digest[3] !== whole[size + 3])
        throw new Error("checksum doesn't match");
    return result;
}
function keyToString(key, suffix, prefix) {
    let digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    let whole = new Uint8Array(key.data.length + 4);
    for (let i = 0; i < key.data.length; ++i)
        whole[i] = key.data[i];
    for (let i = 0; i < 4; ++i)
        whole[i + key.data.length] = digest[i];
    return prefix + binaryToBase58(whole);
}
function stringToPublicKey(s) {
    if (s.substr(0, 3) == "EOS") {
        let whole = base58ToBinary(publicKeyDataSize + 4, s.substr(3));
        let key = { type: 0 /* k1 */, data: new Uint8Array(publicKeyDataSize) };
        for (let i = 0; i < publicKeyDataSize; ++i)
            key.data[i] = whole[i];
        let digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[publicKeyDataSize] || digest[1] !== whole[34] || digest[2] !== whole[35] || digest[3] !== whole[36])
            throw new Error("checksum doesn't match");
        return key;
    }
    else if (s.substr(0, 7) == "PUB_R1_") {
        return stringToKey(s.substr(7), 1 /* r1 */, publicKeyDataSize, "R1");
    }
    else {
        throw new Error("unrecognized public key format");
    }
}
function publicKeyToString(key) {
    if (key.type == 0 /* k1 */ && key.data.length == publicKeyDataSize) {
        let digest = new Uint8Array(ripemd160(key.data));
        let whole = new Uint8Array(publicKeyDataSize + 4);
        for (let i = 0; i < publicKeyDataSize; ++i)
            whole[i] = key.data[i];
        for (let i = 0; i < 4; ++i)
            whole[i + publicKeyDataSize] = digest[i];
        return "EOS" + binaryToBase58(whole);
    }
    else if (key.type == 1 /* r1 */ && key.data.length == publicKeyDataSize) {
        return keyToString(key, "R1", "PUB_R1_");
    }
    else {
        throw new Error("unrecognized public key format");
    }
}
function stringToPrivateKey(s) {
    if (s.substr(0, 7) == "PVT_R1_")
        return stringToKey(s.substr(7), 1 /* r1 */, privateKeyDataSize, "R1");
    else
        throw new Error("unrecognized private key format");
}
function privateKeyToString(signature) {
    if (signature.type == 1 /* r1 */)
        return keyToString(signature, "R1", "PVT_R1_");
    else
        throw new Error("unrecognized private key format");
}
function stringToSignature(s) {
    if (s.substr(0, 7) == "SIG_K1_")
        return stringToKey(s.substr(7), 0 /* k1 */, signatureDataSize, "K1");
    else if (s.substr(0, 7) == "SIG_R1_")
        return stringToKey(s.substr(7), 1 /* r1 */, signatureDataSize, "R1");
    else
        throw new Error("unrecognized signature format");
}
function signatureToString(signature) {
    if (signature.type == 0 /* k1 */)
        return keyToString(signature, "K1", "SIG_K1_");
    else if (signature.type == 1 /* r1 */)
        return keyToString(signature, "R1", "SIG_R1_");
    else
        throw new Error("unrecognized signature format");
}


/***/ }),

/***/ "./src/eosjs2-serialize.ts":
/*!*********************************!*\
  !*** ./src/eosjs2-serialize.ts ***!
  \*********************************/
/*! exports provided: SerialBuffer, dateToTimePoint, timePointToDate, dateToTimePointSec, timePointSecToDate, dateToBlockTimestamp, blockTimestampToDate, stringToSymbol, symbolToString, arrayToHex, hexToUint8Array, createInitialTypes, getType, getTypesFromAbi, transactionHeader, serializeActionData, serializeAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SerialBuffer", function() { return SerialBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToTimePoint", function() { return dateToTimePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timePointToDate", function() { return timePointToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToTimePointSec", function() { return dateToTimePointSec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timePointSecToDate", function() { return timePointSecToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateToBlockTimestamp", function() { return dateToBlockTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockTimestampToDate", function() { return blockTimestampToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToSymbol", function() { return stringToSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolToString", function() { return symbolToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToHex", function() { return arrayToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToUint8Array", function() { return hexToUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInitialTypes", function() { return createInitialTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTypesFromAbi", function() { return getTypesFromAbi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionHeader", function() { return transactionHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeActionData", function() { return serializeActionData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeAction", function() { return serializeAction; });
/* harmony import */ var _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eosjs2-numeric */ "./src/eosjs2-numeric.ts");
// copyright defined in eosjs2/LICENSE.txt


class SerialBuffer {
    constructor({ textEncoder, textDecoder } = {}) {
        this.length = 0;
        this.array = new Uint8Array(1024);
        this.readPos = 0;
        this.textEncoder = textEncoder || new TextEncoder;
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    reserve(size) {
        if (this.length + size <= this.array.length)
            return;
        let l = this.array.length;
        while (this.length + size > l)
            l = Math.ceil(l * 1.5);
        let newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    }
    asUint8Array() {
        return new Uint8Array(this.array.buffer, 0, this.length);
    }
    pushArray(v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    }
    push(...v) {
        this.pushArray(v);
    }
    get() {
        if (this.readPos < this.length)
            return this.array[this.readPos++];
        throw new Error('Read past end of buffer');
    }
    pushUint8ArrayChecked(v, len) {
        if (v.length !== len)
            throw new Error('Binary data has incorrect size');
        this.pushArray(v);
    }
    getUint8Array(len) {
        if (this.readPos + len > this.length)
            throw new Error('Read past end of buffer');
        let result = new Uint8Array(this.array.buffer, this.readPos, len);
        this.readPos += len;
        return result;
    }
    pushUint16(v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    }
    getUint16() {
        let v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    }
    pushUint32(v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    }
    getUint32() {
        let v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    }
    pushNumberAsUint64(v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    }
    getUint64AsNumber() {
        let low = this.getUint32();
        let high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    }
    pushVaruint32(v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    }
    getVaruint32() {
        let v = 0;
        let bit = 0;
        while (true) {
            let b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80))
                break;
        }
        return v >>> 0;
    }
    pushVarint32(v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    }
    getVarint32() {
        let v = this.getVaruint32();
        if (v & 1)
            return ((~v) >> 1) | 2147483648;
        else
            return v >>> 1;
    }
    pushFloat32(v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    }
    getFloat32() {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    }
    pushFloat64(v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    }
    getFloat64() {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    }
    pushName(s) {
        function charToSymbol(c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0))
                return (c - 'a'.charCodeAt(0)) + 6;
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0))
                return (c - '1'.charCodeAt(0)) + 1;
            return 0;
        }
        let a = new Uint8Array(8);
        let bit = 63;
        for (let i = 0; i < s.length; ++i) {
            let c = charToSymbol(s.charCodeAt(i));
            if (bit < 5)
                c = c << 1;
            for (let j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    }
    getName() {
        let a = this.getUint8Array(8);
        let result = '';
        for (let bit = 63; bit >= 0;) {
            let c = 0;
            for (let i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6)
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            else if (c >= 1)
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            else
                result += '.';
        }
        if (result === '.............')
            return result;
        while (result.endsWith('.'))
            result = result.substr(0, result.length - 1);
        return result;
    }
    pushBytes(v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    }
    getBytes() {
        return this.getUint8Array(this.getVaruint32());
    }
    pushString(v) {
        this.pushBytes(this.textEncoder.encode(v));
    }
    getString() {
        return this.textDecoder.decode(this.getBytes());
    }
    pushSymbolCode(name) {
        let a = [];
        a.push(...this.textEncoder.encode(name));
        while (a.length < 8)
            a.push(0);
        this.pushArray(a.slice(0, 8));
    }
    getSymbolCode() {
        let a = this.getUint8Array(8);
        let len;
        for (len = 0; len < a.length; ++len)
            if (!a[len])
                break;
        let name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    }
    pushSymbol({ name, precision }) {
        let a = [precision & 0xff];
        a.push(...this.textEncoder.encode(name));
        while (a.length < 8)
            a.push(0);
        this.pushArray(a.slice(0, 8));
    }
    getSymbol() {
        let precision = this.get();
        let a = this.getUint8Array(7);
        let len;
        for (len = 0; len < a.length; ++len)
            if (!a[len])
                break;
        let name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name, precision };
    }
    pushAsset(s) {
        s = s.trim();
        let pos = 0;
        let amount = '';
        let precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        let foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit)
            throw new Error('Asset must begin with a number');
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        let name = s.substr(pos).trim();
        this.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](8, amount));
        this.pushSymbol({ name, precision });
    }
    getAsset() {
        let amount = this.getUint8Array(8);
        let { name, precision } = this.getSymbol();
        let s = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](amount, precision + 1);
        if (precision)
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        return s + ' ' + name;
    }
    pushPublicKey(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToPublicKey"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getPublicKey() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["publicKeyDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["publicKeyToString"]({ type, data });
    }
    pushPrivateKey(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToPrivateKey"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getPrivateKey() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["privateKeyDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["privateKeyToString"]({ type, data });
    }
    pushSignature(s) {
        let key = _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["stringToSignature"](s);
        this.push(key.type);
        this.pushArray(key.data);
    }
    getSignature() {
        let type = this.get();
        let data = this.getUint8Array(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signatureDataSize"]);
        return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signatureToString"]({ type, data });
    }
} // SerialBuffer
function dateToTimePoint(date) {
    return Math.round(Date.parse(date + 'Z') * 1000);
}
function timePointToDate(us) {
    let s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
function dateToTimePointSec(date) {
    return Math.round(Date.parse(date + 'Z') / 1000);
}
function timePointSecToDate(sec) {
    let s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
}
function dateToBlockTimestamp(date) {
    return Math.round((Date.parse(date + 'Z') - 946684800000) / 500);
}
function blockTimestampToDate(slot) {
    let s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
}
function stringToSymbol(s) {
    let m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m)
        throw new Error('Invalid symbol');
    return { name: m[2], precision: +m[1] };
}
function symbolToString({ name, precision }) {
    return precision + ',' + name;
}
function arrayToHex(data) {
    let result = '';
    for (let x of data)
        result += ('00' + x.toString(16)).slice(-2);
    return result.toUpperCase();
}
function hexToUint8Array(hex) {
    let l = hex.length / 2;
    let result = new Uint8Array(l);
    for (let i = 0; i < l; ++i)
        result[i] = parseInt(hex.substr(i * 2, 2), 16);
    return result;
}
function serializeUnknown(buffer, data) {
    throw new Error("Don't know how to serialize " + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error("Don't know how to deserialize " + this.name);
}
function serializeStruct(buffer, data) {
    if (this.base)
        this.base.serialize(buffer, data);
    for (let field of this.fields) {
        if (!(field.name in data))
            throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
        field.type.serialize(buffer, data[field.name]);
    }
}
function deserializeStruct(buffer) {
    let result;
    if (this.base)
        result = this.base.deserialize(buffer);
    else
        result = {};
    for (let field of this.fields)
        result[field.name] = field.type.deserialize(buffer);
    return result;
}
function serializeArray(buffer, data) {
    buffer.pushVaruint32(data.length);
    for (let item of data)
        this.arrayOf.serialize(buffer, item);
}
function deserializeArray(buffer) {
    let len = buffer.getVaruint32();
    let result = [];
    for (let i = 0; i < len; ++i)
        result.push(this.arrayOf.deserialize(buffer));
    return result;
}
function serializeOptional(buffer, data) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data);
    }
}
function deserializeOptional(buffer) {
    if (buffer.get())
        return this.optionalOf.deserialize(buffer);
    else
        return null;
}
function createType(attrs) {
    return Object.assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
}
function createInitialTypes() {
    let result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize(buffer, data) { buffer.push(data ? 1 : 0); },
            deserialize(buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize(buffer, data) { buffer.push(data); },
            deserialize(buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize(buffer, data) { buffer.push(data); },
            deserialize(buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize(buffer, data) { buffer.pushUint16(data); },
            deserialize(buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize(buffer, data) { buffer.pushUint16(data); },
            deserialize(buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize(buffer, data) { buffer.pushUint32(data); },
            deserialize(buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["decimalToBinary"](8, '' + data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["binaryToDecimal"](buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](8, '' + data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize(buffer, data) { buffer.pushUint32(data); },
            deserialize(buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize(buffer, data) { buffer.pushVaruint32(data); },
            deserialize(buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize(buffer, data) { buffer.pushVarint32(data); },
            deserialize(buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["decimalToBinary"](16, data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["binaryToDecimal"](buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize(buffer, data) { buffer.pushArray(_eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedDecimalToBinary"](16, data)); },
            deserialize(buffer) { return _eosjs2_numeric__WEBPACK_IMPORTED_MODULE_0__["signedBinaryToDecimal"](buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize(buffer, data) { buffer.pushFloat32(data); },
            deserialize(buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize(buffer, data) { buffer.pushFloat64(data); },
            deserialize(buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 16); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize(buffer, data) { buffer.pushBytes(hexToUint8Array(data)); },
            deserialize(buffer) { return arrayToHex(buffer.getBytes()); },
        }),
        string: createType({
            name: 'string',
            serialize(buffer, data) { buffer.pushString(data); },
            deserialize(buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize(buffer, data) { buffer.pushName(data); },
            deserialize(buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize(buffer, data) { buffer.pushNumberAsUint64(dateToTimePoint(data)); },
            deserialize(buffer) { return timePointToDate(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize(buffer, data) { buffer.pushUint32(dateToTimePointSec(data)); },
            deserialize(buffer) { return timePointSecToDate(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize(buffer, data) { buffer.pushUint32(dateToBlockTimestamp(data)); },
            deserialize(buffer) { return blockTimestampToDate(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize(buffer, data) { buffer.pushSymbolCode(data); },
            deserialize(buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize(buffer, data) { buffer.pushSymbol(stringToSymbol(data)); },
            deserialize(buffer) { return symbolToString(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize(buffer, data) { buffer.pushAsset(data); },
            deserialize(buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 20); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 32); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize(buffer, data) { buffer.pushUint8ArrayChecked(hexToUint8Array(data), 64); },
            deserialize(buffer) { return arrayToHex(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize(buffer, data) { buffer.pushPublicKey(data); },
            deserialize(buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize(buffer, data) { buffer.pushPrivateKey(data); },
            deserialize(buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize(buffer, data) { buffer.pushSignature(data); },
            deserialize(buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
} // createInitialTypes()
function getType(types, name) {
    let type = types.get(name);
    if (type && type.aliasOfName)
        return getType(types, type.aliasOfName);
    if (type)
        return type;
    if (name.endsWith('[]')) {
        return createType({
            name,
            arrayOf: getType(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name,
            optionalOf: getType(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    throw new Error('Unknown type: ' + name);
}
function getTypesFromAbi(initialTypes, abi) {
    let types = new Map(initialTypes);
    for (let { new_type_name, type } of abi.types)
        types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type, }));
    for (let { name, base, fields } of abi.structs) {
        types.set(name, createType({
            name,
            baseName: base,
            fields: fields.map(({ name, type }) => ({ name, typeName: type, type: null })),
            serialize: serializeStruct,
            deserialize: deserializeStruct,
        }));
    }
    for (let [name, type] of types) {
        if (type.baseName)
            type.base = getType(types, type.baseName);
        for (let field of type.fields)
            field.type = getType(types, field.typeName);
    }
    return types;
} // getTypesFromAbi
function transactionHeader(refBlock, expireSeconds) {
    return {
        expiration: timePointSecToDate(dateToTimePointSec(refBlock.timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num,
        ref_block_prefix: refBlock.ref_block_prefix,
    };
}
;
function serializeActionData(contract, account, name, data) {
    let action = contract.actions.get(name);
    if (!action)
        throw new Error('Unknown action ' + name + ' in contract ' + account);
    let buffer = new SerialBuffer;
    action.serialize(buffer, data);
    return arrayToHex(buffer.asUint8Array());
}
function serializeAction(contract, account, name, authorization, data) {
    return {
        account,
        name,
        authorization,
        data: serializeActionData(contract, account, name, data),
    };
}


/***/ }),

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/*! exports provided: RIPEMD160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIPEMD160", function() { return RIPEMD160; });
// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



class RIPEMD160
{
	constructor()
	{
		// https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
		// http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf
	}

	static get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */)
	{
		//  Obtain the number of bytes needed to pad the message.
		// It does not contain the size of the message size information.
		/*
			https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf

			The Cryptographic Hash Function RIPEMD-160

			written by
				Bart Preneel,
				Hans Dobbertin,
				Antoon Bosselaers
			in
				1997.

			--------------------------------------------------

			§5     Description of RIPEMD-160

			......

			 In order to guarantee that the total input size is a
			multiple of 512 bits, the input is padded in the same
			way as for all the members of the MD4-family: one
			appends a single 1 followed by a string of 0s (the
			number of 0s lies between 0 and 511); the last 64 bits
			of the extended input contain the binary representation
			of the input size in bits, least significant byte first.
		*/
		/*
			https://tools.ietf.org/rfc/rfc1186.txt

			RFC 1186: MD4 Message Digest Algorithm.

			written by
				Ronald Linn Rivest
			in
				October 1990.

			--------------------------------------------------

			§3     MD4 Algorithm Description

			......

			Step 1. Append padding bits

			 The message is "padded" (extended) so that its length
			(in bits) is congruent to 448, modulo 512. That is, the
			message is extended so that it is just 64 bits shy of
			being a multiple of 512 bits long. Padding is always
			performed, even if the length of the message is already
			congruent to 448, modulo 512 (in which case 512 bits of
			padding are added).

			 Padding is performed as follows: a single "1" bit is
			appended to the message, and then enough zero bits are
			appended so that the length in bits of the padded
			message becomes congruent to 448, modulo 512.

			Step 2. Append length

			 A 64-bit representation of b (the length of the message
			before the padding bits were added) is appended to the
			result of the previous step. In the unlikely event that
			b is greater than 2^64, then only the low-order 64 bits
			of b are used. (These bits are appended as two 32-bit
			words and appended low-order word first in accordance
			with the previous conventions.)

			 At this point the resulting message (after padding with
			bits and with b) has a length that is an exact multiple
			of 512 bits. Equivalently, this message has a length
			that is an exact multiple of 16 (32-bit) words. Let
			M[0 ... N-1] denote the words of the resulting message,
			where N is a multiple of 16.
		*/
		// https://crypto.stackexchange.com/a/32407/54568
		/*
			Example case  # 1
				[0 bit: message.]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 2
				[512-bits: message]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 3
				[(512 - 64 = 448) bits: message.]
				[1 bit: 1.]
				[511 bits: 0.]
				[64 bits: message size information.]

			Example case  # 4
				[(512 - 65 = 447) bits: message.]
				[1 bit: 1.]
				[0 bit: 0.]
				[64 bits: message size information.]
		*/
		// The number of padding zero bits:
		//      511 - [{(message size in bits) + 64} (mod 512)]
		return 64 - ((message_size + 8) & 0b00111111 /* 63 */);
	}
	static pad(message /* An ArrayBuffer. */)
	{
		const message_size = message.byteLength;
		const n_pad = RIPEMD160.get_n_pad_bytes(message_size);

		//  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
		// bitwise operation in Javascript is done on 32-bits operands.
		const divmod = (dividend, divisor) => [
			Math.floor(dividend / divisor),
			dividend % divisor
		];
		/*
To shift

   00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                     t o
   00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000

--------------------------------------------------------------------------------

Method #1

    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
   [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
   [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                         (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                     (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
		const [
			msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
			msg_byte_size_least // Value range [0, (2 ** 32) - 1].
		] = divmod(message_size, uint32_max_plus_1);
		const [
			carry, // Value range [0, 7].
			msg_bit_size_least // Value range [0, (2 ** 32) - 8].
		] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
		const message_bit_size_most = message_byte_size_most * 8
			+ carry; // Value range [0, (2 ** 24) - 1].

--------------------------------------------------------------------------------

Method #2
    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
      [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                         (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                          (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		*/
		const [
			msg_bit_size_most,
			msg_bit_size_least
		] = divmod(message_size, 536870912 /* (2 ** 29) */)
			.map((x, index) => (index ? (x * 8) : x));

		// `ArrayBuffer.transfer()` is not supported.
		const padded = new Uint8Array(message_size + n_pad + 8);
		padded.set(new Uint8Array(message), 0);
		const data_view = new DataView(padded.buffer);
		data_view.setUint8(message_size, 0b10000000);
		data_view.setUint32(
			message_size + n_pad,
			msg_bit_size_least,
			true // Little-endian
		);
		data_view.setUint32(
			message_size + n_pad + 4,
			msg_bit_size_most,
			true // Little-endian
		);

		return padded.buffer;
	}

	static f(j, x, y, z)
	{
		if(0 <= j && j <= 15)
		{ // Exclusive-OR
			return x ^ y ^ z;
		}
		if(16 <= j && j <= 31)
		{ // Multiplexing (muxing)
			return (x & y) | (~x & z);
		}
		if(32 <= j && j <= 47)
		{
			return (x | ~y) ^ z;
		}
		if(48 <= j && j <= 63)
		{ // Multiplexing (muxing)
			return (x & z) | (y & ~z);
		}
		if(64 <= j && j <= 79)
		{
			return x ^ (y | ~z);
		}
	}
	static K(j)
	{
		if(0 <= j && j <= 15)
		{
			return 0x00000000;
		}
		if(16 <= j && j <= 31)
		{
			// Math.floor((2 ** 30) * Math.SQRT2)
			return 0x5A827999;
		}
		if(32 <= j && j <= 47)
		{
			// Math.floor((2 ** 30) * Math.sqrt(3))
			return 0x6ED9EBA1;
		}
		if(48 <= j && j <= 63)
		{
			// Math.floor((2 ** 30) * Math.sqrt(5))
			return 0x8F1BBCDC;
		}
		if(64 <= j && j <= 79)
		{
			// Math.floor((2 ** 30) * Math.sqrt(7))
			return 0xA953FD4E;
		}
	}
	static KP(j) // K'
	{
		if(0 <= j && j <= 15)
		{
			// Math.floor((2 ** 30) * Math.cbrt(2))
			return 0x50A28BE6;
		}
		if(16 <= j && j <= 31)
		{
			// Math.floor((2 ** 30) * Math.cbrt(3))
			return 0x5C4DD124;
		}
		if(32 <= j && j <= 47)
		{
			// Math.floor((2 ** 30) * Math.cbrt(5))
			return 0x6D703EF3;
		}
		if(48 <= j && j <= 63)
		{
			// Math.floor((2 ** 30) * Math.cbrt(7))
			return 0x7A6D76E9;
		}
		if(64 <= j && j <= 79)
		{
			return 0x00000000;
		}
	}
	static add_modulo32(/* ...... */)
	{
		// 1.  Modulo addition (addition modulo) is associative.
		//    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
 		// 2.  Bitwise operation in Javascript
		//    is done on 32-bits operands
		//    and results in a 32-bits value.
		return Array
			.from(arguments)
			.reduce((a, b) => (a + b), 0) | 0;
	}
	static rol32(value, count)
	{ // Cyclic left shift (rotate) on 32-bits value.
		return (value << count) | (value >>> (32 - count));
	}
	static hash(message /* An ArrayBuffer. */)
	{
		//////////       Padding       //////////

		// The padded message.
		const padded = RIPEMD160.pad(message);

		//////////     Compression     //////////

		// Message word selectors.
		const r = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
			3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
			1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
			4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
		];
		const rP = [ // r'
			5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
			6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
			15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
			8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
			12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
		];

		// Amounts for 'rotate left' operation.
		const s = [
			11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
			7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
			11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
			11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
			9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
		];
		const sP = [ // s'
			8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
			9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
			9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
			15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
			8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
		];

		// The size, in bytes, of a word.
		const word_size = 4;

		// The size, in bytes, of a 16-words block.
		const block_size = 64;

		// The number of the 16-words blocks.
		const t = padded.byteLength / block_size;

		//  The message after padding consists of t 16-word blocks that
		// are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
		const X = (new Array(t))
			.fill(undefined)
			.map((_, i) => new Proxy(
				new DataView(
					padded, i * block_size, block_size
				), {
				get(block_view, j)
				{
					return block_view.getUint32(
						j * word_size,
						true // Little-endian
					);
				}
			}));

		//  The result of RIPEMD-160 is contained in five 32-bit words,
		// which form the internal state of the algorithm. The final
		// content of these five 32-bit words is converted to a 160-bit
		// string, again using the little-endian convention.
		let h = [
			0x67452301, // h_0
			0xEFCDAB89, // h_1
			0x98BADCFE, // h_2
			0x10325476, // h_3
			0xC3D2E1F0  // h_4
		];

		for(let i = 0; i < t; ++i)
		{
			let A = h[0], B = h[1], C = h[2], D = h[3], E = h[4];
			let AP = A, BP = B, CP = C, DP = D, EP = E;
			for(let j = 0; j < 80; ++j)
			{
				// Left rounds
				let T = RIPEMD160.add_modulo32(
					RIPEMD160.rol32(
						RIPEMD160.add_modulo32(
							A,
							RIPEMD160.f(j, B, C, D),
							X[i][r[j]],
							RIPEMD160.K(j)
						),
						s[j]
					),
					E
				);
				A = E;
				E = D;
				D = RIPEMD160.rol32(C, 10);
				C = B;
				B = T;

				// Right rounds
				T = RIPEMD160.add_modulo32(
					RIPEMD160.rol32(
						RIPEMD160.add_modulo32(
							AP,
							RIPEMD160.f(
								79 - j,
								BP,
								CP,
								DP
							),
							X[i][rP[j]],
							RIPEMD160.KP(j)
						),
						sP[j]
					),
					EP
				);
				AP = EP;
				EP = DP;
				DP = RIPEMD160.rol32(CP, 10);
				CP = BP;
				BP = T;
			}
			let T = RIPEMD160.add_modulo32(h[1], C, DP);
			h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
			h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
			h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
			h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
			h[0] = T;
		}

		//  The final output string then consists of the concatenatation
		// of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
		// 4-byte string using the little-endian convention.
		const result = new ArrayBuffer(20);
		const data_view = new DataView(result);
		h.forEach((h_i, i) => data_view.setUint32(i * 4, h_i, true));
		return result;
	}
}


/***/ }),

/***/ "./src/transaction.abi.json":
/*!**********************************!*\
  !*** ./src/transaction.abi.json ***!
  \**********************************/
/*! exports provided: types, structs, default */
/***/ (function(module) {

module.exports = {"types":[{"new_type_name":"account_name","type":"name"},{"new_type_name":"action_name","type":"name"},{"new_type_name":"permission_name","type":"name"}],"structs":[{"name":"permission_level","base":"","fields":[{"name":"actor","type":"account_name"},{"name":"permission","type":"permission_name"}]},{"name":"action","base":"","fields":[{"name":"account","type":"account_name"},{"name":"name","type":"action_name"},{"name":"authorization","type":"permission_level[]"},{"name":"data","type":"bytes"}]},{"name":"extension","base":"","fields":[{"name":"type","type":"uint16"},{"name":"data","type":"bytes"}]},{"name":"transaction_header","base":"","fields":[{"name":"expiration","type":"time_point_sec"},{"name":"ref_block_num","type":"uint16"},{"name":"ref_block_prefix","type":"uint32"},{"name":"max_net_usage_words","type":"varuint32"},{"name":"max_cpu_usage_ms","type":"uint8"},{"name":"delay_sec","type":"varuint32"}]},{"name":"transaction","base":"transaction_header","fields":[{"name":"context_free_actions","type":"action[]"},{"name":"actions","type":"action[]"},{"name":"transaction_extensions","type":"extension[]"}]}]};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9baWRdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLWFwaS50cyIsIndlYnBhY2s6Ly9baWRdLy4vc3JjL2Vvc2pzMi1udW1lcmljLnRzIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLXNlcmlhbGl6ZS50cyIsIndlYnBhY2s6Ly9baWRdLy4vc3JjL3JpcGVtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBLDBDQUEwQztBQUU3Qjs7Ozs7Ozs7OztBQUc2QjtBQUMxQyxNQUFNLGNBQWMsR0FBRyxtQkFBTyxDQUFDLCtEQUE2QixDQUFDLENBQUM7QUFFdkQsTUFBTSxTQUFTLEdBQUcsOENBQUcsQ0FBQztBQXNCdkI7SUFRRixZQUFZLElBQW9IO1FBRmhJLGNBQVMsR0FBRyxJQUFJLEdBQUcs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Ozs7Ozs7Ozs7OztBQzN2QkQ7QUFBQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNEJBQTRCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZW9zanMyLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZW9zanMyLWFwaS50c1wiKTtcbiIsIi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzMi9MSUNFTlNFLnR4dFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgQWJpLCBHZXRJbmZvUmVzdWx0LCBKc29uUnBjIH0gZnJvbSAnLi9lb3NqczItanNvbnJwYyc7XHJcbmltcG9ydCAqIGFzIHNlciBmcm9tICcuL2Vvc2pzMi1zZXJpYWxpemUnO1xyXG5jb25zdCB0cmFuc2FjdGlvbkFiaSA9IHJlcXVpcmUoJy4uL3NyYy90cmFuc2FjdGlvbi5hYmkuanNvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcmlhbGl6ZSA9IHNlcjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXR5UHJvdmlkZXJBcmdzIHtcclxuICAgIHRyYW5zYWN0aW9uOiBhbnk7XHJcbiAgICBhdmFpbGFibGVLZXlzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpdHlQcm92aWRlciB7XHJcbiAgICBnZXRSZXF1aXJlZEtleXM6IChhcmdzOiBBdXRob3JpdHlQcm92aWRlckFyZ3MpID0+IFByb21pc2U8c3RyaW5nW10+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hdHVyZVByb3ZpZGVyQXJncyB7XHJcbiAgICBjaGFpbklkOiBzdHJpbmc7XHJcbiAgICByZXF1aXJlZEtleXM6IHN0cmluZ1tdO1xyXG4gICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBVaW50OEFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hdHVyZVByb3ZpZGVyIHtcclxuICAgIGdldEF2YWlsYWJsZUtleXM6ICgpID0+IFByb21pc2U8c3RyaW5nW10+O1xyXG4gICAgc2lnbjogKGFyZ3M6IFNpZ25hdHVyZVByb3ZpZGVyQXJncykgPT4gUHJvbWlzZTxzdHJpbmdbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcGkge1xyXG4gICAgcnBjOiBKc29uUnBjO1xyXG4gICAgYXV0aG9yaXR5UHJvdmlkZXI6IEF1dGhvcml0eVByb3ZpZGVyO1xyXG4gICAgc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyO1xyXG4gICAgY2hhaW5JZDogc3RyaW5nO1xyXG4gICAgdHJhbnNhY3Rpb25UeXBlczogTWFwPHN0cmluZywgc2VyLlR5cGU+O1xyXG4gICAgY29udHJhY3RzID0gbmV3IE1hcDxzdHJpbmcsIHNlci5Db250cmFjdD4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzOiB7IHJwYzogSnNvblJwYywgYXV0aG9yaXR5UHJvdmlkZXI/OiBBdXRob3JpdHlQcm92aWRlciwgc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyLCBjaGFpbklkOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIHRoaXMucnBjID0gYXJncy5ycGM7XHJcbiAgICAgICAgdGhpcy5hdXRob3JpdHlQcm92aWRlciA9IGFyZ3MuYXV0aG9yaXR5UHJvdmlkZXIgfHwgYXJncy5ycGM7XHJcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQcm92aWRlciA9IGFyZ3Muc2lnbmF0dXJlUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5jaGFpbklkID0gYXJncy5jaGFpbklkO1xyXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25UeXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZUluaXRpYWxUeXBlcygpLCB0cmFuc2FjdGlvbkFiaSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0Q29udHJhY3QoYWNjb3VudE5hbWU6IHN0cmluZywgcmVsb2FkID0gZmFsc2UpOiBQcm9taXNlPHNlci5Db250cmFjdD4ge1xyXG4gICAgICAgIGlmICghcmVsb2FkICYmIHRoaXMuY29udHJhY3RzLmdldChhY2NvdW50TmFtZSkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0cy5nZXQoYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGxldCBhYmk6IEFiaTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhYmkgPSAoYXdhaXQgdGhpcy5ycGMuZ2V0X2FiaShhY2NvdW50TmFtZSkpLmFiaTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGUubWVzc2FnZSA9ICdmZXRjaGluZyBhYmkgZm9yICcgKyBhY2NvdW50TmFtZSArICc6ICcgKyBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYWJpKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGFiaSBmb3IgXCIgKyBhY2NvdW50TmFtZSk7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlSW5pdGlhbFR5cGVzKCksIGFiaSk7XHJcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgc2VyLlR5cGU+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgeyBuYW1lLCB0eXBlIH0gb2YgYWJpLmFjdGlvbnMpXHJcbiAgICAgICAgICAgIGFjdGlvbnMuc2V0KG5hbWUsIHNlci5nZXRUeXBlKHR5cGVzLCB0eXBlKSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHsgdHlwZXMsIGFjdGlvbnMgfTtcclxuICAgICAgICB0aGlzLmNvbnRyYWN0cy5zZXQoYWNjb3VudE5hbWUsIHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXJpYWxpemUoYnVmZmVyOiBzZXIuU2VyaWFsQnVmZmVyLCB0eXBlOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMuZ2V0KHR5cGUpLnNlcmlhbGl6ZShidWZmZXIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNlcmlhbGl6ZShidWZmZXI6IHNlci5TZXJpYWxCdWZmZXIsIHR5cGU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uVHlwZXMuZ2V0KHR5cGUpLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IGFueSkge1xyXG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcjtcclxuICAgICAgICB0aGlzLnNlcmlhbGl6ZShidWZmZXIsICd0cmFuc2FjdGlvbicsIHtcclxuICAgICAgICAgICAgbWF4X25ldF91c2FnZV93b3JkczogMCxcclxuICAgICAgICAgICAgbWF4X2NwdV91c2FnZV9tczogMCxcclxuICAgICAgICAgICAgZGVsYXlfc2VjOiAwLFxyXG4gICAgICAgICAgICBjb250ZXh0X2ZyZWVfYWN0aW9uczogW10sXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbl9leHRlbnNpb25zOiBbXSxcclxuICAgICAgICAgICAgLi4udHJhbnNhY3Rpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzZXJpYWxpemVBY3Rpb25zKGFjdGlvbnM6IHNlci5BY3Rpb25bXSkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhc3luYyAoeyBhY2NvdW50LCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlci5zZXJpYWxpemVBY3Rpb24oYXdhaXQgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KSwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHB1c2hUcmFuc2FjdGlvbih7IGJsb2Nrc0JlaGluZCwgZXhwaXJlU2Vjb25kcywgYWN0aW9ucywgLi4udHJhbnNhY3Rpb24gfTogYW55KSB7XHJcbiAgICAgICAgbGV0IGluZm86IEdldEluZm9SZXN1bHQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYWluSWQpIHtcclxuICAgICAgICAgICAgaW5mbyA9IGF3YWl0IHRoaXMucnBjLmdldF9pbmZvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhaW5JZCA9IGluZm8uY2hhaW5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChibG9ja3NCZWhpbmQgIT09IHVuZGVmaW5lZCAmJiBleHBpcmVTZWNvbmRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZvKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IGF3YWl0IHRoaXMucnBjLmdldF9pbmZvKCk7XHJcbiAgICAgICAgICAgIGxldCByZWZCbG9jayA9IGF3YWl0IHRoaXMucnBjLmdldF9ibG9jayhpbmZvLmhlYWRfYmxvY2tfbnVtIC0gYmxvY2tzQmVoaW5kKTtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSB7IC4uLnNlci50cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jaywgZXhwaXJlU2Vjb25kcyksIC4uLnRyYW5zYWN0aW9uIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyYW5zYWN0aW9uID0geyAuLi50cmFuc2FjdGlvbiwgYWN0aW9uczogYXdhaXQgdGhpcy5zZXJpYWxpemVBY3Rpb25zKGFjdGlvbnMpIH07XHJcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IHRoaXMuc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVLZXlzID0gYXdhaXQgdGhpcy5zaWduYXR1cmVQcm92aWRlci5nZXRBdmFpbGFibGVLZXlzKCk7XHJcbiAgICAgICAgbGV0IHJlcXVpcmVkS2V5cyA9IGF3YWl0IHRoaXMuYXV0aG9yaXR5UHJvdmlkZXIuZ2V0UmVxdWlyZWRLZXlzKHsgdHJhbnNhY3Rpb24sIGF2YWlsYWJsZUtleXMgfSk7XHJcbiAgICAgICAgbGV0IHNpZ25hdHVyZXMgPSBhd2FpdCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLnNpZ24oeyBjaGFpbklkOiB0aGlzLmNoYWluSWQsIHJlcXVpcmVkS2V5cywgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24gfSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucnBjLnB1c2hfdHJhbnNhY3Rpb24oe1xyXG4gICAgICAgICAgICBzaWduYXR1cmVzLFxyXG4gICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0gLy8gQXBpXHJcbiIsIi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzMi9MSUNFTlNFLnR4dFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgcmlwZW1kMTYwID0gcmVxdWlyZSgnLi9yaXBlbWQnKS5SSVBFTUQxNjAuaGFzaCBhcyAoYTogVWludDhBcnJheSkgPT4gQXJyYXlCdWZmZXI7XHJcblxyXG5jb25zdCBiYXNlNThfY2hhcnMgPSBcIjEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXpcIjtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZV9iYXNlNThfbWFwKCkge1xyXG4gICAgbGV0IGJhc2U1OF9tYXAgPSBBcnJheSgyNTYpLmZpbGwoLTEpIGFzIG51bWJlcltdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlNThfY2hhcnMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgYmFzZTU4X21hcFtiYXNlNThfY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xyXG4gICAgcmV0dXJuIGJhc2U1OF9tYXA7XHJcbn1cclxuXHJcbmNvbnN0IGJhc2U1OF9tYXAgPSBjcmVhdGVfYmFzZTU4X21hcCgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTmVnYXRpdmUoYmluOiBVaW50OEFycmF5KSB7XHJcbiAgICByZXR1cm4gKGJpbltiaW4ubGVuZ3RoIC0gMV0gJiAweDgwKSAhPT0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShiaW46IFVpbnQ4QXJyYXkpIHtcclxuICAgIGxldCBjYXJyeSA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCB4ID0gKH5iaW5baV0gJiAweGZmKSArIGNhcnJ5O1xyXG4gICAgICAgIGJpbltpXSA9IHg7XHJcbiAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsVG9CaW5hcnkoc2l6ZTogbnVtYmVyLCBzOiBzdHJpbmcpIHtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheShzaXplKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBzcmNEaWdpdCA9IHMuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoc3JjRGlnaXQgPCAnMCcuY2hhckNvZGVBdCgwKSB8fCBzcmNEaWdpdCA+ICc5Jy5jaGFyQ29kZUF0KDApKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIG51bWJlclwiKTtcclxuICAgICAgICBsZXQgY2FycnkgPSBzcmNEaWdpdCAtICcwJy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gcmVzdWx0W2pdICogMTAgKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcclxuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXJyeSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibnVtYmVyIGlzIG91dCBvZiByYW5nZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWduZWREZWNpbWFsVG9CaW5hcnkoc2l6ZTogbnVtYmVyLCBzOiBzdHJpbmcpIHtcclxuICAgIGxldCBuZWdhdGl2ZSA9IHNbMF0gPT09ICctJztcclxuICAgIGlmIChuZWdhdGl2ZSlcclxuICAgICAgICBzID0gcy5zdWJzdHIoMSk7XHJcbiAgICBsZXQgcmVzdWx0ID0gZGVjaW1hbFRvQmluYXJ5KHNpemUsIHMpO1xyXG4gICAgaWYgKG5lZ2F0aXZlKVxyXG4gICAgICAgIG5lZ2F0ZShyZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVRvRGVjaW1hbChiaW46IFVpbnQ4QXJyYXksIG1pbkRpZ2l0cyA9IDEpIHtcclxuICAgIGxldCByZXN1bHQgPSBBcnJheShtaW5EaWdpdHMpLmZpbGwoJzAnLmNoYXJDb2RlQXQoMCkpIGFzIG51bWJlcltdO1xyXG4gICAgZm9yIChsZXQgaSA9IGJpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgIGxldCBjYXJyeSA9IGJpbltpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICBsZXQgeCA9ICgocmVzdWx0W2pdIC0gJzAnLmNoYXJDb2RlQXQoMCkpIDw8IDgpICsgY2Fycnk7XHJcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9ICcwJy5jaGFyQ29kZUF0KDApICsgeCAlIDEwO1xyXG4gICAgICAgICAgICBjYXJyeSA9ICh4IC8gMTApIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcwJy5jaGFyQ29kZUF0KDApICsgY2FycnkgJSAxMCk7XHJcbiAgICAgICAgICAgIGNhcnJ5ID0gKGNhcnJ5IC8gMTApIHwgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ucmVzdWx0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25lZEJpbmFyeVRvRGVjaW1hbChiaW46IFVpbnQ4QXJyYXksIG1pbkRpZ2l0cyA9IDEpIHtcclxuICAgIGlmIChpc05lZ2F0aXZlKGJpbikpIHtcclxuICAgICAgICBsZXQgeCA9IGJpbi5zbGljZSgpO1xyXG4gICAgICAgIG5lZ2F0ZSh4KTtcclxuICAgICAgICByZXR1cm4gJy0nICsgYmluYXJ5VG9EZWNpbWFsKHgsIG1pbkRpZ2l0cyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmluYXJ5VG9EZWNpbWFsKGJpbiwgbWluRGlnaXRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U1OFRvQmluYXJ5KHNpemU6IG51bWJlciwgczogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgY2FycnkgPSBiYXNlNThfbWFwW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgaWYgKGNhcnJ5IDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBiYXNlLTU4IHZhbHVlXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcclxuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXJyeSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmFzZS01OCB2YWx1ZSBpcyBvdXQgb2YgcmFuZ2VcIik7XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVRvQmFzZTU4KGJpbjogVWludDhBcnJheSwgbWluRGlnaXRzID0gMSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdIGFzIG51bWJlcltdO1xyXG4gICAgZm9yIChsZXQgYnl0ZSBvZiBiaW4pIHtcclxuICAgICAgICBsZXQgY2FycnkgPSBieXRlO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gKGJhc2U1OF9tYXBbcmVzdWx0W2pdXSA8PCA4KSArIGNhcnJ5O1xyXG4gICAgICAgICAgICByZXN1bHRbal0gPSBiYXNlNThfY2hhcnMuY2hhckNvZGVBdCh4ICUgNTgpO1xyXG4gICAgICAgICAgICBjYXJyeSA9ICh4IC8gNTgpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJhc2U1OF9jaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcclxuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyA1OCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGJ5dGUgb2YgYmluKVxyXG4gICAgICAgIGlmIChieXRlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcxJy5jaGFyQ29kZUF0KDApKTtcclxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5yZXN1bHQpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZW51bSBLZXlUeXBlIHtcclxuICAgIGsxID0gMCxcclxuICAgIHIxID0gMSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwdWJsaWNLZXlEYXRhU2l6ZSA9IDMzO1xyXG5leHBvcnQgY29uc3QgcHJpdmF0ZUtleURhdGFTaXplID0gMzI7XHJcbmV4cG9ydCBjb25zdCBzaWduYXR1cmVEYXRhU2l6ZSA9IDY1O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXkge1xyXG4gICAgdHlwZTogS2V5VHlwZTtcclxuICAgIGRhdGE6IFVpbnQ4QXJyYXk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkaWdlc3RTdWZmaXhSaXBlbWQxNjAoZGF0YTogVWludDhBcnJheSwgc3VmZml4OiBzdHJpbmcpIHtcclxuICAgIGxldCBkID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGggKyBzdWZmaXgubGVuZ3RoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSlcclxuICAgICAgICBkW2ldID0gZGF0YVtpXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VmZml4Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGRbZGF0YS5sZW5ndGggKyBpXSA9IHN1ZmZpeC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgcmV0dXJuIHJpcGVtZDE2MChkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RyaW5nVG9LZXkoczogc3RyaW5nLCB0eXBlOiBLZXlUeXBlLCBzaXplOiBudW1iZXIsIHN1ZmZpeDogc3RyaW5nKTogS2V5IHtcclxuICAgIGxldCB3aG9sZSA9IGJhc2U1OFRvQmluYXJ5KHNpemUgKyA0LCBzKTtcclxuICAgIGxldCByZXN1bHQgPSB7IHR5cGUsIGRhdGE6IG5ldyBVaW50OEFycmF5KHdob2xlLmJ1ZmZlciwgMCwgc2l6ZSkgfTtcclxuICAgIGxldCBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAocmVzdWx0LmRhdGEsIHN1ZmZpeCkpO1xyXG4gICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbc2l6ZSArIDBdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbc2l6ZSArIDFdIHx8IGRpZ2VzdFsyXSAhPT0gd2hvbGVbc2l6ZSArIDJdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbc2l6ZSArIDNdKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNoZWNrc3VtIGRvZXNuJ3QgbWF0Y2hcIik7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBrZXlUb1N0cmluZyhrZXk6IEtleSwgc3VmZml4OiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKGtleS5kYXRhLCBzdWZmaXgpKTtcclxuICAgIGxldCB3aG9sZSA9IG5ldyBVaW50OEFycmF5KGtleS5kYXRhLmxlbmd0aCArIDQpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXkuZGF0YS5sZW5ndGg7ICsraSlcclxuICAgICAgICB3aG9sZVtpXSA9IGtleS5kYXRhW2ldO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyArK2kpXHJcbiAgICAgICAgd2hvbGVbaSArIGtleS5kYXRhLmxlbmd0aF0gPSBkaWdlc3RbaV07XHJcbiAgICByZXR1cm4gcHJlZml4ICsgYmluYXJ5VG9CYXNlNTgod2hvbGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9QdWJsaWNLZXkoczogc3RyaW5nKTogS2V5IHtcclxuICAgIGlmIChzLnN1YnN0cigwLCAzKSA9PSBcIkVPU1wiKSB7XHJcbiAgICAgICAgbGV0IHdob2xlID0gYmFzZTU4VG9CaW5hcnkocHVibGljS2V5RGF0YVNpemUgKyA0LCBzLnN1YnN0cigzKSk7XHJcbiAgICAgICAgbGV0IGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkocHVibGljS2V5RGF0YVNpemUpIH07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdWJsaWNLZXlEYXRhU2l6ZTsgKytpKVxyXG4gICAgICAgICAgICBrZXkuZGF0YVtpXSA9IHdob2xlW2ldO1xyXG4gICAgICAgIGxldCBkaWdlc3QgPSBuZXcgVWludDhBcnJheShyaXBlbWQxNjAoa2V5LmRhdGEpKTtcclxuICAgICAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtwdWJsaWNLZXlEYXRhU2l6ZV0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVszNF0gfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNoZWNrc3VtIGRvZXNuJ3QgbWF0Y2hcIik7XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH0gZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT0gXCJQVUJfUjFfXCIpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIHB1YmxpY0tleURhdGFTaXplLCBcIlIxXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdWJsaWNLZXlUb1N0cmluZyhrZXk6IEtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09IEtleVR5cGUuazEgJiYga2V5LmRhdGEubGVuZ3RoID09IHB1YmxpY0tleURhdGFTaXplKSB7XHJcbiAgICAgICAgbGV0IGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xyXG4gICAgICAgIGxldCB3aG9sZSA9IG5ldyBVaW50OEFycmF5KHB1YmxpY0tleURhdGFTaXplICsgNCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdWJsaWNLZXlEYXRhU2l6ZTsgKytpKVxyXG4gICAgICAgICAgICB3aG9sZVtpXSA9IGtleS5kYXRhW2ldO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKVxyXG4gICAgICAgICAgICB3aG9sZVtpICsgcHVibGljS2V5RGF0YVNpemVdID0gZGlnZXN0W2ldO1xyXG4gICAgICAgIHJldHVybiBcIkVPU1wiICsgYmluYXJ5VG9CYXNlNTgod2hvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChrZXkudHlwZSA9PSBLZXlUeXBlLnIxICYmIGtleS5kYXRhLmxlbmd0aCA9PSBwdWJsaWNLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksIFwiUjFcIiwgXCJQVUJfUjFfXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb1ByaXZhdGVLZXkoczogc3RyaW5nKTogS2V5IHtcclxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PSBcIlBWVF9SMV9cIilcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIHByaXZhdGVLZXlEYXRhU2l6ZSwgXCJSMVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHJpdmF0ZSBrZXkgZm9ybWF0XCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpdmF0ZUtleVRvU3RyaW5nKHNpZ25hdHVyZTogS2V5KSB7XHJcbiAgICBpZiAoc2lnbmF0dXJlLnR5cGUgPT0gS2V5VHlwZS5yMSlcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCBcIlIxXCIsIFwiUFZUX1IxX1wiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgcHJpdmF0ZSBrZXkgZm9ybWF0XCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9TaWduYXR1cmUoczogc3RyaW5nKTogS2V5IHtcclxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PSBcIlNJR19LMV9cIilcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIHNpZ25hdHVyZURhdGFTaXplLCBcIksxXCIpO1xyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT0gXCJTSUdfUjFfXCIpXHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBzaWduYXR1cmVEYXRhU2l6ZSwgXCJSMVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25hdHVyZVRvU3RyaW5nKHNpZ25hdHVyZTogS2V5KSB7XHJcbiAgICBpZiAoc2lnbmF0dXJlLnR5cGUgPT0gS2V5VHlwZS5rMSlcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCBcIksxXCIsIFwiU0lHX0sxX1wiKTtcclxuICAgIGVsc2UgaWYgKHNpZ25hdHVyZS50eXBlID09IEtleVR5cGUucjEpXHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgXCJSMVwiLCBcIlNJR19SMV9cIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXRcIik7XHJcbn1cclxuIiwiLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMyL0xJQ0VOU0UudHh0XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBBYmksIEJsb2NrVGFwb3NJbmZvIH0gZnJvbSAnLi9lb3NqczItanNvbnJwYyc7XHJcbmltcG9ydCAqIGFzIG51bWVyaWMgZnJvbSAnLi9lb3NqczItbnVtZXJpYyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGVOYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWxpYXNPZk5hbWU6IHN0cmluZztcclxuICAgIGFycmF5T2Y6IFR5cGU7XHJcbiAgICBvcHRpb25hbE9mOiBUeXBlO1xyXG4gICAgYmFzZU5hbWU6IHN0cmluZztcclxuICAgIGJhc2U6IFR5cGU7XHJcbiAgICBmaWVsZHM6IEZpZWxkW107XHJcbiAgICBzZXJpYWxpemU6IChidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogYW55KSA9PiB2b2lkO1xyXG4gICAgZGVzZXJpYWxpemU6IChidWZmZXI6IFNlcmlhbEJ1ZmZlcikgPT4gYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN5bWJvbCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcmVjaXNpb246IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb250cmFjdCB7XHJcbiAgICBhY3Rpb25zOiBNYXA8c3RyaW5nLCBUeXBlPjtcclxuICAgIHR5cGVzOiBNYXA8c3RyaW5nLCBUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uIHtcclxuICAgIGFjdG9yOiBzdHJpbmc7XHJcbiAgICBwZXJtaXNzaW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uIHtcclxuICAgIGFjY291bnQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb25bXTtcclxuICAgIGRhdGE6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkQWN0aW9uIHtcclxuICAgIGFjY291bnQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb25bXTtcclxuICAgIGRhdGE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmlhbEJ1ZmZlciB7XHJcbiAgICBsZW5ndGggPSAwO1xyXG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheSgxMDI0KTtcclxuICAgIHJlYWRQb3MgPSAwO1xyXG4gICAgdGV4dEVuY29kZXI6IFRleHRFbmNvZGVyO1xyXG4gICAgdGV4dERlY29kZXI6IFRleHREZWNvZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHsgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyIH0gPSB7fSBhcyB7IHRleHRFbmNvZGVyOiBUZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IFRleHREZWNvZGVyIH0pIHtcclxuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXIgfHwgbmV3IFRleHRFbmNvZGVyO1xyXG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlciB8fCBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgeyBmYXRhbDogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNlcnZlKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCArIHNpemUgPD0gdGhpcy5hcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgbCA9IHRoaXMuYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmxlbmd0aCArIHNpemUgPiBsKVxyXG4gICAgICAgICAgICBsID0gTWF0aC5jZWlsKGwgKiAxLjUpO1xyXG4gICAgICAgIGxldCBuZXdBcnJheSA9IG5ldyBVaW50OEFycmF5KGwpO1xyXG4gICAgICAgIG5ld0FycmF5LnNldCh0aGlzLmFycmF5KTtcclxuICAgICAgICB0aGlzLmFycmF5ID0gbmV3QXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgYXNVaW50OEFycmF5KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh0aGlzLmFycmF5LmJ1ZmZlciwgMCwgdGhpcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hBcnJheSh2OiBudW1iZXJbXSB8IFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICB0aGlzLnJlc2VydmUodi5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuYXJyYXkuc2V0KHYsIHRoaXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmxlbmd0aCArPSB2Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoKC4uLnY6IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkodik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlbdGhpcy5yZWFkUG9zKytdO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoVWludDhBcnJheUNoZWNrZWQodjogVWludDhBcnJheSwgbGVuOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodi5sZW5ndGggIT09IGxlbilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCaW5hcnkgZGF0YSBoYXMgaW5jb3JyZWN0IHNpemUnKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheSh2KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVaW50OEFycmF5KGxlbjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZFBvcyArIGxlbiA+IHRoaXMubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLnJlYWRQb3MsIGxlbik7XHJcbiAgICAgICAgdGhpcy5yZWFkUG9zICs9IGxlbjtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hVaW50MTYodjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoKCh2ID4+IDApICYgMHhmZiwgKHYgPj4gOCkgJiAweGZmKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVaW50MTYoKSB7XHJcbiAgICAgICAgbGV0IHYgPSAwO1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAwO1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCA4O1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hVaW50MzIodjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoKCh2ID4+IDApICYgMHhmZiwgKHYgPj4gOCkgJiAweGZmLCAodiA+PiAxNikgJiAweGZmLCAodiA+PiAyNCkgJiAweGZmKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVaW50MzIoKSB7XHJcbiAgICAgICAgbGV0IHYgPSAwO1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAwO1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCA4O1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAxNjtcclxuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgMjQ7XHJcbiAgICAgICAgcmV0dXJuIHYgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaE51bWJlckFzVWludDY0KHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHVzaFVpbnQzMih2ID4+PiAwKTtcclxuICAgICAgICB0aGlzLnB1c2hVaW50MzIoTWF0aC5mbG9vcih2IC8gMHgxMDAwMF8wMDAwKSA+Pj4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VWludDY0QXNOdW1iZXIoKSB7XHJcbiAgICAgICAgbGV0IGxvdyA9IHRoaXMuZ2V0VWludDMyKCk7XHJcbiAgICAgICAgbGV0IGhpZ2ggPSB0aGlzLmdldFVpbnQzMigpO1xyXG4gICAgICAgIHJldHVybiAoaGlnaCA+Pj4gMCkgKiAweDEwMDAwXzAwMDAgKyAobG93ID4+PiAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoVmFydWludDMyKHY6IG51bWJlcikge1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2ID4+PiA3KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2goMHg4MCB8ICh2ICYgMHg3ZikpO1xyXG4gICAgICAgICAgICAgICAgdiA9IHYgPj4+IDc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2godik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRWYXJ1aW50MzIoKSB7XHJcbiAgICAgICAgbGV0IHYgPSAwO1xyXG4gICAgICAgIGxldCBiaXQgPSAwO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBiID0gdGhpcy5nZXQoKTtcclxuICAgICAgICAgICAgdiB8PSAoYiAmIDB4N2YpIDw8IGJpdDtcclxuICAgICAgICAgICAgYml0ICs9IDc7XHJcbiAgICAgICAgICAgIGlmICghKGIgJiAweDgwKSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdiA+Pj4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoVmFyaW50MzIodjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoVmFydWludDMyKCh2IDw8IDEpIF4gKHYgPj4gMzEpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYXJpbnQzMigpIHtcclxuICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmFydWludDMyKCk7XHJcbiAgICAgICAgaWYgKHYgJiAxKVxyXG4gICAgICAgICAgICByZXR1cm4gKCh+dikgPj4gMSkgfCAweDgwMDBfMDAwMDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB2ID4+PiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hGbG9hdDMyKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQzMkFycmF5KFt2XSkpLmJ1ZmZlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZsb2F0MzIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5nZXRVaW50OEFycmF5KDQpLnNsaWNlKCkuYnVmZmVyKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdXNoRmxvYXQ2NCh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShuZXcgVWludDhBcnJheSgobmV3IEZsb2F0NjRBcnJheShbdl0pKS5idWZmZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGbG9hdDY0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KHRoaXMuZ2V0VWludDhBcnJheSg4KS5zbGljZSgpLmJ1ZmZlcilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaE5hbWUoczogc3RyaW5nKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2hhclRvU3ltYm9sKGM6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYyA+PSAnYScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICd6Jy5jaGFyQ29kZUF0KDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjIC0gJ2EnLmNoYXJDb2RlQXQoMCkpICsgNjtcclxuICAgICAgICAgICAgaWYgKGMgPj0gJzEnLmNoYXJDb2RlQXQoMCkgJiYgYyA8PSAnNScuY2hhckNvZGVBdCgwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyAtICcxJy5jaGFyQ29kZUF0KDApKSArIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYSA9IG5ldyBVaW50OEFycmF5KDgpO1xyXG4gICAgICAgIGxldCBiaXQgPSA2MztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBjaGFyVG9TeW1ib2wocy5jaGFyQ29kZUF0KGkpKTtcclxuICAgICAgICAgICAgaWYgKGJpdCA8IDUpXHJcbiAgICAgICAgICAgICAgICBjID0gYyA8PCAxO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gNDsgaiA+PSAwOyAtLWopIHtcclxuICAgICAgICAgICAgICAgIGlmIChiaXQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFbTWF0aC5mbG9vcihiaXQgLyA4KV0gfD0gKChjID4+IGopICYgMSkgPDwgKGJpdCAlIDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC0tYml0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKSB7XHJcbiAgICAgICAgbGV0IGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGJpdCA9IDYzOyBiaXQgPj0gMDspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpdCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IChjIDw8IDEpIHwgKChhW01hdGguZmxvb3IoYml0IC8gOCldID4+IChiaXQgJSA4KSkgJiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAtLWJpdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYyA+PSA2KVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyArICdhJy5jaGFyQ29kZUF0KDApIC0gNik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGMgPj0gMSlcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgKyAnMScuY2hhckNvZGVBdCgwKSAtIDEpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJy4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0ID09PSAnLi4uLi4uLi4uLi4uLicpXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgd2hpbGUgKHJlc3VsdC5lbmRzV2l0aCgnLicpKVxyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hCeXRlcyh2OiBudW1iZXJbXSB8IFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICB0aGlzLnB1c2hWYXJ1aW50MzIodi5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ5dGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQ4QXJyYXkodGhpcy5nZXRWYXJ1aW50MzIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaFN0cmluZyh2OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnB1c2hCeXRlcyh0aGlzLnRleHRFbmNvZGVyLmVuY29kZSh2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHREZWNvZGVyLmRlY29kZSh0aGlzLmdldEJ5dGVzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hTeW1ib2xDb2RlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBhID0gW107XHJcbiAgICAgICAgYS5wdXNoKC4uLnRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG5hbWUpKTtcclxuICAgICAgICB3aGlsZSAoYS5sZW5ndGggPCA4KVxyXG4gICAgICAgICAgICBhLnB1c2goMCk7XHJcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkoYS5zbGljZSgwLCA4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3ltYm9sQ29kZSgpIHtcclxuICAgICAgICBsZXQgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcclxuICAgICAgICBsZXQgbGVuO1xyXG4gICAgICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKVxyXG4gICAgICAgICAgICBpZiAoIWFbbGVuXSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaFN5bWJvbCh7IG5hbWUsIHByZWNpc2lvbiB9OiBTeW1ib2wpIHtcclxuICAgICAgICBsZXQgYSA9IFtwcmVjaXNpb24gJiAweGZmXTtcclxuICAgICAgICBhLnB1c2goLi4udGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpO1xyXG4gICAgICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpXHJcbiAgICAgICAgICAgIGEucHVzaCgwKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShhLnNsaWNlKDAsIDgpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeW1ib2woKTogU3ltYm9sIHtcclxuICAgICAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXQoKTtcclxuICAgICAgICBsZXQgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg3KTtcclxuICAgICAgICBsZXQgbGVuO1xyXG4gICAgICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKVxyXG4gICAgICAgICAgICBpZiAoIWFbbGVuXSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgcHJlY2lzaW9uIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaEFzc2V0KHM6IHN0cmluZykge1xyXG4gICAgICAgIHMgPSBzLnRyaW0oKTtcclxuICAgICAgICBsZXQgcG9zID0gMDtcclxuICAgICAgICBsZXQgYW1vdW50ID0gJyc7XHJcbiAgICAgICAgbGV0IHByZWNpc2lvbiA9IDA7XHJcbiAgICAgICAgaWYgKHNbcG9zXSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgIGFtb3VudCArPSAnLSc7XHJcbiAgICAgICAgICAgICsrcG9zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZm91bmREaWdpdCA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlIChwb3MgPCBzLmxlbmd0aCAmJiBzLmNoYXJDb2RlQXQocG9zKSA+PSAnMCcuY2hhckNvZGVBdCgwKSAmJiBzLmNoYXJDb2RlQXQocG9zKSA8PSAnOScuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgICAgICBmb3VuZERpZ2l0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcclxuICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZm91bmREaWdpdClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc3NldCBtdXN0IGJlZ2luIHdpdGggYSBudW1iZXInKTtcclxuICAgICAgICBpZiAoc1twb3NdID09PSAnLicpIHtcclxuICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBzLmxlbmd0aCAmJiBzLmNoYXJDb2RlQXQocG9zKSA+PSAnMCcuY2hhckNvZGVBdCgwKSAmJiBzLmNoYXJDb2RlQXQocG9zKSA8PSAnOScuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcclxuICAgICAgICAgICAgICAgICsrcHJlY2lzaW9uO1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5hbWUgPSBzLnN1YnN0cihwb3MpLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSg4LCBhbW91bnQpKTtcclxuICAgICAgICB0aGlzLnB1c2hTeW1ib2woeyBuYW1lLCBwcmVjaXNpb24gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzZXQoKSB7XHJcbiAgICAgICAgbGV0IGFtb3VudCA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcclxuICAgICAgICBsZXQgeyBuYW1lLCBwcmVjaXNpb24gfSA9IHRoaXMuZ2V0U3ltYm9sKCk7XHJcbiAgICAgICAgbGV0IHMgPSBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChhbW91bnQsIHByZWNpc2lvbiArIDEpO1xyXG4gICAgICAgIGlmIChwcmVjaXNpb24pXHJcbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cigwLCBzLmxlbmd0aCAtIHByZWNpc2lvbikgKyAnLicgKyBzLnN1YnN0cihzLmxlbmd0aCAtIHByZWNpc2lvbik7XHJcbiAgICAgICAgcmV0dXJuIHMgKyAnICcgKyBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hQdWJsaWNLZXkoczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IG51bWVyaWMuc3RyaW5nVG9QdWJsaWNLZXkocyk7XHJcbiAgICAgICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHVibGljS2V5KCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXQoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnB1YmxpY0tleURhdGFTaXplKTtcclxuICAgICAgICByZXR1cm4gbnVtZXJpYy5wdWJsaWNLZXlUb1N0cmluZyh7IHR5cGUsIGRhdGEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaFByaXZhdGVLZXkoczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IG51bWVyaWMuc3RyaW5nVG9Qcml2YXRlS2V5KHMpO1xyXG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XHJcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkoa2V5LmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByaXZhdGVLZXkoKSB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldCgpO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHJpdmF0ZUtleURhdGFTaXplKTtcclxuICAgICAgICByZXR1cm4gbnVtZXJpYy5wcml2YXRlS2V5VG9TdHJpbmcoeyB0eXBlLCBkYXRhIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hTaWduYXR1cmUoczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IG51bWVyaWMuc3RyaW5nVG9TaWduYXR1cmUocyk7XHJcbiAgICAgICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2lnbmF0dXJlKCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXQoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnNpZ25hdHVyZURhdGFTaXplKTtcclxuICAgICAgICByZXR1cm4gbnVtZXJpYy5zaWduYXR1cmVUb1N0cmluZyh7IHR5cGUsIGRhdGEgfSk7XHJcbiAgICB9XHJcbn0gLy8gU2VyaWFsQnVmZmVyXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVRvVGltZVBvaW50KGRhdGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoRGF0ZS5wYXJzZShkYXRlICsgJ1onKSAqIDEwMDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGltZVBvaW50VG9EYXRlKHVzOiBudW1iZXIpIHtcclxuICAgIGxldCBzID0gKG5ldyBEYXRlKHVzIC8gMTAwMCkpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVUb1RpbWVQb2ludFNlYyhkYXRlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKERhdGUucGFyc2UoZGF0ZSArICdaJykgLyAxMDAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVQb2ludFNlY1RvRGF0ZShzZWM6IG51bWJlcikge1xyXG4gICAgbGV0IHMgPSAobmV3IERhdGUoc2VjICogMTAwMCkpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVUb0Jsb2NrVGltZXN0YW1wKGRhdGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKERhdGUucGFyc2UoZGF0ZSArICdaJykgLSA5NDY2ODQ4MDAwMDApIC8gNTAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrVGltZXN0YW1wVG9EYXRlKHNsb3Q6IG51bWJlcikge1xyXG4gICAgbGV0IHMgPSAobmV3IERhdGUoc2xvdCAqIDUwMCArIDk0NjY4NDgwMDAwMCkpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvU3ltYm9sKHM6IHN0cmluZyk6IFN5bWJvbCB7XHJcbiAgICBsZXQgbSA9IHMubWF0Y2goL14oWzAtOV0rKSwoW0EtWl0rKSQvKTtcclxuICAgIGlmICghbSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3ltYm9sJyk7XHJcbiAgICByZXR1cm4geyBuYW1lOiBtWzJdLCBwcmVjaXNpb246ICttWzFdIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2xUb1N0cmluZyh7IG5hbWUsIHByZWNpc2lvbiB9OiBTeW1ib2wpIHtcclxuICAgIHJldHVybiBwcmVjaXNpb24gKyAnLCcgKyBuYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlUb0hleChkYXRhOiBVaW50OEFycmF5KSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICBmb3IgKGxldCB4IG9mIGRhdGEpXHJcbiAgICAgICAgcmVzdWx0ICs9ICgnMDAnICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcclxuICAgIHJldHVybiByZXN1bHQudG9VcHBlckNhc2UoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvVWludDhBcnJheShoZXg6IHN0cmluZykge1xyXG4gICAgbGV0IGwgPSBoZXgubGVuZ3RoIC8gMjtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheShsKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgKytpKVxyXG4gICAgICAgIHJlc3VsdFtpXSA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXJpYWxpemVVbmtub3duKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBhbnkpOiBTZXJpYWxCdWZmZXIge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRG9uJ3Qga25vdyBob3cgdG8gc2VyaWFsaXplIFwiICsgdGhpcy5uYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVVbmtub3duKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKTogU2VyaWFsQnVmZmVyIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkRvbid0IGtub3cgaG93IHRvIGRlc2VyaWFsaXplIFwiICsgdGhpcy5uYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplU3RydWN0KGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmJhc2UpXHJcbiAgICAgICAgdGhpcy5iYXNlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEpO1xyXG4gICAgZm9yIChsZXQgZmllbGQgb2YgdGhpcy5maWVsZHMpIHtcclxuICAgICAgICBpZiAoIShmaWVsZC5uYW1lIGluIGRhdGEpKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgJyArIHRoaXMubmFtZSArICcuJyArIGZpZWxkLm5hbWUgKyAnICh0eXBlPScgKyBmaWVsZC50eXBlLm5hbWUgKyAnKScpO1xyXG4gICAgICAgIGZpZWxkLnR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YVtmaWVsZC5uYW1lXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplU3RydWN0KGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgaWYgKHRoaXMuYmFzZSlcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmJhc2UuZGVzZXJpYWxpemUoYnVmZmVyKTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgIGZvciAobGV0IGZpZWxkIG9mIHRoaXMuZmllbGRzKVxyXG4gICAgICAgIHJlc3VsdFtmaWVsZC5uYW1lXSA9IGZpZWxkLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZUFycmF5KGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBhbnlbXSkge1xyXG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGF0YS5sZW5ndGgpO1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBkYXRhKVxyXG4gICAgICAgIHRoaXMuYXJyYXlPZi5zZXJpYWxpemUoYnVmZmVyLCBpdGVtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVBcnJheShidWZmZXI6IFNlcmlhbEJ1ZmZlcikge1xyXG4gICAgbGV0IGxlbiA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcclxuICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpXHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hcnJheU9mLmRlc2VyaWFsaXplKGJ1ZmZlcikpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VyaWFsaXplT3B0aW9uYWwoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IGFueSkge1xyXG4gICAgaWYgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYnVmZmVyLnB1c2goMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ1ZmZlci5wdXNoKDEpO1xyXG4gICAgICAgIHRoaXMub3B0aW9uYWxPZi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVPcHRpb25hbChidWZmZXI6IFNlcmlhbEJ1ZmZlcikge1xyXG4gICAgaWYgKGJ1ZmZlci5nZXQoKSlcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbE9mLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDcmVhdGVUeXBlQXJncyB7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgYWxpYXNPZk5hbWU/OiBzdHJpbmc7XHJcbiAgICBhcnJheU9mPzogVHlwZTtcclxuICAgIG9wdGlvbmFsT2Y/OiBUeXBlO1xyXG4gICAgYmFzZU5hbWU/OiBzdHJpbmc7XHJcbiAgICBiYXNlPzogVHlwZTtcclxuICAgIGZpZWxkcz86IEZpZWxkW107XHJcbiAgICBzZXJpYWxpemU/OiAoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IGFueSkgPT4gdm9pZDtcclxuICAgIGRlc2VyaWFsaXplPzogKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSA9PiBhbnk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVR5cGUoYXR0cnM6IENyZWF0ZVR5cGVBcmdzKTogVHlwZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICc8bWlzc2luZyBuYW1lPicsXHJcbiAgICAgICAgYWxpYXNPZk5hbWU6ICcnLFxyXG4gICAgICAgIGFycmF5T2Y6IG51bGwsXHJcbiAgICAgICAgb3B0aW9uYWxPZjogbnVsbCxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgYmFzZTogbnVsbCxcclxuICAgICAgICBmaWVsZHM6IFtdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplVW5rbm93bixcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVVbmtub3duLFxyXG4gICAgICAgIC4uLmF0dHJzXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5pdGlhbFR5cGVzKCk6IE1hcDxzdHJpbmcsIFR5cGU+IHtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHtcclxuICAgICAgICBib29sOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2Jvb2wnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IGJvb2xlYW4pIHsgYnVmZmVyLnB1c2goZGF0YSA/IDEgOiAwKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuICEhYnVmZmVyLmdldCgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVpbnQ4OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3VpbnQ4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBudW1iZXIpIHsgYnVmZmVyLnB1c2goZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaW50ODogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpbnQ4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBudW1iZXIpIHsgYnVmZmVyLnB1c2goZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCkgPDwgMjQgPj4gMjQ7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdWludDE2OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3VpbnQxNicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVWludDE2KGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQxNigpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGludDE2OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2ludDE2JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBudW1iZXIpIHsgYnVmZmVyLnB1c2hVaW50MTYoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDE2KCkgPDwgMTYgPj4gMTY7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdWludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3VpbnQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQzMigpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVpbnQ2NDogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd1aW50NjQnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZyB8IG51bWJlcikgeyBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuZGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGludDY0OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2ludDY0JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcgfCBudW1iZXIpIHsgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSg4LCAnJyArIGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBpbnQzMjogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpbnQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoVWludDMyKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQzMigpIHwgMDsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB2YXJ1aW50MzI6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndmFydWludDMyJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBudW1iZXIpIHsgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VmFydWludDMyKCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdmFyaW50MzI6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndmFyaW50MzInLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IG51bWJlcikgeyBidWZmZXIucHVzaFZhcmludDMyKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFZhcmludDMyKCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdWludDEyODogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTI4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLmRlY2ltYWxUb0JpbmFyeSgxNiwgZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBpbnQxMjg6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnaW50MTI4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSgxNiwgZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5zaWduZWRCaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBmbG9hdDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0MzInLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IG51bWJlcikgeyBidWZmZXIucHVzaEZsb2F0MzIoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQzMigpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZsb2F0NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQ2NCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogbnVtYmVyKSB7IGJ1ZmZlci5wdXNoRmxvYXQ2NChkYXRhKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRGbG9hdDY0KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZmxvYXQxMjg6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQxMjgnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGhleFRvVWludDhBcnJheShkYXRhKSwgMTYpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgxNikpOyB9LFxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBieXRlczogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdieXRlcycsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoQnl0ZXMoaGV4VG9VaW50OEFycmF5KGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmdldEJ5dGVzKCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN0cmluZzogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFN0cmluZyhkYXRhKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaE5hbWUoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0TmFtZSgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRpbWVfcG9pbnQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoTnVtYmVyQXNVaW50NjQoZGF0ZVRvVGltZVBvaW50KGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIHRpbWVQb2ludFRvRGF0ZShidWZmZXIuZ2V0VWludDY0QXNOdW1iZXIoKSk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGltZV9wb2ludF9zZWM6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludF9zZWMnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQzMihkYXRlVG9UaW1lUG9pbnRTZWMoZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gdGltZVBvaW50U2VjVG9EYXRlKGJ1ZmZlci5nZXRVaW50MzIoKSk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYmxvY2tfdGltZXN0YW1wX3R5cGU6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnYmxvY2tfdGltZXN0YW1wX3R5cGUnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQzMihkYXRlVG9CbG9ja1RpbWVzdGFtcChkYXRhKSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBibG9ja1RpbWVzdGFtcFRvRGF0ZShidWZmZXIuZ2V0VWludDMyKCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN5bWJvbF9jb2RlOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3N5bWJvbF9jb2RlJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hTeW1ib2xDb2RlKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFN5bWJvbENvZGUoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBzeW1ib2w6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnc3ltYm9sJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hTeW1ib2woc3RyaW5nVG9TeW1ib2woZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gc3ltYm9sVG9TdHJpbmcoYnVmZmVyLmdldFN5bWJvbCgpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhc3NldDogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdhc3NldCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoQXNzZXQoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0QXNzZXQoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBjaGVja3N1bTE2MDogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja3N1bTE2MCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoaGV4VG9VaW50OEFycmF5KGRhdGEpLCAyMCk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyKSB7IHJldHVybiBhcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDIwKSk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2hlY2tzdW0yNTY6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnY2hlY2tzdW0yNTYnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGhleFRvVWludDhBcnJheShkYXRhKSwgMzIpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNoZWNrc3VtNTEyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2NoZWNrc3VtNTEyJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplKGJ1ZmZlcjogU2VyaWFsQnVmZmVyLCBkYXRhOiBzdHJpbmcpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChoZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDY0KTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoNjQpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBwdWJsaWNfa2V5OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3B1YmxpY19rZXknLFxyXG4gICAgICAgICAgICBzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIsIGRhdGE6IHN0cmluZykgeyBidWZmZXIucHVzaFB1YmxpY0tleShkYXRhKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRQdWJsaWNLZXkoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBwcml2YXRlX2tleTogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdwcml2YXRlX2tleScsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoUHJpdmF0ZUtleShkYXRhKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemUoYnVmZmVyOiBTZXJpYWxCdWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRQcml2YXRlS2V5KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc2lnbmF0dXJlOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3NpZ25hdHVyZScsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlciwgZGF0YTogc3RyaW5nKSB7IGJ1ZmZlci5wdXNoU2lnbmF0dXJlKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShidWZmZXI6IFNlcmlhbEJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFNpZ25hdHVyZSgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHJlc3VsdC5zZXQoJ2V4dGVuZGVkX2Fzc2V0JywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2V4dGVuZGVkX2Fzc2V0JyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3F1YW50aXR5JywgdHlwZU5hbWU6ICdhc3NldCcsIHR5cGU6IHJlc3VsdC5nZXQoJ2Fzc2V0JykgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnY29udHJhY3QnLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiByZXN1bHQuZ2V0KCduYW1lJykgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59IC8vIGNyZWF0ZUluaXRpYWxUeXBlcygpXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZSh0eXBlczogTWFwPHN0cmluZywgVHlwZT4sIG5hbWU6IHN0cmluZyk6IFR5cGUge1xyXG4gICAgbGV0IHR5cGUgPSB0eXBlcy5nZXQobmFtZSk7XHJcbiAgICBpZiAodHlwZSAmJiB0eXBlLmFsaWFzT2ZOYW1lKVxyXG4gICAgICAgIHJldHVybiBnZXRUeXBlKHR5cGVzLCB0eXBlLmFsaWFzT2ZOYW1lKTtcclxuICAgIGlmICh0eXBlKVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJ1tdJykpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGFycmF5T2Y6IGdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMikpLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZUFycmF5LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVBcnJheSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCc/JykpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIG9wdGlvbmFsT2Y6IGdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMSkpLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZU9wdGlvbmFsLFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVPcHRpb25hbCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgbmFtZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlc0Zyb21BYmkoaW5pdGlhbFR5cGVzOiBNYXA8c3RyaW5nLCBUeXBlPiwgYWJpOiBBYmkpIHtcclxuICAgIGxldCB0eXBlcyA9IG5ldyBNYXAoaW5pdGlhbFR5cGVzKTtcclxuICAgIGZvciAobGV0IHsgbmV3X3R5cGVfbmFtZSwgdHlwZSB9IG9mIGFiaS50eXBlcylcclxuICAgICAgICB0eXBlcy5zZXQobmV3X3R5cGVfbmFtZSxcclxuICAgICAgICAgICAgY3JlYXRlVHlwZSh7IG5hbWU6IG5ld190eXBlX25hbWUsIGFsaWFzT2ZOYW1lOiB0eXBlLCB9KSk7XHJcbiAgICBmb3IgKGxldCB7IG5hbWUsIGJhc2UsIGZpZWxkcyB9IG9mIGFiaS5zdHJ1Y3RzKSB7XHJcbiAgICAgICAgdHlwZXMuc2V0KG5hbWUsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBiYXNlTmFtZTogYmFzZSxcclxuICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMubWFwKCh7IG5hbWUsIHR5cGUgfSkgPT4gKHsgbmFtZSwgdHlwZU5hbWU6IHR5cGUsIHR5cGU6IG51bGwgfSkpLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IFtuYW1lLCB0eXBlXSBvZiB0eXBlcykge1xyXG4gICAgICAgIGlmICh0eXBlLmJhc2VOYW1lKVxyXG4gICAgICAgICAgICB0eXBlLmJhc2UgPSBnZXRUeXBlKHR5cGVzLCB0eXBlLmJhc2VOYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiB0eXBlLmZpZWxkcylcclxuICAgICAgICAgICAgZmllbGQudHlwZSA9IGdldFR5cGUodHlwZXMsIGZpZWxkLnR5cGVOYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlcztcclxufSAvLyBnZXRUeXBlc0Zyb21BYmlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jazogQmxvY2tUYXBvc0luZm8sIGV4cGlyZVNlY29uZHM6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHBpcmF0aW9uOiB0aW1lUG9pbnRTZWNUb0RhdGUoZGF0ZVRvVGltZVBvaW50U2VjKHJlZkJsb2NrLnRpbWVzdGFtcCkgKyBleHBpcmVTZWNvbmRzKSxcclxuICAgICAgICByZWZfYmxvY2tfbnVtOiByZWZCbG9jay5ibG9ja19udW0sXHJcbiAgICAgICAgcmVmX2Jsb2NrX3ByZWZpeDogcmVmQmxvY2sucmVmX2Jsb2NrX3ByZWZpeCxcclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplQWN0aW9uRGF0YShjb250cmFjdDogQ29udHJhY3QsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgIGxldCBhY3Rpb24gPSBjb250cmFjdC5hY3Rpb25zLmdldChuYW1lKTtcclxuICAgIGlmICghYWN0aW9uKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhY3Rpb24gJyArIG5hbWUgKyAnIGluIGNvbnRyYWN0ICcgKyBhY2NvdW50KTtcclxuICAgIGxldCBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyO1xyXG4gICAgYWN0aW9uLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEpO1xyXG4gICAgcmV0dXJuIGFycmF5VG9IZXgoYnVmZmVyLmFzVWludDhBcnJheSgpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUFjdGlvbihjb250cmFjdDogQ29udHJhY3QsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhdXRob3JpemF0aW9uOiBBdXRob3JpemF0aW9uW10sIGRhdGE6IGFueSk6IFNlcmlhbGl6ZWRBY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhY2NvdW50LFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgYXV0aG9yaXphdGlvbixcclxuICAgICAgICBkYXRhOiBzZXJpYWxpemVBY3Rpb25EYXRhKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhKSxcclxuICAgIH07XHJcbn1cclxuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS93bHpsYTAwMC9iYWM4M2RmNmQzYzUxOTE2YzRkZDBiYzk0N2U0Njk0Ny9yYXcvN2VlMzQ2MmIwOTVhYjIyNTgwZGRhZjE5MWY0NGE1OTBkYTZmZTMzYi9SSVBFTUQtMTYwLmpzXHJcblxyXG4vKlxyXG5cdFJJUEVNRC0xNjAuanNcclxuXHJcblx0XHRkZXZlbG9wZWRcclxuXHRcdFx0YnkgSy4gKGh0dHBzOi8vZ2l0aHViLmNvbS93bHpsYTAwMClcclxuXHRcdFx0b24gRGVjZW1iZXIgMjctMjksIDIwMTcsXHJcblxyXG5cdFx0bGljZW5zZWQgdW5kZXJcclxuXHJcblxyXG5cdFx0dGhlIE1JVCBsaWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChjKSAyMDE3IEsuXHJcblxyXG5cdFx0IFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXHJcblx0XHRvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxyXG5cdFx0ZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XHJcblx0XHRyZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcclxuXHRcdGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxyXG5cdFx0c2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcclxuXHRcdFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXHJcblx0XHRjb25kaXRpb25zOlxyXG5cclxuXHRcdCBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxyXG5cdFx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5cdFx0IFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXHJcblx0XHRFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVNcclxuXHRcdE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXHJcblx0XHROT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxyXG5cdFx0SE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXHJcblx0XHRXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcclxuXHRcdEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1JcclxuXHRcdE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJJUEVNRDE2MFxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdC8vIGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcclxuXHRcdC8vIGh0dHA6Ly9zaG9kaGdhbmdhLmluZmxpYm5ldC5hYy5pbi9iaXRzdHJlYW0vMTA2MDMvMjI5NzgvMTMvMTNfYXBwZW5kaXgucGRmXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSAvKiBpbiBieXRlcywgMSBieXRlIGlzIDggYml0cy4gKi8pXHJcblx0e1xyXG5cdFx0Ly8gIE9idGFpbiB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBwYWQgdGhlIG1lc3NhZ2UuXHJcblx0XHQvLyBJdCBkb2VzIG5vdCBjb250YWluIHRoZSBzaXplIG9mIHRoZSBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXHJcblx0XHQvKlxyXG5cdFx0XHRodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXHJcblxyXG5cdFx0XHRUaGUgQ3J5cHRvZ3JhcGhpYyBIYXNoIEZ1bmN0aW9uIFJJUEVNRC0xNjBcclxuXHJcblx0XHRcdHdyaXR0ZW4gYnlcclxuXHRcdFx0XHRCYXJ0IFByZW5lZWwsXHJcblx0XHRcdFx0SGFucyBEb2JiZXJ0aW4sXHJcblx0XHRcdFx0QW50b29uIEJvc3NlbGFlcnNcclxuXHRcdFx0aW5cclxuXHRcdFx0XHQxOTk3LlxyXG5cclxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRcdMKnNSAgICAgRGVzY3JpcHRpb24gb2YgUklQRU1ELTE2MFxyXG5cclxuXHRcdFx0Li4uLi4uXHJcblxyXG5cdFx0XHQgSW4gb3JkZXIgdG8gZ3VhcmFudGVlIHRoYXQgdGhlIHRvdGFsIGlucHV0IHNpemUgaXMgYVxyXG5cdFx0XHRtdWx0aXBsZSBvZiA1MTIgYml0cywgdGhlIGlucHV0IGlzIHBhZGRlZCBpbiB0aGUgc2FtZVxyXG5cdFx0XHR3YXkgYXMgZm9yIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgTUQ0LWZhbWlseTogb25lXHJcblx0XHRcdGFwcGVuZHMgYSBzaW5nbGUgMSBmb2xsb3dlZCBieSBhIHN0cmluZyBvZiAwcyAodGhlXHJcblx0XHRcdG51bWJlciBvZiAwcyBsaWVzIGJldHdlZW4gMCBhbmQgNTExKTsgdGhlIGxhc3QgNjQgYml0c1xyXG5cdFx0XHRvZiB0aGUgZXh0ZW5kZWQgaW5wdXQgY29udGFpbiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcblx0XHRcdG9mIHRoZSBpbnB1dCBzaXplIGluIGJpdHMsIGxlYXN0IHNpZ25pZmljYW50IGJ5dGUgZmlyc3QuXHJcblx0XHQqL1xyXG5cdFx0LypcclxuXHRcdFx0aHR0cHM6Ly90b29scy5pZXRmLm9yZy9yZmMvcmZjMTE4Ni50eHRcclxuXHJcblx0XHRcdFJGQyAxMTg2OiBNRDQgTWVzc2FnZSBEaWdlc3QgQWxnb3JpdGhtLlxyXG5cclxuXHRcdFx0d3JpdHRlbiBieVxyXG5cdFx0XHRcdFJvbmFsZCBMaW5uIFJpdmVzdFxyXG5cdFx0XHRpblxyXG5cdFx0XHRcdE9jdG9iZXIgMTk5MC5cclxuXHJcblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0XHTCpzMgICAgIE1ENCBBbGdvcml0aG0gRGVzY3JpcHRpb25cclxuXHJcblx0XHRcdC4uLi4uLlxyXG5cclxuXHRcdFx0U3RlcCAxLiBBcHBlbmQgcGFkZGluZyBiaXRzXHJcblxyXG5cdFx0XHQgVGhlIG1lc3NhZ2UgaXMgXCJwYWRkZWRcIiAoZXh0ZW5kZWQpIHNvIHRoYXQgaXRzIGxlbmd0aFxyXG5cdFx0XHQoaW4gYml0cykgaXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi4gVGhhdCBpcywgdGhlXHJcblx0XHRcdG1lc3NhZ2UgaXMgZXh0ZW5kZWQgc28gdGhhdCBpdCBpcyBqdXN0IDY0IGJpdHMgc2h5IG9mXHJcblx0XHRcdGJlaW5nIGEgbXVsdGlwbGUgb2YgNTEyIGJpdHMgbG9uZy4gUGFkZGluZyBpcyBhbHdheXNcclxuXHRcdFx0cGVyZm9ybWVkLCBldmVuIGlmIHRoZSBsZW5ndGggb2YgdGhlIG1lc3NhZ2UgaXMgYWxyZWFkeVxyXG5cdFx0XHRjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyIChpbiB3aGljaCBjYXNlIDUxMiBiaXRzIG9mXHJcblx0XHRcdHBhZGRpbmcgYXJlIGFkZGVkKS5cclxuXHJcblx0XHRcdCBQYWRkaW5nIGlzIHBlcmZvcm1lZCBhcyBmb2xsb3dzOiBhIHNpbmdsZSBcIjFcIiBiaXQgaXNcclxuXHRcdFx0YXBwZW5kZWQgdG8gdGhlIG1lc3NhZ2UsIGFuZCB0aGVuIGVub3VnaCB6ZXJvIGJpdHMgYXJlXHJcblx0XHRcdGFwcGVuZGVkIHNvIHRoYXQgdGhlIGxlbmd0aCBpbiBiaXRzIG9mIHRoZSBwYWRkZWRcclxuXHRcdFx0bWVzc2FnZSBiZWNvbWVzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuXHJcblxyXG5cdFx0XHRTdGVwIDIuIEFwcGVuZCBsZW5ndGhcclxuXHJcblx0XHRcdCBBIDY0LWJpdCByZXByZXNlbnRhdGlvbiBvZiBiICh0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlXHJcblx0XHRcdGJlZm9yZSB0aGUgcGFkZGluZyBiaXRzIHdlcmUgYWRkZWQpIGlzIGFwcGVuZGVkIHRvIHRoZVxyXG5cdFx0XHRyZXN1bHQgb2YgdGhlIHByZXZpb3VzIHN0ZXAuIEluIHRoZSB1bmxpa2VseSBldmVudCB0aGF0XHJcblx0XHRcdGIgaXMgZ3JlYXRlciB0aGFuIDJeNjQsIHRoZW4gb25seSB0aGUgbG93LW9yZGVyIDY0IGJpdHNcclxuXHRcdFx0b2YgYiBhcmUgdXNlZC4gKFRoZXNlIGJpdHMgYXJlIGFwcGVuZGVkIGFzIHR3byAzMi1iaXRcclxuXHRcdFx0d29yZHMgYW5kIGFwcGVuZGVkIGxvdy1vcmRlciB3b3JkIGZpcnN0IGluIGFjY29yZGFuY2VcclxuXHRcdFx0d2l0aCB0aGUgcHJldmlvdXMgY29udmVudGlvbnMuKVxyXG5cclxuXHRcdFx0IEF0IHRoaXMgcG9pbnQgdGhlIHJlc3VsdGluZyBtZXNzYWdlIChhZnRlciBwYWRkaW5nIHdpdGhcclxuXHRcdFx0Yml0cyBhbmQgd2l0aCBiKSBoYXMgYSBsZW5ndGggdGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZVxyXG5cdFx0XHRvZiA1MTIgYml0cy4gRXF1aXZhbGVudGx5LCB0aGlzIG1lc3NhZ2UgaGFzIGEgbGVuZ3RoXHJcblx0XHRcdHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGUgb2YgMTYgKDMyLWJpdCkgd29yZHMuIExldFxyXG5cdFx0XHRNWzAgLi4uIE4tMV0gZGVub3RlIHRoZSB3b3JkcyBvZiB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UsXHJcblx0XHRcdHdoZXJlIE4gaXMgYSBtdWx0aXBsZSBvZiAxNi5cclxuXHRcdCovXHJcblx0XHQvLyBodHRwczovL2NyeXB0by5zdGFja2V4Y2hhbmdlLmNvbS9hLzMyNDA3LzU0NTY4XHJcblx0XHQvKlxyXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMVxyXG5cdFx0XHRcdFswIGJpdDogbWVzc2FnZS5dXHJcblx0XHRcdFx0WzEgYml0OiAxLl1cclxuXHRcdFx0XHRbNDQ3IGJpdHM6IDAuXVxyXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxyXG5cclxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDJcclxuXHRcdFx0XHRbNTEyLWJpdHM6IG1lc3NhZ2VdXHJcblx0XHRcdFx0WzEgYml0OiAxLl1cclxuXHRcdFx0XHRbNDQ3IGJpdHM6IDAuXVxyXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxyXG5cclxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDNcclxuXHRcdFx0XHRbKDUxMiAtIDY0ID0gNDQ4KSBiaXRzOiBtZXNzYWdlLl1cclxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxyXG5cdFx0XHRcdFs1MTEgYml0czogMC5dXHJcblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXHJcblxyXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgNFxyXG5cdFx0XHRcdFsoNTEyIC0gNjUgPSA0NDcpIGJpdHM6IG1lc3NhZ2UuXVxyXG5cdFx0XHRcdFsxIGJpdDogMS5dXHJcblx0XHRcdFx0WzAgYml0OiAwLl1cclxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cclxuXHRcdCovXHJcblx0XHQvLyBUaGUgbnVtYmVyIG9mIHBhZGRpbmcgemVybyBiaXRzOlxyXG5cdFx0Ly8gICAgICA1MTEgLSBbeyhtZXNzYWdlIHNpemUgaW4gYml0cykgKyA2NH0gKG1vZCA1MTIpXVxyXG5cdFx0cmV0dXJuIDY0IC0gKChtZXNzYWdlX3NpemUgKyA4KSAmIDBiMDAxMTExMTEgLyogNjMgKi8pO1xyXG5cdH1cclxuXHRzdGF0aWMgcGFkKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKVxyXG5cdHtcclxuXHRcdGNvbnN0IG1lc3NhZ2Vfc2l6ZSA9IG1lc3NhZ2UuYnl0ZUxlbmd0aDtcclxuXHRcdGNvbnN0IG5fcGFkID0gUklQRU1EMTYwLmdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUpO1xyXG5cclxuXHRcdC8vICBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgIGlzICgoMiAqKiA1MykgLSAxKSBhbmRcclxuXHRcdC8vIGJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHQgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzLlxyXG5cdFx0Y29uc3QgZGl2bW9kID0gKGRpdmlkZW5kLCBkaXZpc29yKSA9PiBbXHJcblx0XHRcdE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKSxcclxuXHRcdFx0ZGl2aWRlbmQgJSBkaXZpc29yXHJcblx0XHRdO1xyXG5cdFx0LypcclxuVG8gc2hpZnRcclxuXHJcbiAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0IG9cclxuICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcclxuXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5NZXRob2QgIzFcclxuXHJcbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cclxuICAgWzAwMDAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXSAoPEE+IGNhcHR1cmVkKVxyXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUEwMDBdICg8QT4gc2hpZnRlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cclxuICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cclxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQkJCXSAoPEE+ICYgPEJfMj4gbWVyZ2VkKVxyXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxyXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXHJcblxyXG5cdFx0Y29uc3QgdWludDMyX21heF9wbHVzXzEgPSAweDEwMDAwMDAwMDsgLy8gKDIgKiogMzIpXHJcblx0XHRjb25zdCBbXHJcblx0XHRcdG1zZ19ieXRlX3NpemVfbW9zdCwgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDIxKSAtIDFdLlxyXG5cdFx0XHRtc2dfYnl0ZV9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSAxXS5cclxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCB1aW50MzJfbWF4X3BsdXNfMSk7XHJcblx0XHRjb25zdCBbXHJcblx0XHRcdGNhcnJ5LCAvLyBWYWx1ZSByYW5nZSBbMCwgN10uXHJcblx0XHRcdG1zZ19iaXRfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gOF0uXHJcblx0XHRdID0gZGl2bW9kKG1lc3NhZ2VfYnl0ZV9zaXplX2xlYXN0ICogOCwgdWludDMyX21heF9wbHVzXzEpO1xyXG5cdFx0Y29uc3QgbWVzc2FnZV9iaXRfc2l6ZV9tb3N0ID0gbWVzc2FnZV9ieXRlX3NpemVfbW9zdCAqIDhcclxuXHRcdFx0KyBjYXJyeTsgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDI0KSAtIDFdLlxyXG5cclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbk1ldGhvZCAjMlxyXG4gICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XHJcbiAgICAgIFswMDAwMCAwMDBBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQSAgQUFBXSAoPEE+IGNhcHR1cmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgWzAwMEJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gc2hpZnRlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxyXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxyXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXHJcblxyXG5cdFx0Ki9cclxuXHRcdGNvbnN0IFtcclxuXHRcdFx0bXNnX2JpdF9zaXplX21vc3QsXHJcblx0XHRcdG1zZ19iaXRfc2l6ZV9sZWFzdFxyXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIDUzNjg3MDkxMiAvKiAoMiAqKiAyOSkgKi8pXHJcblx0XHRcdC5tYXAoKHgsIGluZGV4KSA9PiAoaW5kZXggPyAoeCAqIDgpIDogeCkpO1xyXG5cclxuXHRcdC8vIGBBcnJheUJ1ZmZlci50cmFuc2ZlcigpYCBpcyBub3Qgc3VwcG9ydGVkLlxyXG5cdFx0Y29uc3QgcGFkZGVkID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZV9zaXplICsgbl9wYWQgKyA4KTtcclxuXHRcdHBhZGRlZC5zZXQobmV3IFVpbnQ4QXJyYXkobWVzc2FnZSksIDApO1xyXG5cdFx0Y29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHBhZGRlZC5idWZmZXIpO1xyXG5cdFx0ZGF0YV92aWV3LnNldFVpbnQ4KG1lc3NhZ2Vfc2l6ZSwgMGIxMDAwMDAwMCk7XHJcblx0XHRkYXRhX3ZpZXcuc2V0VWludDMyKFxyXG5cdFx0XHRtZXNzYWdlX3NpemUgKyBuX3BhZCxcclxuXHRcdFx0bXNnX2JpdF9zaXplX2xlYXN0LFxyXG5cdFx0XHR0cnVlIC8vIExpdHRsZS1lbmRpYW5cclxuXHRcdCk7XHJcblx0XHRkYXRhX3ZpZXcuc2V0VWludDMyKFxyXG5cdFx0XHRtZXNzYWdlX3NpemUgKyBuX3BhZCArIDQsXHJcblx0XHRcdG1zZ19iaXRfc2l6ZV9tb3N0LFxyXG5cdFx0XHR0cnVlIC8vIExpdHRsZS1lbmRpYW5cclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIHBhZGRlZC5idWZmZXI7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZihqLCB4LCB5LCB6KVxyXG5cdHtcclxuXHRcdGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxyXG5cdFx0eyAvLyBFeGNsdXNpdmUtT1JcclxuXHRcdFx0cmV0dXJuIHggXiB5IF4gejtcclxuXHRcdH1cclxuXHRcdGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcclxuXHRcdHsgLy8gTXVsdGlwbGV4aW5nIChtdXhpbmcpXHJcblx0XHRcdHJldHVybiAoeCAmIHkpIHwgKH54ICYgeik7XHJcblx0XHR9XHJcblx0XHRpZigzMiA8PSBqICYmIGogPD0gNDcpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiAoeCB8IH55KSBeIHo7XHJcblx0XHR9XHJcblx0XHRpZig0OCA8PSBqICYmIGogPD0gNjMpXHJcblx0XHR7IC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxyXG5cdFx0XHRyZXR1cm4gKHggJiB6KSB8ICh5ICYgfnopO1xyXG5cdFx0fVxyXG5cdFx0aWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4geCBeICh5IHwgfnopO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgSyhqKVxyXG5cdHtcclxuXHRcdGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gMHgwMDAwMDAwMDtcclxuXHRcdH1cclxuXHRcdGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLlNRUlQyKVxyXG5cdFx0XHRyZXR1cm4gMHg1QTgyNzk5OTtcclxuXHRcdH1cclxuXHRcdGlmKDMyIDw9IGogJiYgaiA8PSA0NylcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoMykpXHJcblx0XHRcdHJldHVybiAweDZFRDlFQkExO1xyXG5cdFx0fVxyXG5cdFx0aWYoNDggPD0gaiAmJiBqIDw9IDYzKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg1KSlcclxuXHRcdFx0cmV0dXJuIDB4OEYxQkJDREM7XHJcblx0XHR9XHJcblx0XHRpZig2NCA8PSBqICYmIGogPD0gNzkpXHJcblx0XHR7XHJcblx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDcpKVxyXG5cdFx0XHRyZXR1cm4gMHhBOTUzRkQ0RTtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIEtQKGopIC8vIEsnXHJcblx0e1xyXG5cdFx0aWYoMCA8PSBqICYmIGogPD0gMTUpXHJcblx0XHR7XHJcblx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDIpKVxyXG5cdFx0XHRyZXR1cm4gMHg1MEEyOEJFNjtcclxuXHRcdH1cclxuXHRcdGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcclxuXHRcdHtcclxuXHRcdFx0Ly8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMykpXHJcblx0XHRcdHJldHVybiAweDVDNEREMTI0O1xyXG5cdFx0fVxyXG5cdFx0aWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg1KSlcclxuXHRcdFx0cmV0dXJuIDB4NkQ3MDNFRjM7XHJcblx0XHR9XHJcblx0XHRpZig0OCA8PSBqICYmIGogPD0gNjMpXHJcblx0XHR7XHJcblx0XHRcdC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDcpKVxyXG5cdFx0XHRyZXR1cm4gMHg3QTZENzZFOTtcclxuXHRcdH1cclxuXHRcdGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIDB4MDAwMDAwMDA7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBhZGRfbW9kdWxvMzIoLyogLi4uLi4uICovKVxyXG5cdHtcclxuXHRcdC8vIDEuICBNb2R1bG8gYWRkaXRpb24gKGFkZGl0aW9uIG1vZHVsbykgaXMgYXNzb2NpYXRpdmUuXHJcblx0XHQvLyAgICBodHRwczovL3Byb29md2lraS5vcmcvd2lraS9Nb2R1bG9fQWRkaXRpb25faXNfQXNzb2NpYXRpdmVcclxuIFx0XHQvLyAyLiAgQml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdFxyXG5cdFx0Ly8gICAgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzXHJcblx0XHQvLyAgICBhbmQgcmVzdWx0cyBpbiBhIDMyLWJpdHMgdmFsdWUuXHJcblx0XHRyZXR1cm4gQXJyYXlcclxuXHRcdFx0LmZyb20oYXJndW1lbnRzKVxyXG5cdFx0XHQucmVkdWNlKChhLCBiKSA9PiAoYSArIGIpLCAwKSB8IDA7XHJcblx0fVxyXG5cdHN0YXRpYyByb2wzMih2YWx1ZSwgY291bnQpXHJcblx0eyAvLyBDeWNsaWMgbGVmdCBzaGlmdCAocm90YXRlKSBvbiAzMi1iaXRzIHZhbHVlLlxyXG5cdFx0cmV0dXJuICh2YWx1ZSA8PCBjb3VudCkgfCAodmFsdWUgPj4+ICgzMiAtIGNvdW50KSk7XHJcblx0fVxyXG5cdHN0YXRpYyBoYXNoKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKVxyXG5cdHtcclxuXHRcdC8vLy8vLy8vLy8gICAgICAgUGFkZGluZyAgICAgICAvLy8vLy8vLy8vXHJcblxyXG5cdFx0Ly8gVGhlIHBhZGRlZCBtZXNzYWdlLlxyXG5cdFx0Y29uc3QgcGFkZGVkID0gUklQRU1EMTYwLnBhZChtZXNzYWdlKTtcclxuXHJcblx0XHQvLy8vLy8vLy8vICAgICBDb21wcmVzc2lvbiAgICAgLy8vLy8vLy8vL1xyXG5cclxuXHRcdC8vIE1lc3NhZ2Ugd29yZCBzZWxlY3RvcnMuXHJcblx0XHRjb25zdCByID0gW1xyXG5cdFx0XHQwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LFxyXG5cdFx0XHQ3LCA0LCAxMywgMSwgMTAsIDYsIDE1LCAzLCAxMiwgMCwgOSwgNSwgMiwgMTQsIDExLCA4LFxyXG5cdFx0XHQzLCAxMCwgMTQsIDQsIDksIDE1LCA4LCAxLCAyLCA3LCAwLCA2LCAxMywgMTEsIDUsIDEyLFxyXG5cdFx0XHQxLCA5LCAxMSwgMTAsIDAsIDgsIDEyLCA0LCAxMywgMywgNywgMTUsIDE0LCA1LCA2LCAyLFxyXG5cdFx0XHQ0LCAwLCA1LCA5LCA3LCAxMiwgMiwgMTAsIDE0LCAxLCAzLCA4LCAxMSwgNiwgMTUsIDEzXHJcblx0XHRdO1xyXG5cdFx0Y29uc3QgclAgPSBbIC8vIHInXHJcblx0XHRcdDUsIDE0LCA3LCAwLCA5LCAyLCAxMSwgNCwgMTMsIDYsIDE1LCA4LCAxLCAxMCwgMywgMTIsXHJcblx0XHRcdDYsIDExLCAzLCA3LCAwLCAxMywgNSwgMTAsIDE0LCAxNSwgOCwgMTIsIDQsIDksIDEsIDIsXHJcblx0XHRcdDE1LCA1LCAxLCAzLCA3LCAxNCwgNiwgOSwgMTEsIDgsIDEyLCAyLCAxMCwgMCwgNCwgMTMsXHJcblx0XHRcdDgsIDYsIDQsIDEsIDMsIDExLCAxNSwgMCwgNSwgMTIsIDIsIDEzLCA5LCA3LCAxMCwgMTQsXHJcblx0XHRcdDEyLCAxNSwgMTAsIDQsIDEsIDUsIDgsIDcsIDYsIDIsIDEzLCAxNCwgMCwgMywgOSwgMTFcclxuXHRcdF07XHJcblxyXG5cdFx0Ly8gQW1vdW50cyBmb3IgJ3JvdGF0ZSBsZWZ0JyBvcGVyYXRpb24uXHJcblx0XHRjb25zdCBzID0gW1xyXG5cdFx0XHQxMSwgMTQsIDE1LCAxMiwgNSwgOCwgNywgOSwgMTEsIDEzLCAxNCwgMTUsIDYsIDcsIDksIDgsXHJcblx0XHRcdDcsIDYsIDgsIDEzLCAxMSwgOSwgNywgMTUsIDcsIDEyLCAxNSwgOSwgMTEsIDcsIDEzLCAxMixcclxuXHRcdFx0MTEsIDEzLCA2LCA3LCAxNCwgOSwgMTMsIDE1LCAxNCwgOCwgMTMsIDYsIDUsIDEyLCA3LCA1LFxyXG5cdFx0XHQxMSwgMTIsIDE0LCAxNSwgMTQsIDE1LCA5LCA4LCA5LCAxNCwgNSwgNiwgOCwgNiwgNSwgMTIsXHJcblx0XHRcdDksIDE1LCA1LCAxMSwgNiwgOCwgMTMsIDEyLCA1LCAxMiwgMTMsIDE0LCAxMSwgOCwgNSwgNlxyXG5cdFx0XTtcclxuXHRcdGNvbnN0IHNQID0gWyAvLyBzJ1xyXG5cdFx0XHQ4LCA5LCA5LCAxMSwgMTMsIDE1LCAxNSwgNSwgNywgNywgOCwgMTEsIDE0LCAxNCwgMTIsIDYsXHJcblx0XHRcdDksIDEzLCAxNSwgNywgMTIsIDgsIDksIDExLCA3LCA3LCAxMiwgNywgNiwgMTUsIDEzLCAxMSxcclxuXHRcdFx0OSwgNywgMTUsIDExLCA4LCA2LCA2LCAxNCwgMTIsIDEzLCA1LCAxNCwgMTMsIDEzLCA3LCA1LFxyXG5cdFx0XHQxNSwgNSwgOCwgMTEsIDE0LCAxNCwgNiwgMTQsIDYsIDksIDEyLCA5LCAxMiwgNSwgMTUsIDgsXHJcblx0XHRcdDgsIDUsIDEyLCA5LCAxMiwgNSwgMTQsIDYsIDgsIDEzLCA2LCA1LCAxNSwgMTMsIDExLCAxMVxyXG5cdFx0XTtcclxuXHJcblx0XHQvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgd29yZC5cclxuXHRcdGNvbnN0IHdvcmRfc2l6ZSA9IDQ7XHJcblxyXG5cdFx0Ly8gVGhlIHNpemUsIGluIGJ5dGVzLCBvZiBhIDE2LXdvcmRzIGJsb2NrLlxyXG5cdFx0Y29uc3QgYmxvY2tfc2l6ZSA9IDY0O1xyXG5cclxuXHRcdC8vIFRoZSBudW1iZXIgb2YgdGhlIDE2LXdvcmRzIGJsb2Nrcy5cclxuXHRcdGNvbnN0IHQgPSBwYWRkZWQuYnl0ZUxlbmd0aCAvIGJsb2NrX3NpemU7XHJcblxyXG5cdFx0Ly8gIFRoZSBtZXNzYWdlIGFmdGVyIHBhZGRpbmcgY29uc2lzdHMgb2YgdCAxNi13b3JkIGJsb2NrcyB0aGF0XHJcblx0XHQvLyBhcmUgZGVub3RlZCB3aXRoIFhfaVtqXSwgd2l0aCAw4omkaeKJpCh0IOKIkiAxKSBhbmQgMOKJpGriiaQxNS5cclxuXHRcdGNvbnN0IFggPSAobmV3IEFycmF5KHQpKVxyXG5cdFx0XHQuZmlsbCh1bmRlZmluZWQpXHJcblx0XHRcdC5tYXAoKF8sIGkpID0+IG5ldyBQcm94eShcclxuXHRcdFx0XHRuZXcgRGF0YVZpZXcoXHJcblx0XHRcdFx0XHRwYWRkZWQsIGkgKiBibG9ja19zaXplLCBibG9ja19zaXplXHJcblx0XHRcdFx0KSwge1xyXG5cdFx0XHRcdGdldChibG9ja192aWV3LCBqKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHJldHVybiBibG9ja192aWV3LmdldFVpbnQzMihcclxuXHRcdFx0XHRcdFx0aiAqIHdvcmRfc2l6ZSxcclxuXHRcdFx0XHRcdFx0dHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdC8vICBUaGUgcmVzdWx0IG9mIFJJUEVNRC0xNjAgaXMgY29udGFpbmVkIGluIGZpdmUgMzItYml0IHdvcmRzLFxyXG5cdFx0Ly8gd2hpY2ggZm9ybSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGFsZ29yaXRobS4gVGhlIGZpbmFsXHJcblx0XHQvLyBjb250ZW50IG9mIHRoZXNlIGZpdmUgMzItYml0IHdvcmRzIGlzIGNvbnZlcnRlZCB0byBhIDE2MC1iaXRcclxuXHRcdC8vIHN0cmluZywgYWdhaW4gdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cclxuXHRcdGxldCBoID0gW1xyXG5cdFx0XHQweDY3NDUyMzAxLCAvLyBoXzBcclxuXHRcdFx0MHhFRkNEQUI4OSwgLy8gaF8xXHJcblx0XHRcdDB4OThCQURDRkUsIC8vIGhfMlxyXG5cdFx0XHQweDEwMzI1NDc2LCAvLyBoXzNcclxuXHRcdFx0MHhDM0QyRTFGMCAgLy8gaF80XHJcblx0XHRdO1xyXG5cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0OyArK2kpXHJcblx0XHR7XHJcblx0XHRcdGxldCBBID0gaFswXSwgQiA9IGhbMV0sIEMgPSBoWzJdLCBEID0gaFszXSwgRSA9IGhbNF07XHJcblx0XHRcdGxldCBBUCA9IEEsIEJQID0gQiwgQ1AgPSBDLCBEUCA9IEQsIEVQID0gRTtcclxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IDgwOyArK2opXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvLyBMZWZ0IHJvdW5kc1xyXG5cdFx0XHRcdGxldCBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcclxuXHRcdFx0XHRcdFJJUEVNRDE2MC5yb2wzMihcclxuXHRcdFx0XHRcdFx0UklQRU1EMTYwLmFkZF9tb2R1bG8zMihcclxuXHRcdFx0XHRcdFx0XHRBLFxyXG5cdFx0XHRcdFx0XHRcdFJJUEVNRDE2MC5mKGosIEIsIEMsIEQpLFxyXG5cdFx0XHRcdFx0XHRcdFhbaV1bcltqXV0sXHJcblx0XHRcdFx0XHRcdFx0UklQRU1EMTYwLksoailcclxuXHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0c1tqXVxyXG5cdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdEVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdEEgPSBFO1xyXG5cdFx0XHRcdEUgPSBEO1xyXG5cdFx0XHRcdEQgPSBSSVBFTUQxNjAucm9sMzIoQywgMTApO1xyXG5cdFx0XHRcdEMgPSBCO1xyXG5cdFx0XHRcdEIgPSBUO1xyXG5cclxuXHRcdFx0XHQvLyBSaWdodCByb3VuZHNcclxuXHRcdFx0XHRUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcclxuXHRcdFx0XHRcdFJJUEVNRDE2MC5yb2wzMihcclxuXHRcdFx0XHRcdFx0UklQRU1EMTYwLmFkZF9tb2R1bG8zMihcclxuXHRcdFx0XHRcdFx0XHRBUCxcclxuXHRcdFx0XHRcdFx0XHRSSVBFTUQxNjAuZihcclxuXHRcdFx0XHRcdFx0XHRcdDc5IC0gaixcclxuXHRcdFx0XHRcdFx0XHRcdEJQLFxyXG5cdFx0XHRcdFx0XHRcdFx0Q1AsXHJcblx0XHRcdFx0XHRcdFx0XHREUFxyXG5cdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0WFtpXVtyUFtqXV0sXHJcblx0XHRcdFx0XHRcdFx0UklQRU1EMTYwLktQKGopXHJcblx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdHNQW2pdXHJcblx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0RVBcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdEFQID0gRVA7XHJcblx0XHRcdFx0RVAgPSBEUDtcclxuXHRcdFx0XHREUCA9IFJJUEVNRDE2MC5yb2wzMihDUCwgMTApO1xyXG5cdFx0XHRcdENQID0gQlA7XHJcblx0XHRcdFx0QlAgPSBUO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzFdLCBDLCBEUCk7XHJcblx0XHRcdGhbMV0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMl0sIEQsIEVQKTtcclxuXHRcdFx0aFsyXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFszXSwgRSwgQVApO1xyXG5cdFx0XHRoWzNdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzRdLCBBLCBCUCk7XHJcblx0XHRcdGhbNF0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMF0sIEIsIENQKTtcclxuXHRcdFx0aFswXSA9IFQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gIFRoZSBmaW5hbCBvdXRwdXQgc3RyaW5nIHRoZW4gY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRhdGlvblxyXG5cdFx0Ly8gb2YgaF8wLCBoXzEsIGhfMiwgaF8zLCBhbmQgaF80IGFmdGVyIGNvbnZlcnRpbmcgZWFjaCBoX2kgdG8gYVxyXG5cdFx0Ly8gNC1ieXRlIHN0cmluZyB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxyXG5cdFx0Y29uc3QgcmVzdWx0ID0gbmV3IEFycmF5QnVmZmVyKDIwKTtcclxuXHRcdGNvbnN0IGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhyZXN1bHQpO1xyXG5cdFx0aC5mb3JFYWNoKChoX2ksIGkpID0+IGRhdGFfdmlldy5zZXRVaW50MzIoaSAqIDQsIGhfaSwgdHJ1ZSkpO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==