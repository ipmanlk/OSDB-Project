const sqlite3 = require('sqlite3').verbose();
let osdb = new sqlite3.Database(`${__dirname}/../outputs/sqlite/osdb.db`);

const empty = async (table) => {
    await createTable(table);
    return new Promise((resolve, reject) => {
        osdb.run(`DELETE FROM ${table}`, [], (err) => {
            if (err) {
                reject(`Error: Failed to empty database tables! ${err}`);
            }
            resolve("Success: Database has been cleared!.");
        });
    });
}

const insert = (table, word, definitions) => {
    return new Promise((resolve, reject) => {
        osdb.run(`INSERT INTO ${table}(word, definitions) VALUES(?, ?)`, [word, definitions], (err) => {
            if (err) {
                reject(`Error: Unable to insert data to the database! ${err}`);
            }
            resolve("Success: Data has been inserted!.");
        });
    });
}

const createTable = (table) => {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS ${table}(id INTEGER PRIMARY KEY,word TEXT UNIQUE,definitions TEXT NOT NULL)`;
        osdb.run(sql, [], (err) => {
            if (err) {
                reject(`Error: Unable to create tables!. ${err}`);
            }
            resolve("Success: Table has been created!.");
        });
    })
}

const build = async (data) => {
    await empty("en2sn").catch(e => console.log(e));
    await empty("sn2en").catch(e => console.log(e));

    let counter = 1;
    for (let i of data.en2sn) {
        try {
            await insert("en2sn", i.word, i.definitions);
            console.log(`Building en2sn table. Inserting word: ${counter++}/${data.en2sn.length}`);
        } catch (e) {
            console.log(e);
            break;
        }
    }

    for (let i of data.sn2en) {
        counter = 1;
        try {
            await insert("sn2en", i.word, i.definitions);
            console.log(`Building sn2en table. Inserting word: ${counter++}/${data.sn2en.length}`);
        } catch (e) {
            console.log(e);
            break;
        }
    }
}

module.exports = {
    build
}