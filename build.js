const csv = require("csvtojson");

// formats to build
const json = require("./formats/json");
const sqlite = require("./formats/sqlite");


const init = async () => {
    const data = await readCSV().catch(e => console.log(e));
    build(data);
}

const build = (data) => {
    json.build(data);
    sqlite.build(data);
}

const readCSV = async () => {
    try {
        const en2sn = await csv().fromFile("./inputs/en2sn.csv");
        const sn2en = await csv().fromFile("./inputs/sn2en.csv");
        return { en2sn, sn2en };
    } catch (e) {
        throw (`Unable to read csv files. : ${e}`);
    }
}

init();