const csv = require("csvtojson");
const argio = require('argio');
const parser = argio();

const init = async () => {
    const data = await readCSV().catch(e => console.log(e));
    if (parser.get("f")) {
        let formats = parser.params.f;
        build(data, formats);
    } else {
        console.log("Usage: node build.js -f [formats]\n");
        console.log("Options:\n\t-f\t\tDefine output formats")
    }

}

const build = (data, formats) => {
    formats.forEach(format => {
        try {
            const builder = require(`./formats/${format}`);
            builder.build(data);
        } catch (error) {
            console.log(`Error: Invalid Format ${format}.`);
        }
    })
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