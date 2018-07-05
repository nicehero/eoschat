var eosjs2_jsonrpc =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs2-jsonrpc.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_webpack@4.14.0@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/eosjs2-jsonrpc.ts":
/*!*******************************!*\
  !*** ./src/eosjs2-jsonrpc.ts ***!
  \*******************************/
/*! exports provided: RpcError, JsonRpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RpcError", function() { return RpcError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonRpc", function() { return JsonRpc; });
// copyright defined in eosjs2/LICENSE.txt
class RpcError extends Error {
    constructor(json) {
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message)
            super(json.error.details[0].message);
        else if (json.processed && json.processed.except && json.processed.except.message)
            super(json.processed.except.message);
        else
            super(json.message);
        this.json = json;
    }
}
;
function arrayToHex(data) {
    let result = '';
    for (let x of data)
        result += ('00' + x.toString(16)).slice(-2);
    return result;
}
class JsonRpc {
    constructor(endpoint, args = {}) {
        this.endpoint = endpoint;
        if (args.fetch)
            this.fetchBuiltin = args.fetch;
        else
            this.fetchBuiltin = global.fetch;
    }
    async fetch(path, body) {
        let response, json;
        try {
            let f = this.fetchBuiltin;
            response = await f(this.endpoint + path, {
                body: JSON.stringify(body),
                method: 'POST',
            });
            json = await response.json();
            if (json.processed && json.processed.except)
                throw new RpcError(json);
        }
        catch (e) {
            e.isFetchError = true;
            throw e;
        }
        if (!response.ok)
            throw new RpcError(json);
        return json;
    }
    async get_abi(account_name) { return await this.fetch('/v1/chain/get_abi', { account_name }); }
    async get_account(account_name) { return await this.fetch('/v1/chain/get_account', { account_name }); }
    async get_block(block_num_or_id) { return await this.fetch('/v1/chain/get_block', { block_num_or_id }); }
    async get_code(account_name) { return await this.fetch('/v1/chain/get_code', { account_name }); }
    async get_info() { return await this.fetch('/v1/chain/get_info', {}); }
    async get_table_rows({ json = true, code, scope, table, table_key = '', lower_bound = '', upper_bound = '', limit = 10 }) {
        return await this.fetch('/v1/chain/get_table_rows', {
            json,
            code,
            scope,
            table,
            table_key,
            lower_bound,
            upper_bound,
            limit
        });
    }
    async getRequiredKeys(args) {
        return (await this.fetch('/v1/chain/get_required_keys', {
            transaction: args.transaction,
            available_keys: args.availableKeys
        })).required_keys;
    }
    async push_transaction({ signatures, serializedTransaction }) {
        return await this.fetch('/v1/chain/push_transaction', {
            signatures,
            compression: 0,
            packed_context_free_data: '',
            packed_trx: arrayToHex(serializedTransaction),
        });
    }
} // JsonRpc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/_webpack@4.14.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.14.0@webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9baWRdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tpZF0vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL1tpZF0vLi9zcmMvZW9zanMyLWpzb25ycGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBLDBDQUEwQztBQUlwQyxjQUFnQixTQUFRLEtBQUs7SUFFL0IsWUFBWSxJQUFTO1FBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUM5RixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQzdFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFFckMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUE0REEsQ0FBQztBQUVGLG9CQUFvQixJQUFnQjtJQUNoQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJO1FBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUs7SUFJRixZQUFZLFFBQWdCLEVBQUUsT0FBWSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1lBRS9CLElBQUksQ0FBQyxZQUFZLEdBQVMsTUFBTyxDQUFDLEtBQUssQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFZLEVBQUUsSUFBUztRQUMvQixJQUFJLFFBQVEsRUFBRSxJQUFJLENBQUM7UUFDbkIsSUFBSTtZQUNBLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDMUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFO2dCQUNyQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztZQUNILElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUN2QyxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN0QixNQUFNLENBQUMsQ0FBQztTQUNYO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ1osTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFvQixJQUEyQixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlILEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBb0IsSUFBa0IsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3SCxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWdDLElBQTZCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkosS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFvQixJQUE0QixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pJLEtBQUssQ0FBQyxRQUFRLEtBQTZCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRixLQUFLLENBQUMsY0FBYyxDQUFDLEVBQ2pCLElBQUksR0FBRyxJQUFJLEVBQ1gsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsU0FBUyxHQUFHLEVBQUUsRUFDZCxXQUFXLEdBQUcsRUFBRSxFQUNoQixXQUFXLEdBQUcsRUFBRSxFQUNoQixLQUFLLEdBQUcsRUFBRSxFQUFPO1FBRWpCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUNuQiwwQkFBMEIsRUFBRTtZQUN4QixJQUFJO1lBQ0osSUFBSTtZQUNKLEtBQUs7WUFDTCxLQUFLO1lBQ0wsU0FBUztZQUNULFdBQVc7WUFDWCxXQUFXO1lBQ1gsS0FBSztTQUNSLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQTJCO1FBQzdDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUU7WUFDcEQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNyQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBdUI7UUFDN0UsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUU7WUFDbEQsVUFBVTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2Qsd0JBQXdCLEVBQUUsRUFBRTtZQUM1QixVQUFVLEVBQUUsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1NBQ2hELENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLFVBQVUiLCJmaWxlIjoiZW9zanMyLWpzb25ycGMtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lb3NqczItanNvbnJwYy50c1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3NqczIvTElDRU5TRS50eHRcclxuXHJcbmltcG9ydCB7IEF1dGhvcml0eVByb3ZpZGVyLCBBdXRob3JpdHlQcm92aWRlckFyZ3MgfSBmcm9tICcuL2Vvc2pzMi1hcGknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJwY0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAganNvbjogYW55O1xyXG4gICAgY29uc3RydWN0b3IoanNvbjogYW55KSB7XHJcbiAgICAgICAgaWYgKGpzb24uZXJyb3IgJiYganNvbi5lcnJvci5kZXRhaWxzICYmIGpzb24uZXJyb3IuZGV0YWlscy5sZW5ndGggJiYganNvbi5lcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIHN1cGVyKGpzb24uZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlKVxyXG4gICAgICAgIGVsc2UgaWYgKGpzb24ucHJvY2Vzc2VkICYmIGpzb24ucHJvY2Vzc2VkLmV4Y2VwdCAmJiBqc29uLnByb2Nlc3NlZC5leGNlcHQubWVzc2FnZSlcclxuICAgICAgICAgICAgc3VwZXIoanNvbi5wcm9jZXNzZWQuZXhjZXB0Lm1lc3NhZ2UpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3VwZXIoanNvbi5tZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmpzb24gPSBqc29uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFiaSB7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICB0eXBlczogeyBuZXdfdHlwZV9uYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9W107XHJcbiAgICBzdHJ1Y3RzOiB7IG5hbWU6IHN0cmluZywgYmFzZTogc3RyaW5nLCBmaWVsZHM6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfVtdIH1bXTtcclxuICAgIGFjdGlvbnM6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHJpY2FyZGlhbl9jb250cmFjdDogc3RyaW5nIH1bXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHZXRBYmlSZXN1bHQge1xyXG4gICAgYWNjb3VudF9uYW1lOiBzdHJpbmc7XHJcbiAgICBhYmk6IEFiaTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCbG9ja1RhcG9zSW5mbyB7XHJcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcclxuICAgIGJsb2NrX251bTogbnVtYmVyO1xyXG4gICAgcmVmX2Jsb2NrX3ByZWZpeDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldEJsb2NrUmVzdWx0IHtcclxuICAgIHRpbWVzdGFtcDogc3RyaW5nO1xyXG4gICAgcHJvZHVjZXI6IHN0cmluZztcclxuICAgIGNvbmZpcm1lZDogbnVtYmVyO1xyXG4gICAgcHJldmlvdXM6IHN0cmluZztcclxuICAgIHRyYW5zYWN0aW9uX21yb290OiBzdHJpbmc7XHJcbiAgICBhY3Rpb25fbXJvb3Q6IHN0cmluZztcclxuICAgIHNjaGVkdWxlX3ZlcnNpb246IG51bWJlcjtcclxuICAgIHByb2R1Y2VyX3NpZ25hdHVyZTogc3RyaW5nO1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGJsb2NrX251bTogbnVtYmVyO1xyXG4gICAgcmVmX2Jsb2NrX3ByZWZpeDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldENvZGVSZXN1bHQge1xyXG4gICAgYWNjb3VudF9uYW1lOiBzdHJpbmc7XHJcbiAgICBjb2RlX2hhc2g6IHN0cmluZztcclxuICAgIHdhc3Q6IHN0cmluZztcclxuICAgIHdhc206IHN0cmluZztcclxuICAgIGFiaTogQWJpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldEluZm9SZXN1bHQge1xyXG4gICAgc2VydmVyX3ZlcnNpb246IHN0cmluZztcclxuICAgIGNoYWluX2lkOiBzdHJpbmc7XHJcbiAgICBoZWFkX2Jsb2NrX251bTogbnVtYmVyO1xyXG4gICAgbGFzdF9pcnJldmVyc2libGVfYmxvY2tfbnVtOiBudW1iZXI7XHJcbiAgICBsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19pZDogc3RyaW5nO1xyXG4gICAgaGVhZF9ibG9ja19pZDogc3RyaW5nO1xyXG4gICAgaGVhZF9ibG9ja190aW1lOiBzdHJpbmc7XHJcbiAgICBoZWFkX2Jsb2NrX3Byb2R1Y2VyOiBzdHJpbmc7XHJcbiAgICB2aXJ0dWFsX2Jsb2NrX2NwdV9saW1pdDogbnVtYmVyO1xyXG4gICAgdmlydHVhbF9ibG9ja19uZXRfbGltaXQ6IG51bWJlcjtcclxuICAgIGJsb2NrX2NwdV9saW1pdDogbnVtYmVyO1xyXG4gICAgYmxvY2tfbmV0X2xpbWl0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHVzaFRyYW5zYWN0aW9uQXJncyB7XHJcbiAgICBzaWduYXR1cmVzOiBzdHJpbmdbXTtcclxuICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogVWludDhBcnJheTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFycmF5VG9IZXgoZGF0YTogVWludDhBcnJheSkge1xyXG4gICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgZm9yIChsZXQgeCBvZiBkYXRhKVxyXG4gICAgICAgIHJlc3VsdCArPSAoJzAwJyArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblJwYyBpbXBsZW1lbnRzIEF1dGhvcml0eVByb3ZpZGVyIHtcclxuICAgIGVuZHBvaW50OiBzdHJpbmc7XHJcbiAgICBmZXRjaEJ1aWx0aW46IChpbnB1dD86IFJlcXVlc3QgfCBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoZW5kcG9pbnQ6IHN0cmluZywgYXJnczogYW55ID0ge30pIHtcclxuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XHJcbiAgICAgICAgaWYgKGFyZ3MuZmV0Y2gpXHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hCdWlsdGluID0gYXJncy5mZXRjaDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hCdWlsdGluID0gKDxhbnk+Z2xvYmFsKS5mZXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaChwYXRoOiBzdHJpbmcsIGJvZHk6IGFueSkge1xyXG4gICAgICAgIGxldCByZXNwb25zZSwganNvbjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgZiA9IHRoaXMuZmV0Y2hCdWlsdGluO1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGYodGhpcy5lbmRwb2ludCArIHBhdGgsIHtcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBpZiAoanNvbi5wcm9jZXNzZWQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJwY0Vycm9yKGpzb24pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZS5pc0ZldGNoRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUnBjRXJyb3IoanNvbik7XHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0X2FiaShhY2NvdW50X25hbWU6IHN0cmluZyk6IFByb21pc2U8R2V0QWJpUmVzdWx0PiB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FiaScsIHsgYWNjb3VudF9uYW1lIH0pOyB9XHJcbiAgICBhc3luYyBnZXRfYWNjb3VudChhY2NvdW50X25hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7IHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FjY291bnQnLCB7IGFjY291bnRfbmFtZSB9KTsgfVxyXG4gICAgYXN5bmMgZ2V0X2Jsb2NrKGJsb2NrX251bV9vcl9pZDogbnVtYmVyIHwgc3RyaW5nKTogUHJvbWlzZTxHZXRCbG9ja1Jlc3VsdD4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9ibG9jaycsIHsgYmxvY2tfbnVtX29yX2lkIH0pOyB9XHJcbiAgICBhc3luYyBnZXRfY29kZShhY2NvdW50X25hbWU6IHN0cmluZyk6IFByb21pc2U8R2V0Q29kZVJlc3VsdD4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9jb2RlJywgeyBhY2NvdW50X25hbWUgfSk7IH1cclxuICAgIGFzeW5jIGdldF9pbmZvKCk6IFByb21pc2U8R2V0SW5mb1Jlc3VsdD4geyByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9pbmZvJywge30pOyB9XHJcblxyXG4gICAgYXN5bmMgZ2V0X3RhYmxlX3Jvd3Moe1xyXG4gICAgICAgIGpzb24gPSB0cnVlLFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgc2NvcGUsXHJcbiAgICAgICAgdGFibGUsXHJcbiAgICAgICAgdGFibGVfa2V5ID0gJycsXHJcbiAgICAgICAgbG93ZXJfYm91bmQgPSAnJyxcclxuICAgICAgICB1cHBlcl9ib3VuZCA9ICcnLFxyXG4gICAgICAgIGxpbWl0ID0gMTAgfTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2goXHJcbiAgICAgICAgICAgICcvdjEvY2hhaW4vZ2V0X3RhYmxlX3Jvd3MnLCB7XHJcbiAgICAgICAgICAgICAgICBqc29uLFxyXG4gICAgICAgICAgICAgICAgY29kZSxcclxuICAgICAgICAgICAgICAgIHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgdGFibGUsXHJcbiAgICAgICAgICAgICAgICB0YWJsZV9rZXksXHJcbiAgICAgICAgICAgICAgICBsb3dlcl9ib3VuZCxcclxuICAgICAgICAgICAgICAgIHVwcGVyX2JvdW5kLFxyXG4gICAgICAgICAgICAgICAgbGltaXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0UmVxdWlyZWRLZXlzKGFyZ3M6IEF1dGhvcml0eVByb3ZpZGVyQXJncyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfcmVxdWlyZWRfa2V5cycsIHtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb246IGFyZ3MudHJhbnNhY3Rpb24sXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZV9rZXlzOiBhcmdzLmF2YWlsYWJsZUtleXNcclxuICAgICAgICB9KSkucmVxdWlyZWRfa2V5cztcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwdXNoX3RyYW5zYWN0aW9uKHsgc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uIH06IFB1c2hUcmFuc2FjdGlvbkFyZ3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vcHVzaF90cmFuc2FjdGlvbicsIHtcclxuICAgICAgICAgICAgc2lnbmF0dXJlcyxcclxuICAgICAgICAgICAgY29tcHJlc3Npb246IDAsXHJcbiAgICAgICAgICAgIHBhY2tlZF9jb250ZXh0X2ZyZWVfZGF0YTogJycsXHJcbiAgICAgICAgICAgIHBhY2tlZF90cng6IGFycmF5VG9IZXgoc2VyaWFsaXplZFRyYW5zYWN0aW9uKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSAvLyBKc29uUnBjXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=