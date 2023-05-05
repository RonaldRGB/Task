from flask import Flask, render_template, request, url_for, session, redirect, flash
from datetime import datetime
import sqlite3

app = Flask(__name__)
app.secret_key = '23r2idn3iex93ex03948nxy9snx9yx32dd'

banco = sqlite3.connect('Task.db', check_same_thread=False)
cursor = banco.cursor()

Data = datetime.now().strftime('%d/%m/%Y %H:%M:%S')

#######################################################
###################### Login ##########################
#######################################################
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
            session['id_usuario_logado'] = row[0]
            session['nome_usuario_logado'] = row[2]
            session['mail_usuario_logado'] = row[3]
            session['Tipo_usuario_logado'] = row[5]
        return redirect(url_for('home'))
    else:
        flash("Usuário não encontrado")
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session['usuario_logado'] = None
    return redirect(url_for('login'))
    

#######################################################
####################### Home ##########################
#######################################################

class taks:
    def __init__(self, id, titulo, prioridade, status, datacriacao, dataconclusao, comentario, datahoracriacao):
        self.id = id
        self.titulo = titulo
        self.prioridade = prioridade
        self.status = status
        self.datacriacao = datacriacao
        self.dataconclusao = dataconclusao
        self.comentario = comentario 
        self.datahoracriacao = datahoracriacao 

listatask = []
@app.route('/home')
def home():
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        return redirect(url_for('login'))
    listatask.clear()
    cursor.execute(f"SELECT * FROM Tasks WHERE ID_Usuario = {session['id_usuario_logado']}")

    for row in cursor.fetchall():
        id = '000'+str(row[0])
        linha = taks(id[-4:], row[1], row[2], row[3], row[4][0:10], row[5], row[6], row[4])
        listatask.append(linha)
        print(session['Tipo_usuario_logado'])
    
    return render_template('home.html',
                           usuario_logado=session['usuario_logado'],
                           nome_usuario_logado=session['nome_usuario_logado'],
                           mail_usuario_logado=session['mail_usuario_logado'],
                           lista=listatask, tipousuario=session['Tipo_usuario_logado'])

@app.route('/editatask', methods=['POST'])
def editatask():
    id = request.form['id_Detalhamento'].lstrip('0')
    titulo = request.form['titulo_Detalhamento']
    prioridade = request.form['prioridade_Detalhamento']
    status = request.form['status_Detalhamento']
    comentario = request.form['descricao_Detalhamento']

    if status == 'Concluído':
        dataconclusao = Data
    else:
        dataconclusao = ""
    
    if prioridade == '':
        prioridade = 'Baixa'
    if status == '':
        status = 'Pendente'

    Qr = f"""UPDATE Tasks SET 
                Titulo = '{titulo}', 
                Prioridade = '{prioridade}', 
                Status = '{status}', 
                DataConclusao = '{dataconclusao}',
                Comentario = '{comentario}' 
                WHERE ID = {id}"""
    cursor.execute(Qr)
    banco.commit()
    return redirect(url_for('home'))

@app.route('/criartask', methods=['POST'])
def criartask():
    titulo = request.form['titulo_CriarTask']
    prioridade = request.form['prioridade_CriarTask']
    status = request.form['status_CriarTask']
    comentario = request.form['descricao_CriarTask']
    id_usuario = session['id_usuario_logado']

    if status == 'Concluído':
        dataconclusao = Data
    else:
        dataconclusao = ""
    
    if prioridade == '':
        prioridade = 'Baixa'
    if status == '':
        status = 'Pendente'

    cursor.execute(f"""
    INSERT INTO Tasks (Titulo, Prioridade, Status, DataCriacao, DataConclusao, Comentario, ID_Usuario)
    VALUES('{titulo}','{prioridade}','{status}', '{Data}', '{dataconclusao}','{comentario}', {id_usuario})""")
    banco.commit()

    return redirect(url_for('home'))

@app.route('/deletatask', methods=['POST'])
def deletatask():
    id = request.form['id_Deletatask'].lstrip('0')
    cursor.execute(f"""
    DELETE FROM Tasks WHERE ID = {id}
    """)
    banco.commit()
    return redirect(url_for('home'))

# Usuario

class usuariosClass:
    def __init__(self, id, usuario, nome, mail, tipousuario):
        self.id = id
        self.usuario = usuario
        self.nome = nome
        self.mail = mail
        self.tipousuario = tipousuario

listausuarios = []
@app.route('/usuarios')
def usuarios():
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        return redirect(url_for('login'))
    
    listausuarios.clear()

    cursor.execute('SELECT ID, Usuario, Nome, Mail, Tipo_Usuario FROM Usuarios')
    
    for row in cursor.fetchall():
        linha = usuariosClass(row[0], row[1], row[2], row[3], row[4])
        listausuarios.append(linha)
    return render_template('usuarios.html',
                           usuario_logado=session['usuario_logado'],
                           nome_usuario_logado=session['nome_usuario_logado'],
                           mail_usuario_logado=session['mail_usuario_logado'],
                           usuarios=listausuarios, tipousuario=session['Tipo_usuario_logado'])

@app.route('/editaUsuario', methods=['POST'])
def editaUsuario():
    id = request.form['id_usuario']
    usuario = request.form['Usuario']
    nome = request.form['Nome']
    mail = request.form['mail']
    tipo = request.form['tipoUsuario']
    try:
        reset = request.form['resetarsenha']
        reset = '*'
    except:
        reset = ""
    
    if tipo == '':
        tipo = 'Comum'
    
    cursor.execute(F"""
    UPDATE Usuarios SET 
    Usuario = '{usuario}',
    Nome = '{nome}',
    Mail = '{mail}',
    Tipo_Usuario = '{tipo}',
    Reset_Senha = '{reset}'
    WHERE ID = {id}""")
    banco.commit()

    return redirect(url_for('usuarios'))

app.run(debug=True)