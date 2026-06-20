console.log("JS carregou");
//... Vamos lá
const botao = document.querySelector("#butao");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const nome = document.querySelector("#nome");
const estilo = document.querySelector("#estilo");
const musica = document.querySelector("#musica");
const cantor = document.querySelector("#cantor");
const email2 = document.querySelector("#alt-email");
const senha2 = document.querySelector("#alt-senha");
//Tudo isso só para facilitar os querySelectors
function deletarDados() { //Deletar todos os dados e deixar os campos vazios em casos de sucesso, evita eu repetir toda hora
    email.value = null;
    senha.value = null;
    nome.value = null;
    estilo.value = null;
    musica.value = null;
    cantor.value = null;
    email2.value = null;
    senha2.value = null;
    tabela_edit.innerHTML = "";
}
//Coloquei dps para diferenciar ambos mais fácil
const butaoVer = document.querySelector("#butaoVerificar");
const tabela_edit = document.querySelector("#container-tabela-edicao");
botao.addEventListener("click", async (evento) => { //Assíncrono
    evento.preventDefault(); //Evita atualizar a página
    if (senha.value.toLowerCase().trim() === "") { //Aqui eu tava motivado, então fiz verificação e até try excpet para verificar, igual estagiário enfeitando bolo enquanto o circo tava pegando fogo
        alert("Erro nos dados");

    } else if (nome.value.toLowerCase().trim() === "") {
        alert("Erro nos dados");

    } else if (estilo.value.toLowerCase().trim() === "") {
        alert("Erro nos dados");

    } else if (musica.value.toLowerCase().trim() === "") {
        alert("Erro nos dados");

    } else if (cantor.value.toLowerCase().trim() === "") {
        alert("Erro nos dados");

    }
    else {




        try { //Caso dê erro... Deveria colocar naso outras partes de código
            let resposta = await fetch("pages/salvar.php", { //Método fetch para mandar uma requisição http para o arquivo salvar.php
                method: "POST",  //usa o método POST, mais profundamente: Envia os dados escondidos no corpo da aquisição
                headers: {
                    "Content-Type": "application/json" //Avisa que está mandando JSON invés de dados normais para o PHP
                },
                body: JSON.stringify({ //transforma o objeto JS em JSON
                    email: email.value.trim(),
                    senha: senha.value.trim(),
                    nome: nome.value.trim().toLowerCase(),
                    estilo: estilo.value.trim().toLowerCase(),
                    musica: musica.value.trim().toLowerCase(),
                    cantor: cantor.value.trim().toLowerCase()

                })
            });
            if (!resposta.ok) { //Se der ruim deu ruim
                throw new Error("Erro de rede") //Não precisa de else 
            }
            let dados = await resposta.json(); //Pega o retorno de JSON do PHP que mostra se teu certo ou não
            if (!dados.ok) {
                throw Error("Erro no envio de dados");
            }
        } catch (Erro) {
            const erro = document.createElement("h1");
            erro.style.color = "red";
            erro.textContent = Erro.message;

            tabela_edit.appendChild(erro);

            // Remove o elemento após 5 segundos... Poderia fazer igual os outros, mas decidi ser diferentão aqui e colocar tempo
            setTimeout(() => {
                erro.remove();
            }, 5000);
        }
    }
    deletarDados();
})









