const argio = require('argio');
const parser = argio();
const fs = require("fs");
const fetch = require('node-fetch');

const init = async () => {
    if (parser.get("d")) {
        downloadInputs(true);
        return;
    }

    if (parser.get("f")) {
        let formats = parser.params.f;
        const downloaded = await downloadInputs();
        const data = readInputs();
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

const downloadInputs = async (forced = false) => {
    try {
        const en2snPath = "./inputs/en2sn.json";
        const sn2enPath = "./inputs/sn2en.json";
        // check if inputs exist
        if (fs.existsSync(en2snPath) && fs.existsSync(sn2enPath) & !forced) return;
        // or download them
        console.log("Status: [OSDB] Downloading databases...");
        const en2sn = await request("https://tinyurl.com/y58lada2");
        fs.writeFileSync(en2snPath, JSON.stringify(en2sn));
        const sn2en = await request("https://tinyurl.com/yxblh5js");
        fs.writeFileSync(sn2enPath, JSON.stringify(sn2en));
        console.log("Status: [OSDB] Databases have been downloaded!.");
        return true;
    } catch (error) {
        console.log(`Error: [OSDB] Unable to download databases!. ${error}`);
        return false;
    }
}

const request = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(error => {
                reject(error);
            });
    });
}

init();