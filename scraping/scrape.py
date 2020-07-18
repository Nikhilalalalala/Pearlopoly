from bs4 import BeautifulSoup
import requests
import pandas as pd
import pickle


''' objective: scrape educational finance tips for students'''

LINK='https://students.ubc.ca/ubclife/21-money-saving-tips-tricks'

r = requests.get(LINK)
html_file = r.text
html_soup = BeautifulSoup(html_file, 'html.parser')
prettified_html_soup = html_soup.prettify()

# print(prettified_html_soup)

all_paragraph_text = html_soup.find_all('p')

# print(all_paragraph_text)
list_of_paragraph = []

for part in all_paragraph_text:
    list_of_paragraph.append(part.text)

# print(list_of_paragraph)

first_tip = 'Making a monthly budget is the first step towards staying on top of your finances. Budgeting gives you a big-picture view of your money, so you can make informed spending and saving decisions.'
def find_first_tip(tip):
    for index, each in enumerate(list_of_paragraph):
        if (tip in each):
            return index
        else:
            continue

index_of_first_tip = find_first_tip(first_tip)
# print(index_of_first_tip)
# 6

actual_content = list_of_paragraph[6:]
add_new_line = lambda a: a + '\n'
for ind, each in enumerate(actual_content):
    actual_content[ind] = each + '\n'
with open('store.txt', 'wb') as file:
    pickle.dump(actual_content, file)