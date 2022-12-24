function renderLoginBlock(container) {
    const input = document.createElement('input');
    input.classList.add('app__input');
    input.placeholder = 'Никнейм';
    input.maxLength = '30';
    const button = document.createElement('button');
    button.classList.add('app__button');
    button.textContent = 'Войти';

    input.addEventListener('focus', () => {
        input.placeholder = '';
    });
    input.addEventListener('blur', () =>{
        input.placeholder = 'Никнейм';
    })

    button.addEventListener('click', (event) => {
        event.preventDefault();
        if(input.value !== ''){
            request({
                path: `login?login=${input.value}`,
                onSuccess: (data) => { // Успех присваивания логина
                    if(data.status === 'error'){
                        console.log('Ошибка!');
                    }else{
                            window.application.playerTokens.player = data.token; // Добавляем токен игрока в объект
                            request({ // справшиваем статус игрока
                                    path: `player-status?token=${window.application.playerTokens.player}`, 
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
        }

    });


    
    container.appendChild(input);
    container.appendChild(button);
}



function renderLoginScreen() {
	const app = document.querySelector('.app');
    app.textContent = '';

    const title = document.createElement('h1');
    title.classList.add('app__h1')
    title.textContent = 'Камень, ножницы, бумага';

    const content = document.createElement('form');
    content.classList.add('app__form');
	
     window.application.renderBlock('login-block', content);

	app.appendChild(title);
    app.appendChild(content);
}

window.application.blocks['login-block'] = renderLoginBlock;

window.application.screens['login'] = renderLoginScreen;

