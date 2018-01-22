function main(){
    startQuiz();
    handleSubmitAnswer();
    handleFeedback();
  }
  
  function startQuiz() {
    $('#startBtn').click(function (event){
      $('#quiz-screen').removeClass('hidden');
      $('#start-screen').addClass('hidden');
      renderQuestionScreen();
    });
  }
  
  
    const questions = [
      {
        question:'What is the name of the leader of the Unsullied?',
        answers:['The Worm',
                 'Brown Worm',
                 'Grey Worm',
                 'Susan'],
        correctAnswer:'Grey Worm'
      },
      {
        question:'Where does Arya undergo her training to become \'no-one\'?',
        answers:['The Great Sept of Balor',
                 'The House of Black and White',
                 'The Iron Bank of Bravos',
                 'The House of Shadows'],
        correctAnswer:'The House of Black and White'
      },
      {
        question:'What ailment does Ser Jorah Mormont suffer from?',
        answers:['Dragons Blight',
                'Greyscale',
                'A bad hip',
                'Winters Curse'],
        correctAnswer: 'Greyscale'
      },
      {
        question:'What is Gendry\'s chosen weapon?',
        answers:['Sword',
                 'Crossbow',
                 'Warhammer',
                 'A giant mace'],
        correctAnswer:'Warhammer'
      },
      {
        question:'What is the leader of the White Walkers known as',
        answers:['The Ice King',
                 'King beyond the wall',
                 'The Night King',
                 'Vanilla Ice'],
        correctAnswer:'The Night King'
      },
      {
        question:'What new name does Ramsey Bolton give to Theon Greyjoy?',
        answers:['Reek',
                 'Daniel',
                 'Creep',
                 'Robin'],
        correctAnswer:'Reek'
      },
      {
        question:'Which character originally says "The man who passes the sentence should swing the sword"?',
        answers:['Jon Snow',
                 'Brandon Stark',
                 'Jamie Lanister',
                 'Ned Stark'],
        correctAnswer:'Ned Stark'
      },
      {
        question:'Which animal did Brienne of Tarth fight in season 3?',
        answers:['Lion',
                 'Bear',
                 'Direwolf',
                 'Dragon'],
        correctAnswer:'Bear'
      },
      {
        question:'Where did the massacre of the Wildlings by the White Walkers take place?',
        answers:['Hardhome',
                 'Hardhouse',
                 'Hardhill',
                 'Hardluck'],
        correctAnswer:'Hardhome'
      },
      {
        question:'Who says the famous line "when you play the game of thrones, you win or you die. There is no middle ground"?',
        answers:['Varys',
                 'Littlefinger',
                 'Daenerys',
                 'Cersei Lannister'],
        correctAnswer:'Cersei Lannister'
      }
    ];
    
  let currentQuestion = 0;
  let correctCount = 0;
  
  function renderQuestionScreen(){
    renderQuestion();
    renderAnswers();
  }
  
  function renderQuestion(){
    let position = questions[currentQuestion];
    let progress = (currentQuestion + 1) + '/' + questions.length;
    let questionText = position.question;
    $('.js-question-text').html('('+progress + ')' + ' ' + questionText);
  }
  
  function renderAnswers(){
    let position = questions[currentQuestion];
    $('.js-answers').empty();
    for(let i = 0; i < position.answers.length; i++){
      let answerHTML =`<label class='answer'>
        <input type="radio" name="option" aria-label='answer' value='${position.answers[i]}' required>
        <span>${position.answers[i]}</span>
        </label><br>`;
      $('.js-answers').append(answerHTML);
    }
  }
  
  function handleSubmitAnswer(){
    $('.js-submit').click(function (event){
      event.preventDefault();
      let userAnswer = $('input[name = "option"]:checked').val();
      checkAnswer(userAnswer);
      updateScore();
    });
  }
  
  function checkAnswer(userAnswer){
    let position = questions[currentQuestion];
    let rightAnswer = position.correctAnswer;
    if(userAnswer === rightAnswer){
      currentQuestion++;
      correctCount++;
      renderFeedback(true);
    }
    else if(userAnswer === undefined){
      renderFeedback('noAnswer');
    }
    else{
      renderFeedback(false);
      currentQuestion++;
    }
    if(currentQuestion === questions.length){
      renderResultsPage();
    }
    else{
      renderQuestionScreen();
    }
  }
  
  function updateScore(){
    $('.score').empty();
    $('.score').html(`Score: ${correctCount}/${currentQuestion}`);
  }
  
  function renderFeedback(answer){
    if(answer === true){
      $('.modal-content').find('h2').text('Hooray you did it!');
      $('.modal-content').find('img').attr('src', 'https://media.giphy.com/media/11clOWGCHzWG7C/giphy.gif');
      $('.modal-content').find('img').attr('alt','Happy Tyrion Lanister');
    }
    else if(answer === false){
      $('.modal-content').find('h2').text(`Sorry but the correct answer is: ${questions[currentQuestion].correctAnswer}`);
      $('.modal-content').find('img').attr('src', 'https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif');
      $('.modal-content').find('img').attr('alt','Dissapointed wildling');
    }
    else if (answer === 'noAnswer'){
      $('.modal-content').find('h2').text('Wait...You seem to have forgotten your answer');
      $('.modal-content').find('img').attr('src', 'https://media.giphy.com/media/l1CCbIi5dJXirPURO/giphy.gif');
      $('.modal-content').find('img').attr('alt','Daenerys wapping her finger');
    }
  }
  
  function handleFeedback(){
    $('.js-submit').on('click', function (event){
      $('.modal').addClass('show-modal');
      console.log('event listener works');
    });
    $('.close-modal').on('click', function (event){
      $('.modal').removeClass('show-modal');
    });
  }
  
  function renderResultsPage(){
    $('#quiz-screen').addClass('hidden');
    $('.score-section').removeClass('hidden');
    $('.js-results').html(`<h4>You got ${correctCount} correct out of ${questions.length}!</h4>`);
    handleQuizRestart();
  }
  
  function handleQuizRestart(){
    $('#try-again').on('click', function (event){
      $('.score-section').addClass('hidden');
      $('#start-screen').removeClass('hidden');
      resetCounters();
      renderQuestionScreen();
    });
  }
  
  function resetCounters(){
    currentQuestion = 0;
    correctCount = 0;
    $('.score').html('Score:0/0');
  }
  
  main();
  
  
  
  