//input box
let input = document.querySelector(".textInput");
//submit button
let submit = document.querySelector(".submit");
submit.addEventListener('click',submitNumber);
//the phone number that's displayed on the screen
let displayedPhoneNumber = document.querySelector(".phoneNumber");
//the section containing the rules
let ruleSection = document.querySelector(".rules")

let currentDigit = document.querySelector(".currentDigit");

//the variable that stores the current phone number for displayedPhoneNumber
let currentPhoneNumber = "";
//the counter that keeps track of progress
let numberCounter = 0;

//function that triggers the whole sequence when clicking the submit button. 
//"submission" is whatever is entered into the textbox at this time
// Does not work if the number counter is greater than 10 (because if it was, the challenge should be already complete)
function submitNumber(){

    if(numberCounter < 10){
        let submission = input.value;
        calculateNumber(submission);
    }else{
        alert("you've already completed this form!")
    }

}

//Runs the submission through the massive filter function, then checks if the result is valid.
//if the result is valid, it gets sent to the displayNumber function
function calculateNumber(submission){

    let intermediary = filter(submission);

    //checks if the result is greater than 9
    if(intermediary !== "fail"){

        console.log(intermediary)

        let finalNumber = eval(intermediary);
        
        console.log(finalNumber);

        if(finalNumber > 9){
            alert("result was greater than 9, try again!")

        //checks if the result is negative
        }else{
            if(finalNumber < 0){
                alert("result was a negative number, try again!");

            //checks if the number is a decimal
            }else{
                let roundedNumber = Math.round(finalNumber);
                if(roundedNumber === finalNumber){
                    displayNumber(finalNumber);

                }else{
                    
                    //an exception to the above decimal rule that allows the result if it's close enough, then rounds the result
                    //this is necessary because sine functions are dumb
                    let approximation = 0.000001

                    if(finalNumber < Math.floor(finalNumber) + approximation){
                        console.log("yes");
                        finalNumber = Math.round(finalNumber);
                        displayNumber(finalNumber);

                    } else {
                        alert("result was not an integer!")
                    }
                }
            }
        }
    }
}

