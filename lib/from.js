(function(root, factory) {
  
  factory.meta = {root: root, context:this};
  
  if (typeof define == 'function' && define.amd){
    factory.meta.env = 'amd';
    define(factory);
  } else if (typeof exports == 'object') {
    factory.meta.env = 'commonjs';
    module.exports = factory();
  } else {
    factory.meta.env = 'globals';
    root.Froms = root.From = factory();
  }
  
})(typeof global == "object" ? global : this, function() { // definition
  
  function From() {
    var args = Array.prototype.slice.call(arguments),
        context = args.pop(),
        constructor;
    
    if (typeof context !== 'function')
      throw new Error("Last argument must be a function (creation context) that must return a constructor");
    
    if (From.inject)
      args.unshift(From.inject);
      
    constructor = context.apply(this, args);
    
    if (typeof constructor !== 'function')
      throw new Error("Context function must return the constructor");
    
    return constructor;
  }
  
  From.extend = function() {
    var args = Array.prototype.slice.call(arguments),
        target = args.shift();
    
    if (!target || typeof target.hasOwnProperty !== 'function') {
      return target;
    }
    
    args.forEach(function(obj) {
      if (obj && typeof obj.hasOwnProperty) {
        for(var prop in obj) {
          if (obj.hasOwnProperty(prop))
            target[prop] = obj[prop];
        }
      }
    });
    
    return target
  };
  
  From.inject = From.extend;
  
  return From;
});

