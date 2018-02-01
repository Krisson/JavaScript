var total = 0;
var txtField = document.getElementById('txtField');
var equal = document.getElementById('res');

function pushBtn(obj) {
    var pushed = obj.innerHTML;
    txtField.value += pushed;
    var txtStr = txtField.value;

    equal.onclick = function () {
        var numString = txtStr;
        console.log("YOU ENTERED THE FOLLOWING STRING: " + numString);

        // conversion - String to an Array
        function stringNumbertoArray(numString) {
            var calculation = [],
                current = '';
            for (var i = 0, ch; ch = numString.charAt(i); i++) {
                if ('^*/+-'.indexOf(ch) > -1) {
                    if (current == '' && ch == '-') {
                        current = '-';
                    } else {
                        calculation.push(parseFloat(current), ch);
                        current = '';
                    }
                } else {
                    current += numString.charAt(i);
                }
            }
            if (current != '') {
                calculation.push(parseFloat(current));
            }
            return calculation;
        }

        var numArr = stringNumbertoArray(numString);
        // console.log("MAIN:::: " + numArr + " <- Initial Array");
        function calculate(numArr) {
            var multiplication_indexAt = 0, divide_indexAt = 0;
            var addition_indexAt = 0, subtraction_indexAt = 0;

            for (var i = 0; i < numArr.length; i++) {
                // multiplication/division statement
                if ((numArr[i] == "*" || numArr[i] == "/") && !(numArr[i + 1] == "*" || numArr[i + 1] == "/")) {
                    if (numArr[i] == "*") {
                        multiplication_indexAt = i;
                        if (isNaN(numArr[i + 1])) {
                            console.log("index i is not a number: " + i);
                            break;
                        } else {
                            numArr[i] = numArr[i - 1] * numArr[i + 1]; 
                            numArr.splice(multiplication_indexAt - 1, 1); 
                            numArr.splice(multiplication_indexAt, 1);
                            // console.log("STEP:::: " + numArr + " <- multiplication");
                            i = -1;
                        }
                    }

                    if (numArr[i] == "/") {
                        divide_indexAt = i;
                        if (isNaN(numArr[i + 1])) {
                            console.log("index i is not a number: " + i);
                            break;
                        } else {
                            numArr[i] = numArr[i - 1] / numArr[i + 1];
                            numArr.splice(divide_indexAt - 1, 1);
                            numArr.splice(divide_indexAt, 1);
                            // console.log("STEP:::: " + numArr + " <- division");
                            i = -1;
                        }
                    }
                }
            }

            // addition/subtraction
            for (var i = 0; i < numArr.length; i++) {
                if (numArr[i] == "+") {
                    addition_indexAt = i;
                    if (isNaN(numArr[i + 1])) {
                        console.log("index i is not a number: " + i);
                        break;
                    } else {
                        numArr[i] = numArr[i - 1] + numArr[i + 1];
                        numArr.splice(addition_indexAt - 1, 1);
                        numArr.splice(addition_indexAt, 1);
                        // console.log("STEP:::: " + numArr + " <- addition");
                        i = -1;
                    }
                }
                if (numArr[i] == "-") {
                    subtraction_indexAt = i;
                    if (isNaN(numArr[i + 1])) {
                        console.log("index i is not a number: " + i);
                        break;
                    } else {
                        numArr[i] = numArr[i - 1] - numArr[i + 1];
                        numArr.splice(subtraction_indexAt - 1, 1);
                        numArr.splice(subtraction_indexAt, 1);
                        // console.log("STEP:::: " + numArr + " <- subtraction");
                        i = -1;
                    }
                }
            }
            total = Number(numArr);
            console.log("Total = " + total);
            txtField.value = total;
        } //eo function calculate
        calculate(numArr);
    } //eo Eq Statement ['='];
    if (pushed == "CE") {
        init_calc();
    }
} // eo function pushBtn

// Reset Calc.
function init_calc() {
    txtField.value = "";
    total = 0;
}