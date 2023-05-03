from flask import Flask, render_template, request, url_for, session, redirect
import sqlite3

app = Flask(__name__)
app.secret_key = '23r2idn3iex93ex03948nxy9snx9yx32dd'

banco = sqlite3.connect('Task.db', check_same_thread=False)
cursor = banco.cursor()

# Login

@app.route('/')
def login():
    return render_template("login.html")

@app.route('/autenticacion', methods=['POST'])
def autenticacion():
    usuario = request.form['usuario_logado']
    senha = request.form['senha']

    cursor.execute(f"SELECT * FROM Usuarios WHERE Usuario = '{usuario}' AND Senha = '{senha}'")
    lista = cursor.fetchall()
    if lista:
        session['usuario_logado'] = usuario
        for row in lista:
            session['nome_usuario_logado'] = row[1]
            session['mail_usuario_logado'] = row[2]
            print(usuario)
        return redirect(url_for('home'))
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session['usuario_logado'] = None
    return redirect(url_for('login'))
# Fim Login
    
@app.route('/home')
def home():
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        return redirect(url_for('login'))
    return render_template('home.html', 
                           usuario_logado=session['usuario_logado'],
                           nome_usuario_logado=session['nome_usuario_logado'],
                           mail_usuario_logado=session['mail_usuario_logado'])

app.run(debug=True)