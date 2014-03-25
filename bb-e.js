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
  model: {},
  view: {}
}

var bb = {
  model: {},
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


  bb.model.Item = Backbone.Model.extend(_.extend({    
    defaults: {
      text: ''
    },

    initialize: function() {
      var self = this
      _.bindAll(self)
    }

  }))


  bb.model.Items = Backbone.Collection.extend(_.extend({    
    model: bb.model.Item,

    initialize: function() {
      var self = this
      _.bindAll(self)
      self.count = 0
    },

    additem: function() {
      var self = this
      var item = new bb.model.Item({
        text:'item '+self.count
      })
      self.add(item)
      self.count++
    }

  }))


  bb.view.Head = Backbone.View.extend(_.extend({    
    events: {
      'tap #add': function(){ var self = this; self.items.additem() }
    },

    initialize: function( items ) {
      var self = this
      _.bindAll(self)
      self.items = items
      self.setElement("div[data-role='header']")
    }
  }))



  bb.view.List = Backbone.View.extend(_.extend({    

    initialize: function( items ) {
      var self = this
      _.bindAll(self)

      self.setElement('#list')
    
      self.tm = {
        item: _.template( self.$el.html() )
      }

      self.items = items
      self.items.on('add',self.appenditem)
    },


    render: function() {
      var self = this

      self.$el.empty()

      self.items.each(function(item){
        self.appenditem(item)
      })
    },


    appenditem: function(item) {
      var self = this
      var html = self.tm.item( item.toJSON() )
      self.$el.append( html )      
      self.scroll()
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


  app.model.items = new bb.model.Items()

  app.view.head = new bb.view.Head(app.model.items)
  app.view.list = new bb.view.List(app.model.items)

  app.view.list.render()


  console.log('end init')
}


$(app.init)
