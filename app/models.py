from sqlalchemy import Column, ForeignKey
from app.constants import TABLE_TYPES
from sqlalchemy.ext.declarative import declarative_base
from flask import g
from app.tools import db
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()

class Parent:

    @classmethod
    def get(cls, id):
        return g.db().query(cls).filter(cls.id == id).one()

    def set_attr(self, dictionary):
        for k in dictionary:
            setattr(self, k, dictionary[k])
        return self

    def delete(self):
        g.db.delete(self)
        g.db.commit()

    def refreshSession(self):
        g.db.refresh(self)
        return self

    def save(self):
        g.db.add(self)
        g.db.flush()
        return self

    @staticmethod
    def immut_to_dict(imut):
        ret_dict = {}
        iters = dict(imut)
        for k in iters:
            ret_dict[k] = iters[k][0]
        return ret_dict

    def object_to_dict(self):
        ret_dict = {}
        for attr, value, in self.__dict__.items():
            if not attr.startswith("_"):
                ret_dict[attr] = value
        return ret_dict

class FeatureRequest(Parent, Base):
    __tablename__ = 'feature_request'

    id = Column(TABLE_TYPES['id'], primary_key=True)
    title = Column(TABLE_TYPES['title'], nullable=False)
    description = Column(TABLE_TYPES['description'])
    client_id = Column(TABLE_TYPES['id'], ForeignKey('clients.id'))
    target_date = Column(TABLE_TYPES['timestamp'])
    ticket_url = Column(TABLE_TYPES['url'])
    cr_tm = Column(TABLE_TYPES['timestamp'])
    status = Column(TABLE_TYPES['name'])
    priority = Column(TABLE_TYPES['integer'])
    product_area_id = Column(TABLE_TYPES['id'], ForeignKey('product_areas.id'))

    def __init__(self, title=None, description=None, client_id=None, target_date=None,
                 ticket_url=None, status=None, priority=None, product_area_id=None):
        self.title = title
        self.description = description
        self.client_id = client_id
        self.target_date = target_date
        self.ticket_url = ticket_url
        self.status = status
        self.priority = priority
        self.product_area_id = product_area_id

    @staticmethod
    def get_corect_data(data):
        request = FeatureRequest.immut_to_dict(data)
        productArea_id = ''
        if 'productArea' in request:
            productArea = db(ProductAreas).filter(ProductAreas.title == request['productArea']).first()
            if productArea:
                productArea_id = productArea.id
        new_data = {'title': request['title'] if 'title' in request else '',
                    'description': request['description'] if 'description' in request else '',
                    'client_id': int(request['client_id']) if 'client_id' in request else '',
                    'target_date': request['targetDate'] if 'targetDate' in request else '',
                    'ticket_url': request['ticketURL'] if 'ticketURL' in request else '',
                    'status': 'TODO' ,
                    'priority': int(request['priority']) if 'priority' in request else '',
                    'product_area_id': productArea_id}
        return new_data

    @staticmethod
    def save_request(data):
        new_data = FeatureRequest.get_corect_data(data)
        print(new_data)
        result = FeatureRequest().set_attr(new_data)
        return result

    @staticmethod
    def set_request(data):
        id = FeatureRequest.immut_to_dict(data)['id']
        new_data = FeatureRequest.get_corect_data(data)
        object = FeatureRequest.get(id).first()
        object.set_attr(new_data)
        return object.object_to_dict()


    @staticmethod
    def get_all(client_id):
        objs = [req.object_to_dict() for req in db(FeatureRequest).filter(FeatureRequest.client_id == client_id).all()]
        res = []
        for r in objs:
            r.update({'area': ProductAreas.get(r['product_area_id']).title})
            res.append(r)
        print(res)
        return res





class Users(Parent, Base):
    __tablename__ = 'users'

    id = Column(TABLE_TYPES['id'], primary_key=True)
    name = Column(TABLE_TYPES['name'])
    cr_tm = Column(TABLE_TYPES['timestamp'])
    role = Column(TABLE_TYPES['name'])
    email = Column(TABLE_TYPES['email'])
    password_hash = Column(TABLE_TYPES['password_hash'])

    def __init__(self, name, role, email, password_hash):
        self.name = name
        self.role = role
        self.email = email
        self.password = password_hash

    def password(self, password):
        self.password_hash = None
        if password:
            self.password_hash = \
                generate_password_hash(password,
                                       method='pbkdf2:sha256',
                                       salt_length=32)  # salt_length=8
    @staticmethod
    def passs(password):
        return generate_password_hash(password,
                                       method='pbkdf2:sha256',
                                       salt_length=32)  # salt_length=8

    def verify_password(self, password):
        return self.password_hash and \
               check_password_hash(self.password_hash, password)

    @property
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

class Clients(Parent, Base):
    __tablename__ = 'clients'

    id = Column(TABLE_TYPES['id'], primary_key=True)
    project_name = Column(TABLE_TYPES['name'])
    client_name = Column(TABLE_TYPES['name'], nullable=False, unique=True)
    description = Column(TABLE_TYPES['description'])
    cr_tm = Column(TABLE_TYPES['timestamp'])
    website = Column(TABLE_TYPES['url'])
    phone = Column(TABLE_TYPES['phone'])
    email = Column(TABLE_TYPES['email'],nullable=False, unique=True)
    priority = Column(TABLE_TYPES['integer'])
    user_id = Column(TABLE_TYPES['id'], ForeignKey('users.id'))

    def __init__(self, project_name=None, client_name=None, description=None, website=None,
                 phone=None, email=None, priority=None, user_id=None):
        self.project_name = project_name
        self.client_name = client_name
        self.description = description
        self.website = website
        self.phone = phone
        self.email = email
        self.priority = priority
        self.user_id = user_id


    def add_client(self, data):
        return self.set_attr(ProductAreas.immut_to_dict(data)).save()

class ProductAreas(Parent, Base):
    __tablename__ = 'product_areas'

    id = Column(TABLE_TYPES['id'], primary_key=True)
    title = Column(TABLE_TYPES['name'], nullable=False, unique=True)

    def __init__(self, title=None):
        self.title = title

    def save_product_area(self, data):
        return self.set_attr(ProductAreas.immut_to_dict(data)).save()

    @staticmethod
    def get_all():
        product_areas = db(ProductAreas).all()
        return [product_area.object_to_dict() for product_area in product_areas]




