const fs = require('fs');
const dirToJson = require('dir-to-json');

dirToJson("./waifu", (err, dirTree) => {
    if (err) {
        throw err;
    } else {
        fs.writeFileSync("dirTree.json", JSON.stringify(dirTree, null, 4));
    }
});