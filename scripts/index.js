//Getting all the button objects from DOM
const calculatorButtons = document.querySelectorAll(".btn");

//Handling mouseover event, adding sound on mouseover
const handleMouseOver = () => {
    let audio = new Audio("./sounds/water-droplet.mp3");
    audio.play();
}

//Adding mouseover event to all the buttons
for(let i = 0; i < calculatorButtons.length; i++) {
    calculatorButtons[i].addEventListener("mouseover", handleMouseOver);
}

//Getting object with history-text class
let history = document.querySelector(".history-text");

//Getting object with output-text class
let output = document.querySelector(".output-text");

//Getting history-value
const getHistory = () => history.innerText;

//Setting history-value
const setHistory = (historyText) => history.innerText = historyText;

//Getting output-value
const getOutput = () => output.innerText;

//Setting output-value
const setOutput = (outputText) => {

    if(outputText === "" || outputText === "-") {
        output.innerText = "";
    } else {
        
        if(outputText.length > 12) {
            outputText = outputText.substr(0, 12);
        }
        
        output.innerText = outputText;
    }

}

//Handling click event for the buttons
const handleClick = (e) => {
    
    let classList = [];
    classList = e.target.classList;

    //Button inner text
    const innerText = e.target.innerText;

    //AC button action
    if(classList.contains("btn-clearall")) {
    
        setHistory("");
        setOutput("");
    
    } 
    //C button action
    else if(classList.contains("btn-backspace")) {
    
        let number = getOutput().toString();

        if(number) {
            
            number = number.substring(0, number.length - 1);
            setOutput(number);
            
        }
    
    }
    //+/- button action
    else if(classList.contains("btn-op-plus-minus")) {

        let output = getOutput();

        if(output[0] == "-") {
            output = output.substr(1, output.length - 1);
        } else {
            output = "-" + output;
        }

        setOutput(output);

    } 
    //% button action
    else if(classList.contains("btn-op-percentage")) {

        let output = getOutput();
        if(output != "") {
            
            output = parseInt(output) / 100;
            setOutput(output.toString());
            
        }
        
    }
    //Number button action
    else if(classList.contains("btn-num")) {

        let number = getOutput();
        if(number != NaN) {
                
            number += innerText;
            setOutput(number);
            
        }

    } 
    // +, -, *, /, = button action
    else if(classList.contains("btn-operator")) {

        let output = getOutput();

        if(output != "") {
            
            let history = getHistory();
            history += output;

            //If = button pressed
            if(classList.contains("btn-calculate")) {
            
                let result = eval(history);
                setHistory("");
                setOutput(result);

            } 
            //Else +, -, *, / any of these would have been pressed
            else {
            
                history += innerText;
                setHistory(history);
                setOutput("");
            
            }

        } else {
            
            let history = getHistory();
            
            if(history != "") {
                
                history = history.substr(0, history.length - 1);
                
                if(classList.contains("btn-calculate")) {
                
                    let result = eval(history);
                    setHistory("");
                    setOutput(result);
                
                } else {
                
                    history += innerText;
                    setHistory(history);
                
                }
            
            }
        
        }

    } 

}

//Adding click event to all the buttons
for(i = 0; i < calculatorButtons.length; i++) {
    calculatorButtons[i].addEventListener("click", handleClick);
}


//Switching between the modes
const checkbox = document.querySelector(".checkbox");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle('dark-theme');
});