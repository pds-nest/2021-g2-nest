from nest_backend.database import *
from nest_backend.app import app, extension_sqlalchemy
from nest_crawler.repo_search import search_repo_conditions
from alert_trigger import is_repo_alert_triggered

ext.init_app(app=app)


def search_all_repo():
    active_repos = Repository.query.filter_by(is_active=True)
    for repo_id in [active_repo.id for active_repo in active_repos]:
        #search_repo_conditions(repo_id)
        is_repo_alert_triggered(repo_id)

if __name__ == "__main__":
    with app.app_context():
        search_all_repo()


