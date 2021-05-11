# `nest_backend`

Un server WSGI in Flask che fornisce una web API per interfacciarsi a N.E.S.T.

## Requisiti

Per eseguire `nest_backend`, è necessario avere installato:

- [Python ^3.8.5](https://www.python.org/downloads/)
  - Deve includere anche 
- [Poetry ^1.0.0](https://python-poetry.org/docs/)
  - Se possibile non seguire le istruzioni disponibili sul sito, ma installarlo dal proprio package manager!
    - [{Arch Linux}](https://archlinux.org/packages/community/any/python-poetry/)
- [Postgres ^13.2](https://www.postgresql.org/download/)

## Installazione

Per installare le dipendenze del backend, è necessario eseguire in questa cartella:

```bash
poetry install
```

Questo creerà un nuovo venv nelle cartelle interne di Poetry e vi installerà all'interno le dipendenze necessarie.

## Configurazione

### Configurazione del Database

Dopo aver installato Postgres, è necessario creare un database dedicato all'applicazione (ad esempio PdSTest).  
Se si desidera, si può anche creare un utente dedicato (l'utente postgres di default va benissimo).  
Per configurare l'URI del database che N.E.S.T. andrà a impiegare, è necessario eseguire

```bash
export DATABASE_URI=postgresql://[postgresUser]:[postgresPassword]@localhost:[port, default 5432]/[DatabaseName]
```

Ora il database è pronto per l'uso.

### Altre variabili d'ambiente

Questo ultimo passaggio è importante solo in un ambiente non-dev. La configurazione andrà a valore di default nel caso
in cui queste variabili non siano definite.  
Per terminare la configurazione, eseguire:

```bash
export COOKIE_SECRET=[cookiepass]
export JWT_SECRET_KEY=[jwtsecret]
export DISABLE_DEBUG=[farts]
```

Queste due variabili d'ambiente conterranno le chiavi con cui i cookie e le key di autorizzazione JWT saranno 
cifrate.

## Avvio

Per avviare il backend, è innanzitutto necessario attivare il venv contenente le dipendenze con il seguente comando:

```bash
poetry shell
```

In seguito, è possibile avviare il backend con:

```bash
python -m nest_backend
```

> Nota: eseguire questo programma in modalità ottimizzata (`python -OO -m nest_backend`) 
> disattiverà completamente le funzionalità di documentazione automatica, pertanto è **fortemente sconsigliato**.

## Sviluppo

Le pagine web del server sono disponibili a http://127.0.0.1:5000 .

Mentre il development server è avviato, _buona parte_ delle modifiche saranno rilevate e applicate automaticamente
senza dover riavviare il server. Per testare la connettività, visitare http://127.0.0.1:5000/doa.

## Documentazione

Mentre il server è avviato, la documentazione sarà disponibile a http://127.0.0.1:5000/docs/ .

## Deployment

Per effettuare il deployment in production, 
seguire [la guida ufficiale di Flask](https://flask.palletsprojects.com/en/1.1.x/deploying/).

> Nota: un bug attualmente impedisce a questo programma di essere installato su percorsi diversi da `/`.
> Usare sottodomini e virtualhosts se è necessario avere più servizi web in esecuzione sullo stesso server!
