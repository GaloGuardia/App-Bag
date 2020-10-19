import sys
import googletrans
from flask import Flask, render_template, request
from googletrans import Translator

app = Flask(__name__)

@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route("/signin", methods=['GET', 'POST'])
def signin():
    return render_template('signin.html')

@app.route("/", methods=['GET', 'POST'])
@app.route("/index", methods=['GET', 'POST'])
def index():
    return render_template('translator.html', languages=googletrans.LANGUAGES)

@app.route("/translator")
def interpreter():
    return render_template('translator.html', languages=googletrans.LANGUAGES)

@app.route("/translate", methods=['GET', 'POST'])
def translate():
    if request.method == 'POST':
        translator = Translator()
        fromLanguageKey = request.form.get('fromLanguages')
        toLanguageKey = request.form.get('toLanguages')
        texto = request.form.get('texto')

        if not (texto):
            return interpreter()

        if (fromLanguageKey == 'detect'):
            dt = translator.detect(texto)
            fromLanguageKey = dt.lang

        textTranslated = translator.translate(texto, src=fromLanguageKey, dest=toLanguageKey).text

        for key, language in googletrans.LANGUAGES.items():
            if (key == fromLanguageKey):
                language1 = language
            elif (key == toLanguageKey):
                language2 = language

        return render_template('translator.html', languages=googletrans.LANGUAGES, fromLanguageKey=fromLanguageKey, toLanguageKey=toLanguageKey, firstLanguage=language1, secondLanguage=language2, texto=texto, textTranslated=textTranslated)

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404

@app.errorhandler(500)
def page_not_found(error):
    return error, 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)