// Declare variables
var DATA_FILE_NAME = "data/flowerData.json",
    BAR_WIDTH = 100,
    LINE_WIDTH = 0.25,
    START_X = 50,
    START_Y = 280,
    X_SPACE = 190,
    Y_SPACE = 80,
    SOLD_COLOR = "#0099CC",
    UNSOLD_COLOR = "#353516";

//Clear the canvas
function clearChart(canvas) {
    if (canvas && canvas.getContext) {
        // Open a 2D context within the canvas
        var context = canvas.getContext('2d');
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//Draw on the canvas
function createChart(canvas) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: DATA_FILE_NAME,
        success: function(response) {
            var sortedData = {};
            var items = {};
            var initialOffset = 0;

            function formatData(data) {
                var i;
                //sort the data according to the date entry
                for (i = 0; i < data.length; i++) {
                    if (sortedData[data[i].date] !== undefined) {
                        sortedData[data[i].date].push(data[i]);
                    } else {
                        sortedData[data[i].date] = [data[i]];
                    }
                    if (items[data[i].flower] === undefined) {
                        items[data[i].flower] = initialOffset++;
                    }
                }
            }
            //format the model
            formatData(response);
            //draw the chart
            draw(canvas, sortedData, items);
        },
        error: function(err) {
            alert("Error-The data could not be loaded");
        }
    });

    function draw(canvas, data, items) {
        // Ensure that the element is available within the DOM
        if (canvas && canvas.getContext) {
            // Open a 2D context within the canvas
            var context = canvas.getContext('2d');
            // Draw the bar chart
            drawBarChart(context, data, items, (canvas.height - 20));
        }
    }

    // drawBarChart - draws a bar chart with the specified data
    function drawBarChart(context, data, items, chartHeight) {
        // Draw the x and y axes
        var startX = START_X;
        var startY = START_Y;
        var initialYOffset = 80;
        var initialXOffset = 70;

        context.lineWidth = LINE_WIDTH;
        drawLine(context, startX, startY, startX, 70);
        drawLine(context, startX, startY, 1000, START_Y);
        context.lineWidth = 0;

        var maxValue = 0;
        var startX = initialXOffset;

        for (var dateKey in data) {
            var j = 0,
                eachDay = data[dateKey],
                startY = initialYOffset;

            for (j = 0; j < eachDay.length; j++) {
                //adjust the position and size values
                startY += ((items[eachDay[j].flower]) * Y_SPACE);
                drawStackedRectangle(context, eachDay[j], startX, startY, BAR_WIDTH, 30);
                startY = initialYOffset;
            }

            context.textAlign = "left";
            context.fillStyle = "#000";
            context.fillText(dateKey, startX + 40, chartHeight + 20, 200);
            startX = startX + X_SPACE;
        }

        startX = initialXOffset + 20;
        startY = initialYOffset;
        context.textAlign = "right";
        context.fillStyle = "#000";

        for (var key in items) {
            var index = items[key];
            startY += (index * Y_SPACE);
            context.fillText(key, (startX - 45), startY + 15, 120);
            startY = initialYOffset;
        }
    }

    // drawLine - draws a line on a canvas context from the start point to the end point 
    function drawLine(contextO, startx, starty, endx, endy) {
        contextO.beginPath();
        contextO.moveTo(startx, starty);
        contextO.lineTo(endx, endy);
        contextO.closePath();
        contextO.stroke();
    }

    // drawRectanle - draws a rectangle on a canvas context using the dimensions specified
    function drawStackedRectangle(context, data, x, y, w, h) {
        //split the data here based on sold and unsold units
        var first = parseInt(data['quantity-sold']),
            second = parseInt(data['quantity-unsold']),
            totalQ = first + second;
        var soldPercent = Math.ceil((first / totalQ) * 100);
        var w1 = ((first / totalQ) * w);

        context.fillStyle = SOLD_COLOR;
        drawRectangle(context, x, y, w1, h);
        context.fillStyle = UNSOLD_COLOR;
        drawRectangle(context, (x + w1), y, (w - w1), h)
        context.textAlign = "left";
        context.fillStyle = SOLD_COLOR;
        context.fillText(first, x + w + 5, y + 20, 100);
        context.fillStyle = UNSOLD_COLOR;
        context.fillText((' : ' + second), x + w + 15, y + 20, 100);
    }

    function drawRectangle(context, x, y, w, h, fill) {
        context.beginPath();
        context.rect(x, y, w, h);
        context.fill();
        context.lineWidth = 0.1;
        context.strokeStyle = 'black';
        context.stroke();
    }
}