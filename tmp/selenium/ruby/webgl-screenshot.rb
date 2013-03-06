require "selenium-webdriver"

driver	= Selenium::WebDriver.for :chrome

#driver.navigate.to "http://127.0.0.1:8000/tmp/selenium/test.html"

#driver.navigate.to "http://127.0.0.1:8000/plugins/minecraft/examples/flyer.html"
driver.navigate.to "http://beloola.com"

sleep 1

driver.save_screenshot('/tmp/screenshot.png')

driver.quit
