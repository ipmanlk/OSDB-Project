const sqlite3 = require('sqlite3').verbose();
let osdb = new sqlite3.Database(`${__dirname}/../outputs/sqlite/osdb.db`);

// empty table
const empty = async (table) => {
    await createTable(table);
    return new Promise((resolve, reject) => {
        osdb.run(`DELETE FROM ${table}`, [], (err) => {
            if (err) {
                console.log(`Error: Failed to empty database tables! ${err}`);
                reject();
            }
            console.log("Success: Database has been cleared!.");
            resolve();
        });
    });
}

// prepare sql statements to insert data to the database
const save = async (table, data) => {
    return new Promise(async (resolve, reject) => {
        let rowCount = data.length;
        let values = "";
        let count = 1;
        let limit = 3000;

        try {
            for (let row of data) {
                values += `('${row.word}', '${row.definitions}')`;
                if (count < limit) values += ",";
                if (count == limit) {
                    let sql = `INSERT INTO ${table}(word, definitions) VALUES${values}`;
                    rowCount -= limit;
                    console.log(`Status: [SQLite] Buidling ${table} table. Left: ${rowCount} rows.`);
                    await insert(sql);
                    count = 0;
                    values = "";
                    if ((rowCount - limit) < limit) {
                        limit = rowCount;
                    }
                }
                count++;
            }
            console.log(`Success: SQLite ${table} has been built!.`);
            resolve();
        } catch (e) {
            console.log("Error: Unable to insert data!.");
            reject();
        }
    });
}

// insert data to database tables
const insert = (sql) => {
    return new Promise((resolve, reject) => {
        osdb.run(sql, [], (err) => {
            if (err) {
                console.log(`Error: Unable to insert data to the database! ${err}`);
                reject();
            }
            resolve();
        });
    })
}

// create tables if not exists
const createTable = (table) => {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS ${table}(id INTEGER PRIMARY KEY, word TEXT UNIQUE, definitions TEXT NOT NULL)`;
        osdb.run(sql, [], (err) => {
            if (err) {
                console.log(`Error: Unable to create tables!.${err}`);
                reject();
            }
            console.log("Success: Table has been created!.");
            resolve();
        });
    })
}

const build = async (data) => {
    await empty("en2sn");
    await empty("sn2en");
    await save("en2sn", data.en2sn);
    await save("sn2en", data.sn2en);
    console.log(`Success: SQLite database has been generated!.`);
}

module.exports = {
    build
}