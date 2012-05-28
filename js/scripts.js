//Time function
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	
	var suffix = "am";
	if (hours >= 12) {
	suffix = "pm";
	hours = hours - 12;
	}
	if (hours == 0) {
	hours = 12;
	}
	
	if (minutes < 10)
	minutes = "0" + minutes
  
$(function(){

	if (window.localStorage) {
		
		var tasks = document.getElementById('tasks');
		var newTask = '<section class="task">\n\
				<a href="#delete" class="delete">Delete</a>\n\
				<time class="taskTime"><span class="hour">' + hours + '</span>:<span class="min">' + minutes + '</span> <span class="suffix">' + suffix + '</span></time>\n\
				<ol class="hourData" style="display: none;"><li><a title="1">1</a></li><li><a title="2">2</a></li><li><a title="3">3</a></li></ol>\n\
				<section class="taskContent" contenteditable="true">Please enter a task...</section>\n\
			</section>';
		
		/*$('.taskTime').live('click', function() {
			if ($(".hourData").is(":hidden")) {
				$('.hourData').show();
			} else {
				//$('.hourData').hide();
			}
		});
		
		$('.hourData a').live('click', function() {      
			var hour = this.title;      
			$('.hour').html(hour);      
			$('.hourData').hide();      
			return false;    
		});*/

		//on page load
		if ( localStorage.getItem('tasksData') ) {
			tasks.innerHTML = localStorage.getItem('tasksData'); 
		} else {
			$(tasks).html(newTask).hide();
			$(tasks).fadeIn(1800);
			//tasks.innerHTML = newTask;
		}
		
		$('.task').live('focusin', function() {			
			$(this).addClass('editing');
			$(this).children('a').fadeTo('medium', 1);
		});
		
		$(tasks).bind('focusout', function() {			
			$('.task').removeClass('editing');
			$('.task').children('a').fadeTo('medium', 0.5, function() {
				localStorage.setItem('tasksData', tasks.innerHTML);
			});
		});
		
		// to reset
		$('#clear').live('click', function() {
			localStorage.clear();
			location.reload(true);
			return false;
		});
		
		// to add a task
		$('#add').live('click', function() {
			if ($('.task:last-child > .taskContent').html() == 'Please enter a task...'){
				alert('Please fill in the last task first.');
				return false;
			} else {		
				$('#tasks').append(newTask);
				$('.task').last().hide().stop().fadeIn(1800);
				return false;
			}
		});
			
		// to delete a task
			$('.delete').live('click', function() {
				$(this).parent().remove();
				localStorage.setItem('tasksData', tasks.innerHTML);
				return false;
			});
	}
	else {
		alert('Sorry your browser is not supported');
	}

});