from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random 
from config.data import nubmer, nubmerREGION, account_channel
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException        
from login import login
from defultXPATH import getInput, getMeChat, getGlobalChat, getGroupProfile, getGroupScrollBlock, getGroupSubscribe

class InstagramBot():

    def __init__(self, nubmer, nubmerREGION):

        self.nubmer = nubmer
        self.nubmerREGION = nubmerREGION
        options = Options()
        options.add_argument(f"user-data-dir=/coockie/newuser1")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.browser = webdriver.Chrome("./chromedriver/chromedriver.exe", options=options)

    # метод для закрытия браузера
    def close_browser(self):

        self.browser.close()
        self.browser.quit()

    def check_exists_by_xpath(self, xpath):
        browser = self.browser 

        try:
            browser.find_element(By.XPATH, xpath)
        except NoSuchElementException:
            return False
        return True
        
    def check_exists_by_tag_name(self, tag):
        browser = self.browser 

        try:
            browser.find_element(By.TAG_NAME, tag)
        except NoSuchElementException:
            return False
        return True

    def check_exists_by_class_name(self, className):
        browser = self.browser 

        try:
            browser.find_element(By.CLASS_NAME, className)
        except NoSuchElementException:
            return False
        return True

    def get_new_account(self, account_channel):
        browser = self.browser 

        browser.find_element(By.CLASS_NAME, getInput).send_keys(account_channel)

        time.sleep(6)

        if(self.check_exists_by_xpath(getGlobalChat)):
            browser.find_element(By.XPATH, getGlobalChat).click()
        elif(self.check_exists_by_xpath(getMeChat)):
            browser.find_element(By.XPATH, getMeChat).click()
        else:
            print("Группа не была найдена в телеграмм")
            return

        time.sleep(5)

        browser.find_element(By.CLASS_NAME, getGroupProfile).click()

        time.sleep(5)


        for element in browser.find_elements(By.XPATH, getGroupSubscribe):
            if element.get_attribute("class") == "peer-title":
                browser.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', browser.find_element(By.XPATH, getGroupScrollBlock))
                print(element.text)
                with open("./info/channel_sub.txt", "a", encoding="utf-8") as file:
                    file.write(f"{element.text} \n")
                    file.close()

                    





my_bot = InstagramBot(nubmer, nubmerREGION)
login(browser=my_bot.browser)
my_bot.get_new_account(account_channel)
my_bot.close_browser()