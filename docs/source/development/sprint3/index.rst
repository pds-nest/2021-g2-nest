Sprint 3: 17 Mag - 30 Mag
=========================

Consegna
--------

La seguente documentazione è stata fornita dal cliente durante questo sprint:

- :download:`3-sprint-requirements.pdf`
- :download:`3-report.pdf`


Goal
----

Il **goal** del terzo Sprint è stato far funzionare il crawler, gli alert e completare tutte i task rimanenti.


Backlog
^^^^^^^

.. image:: 3-backlog.png
    :width: 400


Task completati
^^^^^^^^^^^^^^^

..  image:: 3-tasks.png
     :width: 400


Grooming session
----------------

Sono state definite le nuove **User Stories** da inserire nel progetto sulla base delle nuove richieste
pervenute dal cliente:

- analisi statistica più dettagliata
- postare su Twitter
- traduzione dell'interfaccia in inglese.

La richiesta relativa alle *ricerche basate sulla geolocalizzazione*, come già comunicato al cliente, non è stata
completata interamente per motivi tecnici legati a limitazioni sulle features delle **API 1.1 di Twitter** che non
permettono di eseguire query su campi di posizione geografica.

Le nuove User Stories sono state valutate tramite Scrum Poker, durante il quale ogni membro ha espresso
la sua valutazione.

Tutte le nuove richieste sono state accettate dal Product Owner e sono pronte ad essere inserite nello sprint di
sviluppo in partenza.


Definition of Ready
-------------------

Il team ha definito lo stato di Ready di una User Story in base ai seguenti criteri:

- La User Story è stata compresa ed accettata da tutti i membri
- I tester hanno confermato la possibilità di poterla testare
- Il Product Owner ha la visione necessaria per definirne la priorità
- Il Team è in grado di stimarla
- La User Story è indipendente o dipendente da altre a priorità maggiore

Definition of Done
------------------

La definizione di Done è stata concordata da tutto il team con il Product Owner, ed è stata così definita:

- Sviluppo completo della funzionalità richiesta
- Definizione e superamento dei test
- Bozza della documentazione della funzionalità
- Merge dei sorgenti nel branch ``main`` di GitLab


Statistiche
-----------

Gitinspector
^^^^^^^^^^^^

.. note::

    La statistica dello sprint 3 non è ancora stata generata dal prof. Marcello Missiroli.


Schermata finale di SonarQube
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

La schermata finale di SonarQube è visibile a questo link:

- :download:`3-sonarqube.pdf`


Final Retrospective
-------------------

- :download:`Retrospettiva finale <RetrospectiveSprint3.pdf>`


Demo
----

Il video di Demo è disponibile al seguente link:

- https://drive.google.com/file/d/15o70Ffe51CNj8LTKHC9dGiqRVnbv9UpZ/view


Registro attività
-----------------


Riunioni collettive
^^^^^^^^^^^^^^^^^^^

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 3.5h
      - Totale

    * - 17/05
      - 2.0 h
      - Grooming session nuove richieste cliente

    * - 29/05
      - 1.5 h
      - sprint retrospective


Attività individuali
^^^^^^^^^^^^^^^^^^^^

Stefano Goldoni
"""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 14h
      - Totale

    * - 21/05
      - 2.0h
      - Analisi strumenti di test frontend
    * - 24/05
      - 3.0h
      - Inizio test alerts
    * - 25/05
      - 2.5h
      - Test alerts
    * - 26/05
      - 3.0h
      - Test
    * - 28/05
      - 3.5h
      - Test, refactory in base a Sonarqube


Flavia Cocca
""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 14h
      - Totale

    * - 20/05
      - 2.0h
      - Trasferimento documenti in nuova documentazione

    * - 21/05
      - 1.0h
      - Studio Sphinx

    * - 23/05
      - 1.0h
      - Studio sintassi rST

    * - 24/05
      - 1.0h
      - Documentazione

    * - 25/05
      - 1.0h
      - Documentazione

    * - 26/05
      - 1.0h
      - Documentazione

    * - 27/05
      - 1.0h
      - Documentazione

    * - 28/05
      - 3.0h
      - Documentazione

    * - 29/05
      - 3.0h
      - Documentazione

Chiara Calzolari
""""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 17h 30m
      - Totale

    * - 17/05
      - 3.0h
      - Traduzione UI
    * - 17/05
      - 1.5h
      - Traduzione UI
    * - 18/05
      - 1.5h
      - Traduzione UI
    * - 20/05
      - 1.0h
      - Traduzione UI
    * - 22/05
      - 1.0h
      - Traduzione UI
    * - 24/05
      - 2.0h
      - Traduzione UI
    * - 24/05
      - 1.0h
      - Traduzione UI
    * - 25/05
      - 1.0h
      - Traduzione UI
    * - 27/05
      - 0.5h
      - Traduzione UI
    * - 28/05
      - 2.0h
      - Configurazione ambiente di sviluppo
    * - 28/05
      - 3.0h
      - Creazione video-demo


