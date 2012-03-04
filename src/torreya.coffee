###
  Torreya.js, v0.1 - jQuery Modal plugin
  http://github.com/kevintuhumury/torreya.js

  Copyright (c) 2012 Kevin Tuhumury
  Licensed under the MIT license.


  Copyright © 2012 Kevin Tuhumury

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
###


$ = jQuery

$.fn.torreya = (options) ->
  new Torreya(@, options)

$.torreya = (data, options) ->
  new Torreya(data, options)


class Torreya

  constructor: (content, options) ->
    @window       = $(window)
    @document     = $(document)
    @options      = $.extend @defaultOptions(), $.extend(options, {@window, @document})

    @closeElement = $(".torreya-close")
    @dataElement  = $(".torreya-data")

    @init content if @createElements()

  init: (content) ->
    @load()
    @loadContent content

  createElements: ->
    unless @content
      @overlay  = new Torreya.Overlay @options
      @modal    = new Torreya.Modal @options
      @wrapper  = new Torreya.Wrapper @options, @modal
      @loader   = new Torreya.Loader @options
      true
    else
      false

  load: ->
    @overlay.fadeTo "slow", 0.6
    @loader.show()
    @addBehavior()

  loadContent: (content) ->
    new Torreya.Content(@, content, @options).load()

  addBehavior: ->
    @closeElement.live "click", @handleClose
    @document.keydown @handleClose
    @window.resize @handleResize

  removeBehavior: ->
    @closeElement.unbind "click"
    @document.unbind "keydown"
    @window.unbind "resize"

  handleClose: (event) =>
    event.preventDefault()
    @close() if @escapeIsPressed(event) or @closeButtonIsPressed(event)

  escapeIsPressed: (event) ->
    event.keyCode is 27

  closeButtonIsPressed: (event) ->
    event.currentTarget.id is @options.closeId

  handleResize: (event) =>
    @overlay.css width: @window.width(), height: @document.height()
    @position()

  position: ->
    top  = (@window.height() / 2) - (@modal.outerHeight(true) / 2)
    left = (@window.width() / 2) - (@modal.outerWidth(true) / 2)

    if @options.position
      top  = @options.position[0] or top
      left = @options.position[1] or left

    @modal.css left: left, top: top

  show: ->
    @modal.fadeIn 2000

  close: ->
    @overlay.hide().remove()
    @loader.hide().remove()
    @modal.hide().remove()

    @reset()

  reset: ->
    @removeBehavior()
    @replaceContentWithPlaceholder()
    @options = {}
    @modal   = {}

  replaceContentWithPlaceholder: ->
    @removeContentStyles()
    $("#" + @options.placeholderId).replaceWith @content if @content

  removeContentStyles: ->
    @content.removeClass("torreya-data").css "overflow", ""

  defaultOptions: ->
    overlayCss:     {}
    modalCss:       {}
    wrapperCss:     {}
    dataCss:        {}
    loaderCss:      {}

    position:       []
    mainContainer:  "body"

    overlayId:      "torreya-overlay"
    modalId:        "torreya-modal"
    wrapperId:      "torreya-wrapper"
    dataId:         "torreya-data"
    loaderId:       "torreya-loader"
    closeId:        "torreya-close"
    placeholderId:  "torreya-placeholder"

    dataExternal:   false
    useClose:       true

    iframeWidth:    1024
    iframeHeight:   768
    zIndex:         1000


@Torreya ||= Torreya
