from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from hashlib import sha256
from typing import NamedTuple

import requests
from flask import Flask, render_template, jsonify, request, url_for
import smtplib

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


class PayloadData(NamedTuple):
    sum: int
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


@app.route('/callback_url')
def callback():
    try:
        app.config['result'] = {
            'payment_id': request.args['payment_id'],
            'clientid': request.args['clientid'],
            'result': request.args['result']
        }
    except Exception as e:
        app.config['result'] = {
            'result': str(e)
        }
    return jsonify(True)


@app.route('/callback_view')
def callback_view():
    if 'result' in app.config:
        return jsonify(app.config['result'])
    return jsonify(False)


@app.route('/order')
def form_order():
    # data = PayloadData(
    #     sum=int(request.form['sum']),
    #     client_email=request.form['email'],
    #     client_phone=request.form['phone'],
    #     sign=sha256(request.form['sum'] + '' + '' + '' + request.form['phone'] + request.form['email']),
    #     user_result_callback=url_for('callback')
    # )

    data = PayloadData(
        sum=int(request.args['sum']),
        client_email=request.args['client_email'],
        client_phone=request.args['client_phone'],
        sign=sha256(request.args['sum'].encode('utf-8') + ''.encode('utf-8') + ''.encode('utf-8') + ''.encode('utf-8') + request.args['client_phone'].encode('utf-8') + request.args['client_email'].encode('utf-8')),
        user_result_callback=url_for('callback'),
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


app.run(host="0.0.0.0", debug=True)
