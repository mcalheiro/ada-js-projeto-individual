const enviarEmail = require('./envia-email');

clientsList = [
    {'name': 'Walter', 'email': 'walter@brba.com', 'send': true},
    {'name': 'Jesse', 'email': 'jesse@brba.com', 'send': true},
    {'name': 'Gus', 'email': 'gus@brba.com', 'send': false},
    {'name': 'Jane', 'email': 'jane@brba.com', 'send': false},
    {'name': 'Hank', 'email': 'hank@brba.com', 'send': false},
    {'name': 'Skyler', 'email': 'sky@brba.com', 'send': true},
    {'name': 'Saul', 'email': 'saul@brba.com', 'send': false},
];

bodyTemplate = `
                Olá <clientName>,

                Esperamos que esta mensagem o(a) encontre bem.

                Estamos muito gratos pela sua visita à CarStore no mês passado. Passamos para lhe atualizar sobre as últimas novidades e ofertas emocionantes que temos disponíveis.

                Nossa equipe tem trabalhado arduamente para trazer uma variedade de novos veículos para atender a uma ampla gama de preferências e necessidades. De sedans elegantes a SUVs espaçosos e picapes robustas, há algo para todos os gostos.

                Além disso, estamos empolgados em compartilhar algumas condições especiais para aquisição que estão disponíveis neste momento. Temos opções de financiamento com taxas atrativas, programas de troca com valores valorizados pelo seu veículo atual e descontos exclusivos para clientes fiéis como você.
                
                Se você estiver interessado(a) em saber mais sobre qualquer um dos veículos, ofertas ou condições especiais mencionadas acima, por favor, não hesite em nos contatar. Nossa equipe de vendas estará mais do que feliz em ajudár e agendar um teste de condução, se desejar.

                Com nossos melhores cumprimentos,`

/**
 * Verifica se o dia atual eh segunda-feira
 * @param {boolean} [force=false] Quando verdadeiro, forca uma segunda-feira
 * @returns {boolean} Se o dia atual eh segunda-feira
 */
function todayIsMonday(force=false) {
    let date = new Date();
    
    if (force) {
        new Date(2024, 1, 19);
    }
    
    return date.getDay() == 1;
}

/**
 * Gera o corpo do email, alterando um placeholder pelo nome do cliente
 * @param {string} template A mensagem padrão
 * @param {string} clientName O nome do cliente
 * @returns {string} O corpo do email com o nome do cliente
 */
function generateBody(template, clientName) {
    return template.replace('<clientName>', clientName)
}

/**
 * 
 * @param {Object} clients Uma lista de clientes
 * @param {CallableFunction} itsMonday Uma funcao que verifica se eh dia de enviar emails 
 * @param {boolean} forceDate Serve como parametro para a funcao 
 * @returns {string} As informacoes dos clientes cadastrados que nao recebem emails [FEAT ADICIONAL]
 */
function sendEmails(clients, itsMonday, forceDate) {
    let clientsOptIn = clients.filter(client => client.send === true)
    let clientsOptOut = clients.filter(client => client.send != true)
    if (itsMonday(forceDate)) {
        for (client of clientsOptIn) {
            let body = generateBody(bodyTemplate, client.name)
            let subject = 'Novidades da semana na CarStore!'
            console.log(enviarEmail(client.email, subject, body))
        }
    }
    console.log("\nPor tente convencer os seguintes clientes a receber nossas novidades:");
    return clientsOptOut.map(client => `${client.name}: ${client.email}`).join('\n');
}

// Chamada das funcoes
console.log(sendEmails(clientsList, todayIsMonday, true))
