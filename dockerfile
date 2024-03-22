FROM python:3.11
WORKDIR /app
COPY . /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD [ "python", "./main.py" ]
