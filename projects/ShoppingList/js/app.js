$(document).ready(function() {
	/* add item on button click */
	$("#AddButton").click(addItem);

	/* add item when Enter key pressed when cursor is in textbox */
	$("#newItemTextBox").keydown(function(event) {
		var keycode = event.keyCode ? event.keyCode : event.which;
		if(keycode == 13){
			addItem();
		}
	});

	/* remove item from list */
	$("#list").on("click", "a", function() {
		var listItem = $(this).closest("li");
		var itemName = listItem.find("span").text();
		var message = "Are you sure you want to remove '" + itemName + "' from the list?";
		if(window.confirm(message)) {
			listItem.remove();
		}
	});

	/* strikethrough text if checkbox selected */
	$("#list").on("change", "input:checkbox",function () {
		var item = $(this).closest("li").find("span");
		if($(this).is(":checked")) {
			item.addClass("completed");
		}
		else
			item.removeClass("completed"); 
	});

	/* add sorting to list */
	$("#list").sortable({   
		placeholder: "ui-sortable-placeholder" 
    });  
});

function addItem() {
	var newItem = $("#newItemTextBox").val();
	if(newItem.trim().length === 0) {
		alert("You must enter an item to be added.");
        return;
	}

	var listItem = createListItem(newItem);
	$("#list").append(listItem);
	$("#newItemTextBox").val("");
}

function createListItem(newItem) {
	var listItem = "<li class='ui-state-default'><input type='checkbox'>"; 
	listItem += "<span>" + newItem + "</span>";
	listItem += "<a href='#'>remove</a></li>";
	return listItem; 
}
