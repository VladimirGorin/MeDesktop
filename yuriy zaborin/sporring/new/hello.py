#!/usr/bin/python3
import cgi
cgi.test()
import os
import json


from flask import Flask, render_template, request, url_for, redirect, session
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, send
from sql import UsersDB, Fights, Chats
from gevent import *

app = Flask(__name__)
app.secret_key = f'GFJDGJ43G3$#@$#%@##!@J34POJGJREfgdgdfOGEWSFAWSF'

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, 'users.db')

def CREATE_DIRECTORY(id):
    try:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        os.mkdir(f'{BASE_DIR}\\static\\images\\{str(id)}')
        os.mkdir(f'{BASE_DIR}\\static\\images\\{str(id)}\\photos')
        return 1
    except FileExistsError:
        return 0 

def GET_PATH_TO_PHOTO(id):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    return f'{BASE_DIR}\\static\\images\\{str(id)}\\photos'

companyName = 'GGWP'
# gevent-websocket
socketio = SocketIO(app, cors_allowed_origins='*')
socketio.init_app(app, async_mode='gevent')

USERS = UsersDB(db_path)
FIGHTS = Fights(db_path)
CHATS = Chats(db_path)
PREVIOS_PAGE = '<script>document.location.href = document.referrer</script>'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
DEFAULT_CHANGE = ['errors-file', 'errors-registration', 'errors-login', 'errors-key', 'errors-reestablish-get-info', 'email', 'phone', 'errors-create-room']
DESCRIPTION_ROOM = ['1. Нажмите на кнопку создать.', '2. Введите всё что написано на следующей странице.', '3. Загрузите превью комнаты.', '4. Начинайте свой спор!)']
BANLETTERS = ['<', '>', '&', '/']
BANWORDS = []

@socketio.on('message')
def handleMessage(data):
    #print(f"Message: {data}")
    if 'voice' in data:
        send({'type': 'audio', 'data': data}, broadcast = True)
    elif 'video1' in data:
        send({'type': 'video1', 'data': data}, broadcast = True)
    elif 'video2' in data:
        send({'type': 'video2', 'data': data}, broadcast = True)
    elif 'msg' in data:
        for let in BANLETTERS:
            if let in data['msg']:
                data['msg'] = data['msg'].replace(let, '')
        for let in BANWORDS:
            if let in data['msg']:
                data['msg'] = data['msg'].replace(let, '')
        CHATS.addMessage(int(data['chatId']), data['msg'], data['username'])
        send({'type': 'msg', 'data': data}, broadcast = True)

    elif 'type' in data:
        if data['type'] == 'fightClose':
            FIGHTS.closeFight(int(data['fightId']))
            send(data, broadcast = True)
        elif data['type'] == 'resetIcons':
            send(data, broadcast = True)


@app.route('/')
def glavnaya():
    return redirect('/defalut-change/home')

@app.route('/defalut-change/<redirectPage>')
def defalut_change(redirectPage):
    for change in DEFAULT_CHANGE:
        if change not in session:
            session[change] = ''
    return redirect(f'/{redirectPage}')

@app.route('/login')
def login():
    for change in DEFAULT_CHANGE:
        if change not in session:
            return redirect('/defalut-change/login')
    session['errors-file'] = ''
    session['errors-registration'] = ''
    return render_template('login.html', page_type = 'Авторизация', error = session['errors-login'], company_name = companyName)

@app.route('/registration')
def registration():
    for change in DEFAULT_CHANGE:
        if change not in session:
            return redirect('/defalut-change/registration')
    session['errors-login'] = ''
    session['errors-file'] = ''
    return render_template('reg.html', page_type='Регистрация', error = session['errors-registration'], company_name = companyName)

@app.route('/create-new-acc', methods=['POST'])
def create_new_acc():
    session['errors-registration'] = ''
    if request.method == 'POST':
        if request.form.get('password1') != request.form.get('password2'):
            session['errors-registration'] = 'Пароли не совпадают!'
            return redirect('/registration')

        if USERS.checkUser_param('name', request.form.get('name')):
            session['errors-registration'] = 'Это имя занято!'
            return redirect('/registration')

        if USERS.checkUser_param('email', request.form.get('email')):
            session['errors-registration'] = 'Этот email занят!'
            return redirect('/registration')

        user = {'email': request.form.get('email'),
                'name': request.form.get('name'),
                'password': request.form.get('password1'),
                'followers': '',
                'avatar': 'default',
                'phone': ''}

        USERS.registerUser(user)
        CREATE_DIRECTORY(USERS.getUser('email', user['email'])[0])
        return redirect('/login')

