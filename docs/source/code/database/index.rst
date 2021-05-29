Struttura del database
======================

.. class:: Alert

    Un alert è un allarme impostato da un utente che si "attiva" quando un numero di tweet che rispetta certe condizioni
    (poste in and oppure or) supera una certa soglia, indicata dall'utente.

    Ogni volta che l'alert si attiva, viene creata una "notifica", ovvero una entry nella tabella Notifications.
    Questo permette di tenere conto del numero di volte in cui l'alert viene triggerato.

    Gli alert sono legati al repository di appartenenza, e quando uno di essi viene allertato viene inviata una mail
    all'admin e pubblicato un tweet sull'account Twitter usato per le analisi.

    La tabella alert contiene le seguenti colonne:

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



.. class:: Authorization

    Una autorizzazione è un'entità che rappresenta il permesso, concesso dal creatore del repository ad un altro utente,
    di ispezionare il contenuto di un repo e di eseguire analisi su di esso.

    La tabella authorization contiene le seguenti colonne:

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

.. class:: Composed

    Composed è una tabella le cui righe indicano l'appartenenza di un Tweet ad un certo repository.

    La tabella Composed contiene le seguenti colonne:

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



.. class:: Condition

    Una condizione è un elemento che viene usato da repository e alert per cercare e classificare i tweet.

    Le condizioni possono essere di diversi tipi:

    - **hashtag**: valore ``0``, richiede che il tweet contenga un dato hashtag

    - **time**: valore ``2``, richiede che il tweet sia stato pubblicato prima o dopo una certa data

    - **coordinates**: valore ``3``, richiede che il tweet sia stato pubblicato entro un certo raggio da delle
      coordinate

    - **user**: valore ``5``, richiede che il tweet sia stato pubblicato da un dato utente

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


.. class:: Contains

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




.. class:: MadeOf

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


.. class:: Notification

    Una notification è un'entità che consente di tenere traccia del momento in cui un certo alert si è attivato
    per l'ultima volta.

    La tabella notification contiene le seguenti colonne:

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


.. class:: Repository

    Un repository è un "contenitore" di tweet, a cui sono legati alert, autorizzazioni di lettura e condizioni.

    Le condizioni possono essere messe in and oppure or, inoltre un repository può venire archiviato prima divenire
    eliminato. Quando un repository non è archiviato, questo viene riempito di tweet su base oraria, cosa che non
    accade se viene archiviato.

    La tabella repository contiene le seguenti colonne:

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


.. class:: Tweet

    Un tweet è un'entità che viene raccolta dal componente crawler, e quando viene inserita nella base di dati viene
    legata ad un repository e alle condition che contiene. Un tweet contiene informazioni relativamente a chi l'ha
    creato, eventuali immagini, il tempo di creazione, il tempo di inserimento nel db e l'opzionale posizione legata
    al tweet.

    La tabella tweet contiene le seguenti colonne:

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


.. class:: User

    Uno user è l'utilizzatore della piattaforma.

    E' presente di default un utente admin, il quale può creare nuovi utenti.

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
