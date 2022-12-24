window.application.blocks['move-block'] = renderMoveBlock;

window.application.screens['move'] = renderMoveScreen;


function renderMoveScreen() { //   Отрисовка экрана хода №1
    const app = document.querySelector('.app');
    app.textContent = '';


    const title = document.createElement('h1');
    title.textContent = 'Игра';

    const content = document.createElement('div');
	
    window.application.renderBlock('move-block', content);


	app.appendChild(title);
    app.appendChild(content);
};

function renderMoveBlock(container) { // отрисовка блока хода №2
    let status = '';

    const enemy = document.createElement('h3');
    enemy.classList.add('app__enemy');
    enemy.textContent = `Ваш противник ${window.application.enemies.enemy}`;
    container.appendChild(enemy);

    const rock = document.createElement('button');
    rock.classList.add('app__rock');
    rock.textContent = 'Камень';
    container.appendChild(rock);

    rock.addEventListener('click', () => {
        move('rock', status);
    });

    const scissors = document.createElement('button');
    scissors.classList.add('app__scissors');
    scissors.textContent = 'Ножницы';
    container.appendChild(scissors);

    scissors.addEventListener('click', () => {
        move('scissors', status);
    });

    const paper = document.createElement('button');
    paper.classList.add('app__paper');
    paper.textContent = 'Бумага';
    container.appendChild(paper);

    paper.addEventListener('click', () => {
        move('paper', status);
    });
};

function move(turn, status){  // результат хода №3
    if(status === ''){
        request({
            path: `play?token=${window.application.playerTokens.player}&id=${window.application.id.game}&move=${turn}`,
            onSuccess: (data) => {
                console.log(data['game-status'].status);
                status = data['game-status'].status;
                if(status === 'waiting-for-enemy-move'){
                    waitingPrint();
                    move(turn, status);
                }else{
                    waitingDel();
                    result(status);
                }
            },
        });
    }else if(status === 'waiting-for-enemy-move'){
        request({
            path: `game-status?token=${window.application.playerTokens.player}&id=${window.application.id.game}`,
            onSuccess: (data) => {
                if(data['game-status'].status === 'waiting-for-enemy-move'){
                    setTimeout(() => {
                        move(turn, status);                            
                    }, 2000);
                }else{
                    waitingDel();
                    status = data['game-status'].status;
                    result(status);
                }
            }
        });
    }

};

function result(status) {
    switch (status) {
        case 'waiting-for-your-move':
            console.log('Ничья');
            window.application.renderScreen('move');            
            break;
        case 'lose':
            console.log('Поражение');
            window.application.renderScreen('lose');
            break;
        case 'win':
            console.log('Победа');
            window.application.renderScreen('win');
            break;
        default:
            break;
    };
}

function waitingPrint() {
    waitingDel();
    const waiting = document.createElement('h3');
    waiting.classList.add('app__waiting-enemy');
    waiting.textContent = 'Ожидание хода соперника...'
    document.querySelector('.app').appendChild(waiting);    
}

function waitingDel() {
    if(document.querySelector('.app__waiting-enemy')){
        document.querySelector('.app').lastChild.remove();
    }    
}
                