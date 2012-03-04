(function() {
  /*
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
  */
  var $, Torreya;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  $.fn.torreya = function(options) {
    return new Torreya(this, options);
  };
  $.torreya = function(data, options) {
    return new Torreya(data, options);
  };
  Torreya = (function() {
    function Torreya(content, options) {
      this.handleResize = __bind(this.handleResize, this);
      this.handleClose = __bind(this.handleClose, this);      this.window = $(window);
      this.document = $(document);
      this.options = $.extend(this.defaultOptions(), $.extend(options, {
        window: this.window,
        document: this.document
      }));
      this.closeElement = $(".torreya-close");
      this.dataElement = $(".torreya-data");
      if (this.createElements()) {
        this.init(content);
      }
    }
    Torreya.prototype.init = function(content) {
      this.load();
      return this.loadContent(content);
    };
    Torreya.prototype.createElements = function() {
      if (!this.content) {
        this.overlay = new Torreya.Overlay(this.options);
        this.modal = new Torreya.Modal(this.options);
        this.wrapper = new Torreya.Wrapper(this.options, this.modal);
        this.loader = new Torreya.Loader(this.options);
        return true;
      } else {
        return false;
      }
    };
    Torreya.prototype.load = function() {
      this.overlay.fadeTo("slow", 0.6);
      this.loader.show();
      return this.addBehavior();
    };
    Torreya.prototype.loadContent = function(content) {
      return new Torreya.Content(this, content, this.options).load();
    };
    Torreya.prototype.addBehavior = function() {
      this.closeElement.live("click", this.handleClose);
      this.document.keydown(this.handleClose);
      return this.window.resize(this.handleResize);
    };
    Torreya.prototype.removeBehavior = function() {
      this.closeElement.unbind("click");
      this.document.unbind("keydown");
      return this.window.unbind("resize");
    };
    Torreya.prototype.handleClose = function(event) {
      event.preventDefault();
      if (this.escapeIsPressed(event) || this.closeButtonIsPressed(event)) {
        return this.close();
      }
    };
    Torreya.prototype.escapeIsPressed = function(event) {
      return event.keyCode === 27;
    };
    Torreya.prototype.closeButtonIsPressed = function(event) {
      return event.currentTarget.id === this.options.closeId;
    };
    Torreya.prototype.handleResize = function(event) {
      this.overlay.css({
        width: this.window.width(),
        height: this.document.height()
      });
      return this.position();
    };
    Torreya.prototype.position = function() {
      var left, top;
      top = (this.window.height() / 2) - (this.modal.outerHeight(true) / 2);
      left = (this.window.width() / 2) - (this.modal.outerWidth(true) / 2);
      if (this.options.position) {
        top = this.options.position[0] || top;
        left = this.options.position[1] || left;
      }
      return this.modal.css({
        left: left,
        top: top
      });
    };
    Torreya.prototype.show = function() {
      return this.modal.fadeIn(2000);
    };
    Torreya.prototype.close = function() {
      this.overlay.hide().remove();
      this.loader.hide().remove();
      this.modal.hide().remove();
      return this.reset();
    };
    Torreya.prototype.reset = function() {
      this.removeBehavior();
      this.replaceContentWithPlaceholder();
      this.options = {};
      return this.modal = {};
    };
    Torreya.prototype.replaceContentWithPlaceholder = function() {
      this.removeContentStyles();
      if (this.content) {
        return $("#" + this.options.placeholderId).replaceWith(this.content);
      }
    };
    Torreya.prototype.removeContentStyles = function() {
      return this.content.removeClass("torreya-data").css("overflow", "");
    };
    Torreya.prototype.defaultOptions = function() {
      return {
        overlayCss: {},
        modalCss: {},
        wrapperCss: {},
        dataCss: {},
        loaderCss: {},
        position: [],
        mainContainer: "body",
        overlayId: "torreya-overlay",
        modalId: "torreya-modal",
        wrapperId: "torreya-wrapper",
        dataId: "torreya-data",
        loaderId: "torreya-loader",
        closeId: "torreya-close",
        placeholderId: "torreya-placeholder",
        dataExternal: false,
        useClose: true,
        iframeWidth: 1024,
        iframeHeight: 768,
        zIndex: 1000
      };
    };
    return Torreya;
  })();
  this.Torreya || (this.Torreya = Torreya);
  Torreya.Content = (function() {
    function Content(parent, content, options) {
      this.parent = parent;
      this.content = content;
      this.options = options;
    }
    Content.prototype.load = function() {
      if (this.isObject()) {
        return this.appendContentWithPlaceholder();
      } else {
        return this.appendExternalOrWrappedContent();
      }
    };
    Content.prototype.isObject = function() {
      return typeof this.content === "object";
    };
    Content.prototype.appendContentWithPlaceholder = function() {
      return this.append(this.content.before(this.placeholder()));
    };
    Content.prototype.placeholder = function() {
      return $("<span/>").attr("id", this.options.placeholderId).css({
        display: "none"
      });
    };
    Content.prototype.appendExternalOrWrappedContent = function() {
      if (this.isUrl()) {
        return this.external();
      } else {
        return this.append(this.wrappedContent());
      }
    };
    Content.prototype.isUrl = function() {
      return this.pattern().test(this.content);
    };
    Content.prototype.pattern = function() {
      return /(http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    };
    Content.prototype.external = function() {
      if (this.isExternal()) {
        this.append(this.externalContent());
        return this.parent.options.dataExternal = false;
      } else {
        return this.retrieveContent(this);
      }
    };
    Content.prototype.isExternal = function() {
      return this.options.dataExternal;
    };
    Content.prototype.externalContent = function() {
      return $("<iframe/>").attr("src", this.content).css(this.styles());
    };
    Content.prototype.retrieveContent = function(object) {
      return $.get(object.content, function(response) {
        return object.append($(response));
      });
    };
    Content.prototype.styles = function() {
      return {
        height: this.options.iframeHeight,
        width: this.options.iframeWidth,
        border: "none"
      };
    };
    Content.prototype.wrappedContent = function() {
      return $("<div/>").html(this.content);
    };
    Content.prototype.append = function(content) {
      var replaceContent;
      replaceContent = false;
      if (this.parent.content) {
        if (this.isContentElement(content)) {
          replaceContent = true;
        } else {
          this.parent.dataElement.hide().remove();
        }
      }
      this.appendContentToContainer(content);
      this.repositionModal();
      if (replaceContent) {
        this.replaceContent();
      } else {
        this.appendContentToWrapper();
      }
      return this.showModal();
    };
    Content.prototype.isContentElement = function(content) {
      return this.parent.content.attr("id") === content.attr("id");
    };
    Content.prototype.appendContentToContainer = function(content) {
      return this.parent.content = content.addClass("torreya-data").css({
        overflow: "hidden"
      }).appendTo(this.options.mainContainer);
    };
    Content.prototype.appendContentToWrapper = function() {
      return this.parent.content.appendTo(this.parent.wrapper);
    };
    Content.prototype.replaceContent = function() {
      return $("#" + this.options.wrapperId).find("#" + this.parent.content.attr("id")).replaceWith(this.parent.content);
    };
    Content.prototype.repositionModal = function() {
      this.parent.modal.css({
        width: this.parent.content.outerWidth(),
        height: this.parent.content.outerHeight()
      });
      return this.parent.position();
    };
    Content.prototype.showModal = function() {
      this.parent.loader.hide();
      return this.parent.show();
    };
    return Content;
  })();
  Torreya.Loader = (function() {
    function Loader(options) {
      this.options = options;
      return this.element().appendTo(this.options.mainContainer);
    }
    Loader.prototype.element = function() {
      return $("<div/>").attr("id", this.options.loaderId).addClass("torreya-loader").css(this.styles());
    };
    Loader.prototype.styles = function() {
      return $.extend(this.options.loaderCss, this.defaultOptions());
    };
    Loader.prototype.defaultOptions = function() {
      return {
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: this.options.zIndex + 3
      };
    };
    return Loader;
  })();
  Torreya.Modal = (function() {
    function Modal(options) {
      this.options = options;
      return this.element().appendTo(this.options.mainContainer);
    }
    Modal.prototype.element = function() {
      return $("<div/>").attr("id", this.options.modalId).addClass("torreya-modal").css(this.styles());
    };
    Modal.prototype.styles = function() {
      return $.extend(this.options.modalCss, this.defaultOptions());
    };
    Modal.prototype.defaultOptions = function() {
      return {
        display: "none",
        position: "fixed",
        zIndex: this.options.zIndex + 2
      };
    };
    return Modal;
  })();
  Torreya.Overlay = (function() {
    function Overlay(options) {
      this.options = options;
      return this.element().appendTo(this.options.mainContainer);
    }
    Overlay.prototype.element = function() {
      return $("<div/>").attr("id", this.options.overlayId).addClass("torreya-overlay").css(this.styles());
    };
    Overlay.prototype.styles = function() {
      return $.extend(this.options.overlayCss, this.defaultOptions());
    };
    Overlay.prototype.defaultOptions = function() {
      return {
        display: "none",
        backgroundColor: "#000",
        position: "absolute",
        top: 0,
        left: 0,
        width: this.options.window.width(),
        height: this.options.document.height(),
        zIndex: this.options.zIndex + 1
      };
    };
    return Overlay;
  })();
  Torreya.Wrapper = (function() {
    function Wrapper(options, modal) {
      this.options = options;
      this.modal = modal;
      return this.element().appendTo(this.modal);
    }
    Wrapper.prototype.element = function() {
      return $("<div/>").attr("id", this.options.wrapperId).addClass("torreya-wrapper").css(this.styles()).append(this.closeElement());
    };
    Wrapper.prototype.closeElement = function() {
      return $("<a></a>").attr("id", this.options.closeId).addClass("torreya-close");
    };
    Wrapper.prototype.styles = function() {
      return $.extend(this.options.wrapperCss, this.defaultOptions());
    };
    Wrapper.prototype.defaultOptions = function() {
      return {
        position: "relative",
        width: "100%",
        height: "100%"
      };
    };
    return Wrapper;
  })();
}).call(this);
