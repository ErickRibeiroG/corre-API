from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

    strava_account = relationship("StravaAccount", back_populates="user", uselist=False)


class StravaAccount(Base):
    __tablename__ = "strava_accounts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    strava_athlete_id = Column(
        BigInteger,
        unique=True,
        nullable=False
    )

    access_token = Column(
        String,
        nullable=False
    )

    refresh_token = Column(
        String,
        nullable=False
    )

    expires_at = Column(
        Integer,
        nullable=False
    )

    user = relationship("User", back_populates="strava_account")