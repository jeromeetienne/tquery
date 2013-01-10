require "selenium-webdriver"

driver	= Selenium::WebDriver.for :firefox

driver.navigate.to "http://127.0.0.1:8000/plugins/minecraft/examples/flyer.html"
#driver.navigate.to "http://beloola.com"

sleep 1

element = driver.find_element('body')
element.send_keys "Hello WebDriver!"

sleep 10

#driver.save_screenshot('/tmp/screenshot.png')

driver.quit