@app.route('/check-login', methods=['POST'])
def check_login():
    if request.method == 'POST':
        if not USERS.checkUser_param('email', request.form.get('email')):
            session['errors-login'] = 'Неверный email!'
            return redirect('/login')

        if USERS.checkUser_password(request.form.get('email'), request.form.get('password')):
            session['errors-login'] = 'Неверный пароль!'
            return redirect('/login')


        session['email'] = USERS.getUser_param(request.form.get('email'), '', 'email')
        session['login'] = USERS.getUser_param(request.form.get('email'), '', 'name')
        return redirect('/home')
    else:
        return redirect('/defalut-change/login')

@app.route('/exit')
def exit():
    session.clear()
    return redirect('/')

@app.route('/home')
def home():
    for change in DEFAULT_CHANGE:
        if change not in session:
            return redirect('/defalut-change/home')
    fightsOnline = FIGHTS.getFightsOnline()
    if session['email']:
        me = USERS.getUser('email', session['email'])
    elif session['phone']:
        me = USERS.getUser('email', session['phone'])
    else:
        me = ['', '', None]
    return render_template('profile.html', company_name = companyName, fights = fightsOnline, user = me[2], page_type = 'Главная', description_room = DESCRIPTION_ROOM, chatId = 5473)

@app.route('/reestablish-email')
def reestablish_email():
    email = session['email']
    return render_template('reestablish_email.html', page_type = 'Восстановление пароля', company_name = companyName, email = email, error = session['errors-reestablish-get-info'])

@app.route('/reestablish-phone')
def reestablish_phone():
    phone = USERS.getUser_param(session['email'], '', 'phone')
    return render_template('reestablish_phone.html', page_type = 'Восстановление пароля', company_name = companyName, phone = phone, error = session['errors-reestablish-get-info'])

@app.route('/reestablish-get-info')
def reestablish_get_info():
    return render_template('reestablish_get_info.html', company_name = companyName, page_type = 'Восстановление пароля')

@app.route('/check-reestablish-get-info', methods=['POST'])
def check_reestablish_get_info():
    if request.method == 'POST':
        if request.form.get('email'):
            if USERS.checkUser_param('email', request.form.get('email')):
                session['email'] = USERS.getUser_param(request.form.get('email'), '', 'email')
                return redirect('/reestablish-email')
            else:
                session['errors-get-info'] = 'Неверный email!'
                return redirect('/reestablish-get-info')
        elif request.form.get('phone'):
            if USERS.checkUser_param('phone', request.form.get('phone')):
                session['phone'] = request.form.get('phone')
                return redirect('/reestablish-phone')
            else:
                session['errors-get-info'] = 'Неверный номер телефона'
                return redirect('/reestablish-get-info')
        else:
            session['errors-get-info'] = 'Введите данные!'
            return redirect('/reestablish-get-info')
    else:
        return redirect('/reestablish-get-info')

@app.route('/check-code', methods=['POST'])
def check_code():
    if request.method == 'POST':
        if 'email' in session:
            if str(request.form.get('ver-code')) == str(USERS.getUser_param(session['email'], '', 'ver_code')):
                return redirect('/edit-password')
            else:
                USERS.updateVerCode(session['email'], 'email')
                session['errors-reestablish-get-info'] = 'Неверный код! Мы выслали вам новый!'
                return redirect('/reestablish-email')
        elif 'phone' in session:
            if str(request.method.get('ver-code')) == str(USERS.getUser_param(session['phone'], '', 'ver_code')):
                return redirect('/edit-password')
            else:
                USERS.updateVerCode(session['email'], 'email')
                session['errors-reestablish-get-info'] = 'Неверный код! Мы выслали вам новый!'
                return redirect('/reestablish-phone')
        else:
            USERS.updateVerCode(session['email'], 'email')
            session['errors-reestablish-get-info'] = 'Неверный код! Мы выслали вам новый!'
            return redirect('/reestablish-get-info')
    else:
        USERS.updateVerCode(session['email'], 'email')
        return redirect('/reestablish-get-info')

@app.route('/edit-password')
def edit_password():
    return render_template('edit_password.html', company_name = companyName, page_type = 'Восстановление пароля', error = session['errors-edit-pass'])

