from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from string import ascii_lowercase, digits
from config.data import create_account
from random import sample, randint, choice, random
from config.XPATH import emailElement,\
emailElementPrefix, emailElementOpen, \
emailElementMessage, instagramElementEmail,\
instagramElementName


class InstagramBot():

    def __init__(self):
        options = Options()
        self.browser = webdriver.Chrome("./chromedriver/chromedriver.exe", options=options)

    def close_browser(self):

        self.browser.close()
        self.browser.quit()

    def login(self):

        browser = self.browser
        browser.get('https://www.guerrillamail.com/inbox')

    def get_new_account(self):
        browser = self.browser 
    
        i = 0
        while i < create_account:
            
            get_me_email = browser.find_element(By.XPATH, emailElement)
            get_me_email_prefix = browser.find_element(By.XPATH, emailElementPrefix)

            get_email = f"{get_me_email.text}@{get_me_email_prefix.text}"

            browser.find_element(By.XPATH, emailElementOpen).click()
        
            browser.execute_script(f'window.open("https://www.instagram.com/accounts/emailsignup/", "_blank");')
            browser.switch_to.window(browser.window_handles[1])

            print(get_email)

            time.sleep(15)
            browser.find_element(By.NAME, instagramElementEmail).send_keys(get_email)
            time.sleep(3)
            word = ''.join(sample(ascii_lowercase, randint(6, 17))).capitalize()
            browser.find_element(By.NAME, instagramElementName).send_keys(word)
            time.sleep(3)

            inst_button_create_userName = browser.find_element(By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[5]/div/div/div/button/span").click()

            time.sleep(3)

            generate_pass = ''.join([choice(
                ascii_lowercase + digits)
                for n in range(randint(8, 22))
            ])
            instagram_element_password = browser.find_element(By.NAME, "password")
            instagram_element_password.send_keys(generate_pass)
            instagram_element_button = browser.find_element(By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[7]/div/button")
            instagram_element_button.click()
            time.sleep(5)

            random_month = random.randint(1, 12)
            options_inst_month = browser.find_element(By.XPATH, f'/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[1]/select/option[{random_month}]')
            options_inst_month.click()

            random_date = random.randint(1, 30)
            options_inst_date_XPATH = f'/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[2]/select/option[{random_date}]'
            options_inst_date = browser.find_element(By.XPATH, options_inst_date_XPATH)
            options_inst_date.click()
        
            random_year = random.randint(50, 75)
            options_inst_year_XPATH = f'/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[3]/select/option[{random_year}]'
            options_inst_year = browser.find_element(By.XPATH, options_inst_year_XPATH)
            options_inst_year.click()   
        
            time.sleep(2)

            options_inst_button_XPATH = "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div/div[6]/button"
            options_inst_button = browser.find_element(By.XPATH, options_inst_button_XPATH)
            options_inst_button.click() 

            time.sleep(3)
            browser.switch_to.window(browser.window_handles[0])
            browser.get('https://www.guerrillamail.com/inbox')
            time.sleep(40)
            open_email_buttonXPATH = "/html/body/div[4]/div/div[3]/div[2]/form/table/tbody/tr[1]"
            open_email_button = browser.find_element(By.XPATH, open_email_buttonXPATH)
            open_email_button.click()
            time.sleep(1)
            email_get_code_XPATH = "/html/body/div[4]/div/div[3]/div[2]/div/div/div[2]/div/table/tbody/tr[1]/td/table/tbody/tr[4]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]"
            email_get_code = browser.find_element(By.XPATH, email_get_code_XPATH)
            code_date = email_get_code.text
            print(code_date)
            browser.switch_to.window(browser.window_handles[1])
            time.sleep(2)        
            inst_element_code = browser.find_element(By.NAME, "email_confirmation_code")    
            inst_element_code.send_keys(code_date)

            inst_element_button = browser.find_element(By.XPATH, "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div/div[2]/button")
            inst_element_button.click()

            print(f"?????????????? (Email {get_email}, ?????? {word}, ???????????? {generate_pass}) ")
            user = f"'login': {word}, 'password': {generate_pass}"
            with open("./info/new_instagram_account.txt", "a") as file:
                file.write(f"?????????? user!({user}) \n")
                file.close()            

            
            time.sleep(30)        
            # browser.close()
            # time.sleep(3750)

            i = i + 1





my_bot = InstagramBot()
my_bot.login()
my_bot.get_new_account()
my_bot.close_browser()