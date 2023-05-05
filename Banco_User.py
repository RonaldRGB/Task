import sqlite3
from datetime import datetime
Data = datetime.now().strftime('%d/%m/%Y %H:%M')

banco = sqlite3.connect('task.db')

cursor = banco.cursor()

cursor.execute('DROP TABLE Usuarios')
cursor.execute("CREATE TABLE Usuarios(ID INTEGER PRIMARY KEY AUTOINCREMENT, Usuario text, Nome text, Mail Text, Senha text, Tipo_Usuario text, Reset_Senha text)")

cursor.execute(f"""
    INSERT INTO Usuarios (Usuario, Nome, Mail, Senha, Tipo_Usuario, Reset_Senha)
    VALUES('rrgbrito','Ronald Ronan','Ronald.brito@orizonvr.com.br','teste', 'Administrador', '')""")

cursor.execute(f"""
    INSERT INTO Usuarios (Usuario, Nome, Mail, Senha, Tipo_Usuario, Reset_Senha)
    VALUES('teste','Ronald Ronan','Ronald.brito@orizonvr.com.br','teste', 'Comum', '*')""")

cursor.execute('SELECT * FROM Usuarios')

for row in cursor.fetchall():
    print(row)

banco.commit()