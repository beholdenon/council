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
  },
  formatdate: function(passedString) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var msec = new Date(passedString);
    var hour = msec.getHours();
    var ampm = 'AM';
    if(hour > 12) {
      hour = hour - 12;
      ampm = 'PM';
    }
    return months[msec.getMonth()] + ' ' + msec.getDay() + ', ' + msec.getFullYear() + ' - ' + hour + ':' + msec.getMinutes() + ' ' + ampm;
  }
}