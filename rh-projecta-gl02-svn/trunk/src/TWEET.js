const hashtager = (hashtag) => {
    let hashtagOut = [];
    
    if(hashtag !== ''){
        if(hashtag.includes(' ')){
            hashtagOut = hashtag.split(' ');
            for(var i = 0; i < hashtagOut.length; i++){
                hashtagOut[i] = '#' + hashtagOut[i];
            }
        }else{
            hashtagOut.push(('#' + hashtag));
        }
        return hashtagOut;
    } 
    
    return hashtagOut;
}

const booleaner = (booleanVal) => {
    return booleanVal === 'true';
}
const formatedTweet = (nFTweets) => {
    return {
        coordinates : nFTweets.coordinates, 
        created_at : new Date(nFTweets.created_at), 
        hashtags : hashtager(nFTweets.hashtags), 
        media : nFTweets.media, 
        urls : nFTweets.urls,
        favorite_count : parseInt(nFTweets.favorite_count),
        id : nFTweets.id,
        in_reply_to_screen_name : nFTweets.in_reply_to_screen_name,
        in_reply_to_status_id : nFTweets.in_reply_to_status_id,
        in_reply_to_user_id : nFTweets.in_reply_to_user_id,
        lang : nFTweets.lang,
        place : nFTweets.place,
        possibly_sensitive : nFTweets.possibly_sensitive,
        retweet_count : parseInt(nFTweets.retweet_count),
        reweet_id : nFTweets.reweet_id,
        retweet_screen_name : nFTweets.retweet_screen_name,
        source : nFTweets.source,
        text : nFTweets.text,
        tweet_url : nFTweets.tweet_url,
        user_created_at : new Date(nFTweets.user_created_at),
        user_screen_name : nFTweets.user_screen_name,
        user_default_profile_image : booleaner(nFTweets.user_default_profile_image),
        user_description : nFTweets.user_description,
        user_favourites_count : parseInt(nFTweets.user_favourites_count),
        user_followers_count : parseInt(nFTweets.user_followers_count),
        user_friends_count : parseInt(nFTweets.user_friends_count),
        user_listed_count : parseInt(nFTweets.user_listed_count),
        user_location : nFTweets.user_location,
        user_name : nFTweets.user_name,
        user_screen_name : nFTweets.user_screen_name,
        user_statuses_count : parseInt(nFTweets.user_statuses_count),
        user_time_zone : nFTweets.user_time_zone,
        user_urls : nFTweets.user_urls,
        user_verified : booleaner(nFTweets.user_verified)
    }
}

module.exports.formatedTweet = formatedTweet;