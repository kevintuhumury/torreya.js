class Torreya.Modal

  constructor: (@options) ->
    return @element().appendTo @options.mainContainer

  element: ->
    $("<div/>")
      .attr("id", @options.modalId)
      .addClass("torreya-modal")
      .css @styles()

  styles: ->
    $.extend @options.modalCss, @defaultOptions()

  defaultOptions: ->
    display:   "none"
    position:  "fixed"
    zIndex:    @options.zIndex + 2
