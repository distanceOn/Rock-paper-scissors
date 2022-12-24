window.application.blocks['play-block'] = renderPlayBlock;

window.application.blocks['to_lobby-block'] = toLobbyBlock;

function renderPlayBlock(container){ // отрисовка блока кнопки играть
    const play = document.createElement('button');
    play.classList.add('app__play-button');
    play.textContent = 'Играть';

    play.addEventListener('click', () => {
        request({
            path: `start?token=${window.application.playerTokens.player}`,
            onSuccess: (data) => {
                if(data.status === 'error'){
                    console.log('Ошибка!');
                }else{
                    window.application.id.game = data['player-status'].game.id;
                    clearTimers();
                    window.application.renderScreen('waiting');
                };
            },
        });
    });

    container.appendChild(play);
};

function toLobbyBlock(container){ // кнопка переход в лобби
    const button = document.createElement('button');
    button.classList.add('app__to-lobby');
    button.textContent = 'Перейти в лобби';
    container.appendChild(button);

    button.addEventListener('click', () => {
        window.application.renderScreen('lobby');    
    });
}