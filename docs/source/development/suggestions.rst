Suggerimenti relativi al corso
==============================

* Il team concorda sull'**utilità del progetto** poiché permette di utilizzare le nozioni viste a lezione nella pratica,
  facendo quindi esperienza sulle varie metodologie da adottare e le varie problematiche in cui si può incorrere.

* Il team concorda nel dire che **il progetto è eccessivamente corposo**:

  * Tecnicamente a 6 CFU dovrebbero corrispondere circa 125 ore di lavoro, mentre questo progetto ne ha richieste molte di più.

  * Suggeriamo quindi di **alleggerire significativamente il carico di lavoro**, e renderlo più proporzionato ai
    crediti previsti.

* Il team suggerisce di lasciare agli studenti **scelta completamente libera sugli strumenti da adottare**, in quanto si
  sono verificati svariati problemi con quelli previsti dal corso:

  * Le istanze di Taiga, GitLab e SonarQube ospitate dall'Università si sono dimostrate inaffidabili,
    portando il team a dover ospitare le proprie e quindi a perderci una fetta significativa del proprio tempo.

    * CAS è supportato solo su Debian, e lo script di installazione esegue operazioni con effetti collaterali sul
      Docker del sistema host.

    * L'installazione di Taiga tramite Docker Compose ha richiesto 5 ore, in quanto una race condition presente nel
      file ``docker-compose.yml`` impediva al software di raggiungere il database.

    * L'installazione e manutenzione di GitLab ha richiesto 5 ore, e richiede competenze di amministrazione di sistema
      avanzate che sono oltre il livello dello studente medio del terzo anno di Informatica.

  * Taiga, per quanto funzionale, è un po' acerbo a livello di User Experience, il che ha portato a svariati grattacapi
    durante il suo utilizzo da parte del team.

    * Inoltre, è in parte superfluo: quasi tutte le funzionalità che fornisce sono già implementate sui sistemi di issues
      di GitHub e GitLab.

  * Utilizzare GitLab invece che il più popolare GitHub impedisce di sfruttare la licenza gratuita o `universitaria`_ di
    numerosi strumenti di Continuous Integration e Deployment, quali `GitHub Actions`_, `Read the Docs`_ e `Render`_.

  * SonarQube, per quanto semplice da installare, è molto complesso da utilizzare: il team ha necessitato di parecchie
    ore per capirne il funzionamento.

    * È forse anche superfluo: tutte le issues che ha segnalato erano già state segnalate in precedenza dal sistema di
      linting di IntelliJ IDEA Ultimate.

* Il team concorda nel dire che sarebbe molto utile la **partecipazione diretta del prof** durante le prime fasi di
  progetto, all'inizio del lavoro, per instradare il gruppo nella giusta direzione ed evitare l'effetto "salto nel buio":

  * Sarebbe stato piacevole avere una spiegazione più dettagliata delle regole dello Scrumble, e soprattutto sul come
    giocarlo a distanza.

  * Sarebbero state utili lezioni più specifica sui tool da utilizzare, come SonarQube.


.. _universitaria: https://education.github.com/pack
.. _GitHub Actions: https://github.com/features/actions
.. _Read the Docs: https://readthedocs.org/
.. _Render: https://render.com/
