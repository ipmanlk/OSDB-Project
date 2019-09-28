const fs = require("fs");

const build = (data) => {
    try {
        const jsonPath = `${__dirname}/../outputs/json`;
        const en2sn = {};
        const sn2en = {};
        data.en2sn.forEach(row => { en2sn[row.word] = row.definitions.split(",") });
        data.sn2en.forEach(row => { sn2en[row.word] = row.definitions.split(",") });
        fs.writeFileSync(`${jsonPath}/en2sn.json`, JSON.stringify(en2sn));
        fs.writeFileSync(`${jsonPath}/sn2en.json`, JSON.stringify(sn2en));
        console.log(`Success: JSON files have been generated!.`);
    } catch (e) {
        console.log(`Error: Failed to build JSON files!. ${e}`);
    }
}

module.exports = {
    build
}