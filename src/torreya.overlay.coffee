class Torreya.Overlay

  constructor: (@options) ->
    return @element().appendTo @options.mainContainer

  element: ->
    $("<div/>")
      .attr("id", @options.overlayId)
      .addClass("torreya-overlay")
      .css @styles()

  styles: ->
    $.extend @options.overlayCss, @defaultOptions()

  defaultOptions: ->
    display:         "none"
    backgroundColor: "#000"
    position:        "absolute"
    top:             0
    left:            0
    width:           @options.window.width()
    height:          @options.document.height()
    zIndex:          @options.zIndex + 1
