class Torreya.ContentAppender

  constructor: (@torreya, @options) ->
    @replace = false

  append: (content) ->
    if @torreya.content
      if @isContentElement content
        @replace = true
      else
        @torreya.dataElement.hide().remove()

    @appendToContainer content
    @reposition()

    if @replace
      @replace()
    else
      @appendToWrapper()

    @show()

  isContentElement: (content) ->
    @torreya.content.attr("id") is content.attr("id")

  appendToContainer: (content) ->
    @torreya.content = content.addClass("torreya-data").css(overflow: "hidden").appendTo @options.mainContainer

  appendToWrapper: ->
    @torreya.content.appendTo @torreya.wrapper

  replace: ->
    $("#" + @options.wrapperId).find("#" + @torreya.content.attr("id")).replaceWith @torreya.content

  reposition: ->
    @torreya.modal.css width: @torreya.content.outerWidth(), height: @torreya.content.outerHeight()
    @torreya.position()

  show: ->
    @torreya.loader.hide()
    @torreya.show()
