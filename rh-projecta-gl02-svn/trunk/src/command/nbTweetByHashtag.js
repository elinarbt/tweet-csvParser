const { validParsedTweets } = require('../getAllTweets');
const color = require('colors')

const dateFnsIsWithinInterval = require('date-fns/isWithinInterval');
const { parseDate } = require('../date');
const { table } = require('console');


/**
 * Indicateur numéro 1
 * Donner le nombre de tweets sur un hashtag par journée, et sur une période donnée.
 * |date|nB de tweet|
 * |***|************|
 */
module.exports = {
    getNbTweetByHashtagAndByDates: async function ({ args }) {
        let tweetArr = validParsedTweets();
        const hashtagWanted = args.hashtag;

        try{
            const periodBeginDate = parseDate(args.beginDate);
            const periodEndDate = parseDate(args.endDate);
            
            const filteredDate = tweetArr.filter((tweet) => 
                dateFnsIsWithinInterval(tweet.created_at, {
                    start: periodBeginDate,
                    end: periodEndDate,
                })
            );
            
            try {
                const filteredTweets = filteredDate.filter(tweet => tweet.hashtags == `#${hashtagWanted}`)
                const numberOfTweets = filteredTweets.length
                if (numberOfTweets == 0){
                    console.log("Oops !".yellow +" This hashtag doesn't exist yet. (Try EAW18 for example)");
                }else{
                    console.log(`There ${numberOfTweets > 1 ? 'are' : 'is'} ${color.cyan(numberOfTweets)} tweet${numberOfTweets > 1 ? 's' : ''} with the hashtag '${color.cyan(hashtagWanted)}',
                    between the : ${color.cyan(args.beginDate)} and the ${color.cyan(args.endDate)}.`);
                    mapEveryDayTable(filteredTweets)
                }               
            } catch (error) {
                console.log("The .csv file contains error".red);
                console.error(error);
            }
    
        } catch(error) {
            console.log('Be careful !'.yellow +' The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"'.cyan);
            console.log('And do not forget to put the dates in order.'.cyan);
        }
    }
}

function mapEveryDayTable(filteredTweets){
    const map = new Map();
    
    filteredTweets.forEach((tweet) => {
        const dayNumber = tweet.created_at.getDay();
        const day = numbersToDay[dayNumber]
        if(map.has(day)) {
            return map.set(day, map.get(day)+1)
        }
        return map.set(day, 1)
    })
    console.table(map)
}

const numbersToDay = Object.freeze({
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
})
