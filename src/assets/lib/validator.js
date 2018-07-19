const toString = Object.prototype.toString;
var strategies = {
    isNotEmpty: (value, msg) => {
        if (value === '') {
            return msg;
        }
    },
    required: (value, msg) => {
        if (Array.isArray(value) && value.length <= 0) {
            return msg;
        }
        if (!!value && toString.call(value) === '[object Object]' && Object.keys(value).length <= 0) {
            return msg;
        }
        if (value === '' || typeof value === 'undefined') {
            return msg;
        }
    },
    isPhoneNumber: (value, msg) => {
        if (!/^1\d{10}$/gi.test(value)) {
            return msg;
        }
    },
    isEmail: (value, msg) => {
        if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
            return msg;
        }
    },
    minLength: (value, length, msg) => {
        if (value.length < length) {
            return msg;
        }
    },
    maxLength: (value, length, msg) => {
        if (value.length > length) {
            return msg;
        }
    },
    isNumber: (value, msg) => {
        if (!/^([0-9]+)$/.test(value)) {
            return msg;
        }
    },
    isNaturalNumber: (value, msg) => {
        if (!/^[1-9]\d*$/.test(value)) {
            return msg;
        }
    },
    is2XX: (value, msg) => {
        if (!/^2\d{2}/.test(value)) {
            return msg;
        }
    },
    isIp: (value, msg) => {
        if (!(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value))) {
            return msg;
        }

    },
    isDomain: (value, msg) => {
        if(!/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(value)){
            return msg;
        }
    },
    isPort: (value, msg) => {
        if (value > 65535 || value < 1) {
            return msg;
        }
    },
    isEmpty: (value, msg) => {
        if (value == '' || value == undefined || value == null || value == [] || value == {}) {
            return msg;
        }
    }
}
var Validator = function () {
    this.strategies_array = [];
};
Validator.prototype.validate = function (value, rules) {
    this.add(value, rules);
    let msg = this.execute();
    this.clear();
    return msg;
}
Validator.prototype.add = function (value, rules) {
    let self = this;
    if (Array.isArray(rules)) {
        for (let i = 0, rule; rule = rules[i++];) {
            let strategyAry = rule.strategy.split(':');
            let errorMsg = rule.errorMsg;
            self.strategies_array.push(function () {
                let strategy = strategyAry.shift();
                strategyAry.unshift(value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(null, strategyAry);
            })
        }
    } else {
        let strategyAry = rules.strategy.split(':');
        let errorMsg = rules.errorMsg;
        self.strategies_array.push(function () {
            let strategy = strategyAry.shift();
            strategyAry.unshift(value);
            strategyAry.push(errorMsg);
            return strategies[strategy].apply(null, strategyAry);
        })
    }

};
Validator.prototype.execute = function () {
    for (let i = 0, func; func = this.strategies_array[i++];) {
        let errorMsg = func();
        if (errorMsg) {
            return errorMsg;
        }
    }
    return 'success';
};
Validator.prototype.clear = function () {
    this.strategies_array = [];
}
const validator = new Validator();
export default validator


// let val = new Validator();
// const temp = '17361904632';
// let val_phone = [
//     {
//         strategy: 'isNotEmpty',
//         errorMsg: '手机号码不能为空'
//     },
//     {
//         strategy: 'isPhoneNumber',
//         errorMsg: '手机号码格式不正确'
//     }
// ];
// let val_user = [
//     {
//         strategy: 'minLength:2',
//         errorMsg: '用户名长度不能小于2位'
//     },
//     {
//         strategy: 'isNotEmpty',
//         errorMsg: '用户名不能为空'
//     }
// ]
// let user = 'username';
// console.log(val.validate(temp,val_phone))
// console.log(val.validate(user,val_user))