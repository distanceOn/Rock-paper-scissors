window.application.blocks['waiting-block'] = renderWaitingBlock;

window.application.screens['waiting'] = renderWaitingScreen;

function renderWaitingScreen() { //   Отрисовка экрана ожидания №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
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

    const enemy = document.createElement('h3');
    enemy.classList.add('app__enemy');
    container.appendChild(enemy);

    window.application.timers.push(setInterval(() => { // запрос статуса игры №3
        requestGameStatus(enemy);
    }, 500));


};

function requestGameStatus(enemy){ // запрос статуса игры №3
    enemy.textContent = '';
    request({
        path: `game-status?token=${window.application.playerTokens.player}&id=${window.application.id.game}`,
        onSuccess: (data) => {
            console.log(data);
            // enemy.textContent = data['game-status'].enemy.login;
            
        },
    });
};