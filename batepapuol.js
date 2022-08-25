let dados;
let statuz;
let nome;
let nome_usuario;
let aaa;
let bbb = 0;
let por_mensagens;
let scrolla;


/*FUNÇÃO ENTRAR*/ 
const entrar = () => {
    let verifica_nome = document.querySelector('.tela_entrada').querySelector('button');


    verifica_nome.addEventListener('click', () => {
        nome = {name: document.querySelector('.tela_entrada').querySelector('input').value};
        nome_usuario = document.querySelector('.tela_entrada').querySelector('input').value;

        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)
            .then((m) => {
                statuz = m.status;
                console.log('enviou');
                if(statuz === 200){
                    document.querySelector('.tela_entrada').classList.add('hidden');
                    document.querySelector('.mainpage').classList.remove('hidden');
                    document.querySelector('body').classList.add('fundo_body2');

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

/* FUNÇÃO ENVIA MENSAGEM */
const enviar = () => {
    const botao_enviar = document.querySelector('footer').querySelector('button');
    
    botao_enviar.addEventListener('click', () => {
        console.log('Clicou');
        let mensagem = document.querySelector('footer').querySelector('input').value;
        console.log(mensagem,nome_usuario);

        let mensagem_servidor = {
            from: nome_usuario,
            to: "todos",
            text: mensagem,
            type: "message"
        }

        axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem_servidor)
            .then((qas) => {
                console.log('Mensagem enviada para o servidor');
                console.log(qas.data);
            })
            .catch(() => {
                console.log('Erro');
            })
    })



}


/*FUNÇÃO RECEBER/ATUALIZAR MENSAGENS*/
const receber_mensagens = () => {

    let requisitar_mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    por_mensagens = document.querySelector('.conversas');
    

   

    let recebi_mensagens = () => {requisitar_mensagens.then((dados) => { 
        aaa = dados.data.length;
        console.log(dados.data[0]);

        let now =  new Date().toLocaleTimeString();

            
        let limpa_mensagens = () => {
            por_mensagens.innerHTML ="";
    
        }
    
        limpa_mensagens();

            while (bbb < aaa){
               
            
              
           
   
            if (dados.data[bbb].type === "status"){
                por_mensagens.innerHTML = por_mensagens.innerHTML + `
                <div class="messagem">
                    <span class="hour">(${now})</span>
                    <span class="usarname">${dados.data[bbb].from}</span>
                   
                    ${dados.data[bbb].text}
                  
                 </div>`
            }else if (dados.data[bbb].type === "message"){
                por_mensagens.innerHTML = por_mensagens.innerHTML + `
                <div class="messagem">
                    <span class="hour">(${now})</span>
                    <span class="usarname">${dados.data[bbb].from} para ${dados.data[bbb].to}: </span>
                   
                    ${dados.data[bbb].text}
                  
                 </div>`
            }else if (dados.data[bbb].type === "private_message"){
                por_mensagens.innerHTML = por_mensagens.innerHTML + `
                <div class="messagem">
                    <span class="hour">(${now}) </span>
                    <span class="usarname">${dados.data[bbb].from} para ${dados.data[bbb].to}: </span>
                   
                    ${dados.data[bbb].text}
                  
                 </div>`
            }
            
                bbb++;
                scrolla = document.querySelector('.conversas').lastChild;
                scrolla.scrollIntoView();
            }

            bbb = 0;

            
          
            
           
    
    })
    }
    recebi_mensagens();

   
}


const load = () =>{

entrar();
enviar();
setInterval(receber_mensagens, 2000);




}

load();







