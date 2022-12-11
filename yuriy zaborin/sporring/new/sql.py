#!/usr/bin/python3
import cgi
cgi.test()
import sqlite3
import datetime
import random
import os, sys

class UsersDB(object):
    def __init__(self, db_file_name):
        self.connect = sqlite3.connect(db_file_name, check_same_thread=False)
        self.baseName = 'users'
        self.cursor = self.connect.cursor()

    def getUser(self, param, value):
        # 0 - id
        # 1 - email
        # 2 - name
        # 3 - password
        # 4 - followers
        # 5 - subscription
        # 6 - avatar
        # 7 - description
        # 8 - veryfied
        # 9 - phone
        # 10 - fights
        # 11 - rating
        # 12 - reg_time
        # 13 - ver_code
        result = self.cursor.execute(f'''SELECT * FROM {self.baseName} WHERE {param} = "{value}"''').fetchall()[0]
        return result

    def getUser_param(self, email, id, param):
        if email != '' and id == '':
            result = self.cursor.execute(f'''SELECT {param} FROM {self.baseName} WHERE email = "{email}"''').fetchall()[0][0]
        elif id != '' and email == '':
            result = self.cursor.execute(f'''SELECT {param} FROM {self.baseName} WHERE id = {id}''').fetchall()[0][0]
        return result

    def getLastId(self):
        lastId = self.cursor.execute(f'''SELECT MAX(id) FROM {self.baseName}''').fetchall()[0][0]
        if lastId == None:
            lastId = 0
        return int(lastId)

    def checkUser_param(self, param, value):
        i = self.cursor.execute(f''' SELECT * FROM {self.baseName} WHERE {param} = "{value}" ''').fetchall()
        return i
    
    def registerUser(self, user):
        self.cursor.execute(f'''INSERT INTO {self.baseName} (id, email, name, password, followers, subscriptions, avatar, description, veryfied, phone, fights, rating, reg_time, ver_code) VALUES ({self.getLastId() + 1}, "{user['email']}", "{user['name']}", "{user['password']}", "{user['followers']}", "", "{user['avatar']}", "", False, "{user['phone']}", "", 0, "{datetime.datetime.now()}", "{random.randint(100000, 999999)}")''')
        self.connect.commit()

    def checkUser_password(self, email, password):
        pswrd = self.cursor.execute(f'''SELECT password FROM {self.baseName} WHERE email = "{email}"''').fetchall()[0][0]
        if str(pswrd) == str(password):
            return False
        else:
            return True

    def edit(self, objec, user, param, value):
        self.cursor.execute(f'''UPDATE {self.baseName} SET {param} = "{value}" WHERE {objec} = "{user}"''')
        self.connect.commit()

    def updateVerCode(self, value, param):
        self.cursor.execute(f'''UPDATE {self.baseName} SET ver_code = {random.randint(100000, 999999)} WHERE {param} = "{value}"''')
        self.connect.commit()

    def getAllUsers(self):
        users = self.cursor.execute(f'''SELECT name FROM {self.baseName}''').fetchall()
        return users

class Fights(object):
    def __init__(self, db_file_name):
        self.connect = sqlite3.connect(db_file_name, check_same_thread=False)
        self.baseName = 'fights'
        self.cursor = self.connect.cursor()

    def closeFight(self, fightId):
        self.cursor.execute(f'''UPDATE {self.baseName} SET status = 0 WHERE id = {fightId}''')
        self.connect.commit()

    def getLastId(self):
        lastId = self.cursor.execute(f'''SELECT MAX(id) FROM {self.baseName}''').fetchall()[0][0]
        if lastId == None:
            lastId = 0
        return int(lastId)

    def createFight(self, fight):
        id = self.getLastId() + 1
        self.cursor.execute(f'''INSERT INTO {self.baseName} (id, author, name, description, image, views, enemy, start_time, password, status, spectators) VALUES ({id}, '{fight['author']}', '{fight['name']}', '{fight['description']}', '{fight['image']}', 0, '{fight['enemy']}', '{datetime.datetime.now()}', '{fight['password']}', {fight['status']}, '{fight["spectators"]}')''')
        self.connect.commit()
        return id

    def getFightsOnline(self):
        fights = self.cursor.execute(f'''SELECT * FROM {self.baseName} WHERE status = 1''').fetchall()
        return fights


    def getFight(self, id):
        result = self.cursor.execute(f'''SELECT * FROM {self.baseName} WHERE id = {id}''').fetchall()[0]
        return result

    def addImage(self, img, id):
        self.cursor.execute(f'''UPDATE {self.baseName} SET image = "{img}" WHERE id = {id}''')
        self.connect.commit()

class Chats(object):
    def __init__(self, db_file_name):
        self.connect = sqlite3.connect(db_file_name, check_same_thread=False)
        self.baseName = 'chats'
        self.cursor = self.connect.cursor()

    def getLastId(self):
        lastId = self.cursor.execute(f'''SELECT MAX(id) FROM {self.baseName}''').fetchall()[0][0]
        if lastId == None:
            lastId = 0
        return int(lastId)

    def getAllMessages(self, chatId):
        messages = self.cursor.execute(f'''SELECT messages FROM {self.baseName} WHERE id = {chatId}''').fetchall()
        return messages

    def addMessage(self, chatId, messageText, messageAuthor):
        newMessages = self.getAllMessages(chatId)
        rs = []
        for i in newMessages:
            if i[0]:
                rs.append(i[0])
        rs.append(f'{messageAuthor}: {messageText}')
        rs = "   ".join(rs)
        #print(rs)
        self.cursor.execute(f'''UPDATE {self.baseName} SET messages = "{rs}" WHERE id = {chatId}''')
        self.connect.commit()

    def getChatByFightId(self, fightId):
        chatId = self.cursor.execute(f'''SELECT id FROM {self.baseName} WHERE fight_id = {fightId}''').fetchall()[0]
        return chatId

    def createChat(self, fightId):
        self.cursor.execute(f'''INSERT INTO {self.baseName} (id, fight_id, messages) VALUES ({self.getLastId() + 1}, {fightId}, '')''')
        self.connect.commit()

