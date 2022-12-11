from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from config.data import account_group
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from login import login
from defultXPATH import searchInput, mediaGroups, mediaGroup, captcha, infoList, post, postTitle, postNext, postCommentNick, postCommentText
from selenium.common.exceptions import StaleElementReferenceException

class VKSCRIPT():

    def __init__(self):

        options = Options()    
        options.add_argument("window-size=max")
        self.browser = webdriver.Chrome("./chromedriver/chromedriver.exe", options=options)

    def close_browser(self):

        self.browser.close()
        self.browser.quit()

    def check_xpath_exists(self, url):

        browser = self.browser
        try:
            browser.find_element(By.XPATH,url)
            exist = True
        except NoSuchElementException:
            exist = False
        return exist


    def check_css_exists(self, css):

        browser = self.browser
        try:
            browser.find_element(By.CSS_SELECTOR,css)
            exist = True
        except NoSuchElementException:
            exist = False
        return exist


    def close_captcha(self):
        browser = self.browser

        if self.check_css_exists(captcha):
            browser.find_element(By.CSS_SELECTOR, captcha).click()
        else:
            print(False)

        time.sleep(2)



    def get_messages(self, groups, groupPage):
        browser = self.browser 
        for group in groups:
            self.close_captcha()
            browser.get(f"https://vk.com/{group}?from=quick_search")
            time.sleep(7)
            self.close_captcha()

            i = 0

            while i < groupPage:
                browser.execute_script("window.scrollTo(0,document.body.clientHeight);")

                i+=1


            for posts in browser.find_elements(By.XPATH, infoList):
                
                if posts.get_attribute("class") == postNext:
                    browser.find_element(By.CLASS_NAME, postNext).click()




        


for user, user_data in account_group.items():
    my_bot = VKSCRIPT()

    mail = user_data['mail']
    password = user_data['pass']
    groups = user_data['group']
    groupPage = user_data['groupPage']

    print(mail, password)

    login(my_bot.browser, mail, password)
    my_bot.get_messages(groups, groupPage)
    my_bot.close_browser()





