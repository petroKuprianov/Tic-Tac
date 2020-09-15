var a = $(".game .item");
jQuery(function(){
    $ = $ || jQuery;
    var fields; 
    var firstStep; 
    var winer = {
      you:0,
      comp:0
    }
   
    $("#game-krestiki-noliki div .next,#game-krestiki-noliki div .close").on("click",function (e){
     a.off("click",clickGamer);
     e.preventDefault();
     $(this).parents(".win").hide();
     $(this).parents(".lost").hide();
     init();
    });
   
   function init(){
    fields = [0,0,0,0,0,0,0,0,0];
    firstStep = rand(0,fields.length-1);
    fields[firstStep] = 1;
    a.on("click",clickGamer);
    a.each(function(i,e){
    $(e).html( symbol(fields[i]) );
    });
    let test = document.getElementById("show__score");
    test.innerText = `You  - ${winer.you}, Computer - ${winer.comp}`;
   }
   
   function clickGamer(e){
    var self = this, num;
    e.preventDefault();

    $(this).off("click",clickGamer);

    $(this).html(symbol(2));

    a.each(function(i,e){
     if( self == e ) {
      num = i;
      fields[i] = 2;
     }
    });

  //  clickComp(fields);
  step(fields,1,clickComp,checkWin,clickGamer,symbol);
   if ( checkWin(fields,2) ) {
     $("#game-krestiki-noliki .win").show();
     winer.you+=1;
   } else
   if ( checkWin(fields,1) ) {
     $("#game-krestiki-noliki .lost").show();

     winer.comp+=1;
   } else if ( checkFullStep(fields) == 0 )
     init();
   }
   
   function clickComp(fields){
    var steps = getStep(fields);
    var step = steps[rand(0, steps.length-1)];
    fields[step] = 1;

    a.each(function(i,e){
    if( i == step ) {
     $(e).off("click",clickGamer);
     $(e).html(symbol(1));
    }
   });
   }
   
   function checkWin(fields, sym){
    var flag = true, tmp = [], sum = 0;

    for(var i = 0; i < 3; i++){
     tmp[i] = [];
     for(var j = 0; j < 3; j++){
      tmp[i][j] = fields[i*3+j];
     }
    }

    for(var i = 0; i < 3; i++){
     flag = true;
      for(var j = 0; j < 3; j++){
       if( tmp[i][j] != sym )
        flag = false;
      }
     if( flag ) return true;
   }
   

   for(var i = 0; i < 3; i++){
    flag = true;
    for(var j = 0; j < 3; j++){
     if( tmp[j][i] != sym )
      flag = false;
     }
    if( flag ) return true;
   }

   if(
    tmp[0][0] == sym &&
    tmp[1][1] == sym &&
    tmp[2][2] == sym ||
    tmp[0][2] == sym &&
    tmp[1][1] == sym &&
    tmp[2][0] == sym
   ) return true;
   }
   
   function checkFullStep(arr){
    return arr.join("").split(0).length - 1;
   }
   
   init();
   
   });

   function rand(n,m){
    return Math.round(Math.random()*(m-n)+n);
   }

   function symbol(input){
    switch( input ){
     case 0: return "";
     case 1: return "×";
     case 2: return "o";
    }
   }

   function getStep(arr){
    var tmp = [],p;
    for( p in arr ){
     if ( !arr[p] )
     tmp.push(p);
    }
   return tmp;
   }
   

   function arrayClone(arr){
    var tmp = [];
    for(var p in arr)
     tmp[p] = arr[p];
     return tmp;
    }


    function step(board,symbol,clickComp,checkWin, clickGamer,symbol){
      console.log(board);
      const count = board.length;
  
      // Приоритет хода.В зависмости от него компьютер обороняется/атакует 
      let priority = 0;
      // Индексы ячейки, которую нужно заполнить в завсимсоти от приоритета
      let px, py; 
  
      for (let i = 0; i <= count; i++) {
        console.log("inside 1-st for");
          if (board[i] === 0) {
            console.log("inside first if");
            // Имитируем ход компьютера
            board[i]= symbol;
            // Если ход компьютра победный, то сохраняем индексы ячейки
            if (checkWin(board, symbol)) {
              console.log("inside second if");
              px = i;
              priority = 2;
              break;
            }
            // Имитируем ход пользователя
            board[i] = 2;
            // Если ход компьютра победный, то сохраняем индексы ячейки
            if (checkWin(board, 2)) {
              console.log("inside third if");
              px = i;
              priority = 1;
            }
            // Очищаем ячейку после симулированных ходов
            board[i] = 0;
          }
        // Если у комьютера есть возможность выиграть, то выходим из цикла
        if (priority === 2){
          console.log("inside if break");
          break;
        }
      }
      // Если приоритет не изменился, то компьютер ходит случайно
      if (priority === 0) {
        clickComp(board);
        console.log("click comp");
      } else {
        board[px] = 1;
        console.log("click step");
        a.each(function(i,e){
        if( i == px ) {
        $(e).off("click",clickGamer);
        $(e).html(symbol(1));
        }
      });
      }
    }