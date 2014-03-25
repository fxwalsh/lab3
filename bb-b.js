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


var app = {
  view: {}
}

var bb = {
  view: {}
}


bb.init = function() {

  bb.view.List = Backbone.View.extend({    

    initialize: function() {
      var self = this
      _.bindAll(self)

      self.setElement('#list')
    
      self.tm = {
        item: _.template( self.$el.html() )
      }
    },

    render: function() {
      var self = this

      self.$el.empty()

      for( var i = 0; i < 3; i++ ) {
        var html = self.tm.item({text:'item '+i})
        self.$el.append( html )
      }
    }
  })
}

app.init = function() {
  console.log('start init')

  bb.init()

  app.view.list = new bb.view.List()
  app.view.list.render()

  console.log('end init')
}


$(app.init)
