//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){

        if(totalIncome > 0){
            this.percentage = Math.round((this.value/totalIncome) * 100);
        }else{
            this.percentage = -1;
        }

    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateSum = function(type){

        var sum = 0;

        data.allItems[type].forEach((element)=>{
            sum += element.value;
        })

        data.totals[type] = sum;
    }

    var data = {
        allItems : {
            inc : [],
            exp : []
        },

        totals : {
            inc: 0,
            exp: 0
        },

        budget: 0,
        percentage: -1
    }

    return {

        addItem : function(type,des,val){

            var newItem, ID;

            //creating new id 
            if(data.allItems[type].length > 0){
                ID = (data.allItems[type][data.allItems[type].length - 1]).id + 1;
            }else{
                ID = 0;
            }


            //creating new object based on type
            if(type === "exp"){
                newItem = new Expense(ID, des, val);
            }else if(type === "inc"){
                newItem = new Income(ID,des,val);
            }

            //pushing new object created to our data object
            data.allItems[type].push(newItem);

            //return the new object created
            return newItem;
        },

        calculateBudget: function(){

            // sum the total income and expenses
            calculateSum('exp');
            calculateSum('inc');

            //calculate the budget
            data.budget = data.totals.inc - data.totals.exp ;

            //calculate the percentage
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }

        },

        calculatePercentage: function(){
            data.allItems.exp.forEach((element)=>{
                element.calcPercentage(data.totals.inc);
            })


        },

        getPercentages: function(){

            var Percentages = data.allItems.exp.map((current)=>{
                return current.percentage;
            })

            return Percentages;
        },

        getBudget : function(){
            return{
                budget: data.budget,
                totalIncome : data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },

        deleteItem: function(type, ID){
            var i;

            for(i=0; i< data.allItems[type].length ; i++){
                if(data.allItems[type][i].id == ID){
                    data.allItems[type].splice(i,1);
                }
            }
        },

        testing: function(){
            console.log(data);
        }
    }
})();


export {budgetController};