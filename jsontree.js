!function ($) {
  "use strict"; // jshint ;_;

  var _render = function(obj, p){
    var parent = $(p);
    for (var key in obj) {
      console.log(key);
      console.log(obj[key]);
      if (!obj.hasOwnProperty(key)){
        continue;
      }
      console.log(typeof obj[key]);
      if (typeof obj[key] === 'number'){
        parent.append('<li><span class="key">'+key+':</span> <span class="string">'+obj[key]+'</span></li>');
      } else if (typeof obj[key] === 'string'){
        parent.append('<li><span class="key">'+key+':</span> <span class="string">"'+obj[key]+'"</span></li>');
      } else if (typeof obj[key] === 'array') {
        parent.append('<li><span class="key">'+key+':</span> <span class="array">array</span></li>');
      }else{
        var val = $('<li><span class="key">'+key+':</span> <ul class="object"></ul></li>');
        parent.append(val);
        _render(obj[key], val.find('.object'));
      }
    }
  };

  var JsonTree = function(self){
    var j = JSON.parse(self.data('jsontree'));
    console.log(j);
    self.append('<ul class="jsontree"></ol>');
    _render(j, self.find('.jsontree'));
  };

  $.fn.jsontree = function (option) {
    return this.each(function () {
      var self = $(this), data = self.data('jsontree');
      if (!data) {
        if (typeof option == 'string') {
          data = option;
          self.data('jsontree', option);
        }else{
          data = {};
          self.data('jsontree', '');
        }
      }
      new JsonTree(self);
    });
  };

}(window.jQuery);
