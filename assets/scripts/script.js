var currentDate = moment().format("MMM D, YYYY");
var tasks = {};

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("calenpro-tasks"));

    if(!tasks) {
        tasks = {
            am9: [],
            am10: [],
            am11: [],
            pm12: [],
            pm1: [],
            pm2: [],
            pm3: [],
            pm4: [],
            pm5: []
        }
    }

    $.each(tasks, function(list, text) {
        // use list to point to the correct timeblock, and set the text to the p element with class .description
        // console.log(list, text);
        $(`#${list}`).find(".description").text(text);
        })
    
}


var assignDate = function() {
    // create a p element with class lead and set text to current date
    var pEl = $("<p>").addClass("lead").attr("id", "currentDay").text(currentDate);
    $("#currentDay").replaceWith(pEl);
}

// handling the clicking on a p element to switch to textarea
$(".timeblock").on("click", ".description", function() {
    // console.log(this);
    var text = $(this).text().trim();
    // use the timeblock id as index around page
    var timeblock = $(this).closest(".timeblock").attr("id");

    var taskEl = $("<textarea>").addClass(`w-100 ${timeblock} edit-mode`).val(text);

    $(this).replaceWith(taskEl);

    taskEl.trigger("focus");

    
});

var createTask = function(textareaEl,timeblock) {
    var text = textareaEl.val().trim();
    
    var taskEl = $("<p>").addClass("description").text(text);

    $(textareaEl).replaceWith(taskEl);
    // tasks[timeblock].push(text);
}

$(".timeblock").on("click", ".saveBtn", function() {
    // console.log($(this));

    var timeblock = $(this).closest(".timeblock").attr("id");
    var timeblockEl = $(this).closest(".timeblock");
    // console.dir(timeblockEl);

    var textareaEl = $(timeblockEl).find(`.${timeblock}`);
    // console.dir(textareaEl);

    // if the textareaEl length is 0 it means there's no textarea at that moment
    // if the textareaEl length is greater than 0 then there's textarea that needs to be saved to a p element
    if (textareaEl.length > 0) {
        var text = textareaEl.val().trim();
    
        // var taskEl = $("<p>").addClass("description").text(text);

        // $(textareaEl).replaceWith(taskEl);
        createTask(textareaEl);

        tasks[timeblock] =text ;
        saveTasks();
    }
});

var saveTasks = function() {
    localStorage.setItem("calenpro-tasks", JSON.stringify(tasks));
  };

assignDate();
loadTasks();