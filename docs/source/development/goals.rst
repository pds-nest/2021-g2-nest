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
1.6.1 Definizioni, glossario
""""""""""""""""""""""""""""

        **Alert**
            | Un alert è un allarme impostato da un utente che si "attiva" quando un numero di tweet che rispetta certe condizioni (poste in and oppure or) supera una certa soglia, indicata dall'utente.
            | Ogni volta che l'alert si attiva, viene creata una "notifica", ovvero una entry nella tabella Notifications. Questo permette di tenere conto del numero di volte in cui l'alert viene triggerato. Gli alert sono legati al repository di appartenenza, e quando uno di essi viene allertato viene inviata una mail all'admin e pubblicato un tweet sull'account Twitter usato per le analisi.
            | La tabella alert contiene le seguenti colonne:


        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - id (INTEGER, PK)
             - l'identificativo dell'alert
           * - name (VARCHAR, NOT NULL)
             - il nome dell'alert
           * - limit (INTEGER, NOT NULL)
             - il numero di tweet che innescano l'alert
           * - window_size (INTEGER, NOT NULL)
             - numero di ore in cui il limit può venire superato
           * - evaluation_mode (ENUM/SMALLINT, NOT NULL)
             - può essere posto a all_or oppure all_not
           * - repository_id (INTEGER, FK, NOT NULL)
             -



        **Authorization**
            | Una autorizzazione è un'entità che rappresenta il permesso, concesso dal creatore del repository ad un altro utente, di ispezionare il contenuto di un repo e di eseguire analisi su di esso.
            | La tabella authorization contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - rid (INTEGER, PK, FK)
             - id del repository
           * - email (VARCHAR, PK, FK)
             - email dell'utente



        **Composed**
            | Composed è una tabella le cui righe indicano l'appartenenza di un Tweet ad un certo repository.
            | La tabella composed contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - rid (INTEGER, PK, FK)
             - id del repository
           * - snowflake (VARCHAR, PK, FK)
             - id del tweet



       **Condition**
            | Una condizione è un elemento che viene usato da repository e alert per cercare e classificare i tweet.
            | Le condizioni possono essere di diversi tipi:

            - **hashtag** (valore 0);
            - **location** (valore 1, deprecato);
            - **time** (valore 2);
            - **coordinates** (valore 3);
            - **place** (valore 4, riservato per usi futuri);
            - **user** (valore 5);

            La tabella condition contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - id (INTEGER, PK)
             - id della condition
           * - type (ENUM/SMALLINT, NOT NULL)
             - tipo del contenuto
           * - content (VARCHAR, NOT NULL)
             - contenuto della condition
           * - repository_id (INTEGER, FK, NOT NULL)
             -



    **Contains**
            Contains è una tabella le cui righe indicano la presenza di una certa condition rispetto ad un certo tweet.
            La tabella contains contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - cid (INTEGER, PK, FK)
             - id della condition
           * - snowflake (VARCHAR, PK, FK)
             - id del tweet




    **MadeOf**
            MadeOf è una tabella le cui righe indicano il legame tra un alert e una certa condition.
            La tabella madeof contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - aid (INTEGER, PK, FK)
             - id dell'alert
           * - cid (INTEGER, PK, FK)
             - id della condition




    **Notification**
            | Una notification è un'entità che consente di tenere traccia del momento in cui un certo alert si è attivato per l'ultima volta.
            | La tabella notification contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - id (INTEGER, PK)
             - id della notifica
           * - ora (TIMESTAMP, NOT NULL)
             - timestamp di attivazione
           * - alert_id (INTEGER, FK, NOT NULL)
             -



    **Repository**
            | Un repository è un "contenitore" di tweet, a cui sono legati alert, autorizzazioni di lettura e condizioni.
            | Le condizioni possono essere messe in and oppure or, inoltre un repository può venire archiviato prima divenire eliminato. Quando un repository non è archiviato, questo viene riempito di tweet su base oraria, cosa che non accade se viene archiviato.
            | La tabella repository contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - id (INTEGER, PK)
             - id del repository
           * - name (VARCHAR, NOT NULL)
             - nome del repository
           * - start (TIMESTAMP)
             - timestamp di partenza del repository
           * - end (TIMESTAMP)
             - timestamp di chiusura del repository
           * - is_active (BOOLEAN, NOT NULL)
             - flag per segnalare se il repo è aperto o meno
           * - evaluation_mode (ENUM/SMALLINT, NOT NULL)
             - può essere posto a all_or oppure all_not
           * - owner_id (VARCHAR, FK, NOT NULL)
             - email del proprietario
           * - is_deleted (BOOLEAN, NOT NULL)
             - flag per segnalare se l'oggetto è eliminato o meno


    **Tweet**
        | Un tweet è un'entità che viene raccolta dal componente crawler, e quando viene inserita nella base di dati viene
        | legata ad un repository e alle condition che contiene. Un tweet contiene informazioni relativamente a chi l'ha creato,
        | eventuali immagini, il tempo di creazione, il tempo di inserimento nel db e l'opzionale posizione legata al tweet.
        | La tabella tweet contiene le seguenti colonne:


        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - snowflake (VARCHAR, PK)
             - id univoco del tweet
           * - content (VARCHAR)
             - contenuto del tweet
           * - location (VARCHAR)
             - stringa contenente informazioni sulla posizione
           * - place (VARCHAR)
             - riservato per sviluppi futuri
           * - poster (VARCHAR)
             - informazioni sull'utente che ha creato il tweet
           * - insert_time (TIMESTAMP, NOT NULL)
             - timestamp dell'inserimento del tweet
           * - image_url (VARCHAR)
             - link alle immagini, se presenti
           * - post_time (TIMESTAMP)
             - timestamp relativo all'invio del tweet


    **User**
        Uno user è l'utilizzatore della piattaforma. E' presente di default un utente admin, il quale può creare nuovi utenti.
        La tabella user contiene le seguenti colonne:

        .. list-table::
           :header-rows: 1
           :stub-columns: 1
           :align: left

           * -
             - Definizioni
           * - email (VARCHAR, PK)
             - email dell'utente
           * - username (VARCHAR, NOT NULL)
             - username dell'utente
           * - password (BYTEARRAY, NOT NULL)
             - sale della password, codificata usando l'algoritmo bcrypt
           * - isAdmin (BOOLEAN, NOT NULL)
             - true se l'utente è admin





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
