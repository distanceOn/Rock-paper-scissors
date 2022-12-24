window.application.blocks['lose-block'] = renderLoseBlock;

window.application.screens['lose'] = renderLoseScreen;

function renderLoseScreen() { //   Отрисовка экрана хода №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	
    window.application.renderBlock('lose-block', content);


	app.appendChild(title);
    app.appendChild(content);
};

function renderLoseBlock(container) { // отрисовка блока поражения №2

};