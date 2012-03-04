# Torreya.js

Torreya.js is a jQuery Modal plugin written in CoffeeScript. It's basically extracted from the Wordpress plugin called NewMediaFreakr. NewMediaFreakr is a Flickr gallery used on [New Media Freak](http://www.newmediafreak.nl) and can be viewed [here](http://www.newmediafreak.nl/fotografie). The Wordpress plugin will also be released once it's usable (it needs some cleaning up) for the public.

### What's up with the name?

Torreya is a genus of conifers comprising several species. Torreya.js has a wood background pattern in the modal created by default, so I needed something related to wood and that's basically it.


## Usage

You can either call the Torreya.js modal window on a jQuery object or send a jQuery object as a first argument. Both options are shown below with and without overwriting a default options:

``` coffee-script
$(".content").torreya()
$(".content").torreya useClose: false
```

Sending a jQuery object as the first argument:

``` coffee-script
$.torreya $(".content")
$.torreya $(".content"), useClose: false
```

That's it.


## Getting started

Need more help? Follow these easy steps.

### 1. Include jQuery

``` html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
```

### 2. Include Torreya.js

``` html
<script src="jquery.torreya.js"></script>
```

Don't forget to include the default Torreya.js styles (as seen below) and make sure you'll place the images on your server.

``` html
<link rel="stylesheet" type="text/css" href="css/torreya.css" />
```

### 3. Actually use the Torreya.js plugin

The final step is to actually start using the plugin. Take a look at the `Usage` section or at the next section for an example.


## Example

The following is an example HTML page with the jQuery library loaded from the Google Libraries API. The Torreya.js jQuery Modal plugin, an `example.js` file and the Torreya.js stylesheet are also loaded. The contents of `example.js` are shown below the HTML page.

``` html
<!DOCTYPE html>
<html>
    <head>
        <title>Torreya.js Example</title>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="/js/jquery.torreya.js"></script>
        <script type="text/javascript" src="/js/example.js"></script>
        <link rel="stylesheet" href="/css/torreya.css" />
    </head>
    <body>
        <h1>Torreya.js Example</h1>
        <ol>
            <li><a href="/about" class="torreya">Show About page</a></li>
            <li><a href="#" class="info">Show information</a></li>
            <li><a href="http://www.newmediafreak.nl" class="external">External</a></li>
        </ol>
        <div style="display: none;">
            <div id="info">Nulla vitae elit libero, a pharetra augue.</div>
        </div>
    </body>
</html>
```

### The `example.js` file

There are three links in the HTML example page. Each of those links opens the Torreya.js modal window in a different way. To open all the URL's (in this case it's just the first one) with the class `torreya` in a modal window, you can do the following:

``` coffee-script
$('a[class="torreya"]').live "click", (event) =>
  event.preventDefault()
  $.torreya $(event.currentTarget).attr "href"
```

The "#info" div is placed in a div with the following style: `display: none;`, which makes it
hidden. To place the content from the "#info" div in a modal window one could do the following:

``` coffee-script
$('a[class="info"]').live "click", (event) =>
  event.preventDefault()
  $("#info").torreya {position: [100, 200]}
```

The above CoffeeScript also places the content from the "#info" div in a modal window on position `100, 200` from the top left of the browser. The external website New Media Freak can be opened with the below code. This opens the website in an iframe which is added to the modal window.

``` coffee-script
$('#external').live "click", (event) =>
  event.preventDefault()
  $.torreya $(event.currentTarget).attr("href"), { dataExternal: true }
```


## Development

Want to extend the Torreya.js jQuery Modal plugin? That's easy. Make your changes in the `src` directory and compile the *.coffee files to a single JavaScript file called `jquery.torreya.js` with the following command:

    coffee -j jquery.torreya.js -c src/*.coffee

I used the `coffee` command here, which among other things can compile `.coffee` files into `.js`. You'll need Node.js and NPM (Node Package Manager) for this though. More information about how to install this can be found on the official [CoffeeScript](http://coffeescript.org/#installation) website.


## License

Copyright 2012 Kevin Tuhumury. Released under the MIT License.