//The giant function which translates whatever the user typed in
function filter(submission){

    //figures out if the user typed in any javascript code instead of math by looking for common java syntax
    submission = submission.replaceAll('{', "oof");
    submission = submission.replaceAll('}', "oof");
    submission = submission.replaceAll(':', "oof");
    submission = submission.replaceAll(';', "oof");
    submission = submission.replaceAll('var', "oof");
    submission = submission.replaceAll('let', "oof");
    submission = submission.replaceAll('const', "oof");
    submission = submission.replaceAll('Math', "oof");
    submission = submission.replaceAll('[', "oof");
    submission = submission.replaceAll(']', "oof");
    if(submission.indexOf('oof')> -1){
        alert("Don't enter javascript code!")
        return("fail")

        //figures out if = was entered
    }else{
        submission = submission.replaceAll('=', "oof");
        if(submission.indexOf('oof')> -1){
            alert("don't enter =!");
            return("fail")
        }else{

            if(numberCounter < 5){
                submission = submission.replaceAll('log', "oof");
                if(submission.indexOf('oof')> -1){
                    alert("a logarithm already? Don't enter functions yet!");
                    return("fail")
                }
            }

            if(numberCounter < 7){
                submission = submission.replaceAll('pi', "oof");
                if(submission.indexOf('oof')> -1){
                    alert("This isn't a bakery. Don't ask for pi!");
                    return("fail")
                }
            }

            if(numberCounter < 8){
                submission = submission.replaceAll('sine', "oof");
                if(submission.indexOf('oof')> -1){
                    alert(" A sine function? Really? Come on dude, you're trying way too hard right now.");
                    return("fail")
                }
            }
                

            submission = submission.replaceAll('^',"**");

//begin rule checks. This runs the result of the equation through all the various rules one at a time.
// Depending on which digit of the phone number is being entered, it may stop the check early and send the number out.
//RULE 1
            if(numberCounter >= 0){

                if(submission.indexOf('+')<= -1){
                    alert("didn't pass rule 1!");
                    return("fail")
                } else {
                    if(numberCounter === 0){
                        return(submission);
                    }
//RULE 2
                    if(numberCounter >= 1){
                        if(submission.indexOf('*')<= -1){
                            alert("didn't pass rule 2!");
                            return("fail")
                        } else {
                            if(numberCounter === 1){
                                return(submission);
                            }
//RULE 3
                            if(numberCounter >= 2){
                                if(submission.indexOf('**')<= -1){
                                    alert("didn't pass rule 3!");
                                    return("fail")
                                } else {
                                    if(numberCounter === 2){
                                        return(submission);
                                    }
//RULE 4
                                    if(numberCounter >= 3){
                                        if(submission.indexOf('-')<= -1){
                                            alert("didn't pass rule 4!");
                                            return("fail")
                                        } else {
                                            if(numberCounter === 3){
                                                return(submission);
                                            }
//RULE 5
                                            if(numberCounter >= 4){
                                                if(submission.indexOf('0')> -1||submission.indexOf('1')> -1){
                                                    alert("didn't pass rule 5!");
                                                    return("fail")
                                                } else {
                                                    if(numberCounter === 4){
                                                        return(submission);
                                                    }
//RULE 6                                            
                                                    //in addition to all previously seen logic, this translates the "log" into a math function.
                                                    if(numberCounter >= 5){
                                                        if(submission.indexOf('log')<= -1){
                                                            alert("didn't pass rule 6!");
                                                            return("fail")
                                                        } else {
                                                            if(numberCounter === 5){
                                                                submission = submission.replaceAll('log',"Math.log10");
                                                                return(submission);
                                                            }
//RULE 7                                                    
                                                            if(numberCounter >= 6){
                                                                if(submission.indexOf('.')<= -1){
                                                                    alert("didn't pass rule 7!");
                                                                    return("fail")
                                                                } else {
                                                                    //the same log translation is here because if I put it earlier it would interfere with this rule's logic
                                                                    submission = submission.replaceAll('log',"Math.log10");
                                                                    if(numberCounter === 6){
                                                                        return(submission);
                                                                    }
//RULE 8
                                                                    if(numberCounter >= 7){
                                                                        //runs a while loop which counts how many pi's are replaced, then checks if only 3 were replaced.
                                                                        let piQuantity = 0;
                                                                        while(submission.indexOf('pi')> -1){
                                                                            submission = submission.replace('pi',"Math.PI");
                                                                            piQuantity++;
                                                                        }
                                                                        if(piQuantity !== 3){
                                                                            alert("didn't pass rule 8!");
                                                                            return("fail")

                                                                        } else {
                                                                            if(numberCounter === 7){
                                                                                return(submission);
                                                                            }
//RULE 9
                                                                            if(numberCounter >= 8){
                                                                                if(submission.indexOf('sin')<= -1){
                                                                                    alert("didn't pass rule 9!");
                                                                                    return("fail")
                                                                                } else {
                                                                                    submission = submission.replaceAll('sin',"Math.sin");
                                                                                    if(numberCounter === 8){
                                                                                        return(submission);
                                                                                    }
//RULE 10
                                                                                    if(numberCounter >= 9){
                                                                                        //runs the same check seen in the pi rule, except with all numbers (aside from 0 and 1 due to rule 5).
                                                                                        //in this case, each number is individually replaced with "z", but they are all changed back before the next check begins.
                                                                                        let num2 = 0;
                                                                                        while(submission.indexOf('2')> -1){
                                                                                            submission = submission.replace('2',"z");
                                                                                            num2++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"2");
                                                                                        let num3 = 0;
                                                                                        while(submission.indexOf('3')> -1){
                                                                                            submission = submission.replace('3',"z");
                                                                                            num3++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"3");
                                                                                        let num4 = 0;
                                                                                        while(submission.indexOf('4')> -1){
                                                                                            submission = submission.replace('4',"z");
                                                                                            num4++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"4");
                                                                                        let num5 = 0;
                                                                                        while(submission.indexOf('5')> -1){
                                                                                            submission = submission.replace('5',"z");
                                                                                            num5++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"5");
                                                                                        let num6 = 0;
                                                                                        while(submission.indexOf('6')> -1){
                                                                                            submission = submission.replace('6',"z");
                                                                                            num6++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"6");
                                                                                        let num7 = 0;
                                                                                        while(submission.indexOf('7')> -1){
                                                                                            submission = submission.replace('7',"z");
                                                                                            num7++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"7");
                                                                                        let num8 = 0;
                                                                                        while(submission.indexOf('8')> -1){
                                                                                            submission = submission.replace('8',"z");
                                                                                            num8++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"8");
                                                                                        let num9 = 0;
                                                                                        while(submission.indexOf('9')> -1){
                                                                                            submission = submission.replace('9',"z");
                                                                                            num9++;
                                                                                        }
                                                                                        submission = submission.replaceAll('z',"9");
                                                                                        
                                                                                        if(num2 <= 2 && num3 <= 2 && num4 <= 2 && num5 <= 2 && num6 <= 2 && num7 <= 2 && num8 <= 2 && num9 <= 2){
                                                                                            return(submission);
                                                                                        }else{
                                                                                            alert("didn't pass rule 10!");
                                                                                            return("fail");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//the function which adds the digit to the page.
function displayNumber(finalNumber){
    
    //adds the digit to whatever is already there
    displayedPhoneNumber.textContent = displayedPhoneNumber.textContent + finalNumber;

    //creates the paragraph element for the next rule
    let newRule = document.createElement('p');
    newRule.setAttribute("class","rule");

    //adds the next rule to the page. Some of these blocks have extra code to help with formatting as the number grows.
    if(numberCounter === 0){
        displayedPhoneNumber.textContent = displayedPhoneNumber.textContent.replaceAll("-","")
        currentDigit.textContent = currentDigit.textContent.replaceAll("1","2")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 1/12 + ")");
        newRule.textContent = " Rule 2: input must contain a *"
        ruleSection.appendChild(newRule);
    }
    if(numberCounter === 1){
        currentDigit.textContent = currentDigit.textContent.replaceAll("2","3")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 2/12 + ")");
        newRule.textContent = " Rule 3: input must contain an exponent (use ^)"
        ruleSection.appendChild(newRule);
    }
    if(numberCounter === 2){
        displayedPhoneNumber.textContent = "(" + displayedPhoneNumber.textContent + ")-"
        currentDigit.textContent = currentDigit.textContent.replaceAll("3","4")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 3/12 + ")");
        newRule.textContent = " Rule 4: input must contain a -"
        ruleSection.appendChild(newRule);
    }
    if(numberCounter === 3){
        currentDigit.textContent = currentDigit.textContent.replaceAll("4","5")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 4/12 + ")");
        newRule.textContent = " Rule 5: input must NOT contain a 0 or 1"
        ruleSection.appendChild(newRule);
    }
    if(numberCounter === 4){
        currentDigit.textContent = currentDigit.textContent.replaceAll("5","6")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 5/12 + ")");
        newRule.textContent = " Rule 6: input must contain a base 10 logarithm (use log())"
        ruleSection.appendChild(newRule);
    }
    if(numberCounter === 5){
        displayedPhoneNumber.textContent = displayedPhoneNumber.textContent + "-";
        currentDigit.textContent = currentDigit.textContent.replaceAll("6","7")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 6/12 + ")");
        newRule.textContent = " Rule 7: input must contain a decimal"
        ruleSection.appendChild(newRule);
    }

    if(numberCounter === 6){
        currentDigit.textContent = currentDigit.textContent.replaceAll("7","8")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 7/12 + ")");
        newRule.textContent = " Rule 8: input must contain exactly THREE pi's (just type 'pi'). Remember to use operators whenever necessary; 2pi isn't valid, but 2*pi is."
        ruleSection.appendChild(newRule);
    }

    if(numberCounter === 7){
        currentDigit.textContent = currentDigit.textContent.replaceAll("8","9")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 8/12 + ")");
        newRule.textContent = " Rule 9: input must contain a sine function (use sin(). calculated in radians)"
        ruleSection.appendChild(newRule);
    }

    if(numberCounter === 8){
        currentDigit.textContent = currentDigit.textContent.replaceAll("9","10")
        newRule.setAttribute("style","background-color: rgba(255, 0, 0," + 9/12 + ")");
        newRule.textContent = " Rule 10: no digit may appear more than 2 times (with the exception of pi)"
        ruleSection.appendChild(newRule);
    }

    if(numberCounter === 9){
        alert("thank you for filling out this form! Your phone number is " + displayedPhoneNumber.textContent);
    }

    //increments the global number counter.
    numberCounter++;
}