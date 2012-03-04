class Torreya.Loader

  constructor: (@options) ->
    return @element().appendTo @options.mainContainer

  element: ->
    $("<div/>")
      .attr("id", @options.loaderId)
      .addClass("torreya-loader")
      .css @styles()

  styles: ->
    $.extend @options.loaderCss, @defaultOptions()

  defaultOptions: ->
    display:  "none"
    position: "fixed"
    top:      0
    left:     0
    width:    "100%"
    height:   "100%"
    zIndex:   @options.zIndex + 3