@app.route('/check-new-password', methods=['POST'])
def check_new_password():
    if request.method == 'POST':
        if request.form.get('password1') == request.form.get('password2'):
            if 'email' in session and session['email']:
                USERS.edit('email', session['email'], 'password', request.form.get('password1'))
                return redirect('/')
            elif 'phone' in session and session['phone']:
                USERS.edit('phone', session['phone'], 'password', request.form.get('password1'))
                return redirect('/')
            else:
                return redirect('/reestablish-get-info')
    else:
        return redirect('/')

@app.route('/create-room')
def create_room():
    fightsOnline = FIGHTS.getFightsOnline()
    return render_template('create_room.html', company_name = companyName, page_type = 'Создание комнаты', user = session['email'], errors = session['errors-create-room'], fights = fightsOnline)

@app.route('/create-room-bd', methods = ['GET', 'POST'])
def create_room_bd():
    if request.method == 'POST':
        if 'email' in session:
            userId = USERS.getUser('email', session['email'])[0]
        elif 'phone' in session:
            userId = USERS.getUser('phone', session['phone'])[0]
        if len(request.form.get('name')) == 0:
            session['errors-create-room'] = 'Название не может быть пустым!'
            return redirect('/create-room')
        enemy = request.form.get('enemy')
        try:
            enemyrl = USERS.getUser('name', enemy)
        except:
            enemyrl = ''
        if not enemyrl:
            session['errors-create-room'] = 'Нет пользователя с таким никнеймом'
            return redirect('/create-room')
        fight = {'name': request.form.get('name'),
                 'author': str(userId),
                 'description': request.form.get('description'),
                 'image': '',
                 'password': request.form.get('password'),
                 'enemy': request.form.get('enemy'),
                 'status': 1,
                 'spectators': ''}
        id = FIGHTS.createFight(fight)
        file = request.files.get('file')
        if file:
            filename = secure_filename(file.filename)
            if filename.split('.')[-1] not in ALLOWED_EXTENSIONS or not filename or not(filename.split('.')[0]):
                session['errors-create-room'] = 'Вы загрузили файл неизвестного формата! Загрузите файл .jpg/.jpg/.png'
                return redirect('/create-room')
            print(filename)
            CREATE_DIRECTORY(id)
            app.config['UPLOAD_FOLDER'] = GET_PATH_TO_PHOTO(id)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            session['errors-create-room'] = 'Загрузите аватарку!'
            return redirect('/create-room')
        FIGHTS.addImage(filename, id)
        CHATS.createChat(id)

        return redirect(f'/room/{id}')
    else:
        return redirect('/create-room')

@app.route('/room/<room_id>')
def room(room_id):
    if 'email' not in session or 'phone' not in session:
        return redirect(f'/defalut-change/room/{room_id}')
    fight = FIGHTS.getFight(int(room_id))
    print(fight)
    author = USERS.getUser('id', fight[1])
    enemy = USERS.getUser('name', fight[6])
    chatId = CHATS.getChatByFightId(room_id)[0]
    fightsOnline = FIGHTS.getFightsOnline()
    if session['email']:
        me = USERS.getUser('email', session['email'])
    elif session['phone']:
        me = USERS.getUser('email', session['phone'])
    else:
        me = ['', '', None]
    return render_template('room.html', fight = fight, myId = me[0], fileType = fight[4].split('.')[-1], author = author, enemy = enemy, user=me[2], chatId = chatId, fights = fightsOnline, statusRoom = fight[9])

@app.route('/close-fight/<fightId>')
def closeFight(fightId):
    if 'email' in session:
        if session['email']:
            author = USERS.getUser('email', session['email'])[0]
            fightAuthor = FIGHTS.getFight(fightId)[1]
            if int(author) == int(fightAuthor):
                FIGHTS.closeFight(fightId)
                return redirect(f'/room/{fightId}')
            else:
                return redirect(f'/room/{fightId}')
        else:
            return redirect(f'/room/{fightId}')
    elif 'phone' in session:
        if session['phone']:
            author = USERS.getUser('phone', session['phone'])[0]
            fightAuthor = FIGHTS.getFight(fightId)[1]
            if int(author) == int(fightAuthor):
                FIGHTS.closeFight(fightId)
                return redirect(f'/room/{fightId}')
            else:
                return redirect(f'/room/{fightId}')
        else:
            return redirect(f'/room/{fightId}')
    else:
        return redirect(f'/room/{fightId}')

if __name__ == '__main__':
    print('Started')
    socketio.run(app,port=9091)
