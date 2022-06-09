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
        // select p element based on id and add text from localStorage
        var taskEl = $(`#${list}`).find(".description");
        taskEl.text(text);
        auditTask(taskEl);
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

var createTask = function(textareaEl) {
    var text = textareaEl.val().trim();
    
    var taskEl = $("<p>").addClass("description my-0").text(text);

    $(textareaEl).replaceWith(taskEl);
    auditTask(taskEl);
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

var auditTask = function(taskEl) {
    // obtain the time block text ex 9AM
    var timeblock = $(taskEl).closest(".timeblock")
    .find(".time-block").text().trim();

    // then turn to moment() but its stripped of min and sec so
    var timeblockMo = moment(timeblock, "hA");

    // create currentTime moment() and strip it of min and sec so that comparisons below work
    var currentTime = moment(moment().format("hA"), "hA");

    // remove time-related classes
    $(taskEl).removeClass("past present future");

    // assigning proper class based on time comparison
    if (timeblockMo.isAfter(currentTime)) {
        $(taskEl).addClass("future");
    } else if (timeblockMo.isBefore(currentTime)) {
        $(taskEl).addClass("past");
    } else if (timeblockMo.isSame(currentTime))  { 
        $(taskEl).addClass("present");
    }

}

var saveTasks = function() {
    localStorage.setItem("calenpro-tasks", JSON.stringify(tasks));
  };

assignDate();
loadTasks();