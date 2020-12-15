# GL02 RH - Synevent

## Installation

Node.js installation de la librairie *node-module* :

```bash
npm install
```

Installation de la libraire *Date-fns* pour la gestion des dates :


```bash
npm install date-fns --save
```



Si l'installation du node module n'a pas fonctionné correctement, il est également nécessaire d'installer la libraire *sharp* :

```bash
npm install sharp
```





## Utilisation

### Commande générale

```bash
node index.js <command>
```

### Aide

```bash
node index.js help
```



### IND1 :  Donner le nombre de tweets sur un hashtag par journée et/ou sur une période donnée.

```bash
node index.js nbTweetHashtag <hashtag> <dateDébut> <dateFin>
```

**Résultat (exemple de dates) :**

```bash
$ node index.js nbTweetHashtag eaw18 "2018-03-23 00:00" "2018-03-26 00:00"

There are 383 tweets with the hashtag 'eaw18',
                between the : 2018-03-23 00:00 and the 2018-03-26 00:00.
┌───────────────────┬────────────┬────────┐
│ (iteration index) │    Key     │ Values │
├───────────────────┼────────────┼────────┤
│         0         │  'Friday'  │  317   │
│         1         │ 'Saturday' │   46   │
│         2         │  'Sunday'  │   20   │
└───────────────────┴────────────┴────────┘
```



**Gestion des erreurs :**

- Indiquer à l'utilisateur que le hashtag saisi n'existe pas encore

```bash
$ node index.js nbTweetHashtag data/ bsoir "2018-03-23 00:00" "2018-03-26 00:00"

Oops ! This hashtag doesn't exist yet. (Try EAW18 for example)
There is 0 tweet with the hashtag 'bsoir',
                    between the : 2018-03-23 00:00 and the 2018-03-26 00:00.
```


- Indiquer à l'utilisateur que les dates n'ont pas le bon format et/ou qu'elles ne sont pas écrites dans le bon ordre chronologique

```bash
$ node index.js nbTweetHashtag data/ eaw18 "2018-03-26 00:00" "2018-03-23 00:00"

Be careful ! The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"
And do not forget to put the dates in order.
```

ou

```bash
$ node index.js nbTweetHashtag data/ eaw18 Friday Monday

Warning ! The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"
And do not forget to put the dates in order.
```



### IND2 : Donner le top 10 des tweets comportant un hashtag ayant été le plus retweeté.

```bash
node index.js topTenTweet "#<hashtag>"
```

**Résultat :**

```bash
$ node index.js topTenTweet '#EAW18'
{
  Date_publication: 2018-03-23T15:02:04.000Z,
  Auteur: 'Michael L. Nelson',
  IDauteur: '@Michael L. Nelson',
  hashtags: [ '#EAW18' ],
  Lieu: 'Norfolk, VA',
  Langue_utilisateur: 'en',
  ID: '977198802619781120',
  Url: 'https://twitter.com/phonedude_mln/status/977198802619781120',
  Text: '"Weaponized Web Archives: Provenance Laundering of Short Order Evidence"\n' +
    '#EAW18 @WebSciDL @hvdsomp @weiglemc @stewartbrand',
  media: '',
  info_auteur: 'Head of @WebSciDL, Computer Science, Old Dominion University; Formerly: @NASA_Langley (1991-2002), @UNCSILS (2000-2001); \n' +
    'OAI-PMH OAI-ORE Memento ResourceSync',
  Retweet: 46,
  Like: 50,
  Utilisateur_verifie: false
}
{
  Date_publication: 2018-03-17T16:10:11.000Z,
  Auteur: 'Bergis Jules ��',
  IDauteur: '@Bergis Jules ��',
  hashtags: [ '#EAW18' ],
  Lieu: 'California, USA',
  Langue_utilisateur: 'en',
  ID: '975041617684934656',
  Url: 'https://twitter.com/BergisJules/status/975041617684934656',
  Text: 'On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope you can join us in person or via the livestream. Much thanks to @US_IMLS &amp; @knightfdn for supporting. https://t.co/PfmlVLYxsA #EAW18',
  media: '',
  info_auteur: 'immigrant | archivist | doer of things | @DocumentNow https://t.co/s643ifXmdI',
  Retweet: 77,
  Like: 90,
  Utilisateur_verifie: false
}

(... etc)
```



- Création d'un fichier `.txt` dans le dossier *TopTens* : `\src\TopTens\top10tweets.txt` :



```
1.
Date_publication:Fri Mar 23 2018 16:02:04 GMT+0100 (GMT+01:00)
Auteur:Michael L. Nelson
IDauteur:@Michael L. Nelson
hashtags:#EAW18
Lieu:Norfolk, VA
Langue_utilisateur:en
ID:977198802619781120
Url:https://twitter.com/phonedude_mln/status/977198802619781120
Text:"Weaponized Web Archives: Provenance Laundering of Short Order Evidence"
#EAW18 @WebSciDL @hvdsomp @weiglemc @stewartbrand
media:
info_auteur:Head of @WebSciDL, Computer Science, Old Dominion University; Formerly: @NASA_Langley (1991-2002), @UNCSILS (2000-2001); 
OAI-PMH OAI-ORE Memento ResourceSync
Retweet:46
Like:50
Utilisateur_verifie:false


2.
Date_publication:Sat Mar 17 2018 17:10:11 GMT+0100 (GMT+01:00)
Auteur:Bergis Jules 🇱🇨
IDauteur:@Bergis Jules 🇱🇨
hashtags:#EAW18
Lieu:California, USA
Langue_utilisateur:en
ID:975041617684934656
Url:https://twitter.com/BergisJules/status/975041617684934656
Text:On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope you can join us in person or via the livestream. Much thanks to @US_IMLS &amp; @knightfdn for supporting. https://t.co/PfmlVLYxsA #EAW18
media:
info_auteur:immigrant | archivist | doer of things | @DocumentNow https://t.co/s643ifXmdI
Retweet:77
Like:90
Utilisateur_verifie:false

(... etc jusqu'à 10)
```



