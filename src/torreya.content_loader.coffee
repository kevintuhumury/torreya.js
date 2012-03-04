class Torreya.ContentLoader

  constructor: (@torreya, @content, @options) ->
    @appender = new Torreya.ContentAppender @torreya, @options

  load: ->
    if @isObject()
      @appendWithPlaceholder()
    else
      @appendExternalOrWrappedContent()

  isObject: ->
    typeof @content is "object"

  appendWithPlaceholder: ->
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
      @torreya.options.dataExternal = false
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
    @appender.append content
