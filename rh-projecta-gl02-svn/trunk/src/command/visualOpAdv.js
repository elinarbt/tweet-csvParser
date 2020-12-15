const VisuaKeep = require('../VisuaKeep');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const vg = require('vega');
const vl = require('vega-lite');
const {createDir} = require('../createDir');
const { lstatSync, readdirSync} = require('fs')
const { join } = require('path')
const parse = require('csv-parse/lib/sync')
const {formatedTweet} = require('../TWEET.js');
const { visualFold } = require('./visualOp');
const FDirName = require('../FormatedDirName');

module.exports = {
    /**
     * takes the minDay, minMonth, maxDay, maxMonth and use them to find the dates in corresponding the interval
     * @param {*} minDay minimum Day where to start search
     * @param {*} minMonth minimum month where to start search
     * @param {*} maxDay maximum Day where to start search
     * @param {*} maxMonth maximum month where to start search
     */
    visuali : function(minDay, minMonth, maxDay, maxMonth){

            const minimumDay = new FDirName((minMonth + ''),minDay);
            const maximumDay = new FDirName((maxMonth + ''),maxDay);
        if(minimumDay.dayNum == -1 || minimumDay.month == -1 ||  maximumDay.dayNum == -1 || maximumDay.month == -1 ){
            throw new Error("invalid day or month minimum or maximum");
        }else if(minimumDay.month == maximumDay.month && minimumDay.dayNum > maximumDay.dayNum){
            throw new Error("min day cannot be superior to max day within the same month ");
        }else if(minimumDay.month > maximumDay.month){
            throw new Error("your minimum month cannot be superior to your maximum month");
        }else{
            const isDirectory = source => {return lstatSync(source).isDirectory()};
            module.exports.isDirectory = isDirectory;
            //get the directories contained in a directory
            const getDirectories = source => { return readdirSync(source).map(name => join(source, name)).filter(isDirectory)};
            module.exports.getDirectories = getDirectories;
            //get the files constained in a directory
            const getFiles = (source) => { return fs.readdirSync(source).map((name) => {  return path.join(source, name);}).filter((source) => {  return !isDirectory(source);});};
            module.exports.getFiles = getFiles;

            

            const validateDirName = (dirName) => {
                if(dirName.length < 10){
                    return false;
                }
                return true;
            }

            const getDirNameCheck = (el) =>{
                var temp = el.split('\\');
                if(validateDirName(temp[temp.length - 1])){
                    return true;
                }
                return false;
            }
            const getDirName = (el) =>{
                var temp = el.split('\\');
                temp = temp[temp.length - 1];
                temp = temp.split(' ');
                return temp;
            }

            const OnlyWantedFiles = () => {
                const files = [];
                const directories = getDirectories(path.join(__dirname, '../data'));
                //directory contient un tableau avec le nom des directory
                var date;
                var Format;

                directories.forEach(dir => {
                    if(getDirNameCheck(dir)){
                        date = getDirName(dir);
                        Format = new FDirName(date[1],date[2]);
                        if(Format.dayNum >= minimumDay.dayNum && Format.dayNum <= maximumDay.dayNum && Format.month >= minimumDay.month && Format.month <= maximumDay.month){
                            files.push(...getFiles(dir));
                        }
                    }                    
                })

                return files;
            }


            const csvParsedTweets = () => {
                const tweets = [];
            
                const files = OnlyWantedFiles();
                files.forEach((file) => {
                        const data = fs.readFileSync(file, 'utf8');
            
                        const tweetObjects = parse(data,{
                            columns : true,
                            skip_empty_lines : true
                        });
            
                        tweets.push(...tweetObjects);
                    
                });
            
                return tweets;
            }

            const validParsedTweets = () => {
                const tweets = csvParsedTweets();
                return tweets.map(formatedTweet);
            }

            var tweetArr = validParsedTweets();
            var visuDataArr = new Array();

            if(tweetArr.length != 0){
                var indexRmd = -1;
                var i = 0;
                do{
                    if(tweetArr[i].user_location != ''){
                        visuDataArr.push(new VisuaKeep(tweetArr[i].user_location));
                        indexRmd = i;
                    }else{
                        i++;
                    }
                }while((tweetArr[i].user_location == '') || (i == tweetArr.length));
                if(indexRmd == -1){
                    console.log("fichier sans regions d'utilisateur");
                }else{
                    if(indexRmd != (tweetArr.length -1)){

                        //Check in
                        for(var j = (indexRmd+1); j < tweetArr.length; j++){
                            var present = false;
                            if(tweetArr[j].user_location != ''){
                                for(var k = 0; k < visuDataArr.length; k++){
                                    if(tweetArr[j].user_location ==  visuDataArr[k].location ){
                                        visuDataArr[k].count++;
                                        present = true;
                                        break;
                                    }
                                }
                                if(!present){
                                    visuDataArr.push(new VisuaKeep(tweetArr[j].user_location));
                                }
                            }
                        }

                        //collected data login
                        for(var d = 0; d < visuDataArr.length; d++){
                            console.log(visuDataArr[d]);
                        }
                        const chartDir = path.join(__dirname, '../charts');
                        createDir(chartDir);
                        const pngFolderPath = path.join(chartDir , '/proportionCible.png')
                        const svgFolderPath = path.join(chartDir , '/proportionCible.svg')
                        console.log("\nCheck !".green+" Files are created in the directory '/src/charts/proportionsCible.svg' or .png".cyan);
                        var vlSpec = {
                            data : {
                                values : visuDataArr
                            },
                            mark : 'bar',
                            encoding : {
                                x : {field : 'location', type : 'nominal'},
                                y : {field : 'count', type : 'quantitative'}
                            }
                        };
                        let vegaSpec = vl.compile(vlSpec).spec;
                        var view = new vg.View(vg.parse(vegaSpec), {renderer : "none"});

                        view
                            .toSVG()
                            .then((svg) => {
                                view.finalize();

                                fs.writeFileSync(svgFolderPath, svg);

                                sharp(Buffer.from(svg))
                                        .toFormat('png')
                                        .toFile(pngFolderPath)
                        }).catch(function(err){
                            console.log(err);
                        })
                        
                    }else{
                        //The last line is the only one containing a region and so proportion is one
                        visualDataArr.push(new VisuaKeep(tweetArr[indexRmd].user_location));
                        console.log(visualDataArr[0]);
                    }
                    
                }
            }else{
                console.log("Warning !".red + " Empty file, or wrong format of data.".cyan+ 
                "It should be like : viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' and quotes are importants".cyan);
            }


        }
            
                
    }
};
