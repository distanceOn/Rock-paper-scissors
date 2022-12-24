window.application.blocks['win-block'] = renderWinBlock;

window.application.screens['win'] = renderWinScreen;

function renderWinScreen() { //   Отрисовка экрана победы №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	
    window.application.renderBlock('win-block', content); // блок победы
    window.application.renderBlock('to_lobby-block', content); // переход в лобби
    window.application.renderBlock('play-block', content); // кнопка играть

    app.appendChild(title);
    app.appendChild(content);

    document.querySelector('.app__play-button').textContent = 'Играть еще!';
};

function renderWinBlock(container) { // отрисовка блока победы №2
    const enemy = document.createElement('h3');
    enemy.classList.add('app__enemy');
    enemy.textContent = `Ваш противник ${window.application.enemies.enemy}`;
    container.appendChild(enemy);

    const winner = document.createElement('h3');
    winner.classList.add('app__winner');
    winner.textContent = 'Вы выиграли!';
    container.appendChild(winner);
};