function pd( func ) {
  return function( event ) {
    event.preventDefault()
    func && func(event)
  }
}

document.ontouchmove = pd()

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  escape:      /\{\{-(.+?)\}\}/g,
  evaluate:    /\{\{=(.+?)\}\}/g
};


var browser = {
  android: /Android/.test(navigator.userAgent)
}
browser.iphone = !browser.android


var app = {
  view: {}
}

var bb = {
  view: {}
}


bb.init = function() {

  var scrollContent = {
    scroll: function() {
      var self = this
      setTimeout( function() {
        if( self.scroller ) {
          self.scroller.refresh()
        }
        else {
          self.scroller = new iScroll( $("div[data-role='content']")[0] )
        }
      },1)
    }
  }


  bb.view.Head = Backbone.View.extend(_.extend({    
    events: {
      'tap #add': function(){ app.view.list.additem() }
    },

    initialize: function() {
      var self = this
      _.bindAll(self)
      self.setElement("div[data-role='header']")
    }
  }))


  bb.view.List = Backbone.View.extend(_.extend({    

    initialize: function() {
      var self = this
      _.bindAll(self)

      self.setElement('#list')
    
      self.tm = {
        item: _.template( self.$el.html() )
      }

      self.count = 0
    },


    render: function() {
      var self = this

      self.$el.empty()

      for( var i = 0; i < 3; i++ ) {
        self.additem()
      }

      self.scroll()
    },


    additem: function() {
      var self = this

      var html = self.tm.item({text:'item '+self.count})
      self.$el.append( html )      
      self.count++
    }

  },scrollContent))
}


app.init_browser = function() {
  if( browser.android ) {
    $("#main div[data-role='content']").css({
      bottom: 0
    })
  }
}


app.init = function() {
  console.log('start init')

  bb.init()

  app.init_browser()

  app.view.head = new bb.view.Head()

  app.view.list = new bb.view.List()
  app.view.list.render()


  console.log('end init')
}


$(app.init)
