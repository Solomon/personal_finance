$(document).ready(function(){
  console.log('js is working');

  salary = 100;
  savingsPercentage = 0.5;
  investmentReturn = 0.05;
  startingAge = 30;
  startingSavings = 0;
  badYears = [];

  setNormalScenario = function(){
    investmentReturn = 0.05;
    badYears = generateBadYears(5);
  };

  setGreatScenario = function(){
    investmentReturn = 0.06;
    badYears = generateBadYears(0);
  };

  setBadScenario = function(){
    investmentReturn = 0.04;
    badYears = generateBadYears(10);
  };

  yearlySavings = function(){
    return salary * savingsPercentage;
  };

  yearlyAdditional = function(year){
    if(_.contains(badYears, year)){
      return yearlySpending() * -1 - (yearlySpending()/2) * investmentReturn;
    } else {
      var currentSavings = yearlySavings();
      return currentSavings + (currentSavings/2) * investmentReturn;
    }
  };

  var spendingPercentage = function(){
    return 1 - savingsPercentage;
  };

  var yearlySpending = function(){
    return salary * spendingPercentage();
  };

  retirementAmount = function(){
    return yearlySpending() / 0.04;
  };

  endingBalance = function(year){
    var additional = yearlyAdditional(year);
    if(year === 1){
      return additional;
    } else {
      return endingBalance(year - 1) * (1 + investmentReturn) + additional;
    }
  };

  generateBadYears = function(badPercent){
    var years = [];
    for(var y = 1; y <= 100; y++){
      if((Math.random()*100) <= badPercent){
        years.push(y);
      }
    }
    return years;
  };

  generateData = function(){
    data = [];
    for(var y = 1; y <= 100; y++){
      data.push({year: y, additional: yearlyAdditional(y), balance: endingBalance(y)});
    }
    return data;
  };

  retirementYear = function(){
    var retirement = retirementAmount();
    for(var y = 1; y <= 100; y++){
      if(endingBalance(y) >= retirement){
        return y;
      }
    }
    return false;
  };

  canRetire = function(){
    return retirementYear ? true : false;
  };

  setNormalScenario();

  $('.bigSavingsButton').on("click", function(){
    var percent = parseInt($('.bigSavingsInput').val(), 10)/100.0;
    savingsPercentage = percent;
    setNormalScenario();
    $('.bigRetireYear').html(retirementYear());
  });
});
