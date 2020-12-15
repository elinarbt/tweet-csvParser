const path = require('path')
const { lstatSync, readdirSync} = require('fs')
const fs = require('fs');
const { join } = require('path')
const parse = require('csv-parse/lib/sync')
const {formatedTweet} = require('./TWEET.js');

//Make sure the folder is  effectively a folder
const isDirectory = source => {return lstatSync(source).isDirectory()};

//get the directories contained in a directory
const getDirectories = source => { return readdirSync(source).map(name => join(source, name)).filter(isDirectory)};

//get the files constained in a directory
const getFiles = (source) => { return fs.readdirSync(source).map((name) => {  return path.join(source, name);}).filter((source) => {  return !isDirectory(source);});};

//we fist get the directory

//then we get the files 
let Allfiles = () => {
    const files = [];
    const directories = getDirectories(path.join(__dirname, '/data'));

    directories.forEach(dir => {
        files.push(...getFiles(dir));
    })  
    return files;
} 


const csvParsedTweets = () => {
    const tweets = [];

    const files = Allfiles();
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



module.exports.validParsedTweets = validParsedTweets;