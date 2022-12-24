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

    rock.addEventListener('click', () => { // камень
        move('rock', status);
    });

    const scissors = document.createElement('button');
    scissors.classList.add('app__scissors');
    scissors.textContent = 'Ножницы';
    container.appendChild(scissors);

    scissors.addEventListener('click', () => { //ножницы
        move('scissors', status);
    });

    const paper = document.createElement('button');
    paper.classList.add('app__paper');
    paper.textContent = 'Бумага';
    container.appendChild(paper);

    paper.addEventListener('click', () => { // бумага
        move('paper', status);
    });
};

function move(turn, status){  // результат хода №3
    if(status === ''){ // первый запрос, если статуса еще нет
        request({
            path: `play?token=${window.application.playerTokens.player}&id=${window.application.id.game}&move=${turn}`,
            onSuccess: (data) => {
                console.log(data['game-status'].status);
                status = data['game-status'].status;
                if(status === 'waiting-for-enemy-move'){
                    waitingPrint(); // рисуем ожидание противника
                    move(turn, status); // рекурсия, заново проверяем статус
                }else{
                    waitingDel(); // удаляем надпись если есть
                    result(status); // результат боя №4
                }
            },
        });
    }else if(status === 'waiting-for-enemy-move'){ // последующие запросы
        request({
            path: `game-status?token=${window.application.playerTokens.player}&id=${window.application.id.game}`,
            onSuccess: (data) => {
                if(data['game-status'].status === 'waiting-for-enemy-move'){
                    setTimeout(() => { 
                        move(turn, status); // рекурсия с задержкой 2 секунды, заново проверяем статус                           
                    }, 2000);
                }else{
                    waitingDel(); // удаляем надпись если есть
                    status = data['game-status'].status;
                    result(status); // результат боя №4
                }
            }
        });
    }

};

function result(status) { // результат боя №4
    switch (status) {
        case 'waiting-for-your-move':
            console.log('Ничья');
            window.application.renderScreen('move'); // отрисовка экрана хода №1            
            setTimeout(() => {
                tiePrint();
            }, 300);
            break;
        case 'lose':
            console.log('Поражение');
            window.application.renderScreen('lose'); // отрисовка экрана поражения
            break;
        case 'win':
            console.log('Победа');
            window.application.renderScreen('win'); // отрисовка экрана победы
            break;
        default:
            break;
    };
}

function waitingPrint() { // рисуем надпись ожидания хода противника
    tieDel();
    waitingDel();
    const waiting = document.createElement('h3');
    waiting.classList.add('app__waiting-enemy');
    waiting.textContent = 'Ожидание хода соперника...';
    document.querySelector('.app').appendChild(waiting);    
}

function waitingDel() { // удаляем надпись ожидания хода противника, если есть
    if(document.querySelector('.app__waiting-enemy')){
        document.querySelector('.app').lastChild.remove();
    }    
}
function tiePrint() {
    const tie = document.createElement('h3');
    tie.classList.add('app__tie');
    tie.textContent = 'Ничья. Еще раз!'
    document.querySelector('.app').appendChild(tie);
}

function tieDel() {
    if(document.querySelector('.app__tie')){
        document.querySelector('.app').lastChild.remove();
    }
}   