async function test(title, [...suites]){
    console.log(`\n\x1b[33mTEST ${title}\x1b[0m`);
    let i = 0;
    for(const suite of suites){
        function t(subtitle, expression){
            console.log("\n" + "*".repeat(51));
            console.log(`Test ${(i+1).toString().padStart(2, "0")} - ${subtitle}:` + "\n");
            
            if(expression === true){
                console.log("\x1b[32m" + "The test passed successfully!" + "\x1b[0m");
            }else{
                console.log("\x1b[31m" + "Failed the test!" + "\x1b[0m");
                process.exit();
            }
        }
        await suite(t);
        i++
    };
};


module.exports = { test };