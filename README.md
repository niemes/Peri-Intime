# Peri-Intime
A simple Node Periscope Triptique.

## Dependencies :

- Nodejs
- electron
### test :
Only tested on MacosX.

## Install

clone this repository :
```
git clone https://github.com/niemes/Peri-Intime.git
```

Or download Zip File.

## Start :
To use this Electron App, you need to create twitter dev App.
look here : [twitter](https://apps.twitter.com/)

```
npm install
```

Add your twitter app info in "renderer.js"

```
var T = new Twit({
	consumer_key: ' your consumer Key ',
	consumer_secret: ' your consumer secret ',
	access_token: ' your access token ',
	access_token_secret: ' your token secret '
});
```
## Run

```
npm start
```

### Info :

And feel free to contact me.
You can see my other works here : [niemes.info](https://niemes.info)
