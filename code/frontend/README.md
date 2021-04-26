# `nest-frontend`

Una webapp in React che si interfaccia con il server principale di N.E.S.T. attraverso un web API.

## Requisiti

Per eseguire il frontend in modalità development, è richiesto:

- [Node.JS Current](https://nodejs.org/it/download/current/)

## Installazione

Per installare le dipendenze del frontend, è necessario eseguire in questa cartella:

```bash
npm install
```

Questo scaricherà da [npm](https://www.npmjs.com/) tutte le dipendenze necessarie ad avviare il development server, 
e le inserirà nella cartella `node_modules`.

> Nota: La cartella `node_modules` **non deve essere committata**!

## Avvio

Per avviare il development server del frontend, è necessario eseguire in questa cartella:

```bash
npm start
```

Questo avvierà un webserver su `localhost` legato alla porta TCP `3000`.

## Sviluppo

Mentre il development server è avviato, qualsiasi modifica verrà immediatamente applicata sulla 
[pagina web di anteprima](https://localhost:3000).

## Documentazione

<!-- TODO: Questa parte non è ancora stata realizzata. -->

🚧 La generazione automatica della documentazione non è ancora disponibile.

## Deployment

Per compilare il frontend in una webapp ottimizzata per l'uso in production, è necessario eseguire in questa cartella:

```bash
npm build
```

La pagina web e le sue risorse saranno create all'interno della cartella `build`, pronte per essere servite tramite
un qualsiasi webserver di pagine statiche.