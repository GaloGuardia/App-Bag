import sys
import googletrans
from flask import Flask, render_template, request
from googletrans import Translator

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def index():
    return render_template('translator.html', languages=googletrans.LANGUAGES)

@app.route("/translate", methods=['GET', 'POST'])
def translate():
    if request.method == 'GET':
        return 'hola'
    else:
        return 'hola2'

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404

@app.errorhandler(500)
def page_not_found(error):
    return error, 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)