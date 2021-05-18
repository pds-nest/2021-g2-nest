Installazione
=============

Questa guida illustra come installare interamente N.E.S.T. su un server Linux.


Prerequisiti
------------

Per installare ed eseguire N.E.S.T., è necessario:

- Una connessione a Internet
- Un sistema operativo Linux-based (preferibilmente `Arch Linux <https://wiki.archlinux.org/title/Main_page>`_)
- `SystemD ^248.2 <https://www.freedesktop.org/wiki/Software/systemd/>`_
- `Apache HTTP Server ^2.4.46 <https://httpd.apache.org/>`_
- `PostgreSQL ^13.2 <https://www.postgresql.org/download/>`_
- `Git ^2.31.1 <https://git-scm.com/>`_
- `Python ^3.8 <https://www.python.org/downloads/>`_
- `Poetry ^1.0 <https://python-poetry.org/>`_
- `NodeJS ^16.0 <https://nodejs.org/>`_
- `npm ^7.13.0 <https://www.npmjs.com/>`_


Creare un nuovo utente
----------------------

Per motivi di sicurezza, si suggerisce di creare un nuovo utente con il quale eseguire il progetto:

.. note::

    È necessario essere amministratori di sistema per eseguire i seguenti comandi.
    Si veda il manuale di `useradd <https://linux.die.net/man/8/useradd>`_ per più dettagli.

.. code-block:: console

    root:~# mkdir --parents /srv/nest
    root:~# useradd --home-dir /srv/nest --shell /bin/bash nest
    root:~# chown --recursive nest: /srv/nest


Scaricare il codice sorgente
----------------------------

Per installare N.E.S.T., è necessario avere il codice sorgente disponibile sul server.

Si consiglia di scaricarlo tramite *Git*:

.. code-block:: console

    nest:~$ git clone https://gitlab.steffo.eu/nest/g2-progetto.git

Questo creerà una nuova cartella ``g2-progetto`` nella directory in cui è stato eseguito il comando.

Per proseguire, sarà necessario entrarvi:

.. code-block:: console

    nest:~$ cd g2-progetto


Creare il database
------------------

N.E.S.T. necessita di un database PostgreSQL in cui salvare i dati.

Per motivi di sicurezza, si suggerisce di creare un ruolo isolato dal resto del DBMS apposta per N.E.S.T.:

.. code-block:: console

    postgres:~$ createuser nest

Per creare il database PostgreSQL, si esegua:

.. code-block:: console

    postgres:~$ createdb --owner=nest nest


Creare un file di configurazione per il backend
-----------------------------------------------

Il backend usa un file di configurazione per impostare alcune variabili.

Si crei un nuovo file nella working directory del progetto denominato ``config.py``:

.. code-block:: console

    nest:~/g2-progetto$ vim config.py

Il file dovrà avere i seguenti contenuti:

.. code-block:: python

    # Una stringa rappresentante il database da utilizzare
    # Per maggiori informazioni sulla sintassi, si veda https://docs.sqlalchemy.org/en/14/core/engines.html
    SQLALCHEMY_DATABASE_URI = "postgresql://nest@/nest"

    # Una stringa casuale utilizzata per generare i JSON Web Token (JWT)
    # Va mantenuta segreta e costante per tutta l'operazione del backend!
    # Si suggerisce di premere tasti casuali sulla tastiera finchè la riga non è piena.
    SECRET_KEY = "dsjiofgvinmodfiojvbnio3erfnoiweraqugu43ghjwrevniuwerng43iugnreuwignhritmj43i43nb8i42ug0wevkwovmwigtjj"


Installare le dipendenze Python
-------------------------------

Le dipendenze Python sono gestite da *Poetry*, e possono essere installate con:

.. code-block:: console

    nest:~/g2-progetto$ poetry install

Poetry creerà automaticamente un `venv <https://docs.python.org/3/library/venv.html>`_ e vi installerà all'interno tutti
i pacchetti necessari all'esecuzione del backend e del crawler di N.E.S.T. .

**Si suggerisce di ricordare il nome del venv creato da Poetry**, in quanto sarà necessario per
:ref:`Creare un servizio SystemD per il backend`:

.. code-block:: console

    Creating virtualenv nest-7C2fm2VD-py3.9 in /srv/nest/.cache/pypoetry/virtualenvs


Installare le dipendenze NodeJS
-------------------------------

Le dipendenze NodeJS sono gestite da *npm*, e possono essere installate con:

.. code-block:: console

    nest:~/g2-progetto$ npm install

npm creerà automaticamente una cartella
`node_modules <https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules>`_ e vi installerà all'interno tutte
le librerie necessarie all'esecuzione del frontend di N.E.S.T. .


Creare un servizio SystemD per il backend
-----------------------------------------

Per fare in modo che il backend rimanga attivo in background, anche dopo un riavvio, si suggerisce di installarlo come
servizio di sistema di *SystemD*:

.. code-block:: console

    root:~# systemctl edit --force --full nest-backend

Inserire all'interno del file le seguenti direttive:

.. code-block:: systemd

    [Unit]
    Description=N.E.S.T. Backend
    Wants=network-online.target postgresql.service
    After=network-online.target nss-lookup.target postgresql.service

    [Service]
    Type=exec
    User=nest
    Group=nest
    WorkingDirectory=/srv/nest/g2-progetto

    # Si sostituisca a questo il percorso del virtualenv creato in precedenza da Poetry
    #         ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    ExecStart=/srv/nest/.cache/pypoetry/virtualenvs/nest-7C2fm2VD-py3.9/bin/python -m gunicorn -b 127.0.0.1:30040 --env="FLASK_CONFIG=../config.py" nest_backend.app:rp_app

    [Install]
    WantedBy=multi-user.target

