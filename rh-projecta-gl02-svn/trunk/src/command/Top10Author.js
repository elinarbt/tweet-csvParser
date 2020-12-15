const fs = require('fs');
const {validParsedTweets} = require('../getAllTweets');
const {createDir} = require('../createDir');
const path = require('path');
const { key } = require('vega');
const Auteur = require('../Author');

/*Donner le top 10 des auteurs de tweets avec le plus d’informations à leur sujet.

Entrée : 
    L'utilisateur doit entrer l'hashtag recherché.

Sortie : 
    Un tableau des auteurs du top 10 des Tweets avec leurs informations. 
    Ce n'est pas clair dans le cahier des charges s'il faut trier par tweet les plus retweetés ou par le nombre de tweets postés par cet auteur
    On a donc choisi de se diriger sur le classement par nombre de tweets par auteur puis par nombre de retweet le plus grand.
*/

module.exports={
    getTopTenAuthor : async function (args){
        //on crée un tableau pour avoir les listes de tweets avec le nombre de récurrence de l'auteur du tweet
        var ListeAuteurs = new Array();
       
        const hashtag = args;

        // on recupère les tweets formatés dans le tableau tweets
        var ParsedTweets = validParsedTweets();

        //On crée un booléen 'trouvé' pour afficher un message d'erreur si aucun tweet avec l'hashtag recherché n'a été trouvé
        var trouve = false;
    
        //On va regarder dans tous les tweets s'il y a l'hashtag recherché
            for (let idx=0; idx<ParsedTweets.length; idx++){
                if (ParsedTweets[idx].hashtags.includes(hashtag)){
                    //On note qu'on a trouvé au moins un tweet avec le booléen trouve
                    trouve = true;
                    //on crée un booléen pour dire quand on a ajouté le tweet dans le tableau ListeAuteurs
                    var added = false;

                    //si le tableau est vide on ajoute le 1er tweet
                    if (ListeAuteurs.length==0) {
                        ListeAuteurs.push(new Auteur(ParsedTweets[idx].user_created_at,ParsedTweets[idx].user_screen_name,ParsedTweets[idx].user_default_profile_image,ParsedTweets[idx].user_description,ParsedTweets[idx].user_favourites_count,ParsedTweets[idx].user_followers_count,ParsedTweets[idx].user_friends_count,ParsedTweets[idx].user_listed_count,ParsedTweets[idx].user_location,ParsedTweets[idx].user_name,ParsedTweets[idx].user_statuses_count,ParsedTweets[idx].user_time_zone,ParsedTweets[idx].user_urls,ParsedTweets[idx].user_verified,ParsedTweets[idx].retweet_count));
                        added = true;
                        trouve = true;
                }
                    //Quand on trouve un tweet avec l'hashtag recherché on va le placer directement dans le tableau ListeAuteurs
                    for (let i=0; i<ListeAuteurs.length; i++){
                        if (ListeAuteurs[i].user_screen_name == ParsedTweets[idx].user_screen_name){
                            //on remplace juste le nombre de retweet et le nombre de récurrence associé à l'auteur si le nombre de retweet est plus grand que celui précédemment enregistré
                            if(ListeAuteurs[i].retweet_count < ParsedTweets[idx].retweet_count){
                                ListeAuteurs[i].recurrence++;
                                ListeAuteurs[i].retweet_count=ParsedTweets[idx].retweet_count;
                                added = true;
                            }
                        
                        }
                    }
                                        
                    if(added==false) {
                        // si on n'a pas encore ajouté l'auteur du tweet il va être ajouté à la fin du tableau
                        ListeAuteurs.push(new Auteur(ParsedTweets[idx].user_created_at,ParsedTweets[idx].user_screen_name,ParsedTweets[idx].user_default_profile_image,ParsedTweets[idx].user_description,ParsedTweets[idx].user_favourites_count,ParsedTweets[idx].user_followers_count,ParsedTweets[idx].user_friends_count,ParsedTweets[idx].user_listed_count,ParsedTweets[idx].user_location,ParsedTweets[idx].user_name,ParsedTweets[idx].user_statuses_count,ParsedTweets[idx].user_time_zone,ParsedTweets[idx].user_urls,ParsedTweets[idx].user_verified,ParsedTweets[idx].retweet_count));
                
                    }
            }
        }

        for(let i=0; i<10; i++) {
            var jmax = i;
            //on sélectionne le tweet avec le nombre de récurrence le plus haut et le nombre de retweet le plus haut
            for(let j=i+1; j<ListeAuteurs.length; j++){
                if(ListeAuteurs[j].recurrence>ListeAuteurs[jmax].recurrence){
                    var permut=ListeAuteurs[j];
                    ListeAuteurs[j]=ListeAuteurs[jmax];
                    ListeAuteurs[jmax]=permut;
                }
                
            }
            //a chaque fin de boucle le 1er élément sera bien placé, 
    }
            // on va maintenant trier les tweets sélectionnés en fonction tout d'abord du nombre de récurrence de l'hashtag par auteur puis en fonction du nombre de retweet maximal des auteurs pour leur tweet
    
            for(let i=0; i<10; i++) {
                var jmax = i;
                //on sélectionne le tweet avec le nombre de récurrence le plus haut et le nombre de retweet le plus haut
                for(let j=i+1; j<ListeAuteurs.length; j++){
                    if((ListeAuteurs[j].recurrence==ListeAuteurs[jmax].recurrence) && (ListeAuteurs[jmax].retweet_count<ListeAuteurs[j].retweet_count)){
                        var permut=ListeAuteurs[j];
                        ListeAuteurs[j]=ListeAuteurs[jmax];
                        ListeAuteurs[jmax]=permut;
                    }
                    
                }
                //a chaque fin de boucle le 1er élément sera bien placé, 
        }

        if(trouve){
            for(let i=0; i<10; i++){
                console.log(ListeAuteurs[i]);
            }
            console.log(`\nCheck !`.green+` We found tweets with the hashtag '${hashtag}'`.cyan);
        }
        if(trouve==false){
            console.log(`\nOops !`.yellow+` No tweet has been found with the hashtag '${hashtag}'`.cyan);
        }
    }

}