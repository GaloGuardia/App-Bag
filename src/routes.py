import sys
import time
from os import remove
from pathlib import Path
import glob
import googletrans
import qrcode
from PIL import Image
from flask import Flask, render_template, request
from googletrans import Translator
import hashlib

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route("/signin", methods=['GET', 'POST'])
def signin():
    return render_template('signin.html')

@app.route("/home", methods=['GET', 'POST'])
def home():
    services = [
        {
            "url": "translator",
            "name": "Translator",
            "pathImg": Path("static/images/logoTranslator.jpg")
        },
        {
            "url": "codeQR",
            "name": "QR Code",
            "pathImg": Path("static/images/logoQR.jpg")
        },
        {
            "url": "hash",
            "name": "Hash",
            "pathImg": Path("static/images/logoHash.png")
        }
    ]
    
    return render_template('home.html', services=services)

@app.route("/translator", methods=['GET', 'POST'])
def translator():
    if request.method == 'POST':
        translator = Translator()
        fromLanguageKey = request.form.get('fromLanguages')
        toLanguageKey = request.form.get('toLanguages')
        texto = request.form.get('texto')

        if not (texto):
            return render_template('translator.html', languages=googletrans.LANGUAGES)

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

    return render_template('translator.html', languages=googletrans.LANGUAGES)

@app.route("/codeQR", methods=['GET', 'POST'])
def codeQR():
    if request.method == 'POST':
        texto = request.form.get('texto')
        
        if not (texto):
            return render_template('qrcode.html')

        qr_big = qrcode.QRCode(
            error_correction=qrcode.constants.ERROR_CORRECT_H
        )
        qr_big.add_data(texto)
        qr_big.make()
        img_qr_big = qr_big.make_image().convert('RGB')
        
        fileList = Path("src/static/images").glob("QRCode-*.png")
        # Iterate over the list of filepaths & remove each file.
        for filePath in fileList:
            try:
                remove(filePath)
            except:
                print("Error while deleting file : ", filePath)
        
        nameImg = "QRCode-" + str(time.time()) + ".png"
        pathImg = Path("src/static/images").joinpath(nameImg)

        img_qr_big.save(pathImg)
        
        return render_template('qrcode.html', nameImg=nameImg, texto=texto)
        
    return render_template('qrcode.html')

@app.route("/hash", methods=['GET', 'POST'])
def hash():
    typesHash = hashlib.algorithms_guaranteed
    
    typesHashMod = []
    for typeHash in typesHash:
        typesHashMod.append(typeHash.replace("_", " "))
    
    if request.method == 'POST':
        texto = request.form.get('texto')
        hashTypeKey = request.form.get('hashTypes').replace(" ", "_")
        textoHash = ""
        
        if not (texto):
            return render_template('hash.html', types=typesHashMod)
        
        h = hashlib.new(hashTypeKey)
        h.update(texto.encode("utf-8"))
        try:
            textoHash = h.hexdigest()
        except TypeError:
            # Algoritmo SHAKE requiere la longitud como argumento.
            textoHash = h.hexdigest(128)
        
        return render_template('hash.html', types=typesHashMod, hashType=hashTypeKey.replace("_", " "), texto=texto, textoHash=textoHash)
        
    return render_template('hash.html', types=typesHashMod)

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404

@app.errorhandler(500)
def page_not_found(error):
    return error, 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)