Stefano Pigozzi
"""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 50h 41m
      - Totale

    * - 2021-05-17
      - 25m
      - Riunione
    * - 2021-05-17
      - 19m
      - Riunione
    * - 2021-05-17
      - 2h
      - Sviluppo
    * - 2021-05-17
      - 1h 7m
      - Bugfixing
    * - 2021-05-17
      - 7m
      - User Interface
    * - 2021-05-18
      - 55m
      - Sviluppo
    * - 2021-05-18
      - 14m
      - Configurazione GitLab
    * - 2021-05-18
      - 1h 52m
      - Documentazione
    * - 2021-05-18
      - 22m
      - Sviluppo
    * - 2021-05-18
      - 21m
      - User Interface
    * - 2021-05-18
      - 34m
      - Sviluppo
    * - 2021-05-18
      - 40m
      - Sviluppo
    * - 2021-05-18
      - 29m
      - Sviluppo
    * - 2021-05-18
      - 1h 8m
      - Sviluppo
    * - 2021-05-19
      - 36m
      - Sviluppo
    * - 2021-05-19
      - 2h 40m
      - Sviluppo
    * - 2021-05-19
      - 44m
      - Sviluppo
    * - 2021-05-19
      - 19m
      - Sviluppo
    * - 2021-05-20
      - 1h 26m
      - Sviluppo
    * - 2021-05-20
      - 2h 59m
      - Sviluppo
    * - 2021-05-20
      - 53m
      - Sviluppo
    * - 2021-05-20
      - 18m
      - Sviluppo
    * - 2021-05-21
      - 4h 32m
      - Sviluppo
    * - 2021-05-22
      - 2h 28m
      - Sviluppo
    * - 2021-05-23
      - 1h 12m
      - Documentazione
    * - 2021-05-23
      - 1h 2m
      - Sviluppo
    * - 2021-05-23
      - 1h 13m
      - Sviluppo
    * - 2021-05-23
      - 16m
      - Code review
    * - 2021-05-24
      - 10m
      - Sviluppo
    * - 2021-05-24
      - 1h 46m
      - Sviluppo
    * - 2021-05-24
      - 5m
      - Project Management
    * - 2021-05-24
      - 3m
      - Sviluppo
    * - 2021-05-24
      - 54m
      - Sviluppo
    * - 2021-05-25
      - 2h 13m
      - Sviluppo
    * - 2021-05-25
      - 2h 12m
      - Sviluppo
    * - 2021-05-27
      - 19m
      - Sviluppo
    * - 2021-05-27
      - 34m
      - Documentazione
    * - 2021-05-27
      - 1h 46m
      - Documentazione
    * - 2021-05-27
      - 33m
      - Documentazione
    * - 2021-05-27
      - 1h 34m
      - Documentazione
    * - 2021-05-28
      - 1h
      - Documentazione
    * - 2021-05-28
      - 1h 30m
      - Documentazione
    * - 2021-05-28
      - 7m
      - Code review
    * - 2021-05-29
      - 1h 38m
      - Documentazione
    * - 2021-05-29
      - 2h 39m
      - Documentazione
    * - 2021-05-29
      - 27m
      - Deployment


Giovanni Anniballi
""""""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 18h
      - Totale

    * - 17/05
      - 1h
      - Ricontrollo generale codice, fix piccoli typo

    * - 18/05
      - 1h
      - Aggiornati files di log e refactoring documentazione


    * - 21/05
      - 2h
      - Studio Jest, valutazione di test sul frontend

    * - 24/05
      - 3h
      - Primi test sulle autorizzazioni

    * - 26/05
      - 2h
      - Fix ai test

    * - 27/05
      - 2h
      - Test autorizzazioni completati, fix

    * - 28/05
      - 4h
      - Fix test malfunzionanti, refactoring test

    * - 29/05
      - 3h
      - Aggiornamento documentazione, aggiunti ulteriori test seguendo i suggerimenti di SQ


Giorgio Minoccari
"""""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 22h
      - Totale

    * - 17/05
      - 4h
      - Aggiunta associazione tra singoli tweet e condizioni che ne hanno scaturito il download
    * - 18/05
      - 3h
      - Aggiunto salvataggio delle immagini presenti nei tweet e data in cui sono stati postati
    * - 20/05
      - 3h
      - Ristrutturazione del crawler in uno script lanciabile separatamente su tutte le repository
    * - 21/05
      - 2h
      - Aggiunta degli alert e delle azioni che vengono svolte quando scatta il trigger
    * - 24/05
      - 2h
      - Bugfixing
    * - 25/05
      - 4h
      - Refactoring di sicurezza
    * - 27/05
      - 3h
      - Refactor struttura per poter associare le condizioni degli allarmi ai singoli tweet
    * - 28/05
      - 6h
      - Completamento generale e bugfixing


Lorenzo Balugani
""""""""""""""""

.. list-table::
    :header-rows: 2

    * - Data
      - Durata
      - Attività
    * -
      - 22h
      - Totale

    * - 17/05
      - 4h
      - Bugfixing, supporto alla localizzazione degli errori
    * - 18/05
      - 3h
      - Bugfixing
    * - 20/05
      - 3h
      - API autorizzazioni, refactoring
    * - 21/05
      - 2h
      - Gestione tweet, rappresentazione tweet
    * - 24/05
      - 2h
      - Bugfixing
    * - 25/05
      - 4h
      - Docs, refactoring
    * - 27/05
      - 3h
      - Bugfixing
    * - 28/05
      - 6h
      - Bugfixing
