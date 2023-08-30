from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

browser = webdriver.Chrome()
browser.get('https://address.dawul.co.kr/index.php')

elem = browser.find_element(By.CLASS_NAME ,'juso')
elem.send_keys('고미술로 71')
elem.send_keys(Keys.RETURN)

wait = WebDriverWait(browser, 10)

elem = wait.until(EC.presence_of_element_located((By.ID, 'insert_data_5')))
text = elem.get_property('textContent')
print(text)