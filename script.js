    const canvas = document.getElementById("whiteboard");
    const context = canvas.getContext("2d");
    let isDrawing = false;
    let drawingHistory = [];
    
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetCanvas);
    
    const undoButton = document.getElementById("undoButton");
    undoButton.addEventListener("click", undoLastStroke);
    
    function startDrawing(event) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
    
    function draw(event) {
      if (!isDrawing) return;
      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      context.stroke();
    }
    
    function stopDrawing() {
      if (isDrawing) {
        isDrawing = false;
        saveStroke();
      }
    }
    
    function resetCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawingHistory = [];
    }
    
    function saveStroke() {
      drawingHistory.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }
    
    function undoLastStroke() {
      if (drawingHistory.length > 0) {
        context.putImageData(drawingHistory.pop(), 0, 0);
      }
    }