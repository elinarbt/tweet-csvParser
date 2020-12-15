const fs = require('fs')
const {validParsedTweets} = require('../getAllTweets');
const {createDir} = require('../createDir');
const {minimalObj} = require('../minimalizeObj');
const path = require('path');
const { key } = require('vega');
const Hashtify = require('../hashtify');

module.exports={
    getHashTagRef : async function (args){
        var tweetArr = validParsedTweets();
        var HashtifyArr = new Array();
        var find = false;
        var idxRmd = 0; 
        //On regarde si le hashtag existe et on garde l'index où on l'a trouvé
        for(var i = 0; i < tweetArr.length; i++){
            if(tweetArr[i].hashtags.includes(args)){
                find  = true;
                idxRmd = i;
                break;
            }
        }
        //si le hashtag existe
        var here = false;
        if(find){
            for(var i = idxRmd; i < tweetArr.length; i++){
                var hashtagArr = tweetArr[i].hashtags;
                if(hashtagArr.includes(args) && hashtagArr.length > 1){
                    hashtagArr.forEach(el => {
                        if(el !== args){
                            if(HashtifyArr.length == 0){
                                HashtifyArr.push(new Hashtify(el));
                            }else{
                                for(var k = 0; k < HashtifyArr.length; k++){
                                    if(HashtifyArr[k].hashtag == el){
                                        here = true;
                                        HashtifyArr[k].rec++;
                                    }
                                } 

                                if(!here){
                                    HashtifyArr.push(new Hashtify(el));
                                }
                            }

                        }
                    });
                }   
            }
            
            const filePath = path.join(__dirname, '../TopTens');
            //will create the directory if it doesn't exist
            createDir(filePath);

            const fileNamePath = path.join(filePath, '/HashtagAssociate.txt');
            var i = 1;

            var stream = fs.createWriteStream(fileNamePath);
            stream.write("Reference Hashtag Associate: " + args + "\n\n");
            HashtifyArr.forEach( (hashObj) => {
                stream.write(i + '.\n' + stringifyObj(hashObj) + "\n");
                console.log(hashObj);
                i++;
            });
            
            stream.end();
        }else{
            throw new Error('nonExistant Hashtag');
        }



    }
} 

const stringifyObj = (obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    let stringOutput = '';

    for(var i = 0; i < keys.length; i++){
        for(var j = 0; j < values.length; j++){
            if(i === j){
                stringOutput += keys[i] + ':' + values[i];
            }
        }
        stringOutput += '\n';
    }
    stringOutput += '\n';
    return stringOutput;
}



