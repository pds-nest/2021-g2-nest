Descrizione generale
--------------------

1.1 Obiettivi
^^^^^^^^^^^^^
    Lo **scopo** di questo software è quello di fornire tool per l’aggregazione e l’analisi di Tweet in modo da rilevare
    eventi *macroscopici*, *locali* o più semplicemente filtrare in base a delle *keyword*.
    Il software è un nuovo prodotto autonomo che non va ad integrarsi a nessun sistema software fatta eccezione per Twitter, da cui raccogliamo i nostri dati.

1.2 Marco Funzionalità
^^^^^^^^^^^^^^^^^^^^^^
    Modalità di ricerca:
        -	filtrare i Tweet in base a delle keyword
        -	filtrare i Tweet in base alla loro geolocalizzazione solo se sono provvisti dell’attributo di geolocalizzazione
        -	filtrare i Tweet in base alla loro data di pubblicazione
        -	filtratre i tweet in base all'utente
        -	combinare diversi filtri

    L'utente può decidere di salvare la propria ricerca in un **repositotory** per poterla consultare in seguito o per poterla condividere con
    un altro utente , un repository può essere attivo o archiviato:

            **Attivo :**
                continua a raccogliere dati ed è possibile modificarne i parametri di ricerca.

            **Archiviato :**
                mostra la ricerca salvata senza poterne più modificare i parametri o far ripartire la ricerca.

    L’Utente che utilizza la piattaforma riceverà una **notifica** al verificarsi di determinate condizioni, che potranno
    essere impostate dall'utente.

1.3 Campo di Applicazione
^^^^^^^^^^^^^^^^^^^^^^^^^
    Il software trova utilizzo principalmente in ambito statistico essendo il suo scopo quello di raccogliere dati per
    favorirne l’analisi tramite un’interfaccia grafica.

1.4 Caratteristiche degli utenti
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    Il software è pensato per essere utilizzato da utenti con una discreta esperienza nell'analisi di dati ma senza particolari conoscenze informatiche.

    - Sarà presente un super utente (**Amministratore**) che avrà il compito di creare ed eliminare gli altri utenti del sistema.
    - Gli utenti base (**Utenti**) potranno eseguire tutte le attività descritte nel paragrafo precedente, es. raccolta, analisi, storicizzazione, condivisione, ecc..
    - Sarà presente un utente virtuale (**Sistema**) che si occuperà delle interazioni con le api di Twitter e con il database.

            .. image:: Utenti.png

1.5 Definizioni, Acronimi, Abbreviazioni
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    **Filtro :**
        i filtri vengono utilizzati a livello frontend, servono per poter assegnare delle condition nella pagina
        **Crea Repository** e per *filtrare* ulteriormente nella pagina di Analisi di una repository.

    .. todo:: modificare descrizione filtro se necessario

    **Condizione :**

    .. todo:: descrizione condizione

    **Repository :**
        raccolta di tweet che hanno in comune una o più condizione.

    **Tweet :**
        è un post su Twitter che viene raccolto dal software se i filtri applicati al repository lo permettono.
        Contiene informazioni relative al suo autore e altre informazioni, a seconda del tipo di Tweet.

    **Allarme:**

    .. todo:: descrizione allarme

1.6 Database
^^^^^^^^^^^^
.. todo:: inserire schema database + glossario aggiornato

1.7 Casi d'uso
^^^^^^^^^^^^^^
    .. todo:: li ho rifatti tutti controllate che siano giusti

    Si riportano di seguito i principali casi d’uso delineati durante la progettazione di N.E.S.T.

    - La gestione degli utenti da parte di un Amministratore:
        .. image:: CasiUso1.png
    - La gestione del login da parte di un Utente:
        .. image:: CasiUso2.png
    - La gestione delle Allerte sia dal punto di vista dell’Utente che del Sistema:
        .. image:: CasiUso3.png
    - La gestione della raccolta da parte dell'utente:
        .. image:: CasiUso4.png
    - La gestione di un repository da parte dell'utente:
        .. image:: CasiUso5.png
    - La visualizzazione di un Repository:
        .. image:: CasiUso6.png




1.8 Backlog generale
^^^^^^^^^^^^^^^^^^^^
    Si riporta qui di seguito il Backlog definito ad inizio progetto, prima dell’avvio dello sviluppo.
    Gli elementi dal bordo grigio sono le epiche:

        .. image:: Backlog1.png
        .. image:: Backlog2.png
        .. image:: Backlog3.png
        .. image:: Backlog4.png
        .. image:: Backlog5.png
