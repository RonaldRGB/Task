import sqlite3

banco = sqlite3.connect('Task.db')

cursor = banco.cursor()

# cursor.execute("CREATE TABLE Usuarios(Usuario text, Nome text, Mail text, Senha Text)")

# cursor.execute("INSERT INTO Usuarios VALUES('rrgbrito','Ronald Ronan','ronald.brito@orizonvr.com.br','teste')")

# cursor.execute("SELECT * FROM pessoas")

# print(cursor.fetchall())

# cursor.execute("DELETE FROM pessoas")

banco.commit()