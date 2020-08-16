
//UI CONTROLLER
var UIController = (function(){

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputValue :".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetValue: ".budget__value",
        budgetIncome: ".budget__income--value",
        budgetExpenses: ".budget__expenses--value",
        budgetPercentage: ".budget__expenses--percentage",
        container: ".container"
    }

    var formatNumber = function(num, type){

        var numSplit, integer, decimal;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        integer = numSplit[0];

        if(integer.length > 3 && integer.length <= 6){
            integer = integer.substr(0,integer.length - 3) + "," + integer.substr(integer.length - 3, 3);
        }else if(integer.length > 6){
            integer = integer.substr(0,integer.length - 6) + "," + integer.substr(integer.length - 6, integer.length-3) + "," + integer.substr(integer.length - 3, 3);
        }


        decimal = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + integer + '.' + decimal ;
    }


    return{

        getInput: function(){

            return{

                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },

        getDOMstrings: function(){
            return DOMstrings;
        },

        addListItem : function(obj, type){
            var element, html, newHtml;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item" id="inc-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item" id="exp-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            //Replace placeholder text with actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value, type) );

            //Insert HTML data into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID){
            var element = document.getElementById(selectorID);

            element.parentNode.removeChild(element);
            
        },

        clearFields : function(){
            var fields = document.querySelectorAll(DOMstrings.inputValue + ", " + DOMstrings.inputDescription);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                current.value = "";
            });

            fields[0].focus();
        },

        updateBudgetUI: function(obj){

            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp' ; 

            document.querySelector(DOMstrings.budgetValue).textContent = formatNumber(obj.budget, type) ;

            document.querySelector(DOMstrings.budgetIncome).textContent = formatNumber(obj.totalIncome, 'inc') ;

            document.querySelector(DOMstrings.budgetExpenses).textContent = formatNumber(obj.totalExpenses, 'exp');


            if(obj.percentage > 0){
                document.querySelector(DOMstrings.budgetPercentage).textContent = obj.percentage + "%";
            }else{
            document.querySelector(DOMstrings.budgetPercentage).textContent = "---";
            }

        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(".item__percentage");

            for( var i=0; i < fields.length ; i++){
                fields[i].textContent = percentages[i] + "%";
            }
        },

        displayMonth: function(){

            var now = new Date();

            var month = now.toLocaleString('default', {month: 'long'});
            var year = now.getFullYear();

            document.querySelector(".budget__title--month").textContent = month + ' ' + year;
        },

        changedType : function(){

           var fields = document.querySelectorAll(DOMstrings.inputType + ',' +
            DOMstrings.inputDescription + ',' +
            DOMstrings.inputValue);

            var iterateNodeList = function(fields, callback){

                for(var i = 0; i < fields.length ; i++){
                    callback(fields[i]);
                }
            }

            iterateNodeList(fields, function(current){
                current.classList.toggle('red-focus');
            })

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        }
    }

})();

export {UIController};