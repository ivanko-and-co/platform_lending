from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from hashlib import sha256

from flask import Flask, render_template, jsonify, request
import smtplib

app = Flask(__name__)
app.config['email'] = 'oboi@usexpo.ru'


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/record', methods=['POST'])
def form_record():
    text = f'Имя: {request.form["name"]}\nТелефон: {request.form["phone"]}\nПочта: {request.form["email"]}'
    send_mail(text, subject='Запись на консультацию') # TODO
    return jsonify(True)


@app.route('/order', methods=['POST'])
def form_order():
    sum_cart = request.form['sum']
    client_id = ''
    order_id = ''
    service_name = ''
    client_phone = request.form['phone']
    client_email = request.form['email']

    sign = sha256(sum_cart + client_id + order_id + service_name + client_phone + client_email)

    return sign


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
