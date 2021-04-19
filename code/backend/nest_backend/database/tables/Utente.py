from ..base import Base


class Utente(Base.Model):
    __tablename__ = "utente"
    email = Base.Column(Base.String, primary_key=True)
    username = Base.Column(Base.String, nullable=False)
    password = Base.Column(Base.LargeBinary, nullable=False)