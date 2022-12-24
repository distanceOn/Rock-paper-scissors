window.application.blocks['win-block'] = renderWinBlock;

window.application.screens['win'] = renderWinScreen;

function renderWinScreen() { //   Отрисовка экрана хода №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	
    window.application.renderBlock('win-block', content);


	app.appendChild(title);
    app.appendChild(content);
};

function renderWinBlock(container) { // отрисовка блока победы №2

};