**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas, ou bien, lorsque le nombre tweets est insuffisant.

```bash
$ node index.js topTenTweet '#EAW'

error: Error Less than 10 tweets or non-Existant hashtag
```





### IND3 : Donner le top 10 des auteurs de tweets avec le plus d’informations à leur sujet.

```bash
node index.js topTenAuthor '#<hashtag>'
```



**Résultat :**

```bash
$ node index.js topTenAuthor '#eaw18'
Auteur {
  user_created_at: 2014-09-05T13:04:57.000Z,
  user_screen_name: 'sdaythomson',
  user_default_profile_image: false,
  user_description: 'Research Officer for Digital Preservation Coalition. Preserving bits and drinking tea. Views my own.',
  user_favourites_count: 1566,
  user_followers_count: 827,
  user_friends_count: 555,
  user_listed_count: 33,
  user_location: 'Glasgow, UK',
  user_name: 'Sara Day Thomson',
  user_statuses_count: 1596,
  user_time_zone: '',
  user_urls: '',
  user_verified: false,
  retweet_count: 22,
  recurrence: 6
}
Auteur {
  user_created_at: 2009-02-25T04:18:34.000Z,
  user_screen_name: 'ablwr',
  user_default_profile_image: false,
	...
}
(... etc)

Check ! We found tweets with the hashtag '#eaw18'
```



**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas.

```bash
$ node index.js topTenAuthor '#ea8'

Oops ! No tweet has been found with the hashtag '#ea8'
```





### IND4 : Donner la liste des hashtags associés à un hashtag de référence.

```bash
node index.js refHash <hashtag>
```



**Résultat :**

```bash
$ node index.js refHash "#EAW18"
Hashtify { hashtag: '#liulockout', rec: 1 }
Hashtify { hashtag: '#hail', rec: 1 }  
Hashtify { hashtag: '#GoBlue', rec: 2 }
Hashtify { hashtag: '#ethics', rec: 4 }
Hashtify { hashtag: '#webarchiving', rec: 8 }
```



- Création d'un fichier `.txt` dans un nouveau dossier : `\src\TopTens\HashtagAssociate.txt`

``` 
Reference Hashtag Associate: #EAW18

1.
hashtag:#liulockout
rec:1


2.
hashtag:#hail
rec:1


3.
hashtag:#GoBlue
rec:2


4.
hashtag:#ethics
rec:4


5.
hashtag:#webarchiving
rec:8
```



**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas.

```bash
$ node index.js refHash "#EA"

error: nonExistant Hashtag
```





### IND5 :  Visualiser la proportion de tweets par pays/région.

```bash
node index.js viz-fd 
```

**Résultat :**

```bash
$ node index.js viz-fd
VisuaKeep { location: 'New York, NY', count: 226 }
VisuaKeep { location: 'Norfolk, VA', count: 58 }
VisuaKeep { location: 'Seattle, WA', count: 19 }
VisuaKeep { location: 'Hanover, NH', count: 14 }
VisuaKeep { location: 'Brooklyn', count: 92 }
VisuaKeep { location: 'eXistenZ', count: 57 }
VisuaKeep { location: 'Badalona, Espanya', count: 19 }
VisuaKeep { location: 'London', count: 23 }
VisuaKeep { location: 'Amherst, MA', count: 136 }
VisuaKeep {
  location: 'Massachusett land//what is currently Massachusetts',
  count: 1
}
VisuaKeep { location: 'May Subd Geog', count: 77 }
VisuaKeep { location: 'Around the way', count: 3 }
VisuaKeep { location: 'Lenapehoking', count: 21 }
VisuaKeep { location: 'Maryland, USA', count: 24 }
VisuaKeep { location: 'Providence, RI', count: 44 }
VisuaKeep { location: 'up norf.', count: 9 }
VisuaKeep { location: 'Urbana-Champaign, Illinois', count: 2 }
VisuaKeep { location: 'Columbia, SC', count: 4 }
VisuaKeep { location: 'Wakanda ��', count: 83 }
VisuaKeep { location: 'Philadelphia, Pennsylvania', count: 5 }
VisuaKeep { location: "Schrödinger's Box", count: 1 }
VisuaKeep { location: 'Chesapeake City, MD', count: 1 }
VisuaKeep { location: 'Silver Spring, MD', count: 88 }
VisuaKeep {
  location: 'Budapest, Hungary and Western NY State',
  count: 5
}

(... etc)
```



> Le png généré pour autant de données est complètement illisible. C'est pour cela que nous avons décidé de créer une deuxième commande en ciblant des dates précises (voir ci-dessous).



**Autre possibilité pour traiter seulement entre deux journées précises**  :

Traitement des tweets en fonction de dates :

```bash
node index.js viz-fld '19' 'Mar' '23' 'Mar'
```

​	**Attention**, il faut bien respecter cette syntaxe :

​	` viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' quotes are importants `



**Gestion des erreurs :**

- Format des données saisies

```bash
$ node index.js viz-fld '19' 'Mar' '23' 'M'
Warning ! Empty file, or wrong format of data.It should be like : viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' and quotes are importants
```



-----

### TO DO

1. La commande de recherche `RECH` n'a pas pu être finalisée dans les temps impartis.

2. La commande  `EXTR` d'extraction de tweets n'a pas pu être commencée car elle dépend de la commande de recherche. 

