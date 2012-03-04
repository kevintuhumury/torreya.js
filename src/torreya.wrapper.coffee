class Torreya.Wrapper

  constructor: (@options, @modal) ->
    return @element().appendTo @modal

  element: ->
    $("<div/>")
      .attr("id", @options.wrapperId)
      .addClass("torreya-wrapper")
      .css(@styles())
      .append @closeElement()

  closeElement: ->
    $("<a></a>").attr("id", @options.closeId).addClass "torreya-close"

  styles: ->
    $.extend @options.wrapperCss, @defaultOptions()

  defaultOptions: ->
    position:  "relative"
    width:     "100%"
    height:    "100%"
