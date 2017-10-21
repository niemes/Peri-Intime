// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//-----------------------------Dependances NODEJS-------------------------------
var periscope = require('node-periscope-stream');
var Twit = require('twit');

var video0 = document.getElementById('video0');
var video1 = document.getElementById('video1');
var video2 = document.getElementById('video2');

//-----------------------------Variables GLOBALES-------------------------------

var tweetlist = [];
var hls = [];
var last_hls = [];
var new_HLS = [];
// var player = new wjs("#player").addPlayer({ autoplay: true, titleBar: "none",width: "600",height:"500"});
//-----------------------------AUTH TWITTER-------------------------------------
var T = new Twit({
	consumer_key: '',
	consumer_secret: '',
	access_token: '',
	access_token_secret: ''
});

//--------------------------REQUETE TWITTER OBSERVATION TEMP REEL---------------
//---Choix France / Monde entier.
var france = false;
var monde = true;

if (france == true) {
	var choix = 'EN DIRECT sur #Periscope';
}
if (monde == true) {
	var choix = '#Periscope';
}
//--------------------------------Requetes Twitter------------------------------
var stream = T.stream('statuses/filter', {
	track: choix
});

stream.on('tweet', function(tweet) {
	if (typeof tweet.entities === undefined) {
	} else {
		if (tweet.entities.urls[0] !== undefined) {
			if (tweet.entities.urls[0].expanded_url !== undefined) {
				var urlPeri = tweet.entities.urls[0].expanded_url;

				tweetlist.push(urlPeri);

				//-----------getHLS
				var last_tweetlist = tweetlist[tweetlist.length - 1];

				//--------------------------Texte tweet-------------------------------------
				var text = tweet.text;
				// console.log(text);
				document.getElementById('test').innerHTML = text;

				//--------------Recupération des données du LIVE PERISCOPE------------------
				periscope(last_tweetlist, function(err, details) {

					if (err) {
						return err;
					}
					var intHls = details.hls_url;
					if (intHls !== undefined) {
						if (last_hls.indexOf(intHls) == -1) {
							last_hls.push(intHls);
						}
					}

				});
			}
		}
	}
});

//----------------------------CREATION DU PLAYER------------------------------
var Peri = {
	"liens": []
};

function play(player, lien) {
	var hls = new Hls();
	hls.attachMedia(player);
	// bind them together
	hls.on(Hls.Events.MEDIA_ATTACHED, function() {
		console.log("video and hls.js are now bound together !");
		hls.loadSource(lien);
		hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
			console.log("manifest loaded, found " + data.levels.length + " quality level");
		});
	})
	console.log("network error :", Hls.ErrorTypes.NETWORK_ERROR);
	console.log("media/video Error:", Hls.ErrorTypes.MEDIA_ERROR);
	console.log("others Error :", Hls.ErrorTypes.OTHER_ERROR);
	if (player == video0) video0.play();
	if (player == video1) video1.play();
	if (player == video2) video2.play();
}

function playmove() {

	console.log("liste lien hls(live peri) : ", last_hls.length);

	Peri.liens[1] = last_hls[last_hls.length - 1];
	Peri.liens[2] = last_hls[last_hls.length - 2];
	Peri.liens[3] = last_hls[last_hls.length - 3];

	if (Peri.liens[3] !== undefined) {

		play(video0, Peri.liens[1]);
		play(video1, Peri.liens[2]);
		play(video2, Peri.liens[3]);

	} else {
		console.log("pas encore d'URL periscope.");
	}
}

setInterval(playmove, 62000);
setTimeout(playmove, 16000);
playmove();

function cleanAll() {
	hls.length = 0;
	last_hls.length = 0;
}
setInterval(cleanAll, 650000);

//--------------------------DEBUG STEAM TWITTER-------------------------------
stream.on('error', function(error) {
	console.log(error);
});
