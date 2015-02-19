var MyBaseClass = From( function(extend) {
  // this is the constructor, alias the name as self
  var Self  = function MyBaseClass(options) {
    console.log("creating MyBaseClass instance");
  };
  
  var self = Self.prototype;
    
  // extend the instance
  extend( self, {
  
    hello : function() {
      console.log("hello base");
    },  
    
    color : function() {
      console.log("i'm blue");
    }
  });
  
  // extend the constructor with static methods
  extend( Self, {
      something : function() {},
      somethingElse : function() {},
  });
    
  return Self;
});

// Now let's extend our base class 

var MyClass = From( MyBaseClass, function(extend, Parent) {
  // constructor
  var Self  = function MyClass(options) {
    Parent.apply(this, arguments);
    console.log("creating MyClass instance");
    options && options.color && (this.color = options.color);
  };
  
  var self = Self.prototype, parent = Parent.prototype;
  
  // exntend the proto
  extend( self, parent, {
    color : "yellow",
    
    hello : function() {
      Parent.prototype.hello.call(this);
      console.log("hello my");
    },
    
    myColor : function() {
      console.log("my color is " + this.color);
    }
  });
  
  // extend constructor with parent's staic method and whaterver else
  extend(Self, Parent);
  
  return Self;
});

// Extending further

var MyOtherClass = From( MyClass, function(extend, Parent) {
  // constructor
  var Self  = function MyOtherClass(color) {
    Parent.call(this, {color: color});
    console.log("creating MyOtherClass instance");
  };
  
  var self = Self.prototype, parent = Parent.prototype;
  
  extend( self, parent, {
    color : "green",
      
    hello : function() {
      parent.hello.call(this);
      console.log("hello other");
    } 
  });
  
  return Self;
});

// 
//
//

var base = new MyBaseClass; 
// -> creating MyBaseClass instance
console.log("created MyBaseClass instance");
console.log(base);

var my = new MyClass; 
// --> creating MyBaseClass instance
// --> creating MyClass instance
console.log("created MyClass instance");
console.log(my);

var other = new MyOtherClass('purple');
// --> creating MyBaseClass instance
// --> creating MyClass instance
// --> creating MyOtherClass instance
console.log("created MyOtherClass instance");
console.log(other);

console.log("Runnig .hello()");
other.hello();
// --> hello base
// --> hello my
// --> hello other

console.log("Runnig .myColor()");
other.myColor()
// --> my color is purple
