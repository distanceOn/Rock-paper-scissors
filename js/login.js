function renderLoginBlock(container) {
    const input = document.createElement('input');
    input.classList.add('app__input');
    const button = document.createElement('button');
    input.classList.add('app__button');
    button.textContent = 'Войти';

    button.addEventListener('click', () => {
        request({
            path: `login?login=${input.value}`,
            onSuccess: (data) => { // Успех присваивания логина
                if(data.status === 'error'){
                    console.log('Ошибка!');
                }else{
                        window.application.playerTokens.player = data.token; // Добавляем токен игрока в объект
                        request({ // справшиваем статус игрока
                                path: `player-status?token=${players.player}`, 
                        onSuccess: (data) => {
                            if(data.status === 'error'){
                                console.log('Ошибка!');
                            }else if(data['player-status'].status === 'lobby'){
                                console.log(data);
                                window.application.renderScreen('lobby');
                                
                            }else if(data['player-status'].status === 'game'){

                            }
                        }
                })
                }
                
            },
        });
    });


    
    container.appendChild(input);
    container.appendChild(button);
}



function renderLoginScreen() {
	const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Авторизация';

    const content = document.createElement('div');
	
     window.application.renderBlock('login-block', content);

	app.appendChild(title);
    app.appendChild(content);
}

window.application.blocks['login-block'] = renderLoginBlock;

window.application.screens['login'] = renderLoginScreen;

