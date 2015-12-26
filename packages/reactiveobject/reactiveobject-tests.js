
Tinytest.add('example', function (test) {
  var schema= {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Example",
//    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
      "id": {
//        "description": "The unique identifier for a product",
        "type": "integer"
      },
      "name": {
//        "description": "Name of the product",
        "type": "string"
      }
    },
    "required": ["id", "name"]
  };
  var obj = new ReactiveObject(schema ,    { x: 1 }  );
  var changed = false;

  var handle = Tracker.autorun(function () {
    changed = x==2
  });

  obj.x = 2

  handle.stop();

  test.equal(true, changed);
  test.equal(JSON.stringify({x:2}), JSON.stringify(obj.get()));
});


ReactiveObject = function (schema, obj, dep) {
   if (!dep)
    dep = new Tracker.Dependency;
  var clone = {}
  for (var prop in obj) {
    Object.defineProperty(clone, prop, {
      get: function(){
    dep.depend();
    return obj;        
      }
    })
  }
  var self = this;
  self.get = function () {
    dep.depend();
    return obj;
  };

  self.set = function (newValue) {
    obj = newValue;
    dep.changed();
  };

  self.set(obj)
}