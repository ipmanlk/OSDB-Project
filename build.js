const argio = require('argio');
const parser = argio();

const init = () => {
    const data = readInputs();
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

const readInputs = () => {
    try {
        const en2sn = require("./inputs/en2sn.json");
        const sn2en = require("./inputs/sn2en.json");
        return { en2sn, sn2en };
    } catch (e) {
        console.log(`Unable to read input files. : ${e}`);
    }
}

init();