from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random
from random import sample, randint, choice
from config.data import user_account_counter, nubmer, nubmerREGION, users_settings_dict, user_set_settings
from string import ascii_lowercase, digits
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from login import login
from defultXPATH import getSettingsMenu, getSettingsPopup, getSettingsPopupOpen, getSettingsName, getSettingsLastName, getSettingsBio, getSettingsUsername, getSaveSettings


class InstagramBot():

    def __init__(self, Newnubmers):

        options = Options()
        # options.add_argument(f"user-agent={ua.random}")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument(f"user-data-dir=/coockie/newuser{Newnubmers}")
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

    def remove_settings(self, users_settings_dict, user_set_settings, Unubmer):
        browser = self.browser

        name = users_settings_dict[f"user{Unubmer}"]["name"]
        lastName = users_settings_dict[f"user{Unubmer}"]["lastName"]
        Bio = users_settings_dict[f"user{Unubmer}"]["Bio"]
        username = users_settings_dict[f"user{Unubmer}"]["username"]

        browser.find_element(By.CLASS_NAME, getSettingsMenu).click()
        time.sleep(6)
        browser.find_element(By.CLASS_NAME, getSettingsPopup).click()
        time.sleep(6)
        browser.find_element(By.CLASS_NAME, getSettingsPopupOpen).click()
        time.sleep(6)
        browser.find_element(By.XPATH, getSettingsName).clear()
        browser.find_element(By.XPATH, getSettingsName).send_keys(name)
        time.sleep(2)
        browser.find_element(By.XPATH, getSettingsLastName).clear()
        browser.find_element(By.XPATH, getSettingsLastName).send_keys(lastName)
        time.sleep(2)
        browser.find_element(By.XPATH, getSettingsBio).clear()
        browser.find_element(By.XPATH, getSettingsBio).send_keys(Bio)
        time.sleep(2)
        browser.find_element(By.XPATH, getSettingsUsername).clear()
        browser.find_element(By.XPATH, getSettingsUsername).send_keys(username)
        time.sleep(2)

        if self.check_exists_by_class_name(getSaveSettings):
            for element in browser.find_elements(By.CLASS_NAME, getSaveSettings):
                if element.get_attribute("class") == "btn-circle btn-corner z-depth-1 tgico-check rp is-visible":
                    print(True)
                    browser.find_element(By.CLASS_NAME, getSaveSettings).click()

        browser.refresh()
        time.sleep(4)

for key, value in user_account_counter.items():
    user = value
    for item, itemV in user.items():
        Newnubmers = itemV
        Unubmer = itemV
        my_bot = InstagramBot(Newnubmers) 
        login(browser=my_bot.browser)
        my_bot.remove_settings(users_settings_dict, user_set_settings, Unubmer)
        my_bot.close_browser()

