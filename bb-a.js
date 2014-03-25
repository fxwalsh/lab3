function pd( func ) {
  return function( event ) {
    event.preventDefault()
    func && func(event)
  }
}

document.ontouchmove = pd()


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
      _.bindAll(self);

      self.setElement('#list')
    
      self.elem = {
        item_tm: $('li.tm').remove()
      }
    },

    render: function() {
      var self = this

      self.$el.empty()

      for( var i = 0; i < 3; i++ ) {
        var item = self.elem.item_tm.clone()
        item.find('span.text').text('item '+i)
        self.$el.append(item)
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
