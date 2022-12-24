window.application.blocks['lobby-block'] = renderLobbyBlock;
window.application.blocks['play-block'] = renderPlayBlock;

window.application.screens['lobby'] = renderLobbyScreen;

// functions

function renderLobbyScreen() { //   Отрисовка экрана лобби №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Лобби';

    const content = document.createElement('div');
	
    window.application.renderBlock('lobby-block', content); // отрисовка блока лобби №2
    window.application.renderBlock('play-block', content); // отрисовка блока кнопки играть №5


	app.appendChild(title);
    app.appendChild(content);
};

function renderLobbyBlock(container) { // отрисовка блока лобби №2
    console.log(window.application.playerTokens);
    const ol = document.createElement('ol');
    ol.classList.add('app__players');
    container.appendChild(ol);

    window.application.timers.push(setInterval(() => { // добавляем интервал и начинаем
        requestPlayers(); // запрос списка игроков №3
    }, 1000));
};


function requestPlayers() { // запрос списка игроков №3 и последующий вывод на экран
    if(window.application.timers.length !== 0){
        request({
        path: `player-list?token=${window.application.playerTokens.player}`,
        onSuccess: (data) => {
                if(data.status === 'error'){
                    console.log('Ошибка!');
                }else{   
                    if(document.querySelector('.app__players')){
                        document.querySelector('.app__players').textContent = '';
                    }     
                    renderPlayersList(data); // вывод списка игроков №4
               };
           },
        });
    }

};

function renderPlayersList(data) { // Выводим список игроков №4
    
    console.log(data);
    data.list.forEach(player => { 
        const li = document.createElement('li');
        li.classList.add('app__player');
        li.textContent = player.login;
        if(document.querySelector('.app__players')){
            document.querySelector('.app__players').appendChild(li);
        }
    });
};

function renderPlayBlock(container){ // отрисовка блока кнопки играть №5
    const play = document.createElement('button');
    play.classList.add('app__play-button');
    play.textContent = 'Играть';

    play.addEventListener('click', () => {
        request({
            path: `start?token=${window.application.playerTokens.player}`,
            onSuccess: (data) => {
                if(data.status === 'error'){
                    console.log('Ошибка!');
                }else{
                    window.application.id.game = data['player-status'].game.id;
                    clearTimers();
                    window.application.renderScreen('waiting');
                };
            },
        });
    });

    container.appendChild(play);
};