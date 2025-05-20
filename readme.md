# Analisador de Arquivos TXT em NodeJS

Uma aplicação de console simples em NodeJS para analisar arquivos `.txt`. Ela lê um arquivo, conta linhas numéricas e soma seus valores, conta linhas com texto e exibe um resumo com o tempo de execução.

## Funcionalidades Principais

*   Solicita o caminho de um arquivo `.txt`.
*   Lê o arquivo de forma assíncrona.
*   **Soma Números:** Conta e soma números de linhas que contêm *apenas* números.
*   **Conta Texto:** Conta linhas que possuem texto (mesmo que misturadas com números).
*   **Exibe Resumo:** Mostra a soma dos números, contagem de linhas com texto e tempo de execução.
*   **Interativo:** Pergunta se deseja analisar outro arquivo após cada execução.

## Como Usar

1.  **Pré-requisito:** Tenha o [Node.js](https://nodejs.org/) instalado.
2.  **Salve o código:** Certifique-se de ter o arquivo `app.js` (o código da aplicação).
3.  **Execute no terminal:**
    ```bash
    node app.js
    ```
4.  **Forneça o caminho do arquivo:** Quando solicitado, digite o caminho para o seu arquivo `.txt`.
    Exemplo de arquivo `teste.txt`:
    ```txt
    10
    Olá
    20 linha com texto
    30
    ```
5.  **Veja o resultado:** Um resumo será exibido.

    Exemplo de saída para `teste.txt` acima:
    ```
    --- Resumo da Execução ---
    Soma dos números (de linhas puramente numéricas): 40
    Linhas que continham texto: 2
    Tempo de execução: Xms
    --------------------------
    ```

## Observações

*   Linhas vazias são ignoradas.
*   A "Soma dos números" inclui apenas números de linhas que são *exclusivamente* numéricas.
*   Linhas com texto e números (ex: "texto 123") contam como "linhas com texto", e os números nelas não são incluídos na soma principal.

---