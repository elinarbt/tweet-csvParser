var TWEET = require('../TWEET');
var globalRegex = /.*/;
// CsvParser

var CsvParser = function(sTokenize, sParsedSymb){
	// The list of POI parsed from the input file.
	this.parsedTWEET = [];
    this.symb = [
                    'coordinates',
                    'created_at',
                    'hashtags',
                    'media',
                    'urls',
                    'favorite_count',
                    'id',
                    'in_reply_to_screen_name',
                    'in_reply_to_status_id',
                    'in_reply_to_user_id',
                    'lang',
                    'place',
                    'possibly_sensitive',
                    'retweet_count',
                    'reweet_id',
                    'retweet_screen_name',
                    'source',
                    'text',
                    'tweet_url',
                    'user_created_at',
                    'user_screen_name',
                    'user_default_profile_image',
                    'user_description',
                    'user_favourites_count',
                    'user_followers_count',
                    'user_friends_count',
                    'user_listed_count',
                    'user_location',
                    'user_name',
                    'user_screen_name',
                    'user_statuses_count',
                    'user_time_zone',
                    'user_urls',
                    'user_verified',
					'\n'
				];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
CsvParser.prototype.tokenize = function(data){
	var separator = /(,)(?=(?:[^"]|"[^"]*")*$)/;
	//var regexEscape = /..$[^\n]*/;
	var dataKeep = data;
	dataKeep = dataKeep.split('\n');
	for(var i = 0; i< dataKeep.length-1; i++){
		dataKeep[i] = dataKeep[i] + ',';
	}
	var dataAnnex = "";
	dataAnnex = dataKeep[0];
	for(var i = 1; i< dataKeep.length; i++){
		dataAnnex += dataKeep[i];
	}
	data = dataAnnex;
	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator)); 			
	return data;
}

// parse : analyze data by calling the first non terminal rule of the grammar
CsvParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
    }
    for(var i = 0; i< 34; i++){
        tData.shift();
    }
	this.listTweet(tData);
}

// Parser operand

CsvParser.prototype.errMsg = function(msg, input){
	this.errorCount++;
	console.log("Parsing Error ! on "+input+" -- msg : "+msg);
}

// Read and return a symbol from input
CsvParser.prototype.next = function(input){
	var curS = input.shift();
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS;
}

// accept : verify if the arg s is part of the language symbols.
CsvParser.prototype.accept = function(s){
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1){
		this.errMsg("symbol "+s+" unknown", [" "]);
		return false;
	}

	return idx;
}



// check : check whether the arg elt is on the head of the list
CsvParser.prototype.check = function(s, input){
	if(this.accept(input[0]) == this.accept(s)){
		return true;	
	}
	return false;
}

// expect : expect the next symbol to be s.
CsvParser.prototype.expect = function(s, input){
	if(s == this.next(input)){
		//console.log("Reckognized! "+s)
		return true;
	}else{
		this.errMsg("symbol "+s+" doesn't match", input);
	}
	return false;
}


// Parser rules

// <liste_poi> = *(<poi>) "$$"
CsvParser.prototype.listTweet = function(input){
    //this.expect('',input);
	this.Tweet(input);
}

// <Tweet> = "START_Tweet" <eol> <body> "END_Tweet"
CsvParser.prototype.Tweet = function(input){

	
		var args = this.body(input);
        var p = new TWEET(
							args.coordinates,
                            args.created_at,
                            args.hashtags,
                            args.media,
                            args.urls,
                            args.favorite_count,
                            args.id,
                            args.in_reply_to_screen_name,
                            args.in_reply_to_status_id,
                            args.in_reply_to_user_id,
                            args.lang,
                            args.place,
                            args.possibly_sensitive,
                            args.retweet_count,
                            args.reweet_id,
                            args.retweet_screen_name,
                            args.source,
                            args.text,
                            args.tweet_url,
                            args.user_created_at,
                            args.user_screen_name,
                            args.user_default_profile_image,
                            args.user_description,
                            args.user_favourites_count,
                            args.user_followers_count,
                            args.user_friends_count,
                            args.user_listed_count,
                            args.user_location,
                            args.user_name,
                            args.user_statuses_count,
                            args.user_time_zone,
                            args.user_urls,
							args.user_verified
						);
		this.parsedTWEET.push(p);
		if(input.length > 0){
			this.Tweet(input);
        }
        return true;
        
	
}

