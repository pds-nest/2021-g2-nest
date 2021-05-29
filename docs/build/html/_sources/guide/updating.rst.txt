Aggiornamento
=============

Per scaricare gli aggiornamenti di N.E.S.T. si esegua il seguente comando nella directory del codice sorgente:

.. code-block:: console

    nest:g2-progetto$ git pull

In seguito, si riavviino tutti i servizi di N.E.S.T.:

.. code-block:: console

    root:~# systemctl restart nest-frontend nest-backend nest-crawler nest-crawler.timer

Si verifichi infine il corretto avvio di tutti i servizi:

.. code-block:: console

    root:~# systemctl status nest-frontend nest-backend nest-crawler nest-crawler.timer
