const path =  require("path")
const fs = require("fs")

const createDir = (pathName) => {   
    if(!fs.existsSync(pathName)) {
        fs.mkdirSync(pathName);
    }
};

module.exports.createDir = createDir;