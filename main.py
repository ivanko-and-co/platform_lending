import os.path
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from hashlib import sha256
from typing import TypedDict
import json
from string import ascii_letters
from random import choices

import requests
from flask import Flask, render_template, jsonify, request, url_for, redirect
from werkzeug.utils import secure_filename
import smtplib
from redis import Redis

redis = Redis(decode_responses=True)
app = Flask(__name__)
app.config['email'] = 'oboi@usexpo.ru'

PRODUCT = {
    1: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Штукатурка"},
    2: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Холст"},
    3: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Пыль"},
    4: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Песок"},
    5: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Мелкий лен"},
    6: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Лоск"},
    7: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Иней"},
    8: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Живопись"},
    9: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Декоративная штукатурка"},
    10: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Smart Stick"},
    11: {"price_size": 1599, "EXTRA": {1: {"name": "Добавить клей", "price": 59}, 2: {"name": "Латексная печать", "price": 299}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Pintura"},
    12: {"price_size": 210, "EXTRA": {2: {"name": "Латексная печать", "price": 920}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoBOARD 'ДОСКА' (текстура гипса)"},
    13: {"price_size": 245, "EXTRA": {2: {"name": "Латексная печать", "price": 990}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoFLAX 'ХОЛСТ' (текстура грубого холста)"},
    14: {"price_size": 210, "EXTRA": {2: {"name": "Латексная печать", "price": 920}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoFROST 'МОРОЗ' (текстура инея)"},
    15: {"price_size": 245, "EXTRA": {2: {"name": "Латексная печать", "price": 990}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoLINE 'ЛИНИЯ' (текстура фрески)"},
    16: {"price_size": 210, "EXTRA": {2: {"name": "Латексная печать", "price": 920}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoMARBLE 'МРАМОР' (текстура мрамора)"},
    17: {"price_size": 245, "EXTRA": {2: {"name": "Латексная печать", "price": 990}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoSHELL 'РАКОВИНА' (текстура мелкого песка)"},
    18: {"price_size": 245, "EXTRA": {2: {"name": "Латексная печать", "price": 990}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "VEIKA DecoSMOOTH 'ГЛАДЬ' (гладкие)"},
    19: {"price_size": 477, "EXTRA": {2: {"name": "Латексная печать", "price": 1455}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "SIHL 2511 Non-Woven design2wall Sol 195 Satin"},
    20: {"price_size": 477, "EXTRA": {2: {"name": "Латексная печать", "price": 1455}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "SIHL 2512 Non-Woven design2wall Sol 195 Matt"},
    21: {"price_size": 681, "EXTRA": {2: {"name": "Латексная печать", "price": 1899}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Magic PEBBLE Textured Vinyl Wallcovering 290g (крупный песок)"},
    22: {"price_size": 481, "EXTRA": {2: {"name": "Латексная печать", "price": 1499}, 3: {"name": "Покрыть лаком", "price": 399}}, "name": "Magic MURAL PRO Latex-Based Wallcovering Paper (гладкие)"},
}
CATEGORY = {
    1: "Бумажные обои",
    2: "Виниловые фотообои",
    3: "Виниловые фотообои",
    4: "Фотообои флизелиновые (с ПВХ-покрытием)",
    5: "Фотообои флизелиновые (без ПВХ)",
    6: "Фотообои бумажные (с ПВХ-покрытием)",
    7: "Фотообои из латексной бумаги (без ПВХ)",
}


class PayloadData(TypedDict):
    sum: int
    orderid: str
    client_email: str
    client_phone: str
    sign: str
    user_result_callback: str


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/record', methods=['POST'])
def form_record():
    text = f'Имя: {request.form["name"]}\nТелефон: {request.form["phone"]}\nПочта: {request.form["email"]}'
    send_mail(text, subject='Запись на консультацию') # TODO
    return jsonify(True)


@app.route('/callback_url/<path:order_id>')
def callback(order_id: str):
    if request.args['result'] == 'success':
        if redis.exists(order_id):
            send_mail(data=redis.get(order_id))
            redis.delete(order_id)

    return redirect(url_for('main'))


@app.route('/callback_view')
def callback_view():
    if 'result' in app.config:
        return jsonify(app.config['result'])
    return jsonify(False)


@app.route('/order')
def form_order():
    width: int = int(request.form['width'])
    height: int = int(request.form['height'])
    product: dict = PRODUCT[int(request.form['product_id'])]
    category: str = CATEGORY[int(request.form['category_id'])]
    extra: list[int] = json.loads(request.form['extra'])
    email = request.form['email']
    phone = request.form['phone']

    order_id = ''.join(choices(ascii_letters + '1234567890', k=5))

    file = 'Файл отсутствует'
    # if 'file' in request.files:
    #     ext = secure_filename(request.files['file'].filename).split('.')[1]
    #     request.files['file'].filename = order_id + '.' + ext
    #     request.files['file'].save(os.path.join('static', 'user_file'))
    #     file = url_for('get_file', file='')

    price = product['price_size']
    extra_str = ''
    for index in extra:
        if index in product["EXTRA"]:
            price += product["EXTRA"][index]['price']
            extra_str += ' ' + product["EXTRA"][index]['name'] + ','

    sum = ((width * height)/10_000)*price

    message = f'Заказ\nИмя: {request.form["name"]}\nТелефон: {phone}\nEmail: {email}\n'
    message += f'Заказ № {order_id}\n    Категория: {category}\n    Товар: {product["name"]}\n'
    message += f'    Допы:{extra_str}\n    Сумма: {sum}\n    Файл: {file}'
    # redis.set(name=order_id, value=message, ex=3600)


    sign = sha256(
        (str(sum) + '' + '' + '' + email + phone).encode('utf-8'))

    data = PayloadData(
        sum=sum,
        orderid=order_id,
        client_email=email,
        client_phone=phone,
        sign=sign,
        # user_result_callback=url_for('callback', order_id=order_id)
    )

    result = requests.post('https://oboi-usexpo.server.paykeeper.ru/create/', data=data)

    return result.content


def send_mail(data, mime='plain', subject='Заказ на сайте', email=app.config['email']):
    # данные почтового сервиса
    user = ""
    passwd = ""
    server = ""
    port = ...

    # кому
    to = email

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = user
    message["To"] = to

    # формируем тело письма
    message.attach(MIMEText(data, mime))

    try:
        # подключаемся к почтовому сервису
        smtp = smtplib.SMTP(server, port)
        smtp.starttls()
        smtp.ehlo()
        # логинимся на почтовом сервере
        smtp.login(user, passwd)
        # пробуем послать письмо
        smtp.sendmail(user, to, message.as_string())
    except smtplib.SMTPException as err:
        print('error', err)
    finally:
        smtp.quit()


app.run(host="0.0.0.0", debug=False)
