window.application.blocks['lobby-block'] = renderLobbyBlock;

window.application.screens['lobby'] = renderLobbyScreen;

// functions

function renderLobbyScreen() { //   Отрисовка экрана лобби №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.classList.add('app__h1');
    title.textContent = 'Лобби';

    const content = document.createElement('div');
    content.classList.add('app__content-lobby');

    window.application.renderBlock('lobby-block', content); // отрисовка блока лобби №2
    window.application.renderBlock('play-block', content); // отрисовка блока кнопки играть №5

	app.appendChild(title);
    app.appendChild(content);
};

function renderLobbyBlock(container) { // отрисовка блока лобби №2
    console.log(window.application.playerTokens);

    const olName = document.createElement('h2');
    olName.classList.add('app__ol-name');
    olName.textContent = 'Список игроков онлайн';
    container.appendChild(olName);

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

