module.exports = {
  ifeq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
  bar: function(){
    return "BAR!";
  },
  trim: function(passedString) {
  	return passedString.substring(0, 90);
  },
  trimlarge: function(passedString) {
    return passedString.substring(0, 200);
  }
}