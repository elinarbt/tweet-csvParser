const fs = require('fs');
const CsvParser = require('./CsvParser.js');
const cli = require("@caporal/core").default;
const {getNbTweetByHashtag} = require('./NbTweetHashtag.js')
const {getNbTweetByPeriod} = require('./NbTweetPeriod.js')
const {getHashtagsAssocie} = require('./HashtagsAssocie.js')
const VisuaKeep = require('./VisuaKeep');
const sharp = require('sharp');
const {visualFold} = require('./visualOp');
const vg = require('vega');
const vl = require('vega-lite');
const {getTopTenTweet} = require('./Top10Tweet');


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

	//1. nom Commande : visualize --Proportions de tweets par pays / région--
	//2. Option: -c --country par country
	//3. Option: -r --region par regions
	//   Option: -b --both <Will return country and region> 
	//4. argument: fichier csv à partir duquel on doit generer les proportions
	//5. output: console.log()
	//			 graphe svg ou png
	//6. console.log: format --> regions avec nombre de tweets correspondants
	//						 --> pays avec le nombre de tweets correspondants

	//Methode
	/*
	1. Commancer par parser le fichier qu'on nous a donné en tableaux d'objets de twwet
	2. Creer un objet proportion qui aura pour paramètre 
	nom_region/pays
	nombre de tweet
	3. Cet objet sera contenu dans un tableau de d'objet du même genre ou chacun correspond à une region précise

	*/
	.command('visualize', 'used to visualize the tweet proportion by region/country')
	.argument('<file>', 'file that contain the data to visualize')
	.action(({args, options, logger}) => {

		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
			//Check if the file is empty
			if(data == ''){
				logger.info("fichier vide");
			}
			//parsing the csv file 
			var visual = new CsvParser();
			visual.parse(data);
			var tweetArr = visual.parsedTWEET;

			//An array that will contain object that will keep both location and the number of occurances in across all the tweets
			var visuDataArr = new Array();
			// first we search for at least on user region; That will be useful to know if there is at least one location in the file
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
				//indexReminder is supposed to hold the index of the first tweet with a location 
				//if it's value is -1 that mean there is no region in the file
				if(indexRmd == -1){
					logger.info("fichier sans regions d'utilisateur");
				}else{
					if(indexRmd != (tweetArr.length -1)){

						//Check if the region is already in our visualDataArr array of objects
						//if yes it increments the count of that specific region
						//if not it create an object for the region with a base count of 1 
						//then push it into the array
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

						//Log the final data to the console for the user
						for(var d = 0; d < visuDataArr.length; d++){
							console.log(visuDataArr[d]);
						}
						

						//Create graphic with vega and vega lite and save it as a png
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

						view.toSVG().then(async function(svg){
								await sharp(Buffer.from(svg))
										.toFormat('png')
										.toFile('proportion.png')
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
				logger.info("fichier sans tweets");
			}
		});

	})

	/*
	*NumberOfTweetByHashtag == Indicateur n°1
	*/
	.command('numberOfTweetByHashtag', 'Get the number of tweets via one hashtag and between 2 dates')
	.argument('<hashtag>', 'The hashtag to look into')
	.argument('<begin_date>', 'The start of the period to analyse')
	.argument('<end_date>', 'The end of the period to analyse')
	.action(getNbTweetByHashtag, getNbTweetByPeriod)

	.command('viz-fd', 'used to visualize all the tweets in a folder')
	.argument('<folderPath>', 'path of the folder that contain the tweets files to visualize. The path must be between quote symbols. the folder to visualize must have subfolders of tweets sorted by dates.')
	.action(({args}) => {
		visualFold(args.folderPath)
	})
	
	.command('topTenTweet', 'used to visualize the top ten tweet with most users ')
	.argument('<folderPath>', 'path of the folder that contain the tweets files to analyze. The path must be between quote symbols. the folder than contain datas must have subfolders of tweets sorted by dates.')	
	.action(({args}) => {
		getTopTenTweet(args.folderPath)
	})
	
cli.run(process.argv.slice(2));
	