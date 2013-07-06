!function($) {
	"use strict"; // jshint ;_;

	var _render = function(obj, p) {
		var parent = $(p);
		var ic = 0;
		var count = 0;
		for ( var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			count += 1;
		}
		var isArray = Object.prototype.toString.call(obj) === '[object Array]';		
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			if (obj[key] === null) {
				parent.append('<li><span class="keynoclick">' + key
						+ ':</span><span class="null"> (empty) </span>' 
						+ '</li>');
			} else if (typeof obj[key] === 'boolean') {
				parent.append('<li>'
						+ (!isArray ? ('<span class="keynoclick">'
								+ key + ': </span>') : '')
						+ '<span class="boolean">' + obj[key] + '</span>'
						 + '</li>');
			} else if (typeof obj[key] === 'number') {
				parent.append('<li>'
						+ (!isArray ? ('<span class="keynoclick">'
								+ key + ': </span>') : '')
						+ '<span class="number">' + obj[key] + '</span>' 
						+ '</li>');
			} else if (typeof obj[key] === 'string') {
				parent.append('<li>'
						+ (!isArray ? ('<span class="keynoclick">'
								+ key + ': </span>') : '')
						+ '<span class="string">' + obj[key] + '</span>' 
						+ '</li>');
			} else if ($.isArray(obj[key])) {
				var isEmpty = obj[key].length == 0;
				var needsFold = obj[key].length > 1;
				var arval = null;
				if (isEmpty) {
					arval = $('<li>'
							+ '<span class="keynoclick">'
							+ key
							+ ': <span class="null" style="font-weight:normal"> (empty) </span></span><ul class="array"></ul><span></span></li>');
				} else if (needsFold) {
					arval = $('<li>'
							+ '<span class="fold"></span><span class="key">'
							+ key
							+ '</span><ul class="array"></ul><span></span></li>');
				} else {
					arval = $('<li><span class="keynoclick">'
							+ key
							+ '</span><ul class="array"></ul><span></span></li>');
				}
				parent.append(arval);
				arval.find('.unfold').data('card',
						_render(obj[key], arval.find('.array')));
			} else {
				if (key != '' && key != 0) {
					var oval = $('<li><span class="fold"></span><span class="key">'
							+ key
							+ '</span><ul class="object"></ul><span></span>'
							 + '</li>');
					parent.append(oval);
					oval.find('.unfold').data('card',
							_render(obj[key], oval.find('.object')));
				} else {
					var oval = $('<li><ul class="object"></ul><span></span>'
							 + '</li>');
					parent.append(oval);
					oval.find('.unfold').data('card',
							_render(obj[key], oval.find('.object')));
				}
			}
		}
		return ic;
	};

	$(document).on("click", '.jsontree .fold', function(e) {
		e.preventDefault();
		$(this).addClass('folded').parent().find('ul').slideUp();
	});

	$(document).on('click', '.jsontree .fold.folded', function(e) {
		e.preventDefault();
		$(this).removeClass('folded').parent().find('ul').slideDown();
	});

	$(document).on("click", '.jsontree .key', function(e) {
		e.preventDefault();
		$(this).addClass('folded').parent().find('ul').slideUp();
		$(this).parent().find('span').addClass('folded');
	});

	$(document).on('click', '.jsontree .key.folded', function(e) {
		e.preventDefault();
		$(this).addClass('folded').parent().find('ul').slideDown();
		$(this).parent().find('span').removeClass('folded');
	});

	var JsonTree = function(self) {
		var j = $.parseJSON(self.data('jsontree'));
		self.append('<ul class="jsontree"></ol>');
		_render([ j ], self.find('.jsontree'));
	};

	$.fn.jsontree = function(option) {
		return this.each(function() {
			var self = $(this), data = self.data('jsontree');
			if (!data) {
				if (typeof option == 'string') {
					data = option;
					self.data('jsontree', option);
				} else {
					data = {};
					self.data('jsontree', '');
				}
			}
			new JsonTree(self);
		});
	};

}(window.jQuery);
