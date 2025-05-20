// app.js
const fs = require('fs').promises; // Usar a versão com Promises para async/await
const readline = require('readline');
const EventEmitter = require('events');
const path = require('path'); 

// Interface para ler a entrada do usuário no console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Emissor de eventos
class SummaryEmitter extends EventEmitter {}
const summaryEmitter = new SummaryEmitter();

// Função para verificar se uma string contém apenas números
function isNumericOnly(str) {
    if (str.trim() === '') return false; 
    return /^\d+$/.test(str.trim());
}


function containsText(str) {
    if (str.trim() === '') return false; 
    
    return !isNumericOnly(str.trim());
}

async function processFile(filePath) {
    const startTime = process.hrtime.bigint(); 
    let sumOfNumbers = 0;
    let textLinesCount = 0;
    let numericLinesSum = 0; 
    try {
        console.log(`Lendo o arquivo: ${filePath}...`);
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split(/\r?\n/); 

        lines.forEach(line => {
            const trimmedLine = line.trim();

            if (trimmedLine === '') { 
                return;
            }

            if (isNumericOnly(trimmedLine)) {
                const number = parseInt(trimmedLine, 10);
                if (!isNaN(number)) {
                    numericLinesSum += number;
                    
                    sumOfNumbers += number;
                }
            } else if (containsText(trimmedLine)) {
                
                textLinesCount++;
                
            }
            
        });

        const endTime = process.hrtime.bigint();
        const durationMs = Number((endTime - startTime) / 1000000n); // Converte nanossegundos para milissegundos

        // Dispara o evento com o resumo
        summaryEmitter.emit('summaryReady', {
            totalSumOfNumbersInFile: sumOfNumbers, 
            textLines: textLinesCount,
            executionTimeMs: durationMs
        });

    } catch (error) {
        console.error(`Erro ao ler ou processar o arquivo: ${error.message}`);
        console.error("Por favor, verifique o caminho do arquivo e tente novamente.");
        askToRunAgain(); 
    }
}

// Listener para o evento 'summaryReady'
summaryEmitter.on('summaryReady', (summary) => {
    console.log("\n--- Resumo da Execução ---");
    console.log(`Soma dos números (de linhas puramente numéricas): ${summary.totalSumOfNumbersInFile}`);
    console.log(`Linhas que continham texto: ${summary.textLines}`);
    console.log(`Tempo de execução: ${summary.executionTimeMs}ms`);
    console.log("--------------------------\n");

    askToRunAgain();
});

function askForFilePath() {
    rl.question('Digite o caminho completo do arquivo .txt: ', (filePath) => {
        if (filePath.trim() === '') {
            console.log("O caminho do arquivo não pode ser vazio. Tente novamente.");
            askForFilePath();
            return;
        }
       
        const normalizedPath = path.resolve(filePath.trim());
        processFile(normalizedPath);
    });
}

function askToRunAgain() {
    rl.question('Deseja executar novamente? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
            askForFilePath();
        } else {
            console.log('Aplicação encerrada.');
            rl.close();
        }
    });
}

// Inicia a aplicação
console.log('Bem-vindo ao Analisador de Arquivos TXT!');
askForFilePath();