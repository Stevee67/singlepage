from flask import render_template, request, flash, url_for, redirect, g
from app.blueprints import index_bp
from app.models import FeatureRequest, Users, ProductAreas, Clients
from flask import jsonify
from app.tools import db
from flask.ext.login import logout_user, current_user, login_required, login_user
from app.constants import PRIORITETS




@index_bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@index_bp.route('home/', methods=['GET'])
def home():
    clients = [client.object_to_dict() for client in db(Clients).all()]
    return render_template('home.html', clients=clients)

@index_bp.route('home/details/<string:client_id>', methods=['GET'])
def home_details(client_id):

    client = Clients.get(client_id)
    completed = 0
    if client:
        completed = client.get_persent_compl()
    feature_requests = FeatureRequest.get_all(client_id)
    user = None
    if current_user.is_authenticated:
        user = db(Users, id=current_user.id)
    product_areas = [area.object_to_dict() for area in db(ProductAreas).all()]
    prioritets = PRIORITETS
    return render_template('details.html', client=client.object_to_dict(),
                           feature_requests=feature_requests,
                           product_areas=product_areas,
                           prioritets=prioritets,
                           user=user,
                           completed=completed)


@index_bp.route('save_request/', methods=['POST'])
def save_request():
    req = FeatureRequest.save_request(request.form)
    return jsonify(req)

@index_bp.route('delete_request/', methods=['POST'])
def delete_request():
    data = request.form
    print(FeatureRequest.immut_to_dict(data)['id'])
    FeatureRequest.get(FeatureRequest.immut_to_dict(data)['id']).delete()
    return jsonify({})

@index_bp.route('edit_request/', methods=['POST'])
def edit_request():
    data = request.form
    feature_request = FeatureRequest.set_request(data)
    return jsonify(feature_request)

@index_bp.route('set_client_priority/', methods=['POST'])
def set_client_priority():
    data = request.form
    feature_request = FeatureRequest.get(data.id).set_attr(data)
    return jsonify(feature_request)

@index_bp.route('add_client/', methods=['POST'])
def add_client():
    client = Clients().add_client(request.form)
    return jsonify(client.object_to_dict())

@index_bp.route('add_product_area/', methods=['POST'])
def add_product_area():
    product_area = ProductAreas().save_product_area(request.form)
    return jsonify(product_area.object_to_dict())

@index_bp.route('get_product_areas/', methods=['POST'])
def get_product_areas():
    product_areas = ProductAreas.get_all()
    return jsonify({'data':product_areas})


@index_bp.route('login/', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template(url_for('index.index'))
    email = request.form.get('email')
    password = request.form.get('password')
    if current_user.is_authenticated:
        print('a')
    if email and password:
        user = db(Users).filter(Users.email == email).first()
        if user and user.verify_password(password):
            login_user(user, remember=True)
            g.user = user
        else:
            return "Incorect data"
    return 'Fill all fields'

@index_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')





