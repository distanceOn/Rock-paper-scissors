function renderLobbyBlock(container) {
    const ol = document.createElement('ol');
    ol.classList.add('app__players');
    container.appendChild(ol);
    
        console.log(window.application.playerTokens);
        request({
        path: `player-list?token=${window.application.playerTokens.player}`,
        onSuccess: (data) => {
            if(data.status === 'error'){
                console.log('Ошибка!');
            }else{
                console.log(data);
                data.list.forEach(player => { // Выводим список игроков
                const li = document.createElement('li');
                li.classList.add('app__player');
                li.textContent = player.login;
                ol.appendChild(li);
            });
            };
            
        }
    })

    


}

function renderLobbyScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Лобби';

     const content = document.createElement('div');
	
     window.application.renderBlock('lobby-block', content);

	app.appendChild(title);
    app.appendChild(content);
}

window.application.blocks['lobby-block'] = renderLobbyBlock;

window.application.screens['lobby'] = renderLobbyScreen;