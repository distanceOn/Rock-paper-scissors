window.application.blocks['waiting-block'] = renderWaitingBlock;

window.application.screens['waiting'] = renderWaitingScreen;

function renderWaitingScreen() { //   Отрисовка экрана ожидания №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.classList.add('app__h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	
    window.application.renderBlock('waiting-block', content);


	app.appendChild(title);
    app.appendChild(content);
};

function renderWaitingBlock(container) { // отрисовка блока ожидания №2
    const wait = document.createElement('h2');
    wait.classList.add('app__wait');
    wait.textContent = 'Ожидание подключения соперника...';
    container.appendChild(wait);

    window.application.timers.push(setInterval(() => { // запрос статуса игры №3
        requestGameStatus();
    }, 500));


};

function requestGameStatus(){ // запрос статуса игры №3
    request({
        path: `game-status?token=${window.application.playerTokens.player}&id=${window.application.id.game}`,
        onSuccess: (data) => {
            if(data['game-status'].status !== "waiting-for-start"){
                window.application.enemies.enemy = data['game-status'].enemy.login;
                clearTimers();    
                window.application.renderScreen('move'); //переход в ход №4           
            };            
        },
    });
};