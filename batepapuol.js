let dados;
let statuz;
let nome;

/*FUNÇÃO ENTRAR*/ 
const entrar = () => {
    let verifica_nome = document.querySelector('.tela_entrada').querySelector('button');


    verifica_nome.addEventListener('click', () => {
        nome = {name: document.querySelector('.tela_entrada').querySelector('input').value};

        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)
            .then((m) => {
                statuz = m.status;
                console.log('enviou');
                if(statuz === 200){
                    document.querySelector('.tela_entrada').classList.add('hidden');
                    document.querySelector('.mainpage').classList.remove('hidden');

                    setInterval(() => {
                        axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
                            .then(() => {
                                console.log('Status online');
                            });
                    }, 2000)

                    setInterval(() => {
                        axios.get('https://mock-api.driven.com.br/api/v6/uol/participants ')
                            .then((po) => {
                                console.log(po.data);
                            })
                    }, 2000)
                }
            })
            .catch((z) => {
                statuz = z.response.status;
                 if (statuz !== 200){
                    alert('Esse nome de usuário já existe, tente outro');
                }
            });
    
}); 




}

/* FUNÇÃO QUE VERIFICA SE O USUÁRIO ESTÁ ONLINE */


const load = () =>{

entrar();



}

load();







