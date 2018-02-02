
var strategies = {
    isNotEmpty: (value,msg) => {
        if(value === ''){
            return msg;
        }
    },
    isPhoneNumber: (value,msg) => {
        if(!/^1\d{10}$/gi.test(value)){
            return msg;
        }
    },
    isEmail: (value,msg) => {
        if(!(/^\d{6}$/gi.test(value))){
            return msg;
        }
    },
    minLength: (value,length,msg) => {
        if(value.length < length){
            return msg;
        }
    },
    isNumber: (value,msg) => {
        if(!/^\d/.test(value)){
            return msg;
        }
    }
}
var Validator = function() {
    this.strategies_array = [];
};
Validator.prototype.add = function(value,rules){
    let self = this;
    for(let i = 0, rule;rule = rules[i++];){
        let strategyAry = rule.strategy.split(':');
        let errorMsg = rule.errorMsg;
        self.strategies_array.push(function() {
            let strategy = strategyAry.shift();
            strategyAry.unshift(value);
            strategyAry.push(errorMsg);
            return strategies[strategy].apply(null,strategyAry);
        })
    }
};
Validator.prototype.execute = function(){
    for(let i = 0,func; func = this.strategies_array[i++];){
        let errorMsg = func();      
        if(errorMsg){
            return errorMsg;
        }
    }
};
Validator.prototype.clear = function(){
    this.strategies_array = [];
}
let val = new Validator();
const temp = '1736190462';
let val_phone = [
    {
        strategy: 'isNotEmpty',
        errorMsg: '手机号码不能为空'
    },
    {
        strategy: 'isPhoneNumber',
        errorMsg: '手机号码格式不正确'
    }
];
let val_user = [
    {
        strategy: 'minLength',
        errorMsg: '用户名长度不能小于10位'
    },
    {
        strategy: 'isNotEmpty',
        errorMsg: '用户名不能为空'
    },{
        strategy: 'isNumber',
        errorMsg: '用户名需要为数字'
    }
]
let user = '';
val.add(temp,val_phone);
console.log(val.execute())
val.clear();
val.add(user,val_user);
console.log(val.execute())