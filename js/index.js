$(function() {
  'use strict';
    
  function Todo(elem) {
	  
    this.eList = elem.find('.todo__list');
    this.eText = elem.find('.todo__text');
    this.eButton = elem.find('.todo__add');
	this.eSave = elem.find('.todo__save');
	
    var returnObj = JSON.parse(localStorage.getItem("myKey"));
    for(var i=0; i<returnObj.txt.length; i++){
    var item = $(
      '<li class="'+returnObj.ok[i]+'">'+ 
        '<span class="todo__list-item-text">'+returnObj.txt[i]+'</span>' +		
		'<span class="todo__list-item-remove">&#10060;</span>' +
		'<span class="todo__list-item-edit">&#9999;</span>' +  
        '<span class="todo__list-item-ok">&#10004;</span>' +     	
      '</li>'
    );	  
    this.eList.append(item);
    }
	
    var that = this;		   
    this.eText.on('input', function () {
      that.eButton.prop('disabled', !this.value);  
    });

    this.eButton.on('click', function () {
      var val = that.eText.val();
      if (val) {
        that.addItem(val);
        that.eText.val('');
        that.eButton.prop('disabled', true);
				
      }
    });
    
    this.eList.on('click', '.todo__list-item', function () {				
    });
    
    this.eList.on('click', '.todo__list-item-remove', function (e) {
      $(this).closest('.todo__list-item').remove();
    });

    this.eList.on('click', '.todo__list-item-edit', function (e) {
	  var val_text = $(this).parent().find('.todo__list-item-text').text();
	  var edit = $('<input type="text" class="todo__edit" value ="'+val_text+'" ><button class="todo__add_edit">Изменить</button>')	     
	  $(this).parent().html(edit);
    });
	
	this.eList.on('click', '.todo__list-item-ok', function (e) {
	  var COMPLETED_CLASS = 'todo__list-item_completed_yes';
      var item = $(this).parent();  
        item.hasClass(COMPLETED_CLASS) ?
        item.removeClass(COMPLETED_CLASS) :
        item.addClass(COMPLETED_CLASS);	
    });
	
	this.eList.on('input', '.todo__edit', function () {
      $('.todo__add_edit').prop('disabled', !this.value);
    });
	
	
	this.eList.on('click', '.todo__add_edit', function () {
      var val_text = $(this).parent().find('.todo__edit').val();
      var item = $(
	    '<span class="todo__list-item-text">'+val_text+'</span>' +
		'<span class="todo__list-item-remove">&#10060;</span>'+
		'<span class="todo__list-item-edit">&#9999;</span>'+
		'<span class="todo__list-item-ok">&#10004;</span>'
        	
    );
      $(this).parent().html(item);
	  var ordered_dives = $('.todo__list-item').sort(function (a, b) {
      var an = $(a).find('.todo__list-item-text').text(),
          bn = $(b).find('.todo__list-item-text').text();    
      if (an && bn) {
          return bn.toUpperCase().localeCompare(an.toUpperCase());
      }       
      return 0;
		 
    });   
	$('.todo__list').html( ordered_dives );
	  
    });
	
	this.eSave.on('click', function () {
		
	  var todo_text = []; 
      $('.todo__list-item').find('.todo__list-item-text').each(function(indx){
      todo_text.push($(this).text());
      });
      var todo_ok = []; 
      $('.todo__list-item').each(function(indx){
      todo_ok.push($(this).attr('class'));
      });  
	  var obj = {
	  txt: todo_text, 
	  ok: todo_ok
	  };

    var serialObj = JSON.stringify(obj);     
    localStorage.setItem("myKey", serialObj); 
	
	});
	
  }

  Todo.prototype.addItem = function(text, isCompleted) {
    
    var item = $(
      '<li class="todo__list-item">'+ 
        '<span class="todo__list-item-text"></span>' +		
		'<span class="todo__list-item-remove">&#10060;</span>' +
		'<span class="todo__list-item-edit">&#9999;</span>' +  
        '<span class="todo__list-item-ok">&#10004;</span>' +     	
      '</li>'
    );

    if (isCompleted) {
      item.addClass('todo__list-item_completed_yes');
    }
    item.find('.todo__list-item-text').text(text); 
    this.eList.append(item);
	
	var ordered_dives = $('.todo__list-item').sort(function (a, b) {
        var an = $(a).find('.todo__list-item-text').text(),
            bn = $(b).find('.todo__list-item-text').text();    
        if (an && bn) {
            return bn.toUpperCase().localeCompare(an.toUpperCase());
        }       
        return 0;
		 
    });   
	$('.todo__list').html( ordered_dives );
	
  }
  var todo = new Todo($('#list'));
});