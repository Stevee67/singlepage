from flask import request, g, url_for

def database_uri(host, username, password, db_name, port):
    return 'postgresql+psycopg2://{username}:{password}@{host}:{port}/{db_name}'. \
        format(**{'db_name': db_name,
                  'host': host,
                  'port': port,
                  'username': username,
                  'password': password})

def db(*args, **kwargs):
    return g.db.query(*args).filter_by(**kwargs)

def redirect_url(*args):
    urls = [request.args.get('next'), url_for('general.index'), request.referrer]
    res_urls = []

    for elem in args:
        res_urls.append(elem)
        urls.remove(elem)

    res_urls += urls

    res_url = ''
    for elem in res_urls:
        res_url = res_url or elem
    return res_url