// <body> = <name> <eol> <latlng> <eol> <optional>
CsvParser.prototype.body = function(input){

    var coordinates = this.coordinates(input); 
    var created_at = this.created_at(input); 
    var hashtags = this.hashtags(input);
    var media = this.media(input); 
    var urls = this.urls(input);
    var favorite_count = this.favorite_count(input);
    var id = this.id(input);
    var in_reply_to_screen_name = this.in_reply_to_screen_name(input);
    var in_reply_to_status_id = this.in_reply_to_status_id(input);
    var in_reply_to_user_id = this.in_reply_to_user_id(input);
    var lang = this.lang(input);
    var place = this.place(input);
    var possibly_sensitive = this.possibly_sensitive(input);
    var retweet_count = this.retweet_count(input);
    var reweet_id = this.reweet_id(input);
    var retweet_screen_name = this.retweet_screen_name(input);
    var source = this.source(input);
    var text = this.text(input);
    var tweet_url = this.tweet_url(input);
    var user_created_at = this.user_created_at(input);
    var user_screen_name = this.user_screen_name(input);
    var user_default_profile_image = this.user_default_profile_image(input);
    var user_description = this.user_description(input);
    var user_favourites_count = this.user_favourites_count(input);
    var user_followers_count = this.user_followers_count(input);
    var user_friends_count = this.user_friends_count(input);
    var user_listed_count = this.user_listed_count(input);
    var user_location = this.user_location(input);
    var user_name = this.user_name(input);
    var user_screen_name = this.user_screen_name(input);
    var user_statuses_count = this.user_statuses_count(input);
    var user_time_zone = this.user_time_zone(input);
    var user_urls = this.user_urls(input);
    var user_verified = this.user_verified(input);
	return {  
        coordinates : coordinates, 
        created_at : created_at, 
        hashtags : hashtags, 
        media : media, 
        urls : urls,
        favorite_count : favorite_count,
        id : id,
        in_reply_to_screen_name : in_reply_to_screen_name,
        in_reply_to_status_id : in_reply_to_status_id,
        in_reply_to_user_id : in_reply_to_user_id,
        lang : lang,
        place : place,
        possibly_sensitive : possibly_sensitive,
        retweet_count : retweet_count,
        reweet_id : reweet_id,
        retweet_screen_name : retweet_screen_name,
        source : source,
        text : text,
        tweet_url : tweet_url,
        user_created_at : user_created_at,
        user_screen_name : user_screen_name,
        user_default_profile_image : user_default_profile_image,
        user_description : user_description,
        user_favourites_count : user_favourites_count,
        user_followers_count : user_followers_count,
        user_friends_count : user_friends_count,
        user_listed_count : user_listed_count,
        user_location : user_location,
        user_name : user_name,
        user_screen_name : user_screen_name,
        user_statuses_count : user_statuses_count,
        user_time_zone : user_time_zone,
        user_urls : user_urls,
        user_verified : user_verified}
}
/*
// <name> = "name: " 1*WCHAR
CsvParser.prototype.name = function(input){
	this.expect("name",input);
	var curS = this.next(input);
	if(matched = curS.match(/[\wàéèêîù'\s]+/i)){
		return curS;
	}else{
		this.errMsg("Invalid name", input);
	}
}
*/
CsvParser.prototype.coordinates  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
        return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}

CsvParser.prototype.created_at  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid created at", input);
	}
}
CsvParser.prototype.hashtags  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid created at", input);
	}
}
CsvParser.prototype.media  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.urls  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.favorite_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.id  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.in_reply_to_screen_name = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.in_reply_to_status_id  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.in_reply_to_user_id  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.lang  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.place  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.possibly_sensitive  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.retweet_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.reweet_id  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.retweet_screen_name  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.source  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.text  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.tweet_url  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_created_at  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_screen_name  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_default_profile_image  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_description  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_favourites_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_followers_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_friends_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_listed_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_location  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_name  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}

CsvParser.prototype.user_statuses_count  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_time_zone  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_urls  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}
CsvParser.prototype.user_verified  = function(input){
	var curS = this.next(input);
	if(globalRegex.test(curS)){
		return curS;
	}else {
		this.errMsg("Invalid coordinates", input);
	}
}

module.exports = CsvParser;