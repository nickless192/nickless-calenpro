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
}


var assignDate = function() {
    var pEl = $("<p>").addClass("lead").attr("id", "currentDay").text(currentDate);
    $("#currentDay").replaceWith(pEl);
}

$(".timeblock").on("click", ".description", function() {
    // console.log(this);
    var text = $(this).text().trim();


    var timeblock = $(this).closest(".timeblock").attr("id");

    var taskEl = $("<textarea>").addClass(`w-100 ${timeblock} edit-mode`).val(text);

    $(this).replaceWith(taskEl);

    taskEl.trigger("focus");

    
});

var createTask = function(textareaEl) {
    var text = textareaEl.val().trim();
    
    var taskEl = $("<p>").addClass("description").text(text);

    $(textareaEl).replaceWith(taskEl);
}

$(".timeblock").on("click", ".saveBtn", function() {
    // console.log($(this));

    var timeblock = $(this).closest(".timeblock").attr("id");
    var timeblockEl = $(this).closest(".timeblock");
    console.dir(timeblockEl);

    var textareaEl = $(timeblockEl).find(`.${timeblock}`);
    console.dir(textareaEl);

    if (textareaEl.length > 0) {
        // var text = textareaEl.val().trim();
    
        // var taskEl = $("<p>").addClass("description").text(text);

        // $(textareaEl).replaceWith(taskEl);
        createTask(textareaEl);

        tasks[timeblock].push(text);
        saveTasks();
    }
});

var saveTasks = function() {
    localStorage.setItem("calenpro-tasks", JSON.stringify(tasks));
  };

assignDate();
loadTasks();