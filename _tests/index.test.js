const sysConv = require("../src/index.js");
const { test } = require("./core.js");

(async() => {
    // ********************* DECIMAL ***************************
    await test("Decimal", [
        async(t) => {
            t("deve resultar em uma falha, pois não é um Base10 valido", 
                await new Promise(res => {
                    try{
                        sysConv("a", "10");
                        res(false)
                    }catch(err){
                        if(err.name === "TypeError"){
                            res(true);
                        }else{
                            throw err;
                        }
                    }
                })
            )
        },
        (t) => {
            t("deve converter 65 em 'A'", sysConv(65).text === "A")
        },
        (t) => {
            t("deve converter [65, 66, 67] em 'ABC'", sysConv([65, 66, 67]).text === "ABC")
        },
        (t) => {
            const [n1, n2, n3] = sysConv([68, 69, 86]).base2;
            t("deve converter [68, 69, 86] em '[1000100, 1000101, 1010110]'", n1 === "1000100" && n2 === "1000101" && n3 === "1010110")
        },
        (t) => {
            console.log("aquuiiiiiiii", sysConv([72,101,108,108,111,32,87,111,114,108,100] ).base64);
            t("deve converter [72,101,108,108,111,32,87,111,114,108,100] em 'SGVsbG8gV29ybGQ='", sysConv([72,101,108,108,111,32,87,111,114,108,100] ).base64 === 'SGVsbG8gV29ybGQ=')
        }
    ]);
    // ********************* BIN ***************************
    await test("Binary", [
        async(t) => {
            t("deve resultar em uma falha, pois não é um binario valido", 
                await new Promise(res => {
                    try{
                        sysConv("0123", "2");
                        res(false)
                    }catch(err){
                        if(err.name === "TypeError"){
                            res(true);
                        }else{
                            throw err;
                        }
                    }
                })
            )
        },
        (t) => {
            t("deve converter 1100010 em 'b'", sysConv("1100010", "2").text === "b")
        },
        (t) => {
            t("deve converter [1101000, 1100101, 1101100, 1101100, 1101111] em 'hello'", sysConv([1101000, 1100101, 1101100, 1101100, 1101111], "2").text === "hello")
        },
        (t) => {
            console.log( sysConv([1101000, 1100101, 1101100, 1101100, 1101111], "2").base64);
            t("deve converter [1101000, 1100101, 1101100, 1101100, 1101111] em 'SGVsbG8='", sysConv([1101000, 1100101, 1101100, 1101100, 1101111], "2").base64 === "aGVsbG8=")
        },
        (t) => {
            const [n1, n2] = sysConv([1101000, 1100101], "2").base10;
            t("deve converter [1101000, 1100101] em [104, 101]", n1 === 104 && n2 === 101)
        }
    ]);
    // ********************* Base64 ***************************
    await test("Base64", [
        async(t) => {
            t("deve resultar em uma falha, pois não é um base64 valido", 
                await new Promise(res => {
                    try{
                        sysConv(10, "64");
                        res(false)
                    }catch(err){
                        if(err.name === "TypeError"){
                            res(true);
                        }else{
                            throw err;
                        }
                    }
                })
            )
        },
        (t) => {
            t("deve converter 'aGVsbG8=' em 'hello'", sysConv("aGVsbG8=", "64").text === "hello")
        },
        (t) => {
            const responses = sysConv("aGVsbG8=", "64").base10 ;
            t("deve converter 'aGVsbG8=' em [104, 101, 108, 108, 111]", [ 104, 101, 108, 108, 111 ].every((e, i) => responses[i] === e))
        },
        (t) => {
            const responses = sysConv("REVW", "64").base2 ;
            t("deve converter 'REVW' em ['1000100', '1000101', '1010110']", ['1000100', '1000101', '1010110'].every((e, i) => responses[i] === e))
        },
    ]);
    // ********************* Base64 ***************************
    await test("Text", [
        async(t) => {
            t("deve resultar em uma falha, pois não é um text valido", 
                await new Promise(res => {
                    try{
                        sysConv(19, "text");
                        res(false)
                    }catch(err){
                        if(err.name === "TypeError"){
                            res(true);
                        }else{
                            throw err;
                        }
                    }
                })
            )
        },
        (t) => {
            t("deve converter 'hello world' em 'aGVsbG8gd29ybGQ='", sysConv("hello world", "text").base64 === "aGVsbG8gd29ybGQ=")
        },
        (t) => {
            t("deve converter 'DEV' em '[68, 69, 86]'", (() => {
                    const [n1, n2, n3] = sysConv("DEV", "text").base10; 
                    return n1 === 68 && n2 === 69 && n3 === 86;
                })()
            )
        },
        (t) => {
            const [n1, n2, n3] = sysConv("DEV", "text").base2; 
            t("deve converter 'DEV' em '['1000100', '1000101', '1010110']'", n1 === '1000100' && n2 === '1000101' && n3 === '1010110')
        }
    ])
})()