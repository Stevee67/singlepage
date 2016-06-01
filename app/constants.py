from sqlalchemy import String, TIMESTAMP, INTEGER




TABLE_TYPES = {
    'id': INTEGER,
    'integer': INTEGER,
    'name': String(100),
    'title': String(100),
    'password_hash': String(128),
    'timestamp': TIMESTAMP,
    'role': String(36),
    'fax': String(50),
    'phone': String(50),
    'location': String(64),
    'status': String(36),
    'description': String(500),
    'url': String(150),
    'email': String(100)
}


PRIORITETS = [1,2,3]