const fs = require('fs');
const {getTopTenTweet} = require('./command/Top10Tweet');
const {getTopTenAuthor} = require('./command/Top10Author');
const cli = require("@caporal/core").default;
const {visualFold} = require('./command/visualOp');
const {getHashTagRef} = require('./command/hashTagRef');
const {getNbTweetByHashtagAndByDates} = require('./command/nbTweetByHashtag');
const {visuali} = require('./command/visualOpAdv');

cli
	.version('csv-parser-cli')
	.version('0.07')
	// check csv
	.command('check', 'Check if <file> is a valid csv file')
	.argument('<file>', 'The file to check with csv parser')
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  
			var analyzer = new CsvParser(options.showTokenize, options.showSymbols);
			analyzer.parse(data);
			
			if(analyzer.errorCount === 0){
				logger.info("The .csv file is a valid csv file".green);
			}else{
				logger.info("The .csv file contains error".red);
			}
		});
			
	})

	.command('viz-fd', 'used to visualize all the tweets in a folder')
	.action(visualFold)
	
	// viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' quotes are importants 
	.command('viz-fld', 'used to visualize all the tweets in a folder. The date in your data folder must be formated as "ddd mmm jj" exp: Mon Mar 28. Warning: Arguments are optionnal but if you do put one of them. precise the rest of them if not the command will generate an error')
	.argument('<minDay>','minimum day for the search')
	.argument('<minMonth>','minimum month for the search')
	.argument('<maxDay>','maximum day for the search')
	.argument('<maxMonth>', 'maximum month for the search')
	.action(({args}) => {
		visuali(args.minDay,args.minMonth, args.maxDay, args.maxMonth);
	})
	
	//topTenTweet '#hashtagName' quotes are important
	.command('topTenTweet', 'used to visualize the top ten tweet with most users ')
	.argument('<hashtag>', 'hashtag to make search about')	
	.action(({args}) => {
		getTopTenTweet(args.hashtag);
	})

	//topTenAuthor '#hashtag' quote is important
	.command('topTenAuthor', 'used to visualize the top ten Author with a most certain hashtag and the most retweet ')
	.argument('<hashtag>', 'hashtag to make search about')	
	.action(({args}) => {
		getTopTenAuthor(args.hashtag);
	})
	
	.command('nbTweetHashtag', 'Get the number of tweets via one hashtag and between 2 dates')
	.argument('<hashtag>', 'The hashtag to look into')
	.argument('<beginDate>', 'The start of the period to analyse, formated as following: "YYYY-MM-DD HH:MM"')
	.argument('<endDate>', 'The end of the period to analyse, formated as following: "YYYY-MM-DD HH:MM"')
	.action(getNbTweetByHashtagAndByDates)

	//refHash '#hashtagName' quotes are important
	.command('refHash', 'used to get other tweets associate with a particular')
	.argument('<hashtag>', 'hastag parameter')
	.action(({args}) => {
		getHashTagRef(args.hashtag);
	})
cli.run(process.argv.slice(2));
	