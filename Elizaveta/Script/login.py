
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from defultXPATH import loginNAME, passwordNAME


def login(browser, username, password):
    browser.get("https://vk.com/")
    time.sleep(5)

    browser.find_element(By.CLASS_NAME, loginNAME).send_keys(username)
    browser.find_element(By.CLASS_NAME, loginNAME).send_keys(Keys.ENTER)
    
    time.sleep(5)

    browser.find_element(By.NAME, passwordNAME).send_keys(password)
    browser.find_element(By.NAME, passwordNAME).send_keys(Keys.ENTER)

    time.sleep(10)
