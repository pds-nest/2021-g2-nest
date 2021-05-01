# Test

> Codice di test di unità (TDD, TL), descrizione test di integrazione e accettazione se non integrati nell’IDE

I test sono contenuti nei rispettivi moduli:

- [backend](../code/backend)
- [frontend](../code/frontend)


Descrizione dei test automatizzati eseguiti sul backend:

Il test del backend si può sintetizzare come il test di tutti i metodi REST che le API del backend mettono a disposizione del frontend.
Si è quindi creata una sezione test nella quale inserire tutti gli script python scritti appositamente per questa attività.

Tramite una configurazione di intelliJ Idea, l'IDE utilizzato per lo sviluppo, è stato possibile creare una sezione di tipo "pytest".

Questa sezione è alla pari del codice del backend ed è stata strutturata sencondo la stessa gerarchia di cartelle.

Semplicemente selezionando la cartella dei test oppure il singolo test, è possibile eseguire gli script in run o in debug per poi osservarne la buona riuscita o la presenza di errori.

Di seguito un esempio di esecuzione del user_test.py andato a buon fine:

/Users/stefano/Library/Caches/pypoetry/virtualenvs/nest-backend-suZY0EYl-py3.8/bin/python "/Users/stefano/Library/Application Support/JetBrains/IdeaIC2021.1/plugins/python-ce/helpers/pydev/pydevd.py" --multiproc --qt-support=auto --client 127.0.0.1 --port 56903 --file "/Users/stefano/Library/Application Support/JetBrains/IdeaIC2021.1/plugins/python-ce/helpers/pycharm/_jb_unittest_runner.py" --path "g2-progetto/code/backend/nest_backend/test/user_test.py"

Testing started at 18:11 ...

Connected to pydev debugger (build 211.6693.111)

Launching unittests with arguments python -m unittest g2-progetto/code/backend/nest_backend/test/user_test.py in g2-progetto/code/backend/nest_backend/test

Testing dei metodo user delete, get e patch

Process finished with exit code 0

delete User NON eseguito correttamente!

delete User NON eseguito correttamente!

delete User NON eseguito correttamente!

delete User eseguito correttamente!

get User info eseguito correttamente!

get User info NON eseguito correttamente!

patch User info eseguito correttamente!

Tutti i test eseguiti correttamente!

Ran 1 test in 32.111s

OK