Ora, si verifichi che il servizio si avvii correttamente eseguendolo manualmente con:

.. code-block:: console

    root:~# systemctl start nest-backend

In caso di successo, l'API dovrebbe essere esposto sulla porta ``30040`` dell'indirizzo di loopback ``127.0.0.1``:

.. code-block:: console

    root:~# curl 127.0.0.1:30040/doa
    If you see this, the server is fine.

Si abiliti il servizio, in modo che venga automaticamente avviato al riavvio del sistema:

.. code-block:: console

    root:~# systemctl enable nest-backend


Compilare il frontend
---------------------

Perchè sia possibile servire il frontend agli utenti, è necessario prima crearne una versione compilata ottimizzata.

È possibile farlo con il comando:

.. code-block:: console

    nest:~/g2-progetto$ npm run build

Verrà creata una cartella ``build`` con all'interno la versione compilata.


Creare un servizio SystemD per il frontend
------------------------------------------

Per rendere disponibile alla rete la copia locale del frontend, si suggerisce di avviare lo script npm ``serve``
integrato con N.E.S.T. come un servizio di sistema di *SystemD*:

.. code-block:: console

    root:~# systemctl edit --force --full nest-frontend

Inserire all'interno del file le seguenti direttive:

.. code-block:: systemd

    [Unit]
    Description=N.E.S.T. Frontend
    Wants=network-online.target nest-backend.service
    After=network-online.target nss-lookup.target nest-backend.service

    [Service]
    Type=exec
    Environment=NODE_ENV=production
    User=nest
    Group=nest
    WorkingDirectory=/srv/nest/g2-progetto
    ExecStart=/usr/bin/npm run serve

    [Install]
    WantedBy=multi-user.target

.. todo::

    Questo file non è stato testato, in quanto sul server demo è in uso una versione più complessa che usa
    `nvm <https://github.com/nvm-sh/nvm>`_ per gestire più versioni di NodeJS sullo stesso sistema.

    La versione in uso sul server demo è:

    .. code-block:: systemd

        [Unit]
        Description=N.E.S.T. Frontend
        Wants=network-online.target nest-backend.service
        After=network-online.target nss-lookup.target nest-backend.service

        [Service]
        Type=exec
        Environment=NODE_ENV=production
        Environment=NODE_VERSION=16
        User=nest
        Group=nest
        WorkingDirectory=/srv/nest/g2-progetto
        ExecStart=/srv/nest/.nvm/nvm-exec npm run serve

        [Install]
        WantedBy=multi-user.target

Ora, si verifichi che il servizio si avvii correttamente eseguendolo manualmente con:

.. code-block:: console

    root:~# systemctl start nest-frontend

In caso di successo, il frontend dovrebbe essere esposto sulla porta ``30041`` dell'indirizzo di loopback ``127.0.0.1``:

.. code-block:: console

    root:~# curl 127.0.0.1:30041
    [...]

Si abiliti il servizio, in modo che venga automaticamente avviato al riavvio del sistema:

.. code-block:: console

    root:~# systemctl enable nest-frontend


Creare un servizio SystemD per il crawler
-----------------------------------------

.. todo::

    Il crawler non è ancora disponibile.



Configurare Apache come reverse proxy
-------------------------------------

Per rendere l'API e il frontend disponibili al pubblico, si suggerisce di configurare Apache HTTP Server
come reverse proxy.

La configurazione di Apache varia molto da distribuzione a distribuzione Linux, e talvolta anche da server a server;
pertanto, si fornisce solamente un file `VirtualHost <https://httpd.apache.org/docs/2.4/vhosts/examples.html>`_ di
esempio da adattare al proprio setup:

.. code-block:: apacheconf

    <VirtualHost *:80>
        ServerName "api.nest.steffo.eu"
        ServerName "prod.nest.steffo.eu"

        RewriteEngine On
        RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
    </VirtualHost>

    <VirtualHost *:443>
        ServerName "api.nest.steffo.eu"

        SSLEngine on
        SSLCertificateFile      "/root/.acme.sh/*.nest.steffo.eu/fullchain.cer"
        SSLCertificateKeyFile   "/root/.acme.sh/*.nest.steffo.eu/*.nest.steffo.eu.key"

        ProxyPass           "/" "http://127.0.0.1:30040/"
        ProxyPassReverse    "/" "http://127.0.0.1:30040/"
        RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}

        Protocols h2 http/1.1
        Header always set Strict-Transport-Security "max-age=63072000"
    </VirtualHost>

    <VirtualHost *:443>
        ServerName "prod.nest.steffo.eu"

        SSLEngine on
        SSLCertificateFile      "/root/.acme.sh/*.nest.steffo.eu/fullchain.cer"
        SSLCertificateKeyFile   "/root/.acme.sh/*.nest.steffo.eu/*.nest.steffo.eu.key"

        ProxyPass           "/" "http://127.0.0.1:30041/"
        ProxyPassReverse    "/" "http://127.0.0.1:30041/"
        RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}

        Protocols h2 http/1.1
        Header always set Strict-Transport-Security "max-age=63072000"
    </VirtualHost>
