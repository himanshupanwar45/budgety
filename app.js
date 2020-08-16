import {budgetController} from './budgetController.js';
import {UIController} from './UIController.js';
//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    function setUpEventListeners(){

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem)
    
        document.addEventListener("keypress",(event)=>{
            if(event.key === 'Enter'){
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    }

    var updateBudget = function(){
        //TODO: 1. Calculate the budget
        budgetCtrl.calculateBudget();

        var budget = budgetCtrl.getBudget();


        //TODO: 2. Display the budget
        UICtrl.updateBudgetUI(budget);



    }

    var updatePercentages = function(){
        // calculate the percentage
        budgetCtrl.calculatePercentage();
        var percentages = budgetCtrl.getPercentages();
        // budgetCtrl.testing();

        //update percentage in UI
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function(){

    //1. Get the input field data

        var inputData = UICtrl.getInput();
        if(inputData.value == 0 || inputData.description == "" || isNaN(inputData.value)){

            

        }else{
            
            var DOM = UICtrl.getDOMstrings();

            //TODO: 2. Add item to budget controller
                var newItem = budgetCtrl.addItem(inputData.type, inputData.description, inputData.value); 
        
            //TODO: 3. Add the item to user interface
                UICtrl.addListItem(newItem,inputData.type);
        
            //TODO: 4. clear the fields
                UICtrl.clearFields();
            
            //TODO: 5.Update the budget
                updateBudget();

            //TODO: 6. Update the Percentages
                updatePercentages();

        }

    }


    var ctrlDeleteItem = function(event){

        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split("-");

            type = splitID[0];
            ID = splitID[1];

            //Delete Item from data structure 

            console.log("split id array : "+ splitID);
            budgetCtrl.deleteItem(type,ID);

            //Delete Item from UI
            UICtrl.deleteListItem(itemID);

            //Update the budget
            updateBudget();

            //Update the Percentages
            updatePercentages();
        }




    }

    return {
        init: function(){
            setUpEventListeners();
            UICtrl.updateBudgetUI(budgetCtrl.getBudget());
            UICtrl.displayMonth();
        }
    }



})(budgetController, UIController);


controller.init();
