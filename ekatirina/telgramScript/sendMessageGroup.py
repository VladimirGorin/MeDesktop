
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random
from config.data import user_account_counter, user_send_message_media_group, user_send_message_media_group_text, nubmer, nubmerREGION, account_parse, account_channel
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from login import login
from defultXPATH import getInput, getMeChat, getGlobalChat, getJoinGroup, getInputMessage, getSendMessageButton


class InstagramBot():

    def __init__(self, user_send_message_direct_text, user_send_message_direct, Newnubmers):

        self.text = user_send_message_direct_text
        self.user = user_send_message_direct
        options = Options()
        # options.add_argument(f"user-agent={ua.random}")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument(f"user-data-dir=/coockie/newuser{Newnubmers}")
        options = options
        self.browser = webdriver.Chrome(
            "./chromedriver/chromedriver.exe", options=options)

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

    def send_message(self, user_send_message_media_group, user_send_message_media_group_text):
        browser = self.browser

        for key, user_data in user_send_message_media_group.items():
            for user in user_data:
                if self.check_exists_by_class_name(getInput):
                    browser.find_element(By.CLASS_NAME, getInput).send_keys(user)


                    time.sleep(6)

                    if(self.check_exists_by_xpath(getGlobalChat)):
                        browser.find_element(By.XPATH, getGlobalChat).click()
                    elif(self.check_exists_by_xpath(getMeChat)):
                        browser.find_element(By.XPATH, getMeChat).click()
                    else:
                        print("Группа не была найдена в телеграмм")
                        return

                    time.sleep(5)




                    if self.check_exists_by_class_name(getJoinGroup):
                        print(True)
                        # browser.find_element(By.CLASS_NAME, getJoinGroup).click()
                        for element in browser.find_elements(By.CLASS_NAME, getJoinGroup):
                            if element.get_attribute("class") == "btn-primary btn-color-primary chat-join rp":
                                browser.find_element(By.CLASS_NAME, getJoinGroup).click()

                    time.sleep(5)

                    browser.find_element(By.CLASS_NAME, getInputMessage).send_keys(user_send_message_media_group_text)
                    
                    time.sleep(5)

                    browser.find_element(By.CLASS_NAME, getSendMessageButton).click()
                    

                    with open("./info/send_message_the_group.txt", "a", encoding="utf-8") as file:
                        file.write(f"Сообщение было отправлено! > {user} \n")
                        file.close()
                        
                    time.sleep(5)

                else:
                    print(
                        f"Этот аккуант был пропущен по причине - nothing coockie {Newnubmers}")
                    return


for key, value in user_account_counter.items():
    user = value
    for item, itemV in user.items():
        Newnubmers = itemV
        my_bot = InstagramBot(user_send_message_media_group,
                              user_send_message_media_group_text, Newnubmers)
        login(browser=my_bot.browser)
        my_bot.send_message(user_send_message_media_group,
                            user_send_message_media_group_text)
        my_bot.close_browser()
