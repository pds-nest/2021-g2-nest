# Database

> Dump del/dei database (se previsto)

## Informazioni

Il database usa il DBMS **PostgreSQL**.

## Fare un dump del database

Per eseguire un dump del database è necessario eseguire:

```bash
pg_dump --create --clean --file="${dump_filename}" --format="plain" --dbname="${nome_database}"
```

## Ripristinare il database

Per ripristinare un dump del database è necessario eseguire:

```bash
pg_restore --create --clean --file="${dump_filename}" --format="plain" --dbname="${nome_database}"
```
