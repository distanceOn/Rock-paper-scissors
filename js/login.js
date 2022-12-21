function renderLoginBlock(container) {
    const input = document.createElement('input');
    const button = document.createElement('button');
    button.textContent = 'Войти';

    button.addEventListener('click', () => {
        request({
            path: `login?login=${input.value}`, //
            onSuccess: (data) => { // Успех присваивания логина
                window.application.playerTokens[`player${playerCounter}`] = data.token; // Добавляем токен игрока в объект
                request({
                    path: `player-status?token=${players[`player${playerCounter}`]}`,
                    onSuccess: (data) => {
                        console.log(data);
                    }
                })
            },
        });
        playerCounter++; // Увеличиваем колво игроков для последующего добавления игрока на 1 порядок больше
    });


    
    container.appendChild(input);
    container.appendChild(button);
}



function renderLoginScreen() {
	const app = document.querySelector('.app');
    app.textContent = '';

    console.log('dsadasd');

    const title = document.createElement('h1');
    title.textContent = 'Авторизация';

    const content = document.createElement('div');
	
     window.application.renderBlock('login-block', content);

	app.appendChild(title);
    app.appendChild(content);
}

window.application.blocks['login-block'] = renderLoginBlock;

window.application.screens['login'] = renderLoginScreen;

