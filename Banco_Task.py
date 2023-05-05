import sqlite3
from datetime import datetime
Data = datetime.now().strftime('%d/%m/%Y %H:%M')

banco = sqlite3.connect('task.db')

cursor = banco.cursor()

cursor.execute('DROP TABLE Tasks')
cursor.execute("CREATE TABLE Tasks(ID INTEGER PRIMARY KEY AUTOINCREMENT, Titulo text, Prioridade text, Status Text, DataCriacao text, DataConclusao text, Comentario text, ID_Usuario INTEGER)")
# cursor.execute('DELETE FROM Tasks')

cursor.execute(f"""
    INSERT INTO Tasks (Titulo, Prioridade, Status, DataCriacao, DataConclusao, Comentario)
    VALUES('Verifcar integração','Baixa','Pendente', '{Data}', '','Fazer verifcação')""")

# Qr = "SELECT MAX(ID)+1 FROM Tasks"

cursor.execute('SELECT * FROM Tasks')

for row in cursor.fetchall():
    print(row)

# cursor.execute("DELETE FROM pessoas")

banco.commit()