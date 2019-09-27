const fs = require("fs");

const build = (data) => {
    try {
        const jsonPath = `${__dirname}/../outputs/json`;
        fs.writeFileSync(`${jsonPath}/en2sn.json`, JSON.stringify(data.en2sn));
        fs.writeFileSync(`${jsonPath}/sn2en.json`, JSON.stringify(data.sn2en));
        console.log(`Success: JSON files have been generated!.`);
    } catch (e) {
        console.log(`Error: Failed to build JSON files!. ${e}`);
    }
}

module.exports = {
    build
}