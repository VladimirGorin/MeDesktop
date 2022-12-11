
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random 
from random import sample, randint, choice
from string import ascii_lowercase, digits
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

class InstagramBot():

    def __init__(self, accountNum):

        options = Options()

        options.add_argument(f"user-data-dir=/coockie/newuser{accountNum}")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.browser = webdriver.Chrome("./chromedriver/chromedriver.exe", options=options)

    # метод для закрытия браузера
    def close_browser(self):

        self.browser.close()
        self.browser.quit()

    # метод логина
    def login(self):
        browser = self.browser

        browser.get('https://web.telegram.org/k/')

        getTelephone = input("Введите телефон :")
        # input
        browser.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[2]/div/div[3]/div[2]/div[1]").send_keys(getTelephone)
        browser.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[2]/div/div[3]/button[1]").click()



        time.sleep(3)

        getCode = input('Введите код:')

        getInputCode = browser.find_element(By.TAG_NAME, "input").send_keys(getCode)
        
        # passwordInput = input("Введите пароль: ")
        # getPasswordXPATH = "/html/body/div[1]/div/div[2]/div[4]/div/div[2]/div/input[2]"
        # getPassword = browser.find_element(By.XPATH, getPasswordXPATH)
        # getPassword.send_keys(passwordInput)

        browser.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[4]/div/div[2]/button").click()


        time.sleep(3)


        

accountNum = input("Введите число аккаунта: ")
my_bot = InstagramBot(accountNum)
my_bot.login()
my_bot.close_browser()