# Test

> Codice di test di unità (TDD, TL), descrizione test di integrazione e accettazione se non integrati nell’IDE

I test sono contenuti nei moduli:

- [backend](../code/backend)
- [frontend](../code/frontend)

## Descrizione dei test automatici eseguiti sul backend

Il testing del backend si può sintetizzare come il testing di tutti i metodi che il backend fornisce attraverso una REST API.

Per effettuare testing si è deciso di utilizzare il modulo Python [`unittest`](https://docs.python.org/3/library/unittest.html) integrato nella libreria standard.

I moduli dei test sono strutturati [come suggerito dalla documentazione di unittest](https://docs.python.org/3/library/unittest.html#test-discovery): tutti gli script Python di testing si trovano dunque nel sottomodulo `nest_backend.test`.

Il modulo `test` è stato strutturato secondo la stessa gerarchia di cartelle del codice.

I test sono eseguiti sulle macchine locali degli sviluppatori attraverso una runConfiguration di IntelliJ IDEA Ultimate (l'IDE utilizzato per lo sviluppo software) di tipo _Python Test → unittest_.

Semplicemente selezionando la cartella dei test oppure il singolo test, è possibile eseguire gli script in run o in debug per poi osservarne la buona riuscita o la presenza di errori.


Di seguito un esempio di esecuzione dell'`user_test.py` andato a buon fine:

```console
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
```

