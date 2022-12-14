filesArr = ["./settings/" + "sendMessageInChatText.txt","./settings/" + "sendMessageInGroupText.txt","./settings/" + "setUserParseCounter.txt"]


with open(filesArr[0], "r") as file:
    # chat info
    chatTextInfo = file.readlines()


with open(filesArr[1], "r") as file:
    # group info
    groupTextInfo = file.readlines()



# Сюда вводим сообщение которое хотим разослать.
user_send_message_direct_text = chatTextInfo
# Сюда вводим сообщение которое хотим разослать.

user_send_message_media_group_text = groupTextInfo

# Для парсинга аудитории если строки пустые он запросит данные в консоле
nubmer = "6205712342"
nubmerREGION = "91"

# Сколько пользователей нужно спарсить

account_parse = 501   
account_channel = "https://t.me/js_by_vladilen_chat"

# Пользователи которым нужно отписать сообщение

user_send_message_direct = {
    'users': ["@Solevooii", "@YHTYfaithe"]
}

# Группы которым нужно отписать сообщение
user_send_message_media_group = {
    'users': ["grupaamongus"]
}

# Измененые данные

user_set_settings = 1


users_settings_dict = {
    'user1': {
        'name': 'asdasd',
        'lastName': 'adsasd',
        'Bio': 'sdasdaadasd?',
        'username': "sdasdadsaasdadsads"
    },
    'user2': {
        'name': 'Екатерина',
        'lastName': 'Горячева',
        'Bio': 'Ассистент Екатерины Горячевой',
        'username': "katrin_assistant"
    }
}
 
user_account_counter = {
    "user1": {
        "counter": 1
    },
    "user2": {
        "counter": 2
    },
    "user3": {
        "counter": 3
    },
    "user4": {
        "counter": 4
    },
    "user5": {
        "counter": 5
    },
    "user6": {
        "counter": 6
    },
    "user7": {
        "counter": 7
    },
    "user8": {
        "counter": 8
    },
    "user9": {
        "counter": 9
    },
    "user10": {
        "counter": 10
    },
    "user11": {
        "counter": 11
    },
    "user12": {
        "counter": 12
    },
    "user13": {
        "counter": 13
    },
    "user14": {
        "counter": 14
    },
    "user15": {
        "counter": 15
    },
    "user16": {
        "counter": 16
    },
    "user17": {
        "counter": 17
    },
    "user18": {
        "counter": 18
    },
    "user19": {
        "counter": 19
    },
    "user20": {
        "counter": 20
    },
    "user21": {
        "counter": 21
    },
    "user22": {
        "counter": 22
    },
    "user23": {
        "counter": 23
    },
    "user24": {
        "counter": 24
    },
    "user25": {
        "counter": 25
    },
    "user26": {
        "counter": 26
    },
    "user27": {
        "counter": 27
    },
    "user28": {
        "counter": 28
    },
    "user29": {
        "counter": 29
    },
    "user30": {
        "counter": 30
    },  
    "user31": {
        "counter": 31
    },
    "user32": {
        "counter": 32
    },
    "user33": {
        "counter": 33
    },
    "user34": {
        "counter": 34
    },
    "user35": {
        "counter": 35
    },
    "user36": {
        "counter": 36
    }   
}