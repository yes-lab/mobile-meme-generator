# Mobile Meme Generator [![Build Status](https://travis-ci.org/yes-lab/mobile-meme-generator.svg?branch=master)](https://travis-ci.org/yes-lab/mobile-meme-generator)

[Camera API](https://developer.mozilla.org/en-US/docs/Web/API/Camera_API/Introduction) +
[FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) +
[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) +
[Imgur API](https://api.imgur.com/) =
100% browser-based meme generation for smartphones

## Demo

Check out the [gh-pages demo](https://yes-lab.github.io/mobile-meme-generator/).

## Usage

To modify it for your own needs:

1. `git clone git@github.com:yes-lab/mobile-meme-generator.git`
1. `cd mobile-meme-generator`
1. `npm install -g gulp && npm install`
1. `cp app/js/config.json.sample app/js/config.json`
1. Add your [Imgur API key](http://api.imgur.com/oauth2/addclient) to `config.json`.
1. Running `gulp serve` will build and serve the site at http://0.0.0.0:9000/. Any changes made to source code in the `app` directory will reload the site.
1. Run `gulp` to output a production ready version to `dist`.

## License

MIT © [Yes Lab](http://yeslab.org)
