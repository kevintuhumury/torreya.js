class Torreya.Content

  constructor: (@parent, @content, @options) ->

  load: ->
    if @isObject()
      @appendContentWithPlaceholder()
    else
      @appendExternalOrWrappedContent()

  isObject: ->
    typeof @content is "object"

  appendContentWithPlaceholder: ->
    @append @content.before(@placeholder())

  placeholder: ->
    $("<span/>").attr("id", @options.placeholderId).css display: "none"

  appendExternalOrWrappedContent: ->
    if @isUrl()
      @external()
    else
      @append @wrappedContent()

  isUrl: ->
    @pattern().test @content

  pattern: ->
    /(http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  external: ->
    if @isExternal()
      @append @externalContent()
      @parent.options.dataExternal = false
    else
      @retrieveContent(@)

  isExternal: ->
    @options.dataExternal

  externalContent: ->
    $("<iframe/>").attr("src", @content).css @styles()

  retrieveContent: (object) ->
    $.get object.content, (response) -> object.append $(response)

  styles: ->
    height: @options.iframeHeight
    width:  @options.iframeWidth
    border: "none"

  wrappedContent: ->
    $("<div/>").html @content

  append: (content) ->
    replaceContent = false

    if @parent.content
      if @isContentElement content
        replaceContent = true
      else
        @parent.dataElement.hide().remove()

    @appendContentToContainer content
    @repositionModal()

    if replaceContent
      @replaceContent()
    else
      @appendContentToWrapper()

    @showModal()

  isContentElement: (content) ->
    @parent.content.attr("id") is content.attr("id")

  appendContentToContainer: (content) ->
    @parent.content = content.addClass("torreya-data").css(overflow: "hidden").appendTo @options.mainContainer

  appendContentToWrapper: ->
    @parent.content.appendTo @parent.wrapper

  replaceContent: ->
    $("#" + @options.wrapperId).find("#" + @parent.content.attr("id")).replaceWith @parent.content

  repositionModal: ->
    @parent.modal.css width: @parent.content.outerWidth(), height: @parent.content.outerHeight()
    @parent.position()

  showModal: ->
    @parent.loader.hide()
    @parent.show()
