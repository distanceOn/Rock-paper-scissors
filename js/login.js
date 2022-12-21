function renderLoginBlock(container) {
    const input = document.createElement('input');
    const button = document.createElement('button');


    
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

