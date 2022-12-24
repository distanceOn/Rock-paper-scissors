window.application.blocks['lose-block'] = renderLoseBlock;

window.application.screens['lose'] = renderLoseScreen;

function renderLoseScreen() { //   Отрисовка экрана хода №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.classList.add('app__h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	content.classList.add('app__content-move');

    window.application.renderBlock('lose-block', content); // блок поражения

    app.appendChild(title);
    app.appendChild(content);

    document.querySelector('.app__play-button').textContent = 'Играть еще!';
};

function renderLoseBlock(container) { // отрисовка блока поражения №2

    const enemy = document.createElement('h3');
    enemy.classList.add('app__enemy');
    enemy.textContent = `Ваш противник ${window.application.enemies.enemy}`;
    container.appendChild(enemy);

    const loser = document.createElement('h3');
    loser.classList.add('app__loser');
    loser.textContent = 'Вы проиграли!';
    container.appendChild(loser);

    const div = document.createElement('div');
    div.classList.add('app__end-buttons');
    container.appendChild(div);

    window.application.renderBlock('to_lobby-block', div); //  переход в лобби
    window.application.renderBlock('play-block', div); // кнопка играть
};