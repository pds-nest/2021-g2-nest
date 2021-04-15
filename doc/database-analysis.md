# Analisi del database

## Glossario generale

> [Vedi `glossary.md`](/doc/glossary.md)


## Glossario specifico

| Entità            | Attributi                                             | Interazioni                 |
|-------------------|-------------------------------------------------------|-----------------------------|
| **User**          | email, username, password                             | Repository                  |
| **Repository**    | id, name, start, end, status                          | User, Tweet, Alert, Keyword |
| **Tweet**         | snowflake, content, location, poster                  | Repository                  |
| **Condition**     | id, type, param                                       | BoolOperation               |
| **BoolOperation** | id, operation, condition_id, alert_id, node_1, node_2 |                             |
| **Alert**         | id, repository_id, name, limit, window_size           |                             |


## Elementi

### User

> Username: Steffo 
> Email: ste.pigozzi@gmail.com 
> Password: ···········

L'utilizzatore della piattaforma, colui che ha accesso ai dati. 

L'utente possiede una `email` per ricevere gli [Alert](#alert), una `password` per accedere al servizio e un `username` 
per essere più facilmente riconoscibile. 

Un utente può avere più [Repository](#repository) sotto il suo controllo. 


### Repository 

> Repository "Modena e dintorni"

Un insieme di [Tweet](#tweet) che soddisfano una o più [Condition](#condition). 

Ha un proprietario che può cambiarne le impostazioni, ma possono essere visibili a più [Users](#user). 

Un repository può avere diversi [Alert](#alert).


### Tweet

> Tweet di @USteffo: 
> "Testo di sopra #PdS2021"

Un post su Twitter, che viene salvato su NEST se soddisfa le [Condition](#condition) 
richieste da uno o più [Repository](#repository). 

I Tweet sono identificati da un particolare tipo di identificatore chiamato `snowflake`.

Contiene informazioni relative al `poster` del tweet, il suo `content` e opzionalmente informazioni sulla `location` 
in cui è stato scritto.


### Condition

> Tweet contenenti #PdS2021

> Tweet postati a Modena

> Tweet postati tra le 21:00 e le 23:00 del 15 Aprile

Un predicato usato per effettuare ricerca e filtraggio di [Tweet](#tweet). 

Può essere di diversi tipi:
- `HASHTAG`: richiede che un tweet contenga un determinato hashtag
- `LOCATION`: richiede che un tweet venga inviato in una specifica location
- `TIME`: richiede che un tweet venga inviato in un dato lasso di tempo

Viene utilizzato all'interno di [Repository](#repository) e [Alert](#alert) per definire le condizioni in cui catturare 
tweet o allertare l'utente.

È possibile unire più condizioni con una o più [BoolOperation](#booloperation).


### BoolOperation 

> Tweet contenenti #Modena **OR** Tweet postati a Modena

> Tweet postati tra le 21:00 e le 23:00 del 15 Aprile **AND** Tweet contenenti #PdS2021

Un nodo di albero binario usato per combinare più [Condition](#condition). 

Le foglie fanno riferimento a una [Condition](#condition), mentre i rami fanno riferimento ad altre 
[BoolOperation](#booloperation).

Supporta le seguenti operazioni:
- `AND`: intersezione
- `OR`: unione


### Alert

Un elemento di un [Repository](#repository) a cui è legata una [BoolOperation](#booloperation).

Se i [Tweet](#tweet) di un [Repository](#repository) che rispettano la [BoolOperation](#booloperation) superano un certo
`limit` in un lasso di tempo, si attiva e notifica l'utente.