butaoVer.addEventListener("click", async (evento) => { //tabela_edit
    evento.preventDefault(); //Não envia o formulário
    tabela_edit.replaceChildren(); //remove todos os filhos da tabela_edit para deixar ela limpa, de forma profissional e elegante
    let resposta = await fetch("pages/listar.php", { //Manda um JSON pedindo para ver se existe esse email e senha... Sem Try aq pq tempo tá contado 
        method: "POST",
        headers: {
            "Content-Type": "application/json" //Avisa que está mandando JSON invés de dados normais para o PHP
        },
        body: JSON.stringify({
            email: email2.value.trim(),
            senha: senha2.value.trim()
        })
    });
    let dados = await resposta.json(); //Pega JSON...
    if (!resposta.ok) { //Parte divertida: HTML modificavel e mexendo por ai com innerHTML!!! É tipo jogar truco, vai terminar em caos, mas qual tipo? Graças a Deus esse Caos de agora é organizado
        tabela_edit.innerHTML = ` 
        <section id="secao-erro-validacao" style="border: 1px solid #f2dede;">
          <h2 style="color: #a34c4c; border-bottom: 1px solid #f2dede;">Falha na Autenticação</h2>
             <p style="font-size: 1rem; line-height: 1.5; color: #721c24; margin: 10px 0 0 0;">
                  Erro no servidor, Por favor, tente mais tarde
            </p>
</section>
        `;
    }
    else if (!dados.ok) {  //O de cima verifica se tem problema no servidor, esse ve se tem problema na mensagem
        tabela_edit.innerHTML = `
        <section id="secao-erro-validacao" style="border: 1px solid #f2dede;">
          <h2 style="color: #a34c4c; border-bottom: 1px solid #f2dede;">Falha na Autenticação</h2>
             <p style="font-size: 1rem; line-height: 1.5; color: #721c24; margin: 10px 0 0 0;">
                  ${dados["mensagem"]}
            </p>
</section>
        `;

    }
    else {
        let emailOrg = email2.value; //Isso vai ser útil daqui umas 90 linhas : D
        tabela_edit.innerHTML = `
<section id="secao-alterar-dados">
    <h2>Alterar ou Excluir Seus Dados</h2>
    <form id="form-atualizar">
        <table>
            <thead>
                <tr>
                    <th>Campo</th>
                    <th>Novo Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><label for="edit-email">E-mail:</label></td>
                    <td><input type="email" id="edit-email" name="edit_email" maxlength="100"></td>
                </tr>
                <tr>
                    <td><label for="edit-senha">Senha:</label></td>
                    <td><input type="password" id="edit-senha" name="edit_senha" maxlength="20"></td>
                </tr>
                <tr>
                    <td><label for="edit-nome">Nome:</label></td>
                    <td><input type="text" id="edit-nome" name="edit_nome" maxlength="150"></td>
                </tr>
                <tr>
                    <td><label for="edit-estilo">Estilo Musical:</label></td>
                    <td><input type="text" id="edit-estilo" name="edit_estilo" maxlength="150"></td>
                </tr>
                <tr>
                    <td><label for="edit-musica">Música Favorita:</label></td>
                    <td><input type="text" id="edit-musica" name="edit_musica" maxlength="150"></td>
                </tr>
                <tr>
                    <td><label for="edit-cantor">Cantor Favorito:</label></td>
                    <td><input type="text" id="edit-cantor" name="edit_cantor" maxlength="150"></td>
                </tr>
            </tbody>
        </table>
        
        <button type="submit" id="btn-salvar-mudancas">Salvar Alterações</button>
        <button type="button" id="btn-deletar-tudo" style="background-color: #a34c4c; margin-top: 10px;">Excluir Cadastro Completo</button>
    </form>
</section>

`;
        //Meu Deus do céu... 
        const butaoTemp = document.querySelector("#btn-salvar-mudancas"); //Pega os Ids dos HTML recém criados para manipular eles
        const butaoExc = document.querySelector("#btn-deletar-tudo");
        butaoTemp.addEventListener("click", async (evento) => { //A gente cria um evento... assíncrono, claro
            evento.preventDefault(); //Previne criar página nova por comportamento do formulário, e em tempos rústicos onde a gente escrevia em pedra e tinha uma bolinha no Mouse ( e toda hora roubavam), cada click era uma página nova... 
            let emailEdit = document.querySelector("#edit-email").value;
            let senhaEdit = document.querySelector("#edit-senha").value;
            let nomeEdit = document.querySelector("#edit-nome").value;
            let estiloEdit = document.querySelector("#edit-estilo").value;
            let musicaEdit = document.querySelector("#edit-musica").value;
            let cantorEdit = document.querySelector("#edit-cantor").value;
            let resposta = await fetch("pages/editar.php", { //Manda pro servidor 
                method: "POST",  //usa o método POST, mais profundamente: Envia os dados escondidos no corpo da aquisição
                headers: {
                    "Content-Type": "application/json" //Avisa que está mandando JSON invés de dados normais para o PHP
                },
                body: JSON.stringify({
                    emailOrg: emailOrg.trim(),
                    email: emailEdit.trim(),
                    senha: senhaEdit.trim(),
                    nome: nomeEdit.trim().toLowerCase(),
                    estilo: estiloEdit.trim().toLowerCase(),
                    musica: musicaEdit.trim().toLowerCase(),
                    cantor: cantorEdit.trim().toLowerCase()
                })
            });
            if (!resposta.ok) {
                tabela_edit.innerHTML = `
        <section id="secao-erro-validacao" style="border: 1px solid #f2dede;">
          <h2 style="color: #a34c4c; border-bottom: 1px solid #f2dede;">Falha na Autenticação</h2>
             <p style="font-size: 1rem; line-height: 1.5; color: #721c24; margin: 10px 0 0 0;">
                  Erro no servidor, Por favor, tente mais tarde
            </p>
</section>
        `;
            }
            let dadosExc = await resposta.json();

            //Talvez eu faça algo com isso no futuro
            //Eu do futuro, eu vou fazer algo com esse dados Exc? Resposta: Não >: D 
            //Eu mais do futuro ainda: Na verdade vou sim, hehe
            if (dadosExc.ok) {
                deletarDados();
            } //Foi pouco, mas foi algo... 
        });
        butaoExc.addEventListener("click", async (evento) => {
            evento.preventDefault(); // Previne comportamentos indesejados do form

            try { //try pq ta dando erro sem eu entender... Mas ta excluindo... Se funciona ta bom, não vou reclamar
                let resposta = await fetch("pages/atualizar.php", { //Manda o JSON  para deletar tudo...
                    method: "POST", //método
                    headers: { //Fala que é JSON
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailOrg: emailOrg.trim() //Sim, ta sendo útil até aqui 
                    })
                });

                // Se o PHP der um erro 500, cai aqui antes de tentar ler o JSON... Fé 
                if (!resposta.ok) {
                    throw new Error("Erro na resposta do servidor");
                }

                let dadosUnic = await resposta.json();

                if (!dadosUnic.ok) {
                    alert("Erro na aquisição de dados");
                } else {
                    deletarDados();
                    alert("Deu tudo certo, seu perfil foi deletado");
                }

            } catch (erro) {
                // qualquer coisa cai aqui e dá tudo certo! :D 
                console.error("Erro detectado:", erro);
                alert("Ocorreu um erro de comunicação. Abra o console (F12) para ver os detalhes.");
                deletarDados();
            }
        });

    }
    //... Deus do céu... 

})
