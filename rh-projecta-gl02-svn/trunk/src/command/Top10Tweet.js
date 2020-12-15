const fs = require('fs')
const { validParsedTweets } = require('../getAllTweets');
const { createDir } = require('../createDir');
const { minimalObj } = require('../minimalizeObj');
const path = require('path');
const { key } = require('vega');

module.exports = {
    getTopTenTweet: async function (args) {
        var tweetArr = validParsedTweets();
        //This array can be less than 10 depends on the initial size of the tweets.csv file
        var top10Tweets = [];
        //10 first tweets with an hashtag
        var idxRmd = -1;
        for (var i = 0; i < tweetArr.length; i++) {

            if (tweetArr[i].hashtags !== '' && tweetArr[i].hashtags.includes(args)) {
                top10Tweets.push(tweetArr[i]);
            }

            if (top10Tweets.length == 10) {
                idxRmd = i;
                break;
            }
        }
        // Keep idxRmd where it's been stopped, in order to not look over the array again
        // We look over the array of tweets from the parser
        // Inside the loop, we search for the array that contains the "Top 10 of tweets"

        if (idxRmd === -1) {
            throw new Error('Error Less than 10 tweets or non-Existant hashtag');
        } else {
            var minIndex = 0;
            for (var i = (idxRmd + 1); i < tweetArr.length; i++) {
                // If we find a tweet with an hashtag, and a number of tweet greater than any tweet of our array of tweets
                if (tweetArr[i].hashtags !== "" && tweetArr[i].hashtags.includes(args)) {
                    for (var k = 1; k < top10Tweets.length; k++) {
                        if (parseInt(top10Tweets[minIndex].retweet_count) > parseInt(top10Tweets[k].retweet_count)) {
                            minIndex = k;
                        }
                    }

                    if (parseInt(tweetArr[i].retweet_count) > parseInt(top10Tweets[minIndex].retweet_count)) {
                        // We replace the tweet we just found
                        top10Tweets[minIndex] = tweetArr[i];
                    }
                }
                minIndex = 0;
            }
            const filePath = path.join(__dirname, '../TopTens');
            //will create the directory if it doesn't exist
            createDir(filePath);

            const fileNamePath = path.join(filePath, '/top10tweets.txt');
            var i = 1;

            var stream = fs.createWriteStream(fileNamePath);
            top10Tweets.forEach((tweet) => {
                stream.write(i + '.\n' + stringifyObj(minimalObj(tweet)) + "\n");
                console.log(minimalObj(tweet));
                i++;
            });
            stream.end();
        }
    }
}

const stringifyObj = (obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    let stringOutput = '';

    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < values.length; j++) {
            if (i === j) {
                stringOutput += keys[i] + ':' + values[i];
            }
        }
        stringOutput += '\n';
    }
    stringOutput += '\n';
    return stringOutput;
}