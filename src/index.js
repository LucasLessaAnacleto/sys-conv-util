const validBase10 = (v) => typeof v === "object" ? v?.constructor === Array ? 
v.every(e => ["string", "number"].includes(typeof e) && /^[0-9]+$/.test(String(e))) : false : 
["string", "number"].includes(typeof v) && /^[0-9]+$/.test(String(v));

const validBase2 = (v) => typeof v === "object" ? v?.constructor === Array ? 
v.every(e => ["string", "number"].includes(typeof e) && /^[01]+$/.test(String(e))) : false : 
["string", "number"].includes(typeof v) && /^[01]+$/.test(String(v));

const validText = (v) => typeof v === "string";
const validBase64 = (v) => typeof v === "string" && /^[0-9a-zA-Z\/+]+$/ && v.length % 4 === 0;

const validatType = [
    ["10", validBase10],
    ["2", validBase2],
    ["text", validText],
    ["64", validBase64]
]

function sysConvUtil(value, type = "10") {

    const types = ["10", "2", "64", "text"];
    if(!types.includes(type)) throw new RangeError("Parameter 'type' is invalid! Valid values: "+types.join(", "));

    if(!validatType.find(([t]) => t === type)[1](value)){
        throw new TypeError("The value '"+value+"' is not a valid '"+type+"'");
    };

    function _atob(b64){
        return Buffer.from(b64, "base64").toString("utf8");
    }

    function _btoa(text){
        return Buffer.from(text).toString("base64");
    }

    function _text(v, t){
        switch(t){
            case "10":
                return new Buffer.from(v?.constructor === Array ? v : [v]).toString("utf8")
            case "2":
                return new Buffer.from(v?.constructor === Array ? v.map(v => "0b"+v) : ["0b"+v]).toString("utf8")
            case "64":
                return _atob(v)
            default:
                return v
        }
    }

    function _base2(v, t){
        switch(t){
            case "text":
            case "64":
                v = t === "64" ? _text(v, "64") : v
                return v.length > 1 ? Array.from({length: v.length}, (_,i) => v.charCodeAt(i)).map(e => (e).toString(2)) : v.charCodeAt(0).toString(2)
            case "10":
                return v?.constructor === Array ? v.map(e => parseInt(e).toString(2)) : parseInt(v).toString(2);
            default:
                return String(v);
        }
    }

    function _base10(v, t){
        switch(t){
            case "text":
            case "64":
                v = t === "64" ? _text(v, "64") : v;
                return v.length > 1 ? Array.from({length: v.length}, (_,i) => v.charCodeAt(i)) : v.charCodeAt(0);
            case "2":
                return v?.constructor === Array ? v.map(e => Buffer.from(["0b" + String(e)], "binary")[0]) : Buffer.from(["0b" + String(v)], "binary")[0]
            default:
                return parseInt(v);
        }
    }
    
    function _base64(v, t){
        switch(t){
            case "text":
            case "10":
            case "2":
                v = t === "10" ? _text(v, "10") : t === "2" ? _text(v, "2") : v;
                return _btoa(v);
            default:
                return v;
        }
    }

    return {
        get base2(){
            return _base2(value, type)
        },
        get base10(){
            return _base10(value, type)
        },
        get base64(){
            return _base64(value, type)
        },
        get text(){
            return _text(value, type)
        }
    }
};


module.exports = sysConvUtil;