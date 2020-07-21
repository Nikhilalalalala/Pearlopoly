from bs4 import BeautifulSoup
import requests
import pandas as pd
import pickle
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import re

''' objective: scrape educational finance tips for students'''

# LINK='https://students.ubc.ca/ubclife/21-money-saving-tips-tricks'
LINK = 'https://www.feelgoodcontacts.com/blog/top-10-money-saving-tips-for-students'

r = requests.get(LINK)
html_file = r.text
html_soup = BeautifulSoup(html_file, 'html.parser')
prettified_html_soup = html_soup.prettify()

# print(prettified_html_soup)

all_paragraph_text = html_soup.find_all('p')

# print(all_paragraph_text)

list_of_paragraph = []

# for first link
# for part in all_paragraph_text:
#     text_to_include = part.text.strip()
#     # print(text_to_include, '\n')
#     list_of_paragraph.append(part.text)

# print(list_of_paragraph)

# first_tip = 'Making a monthly budget is the first step towards staying on top of your finances. Budgeting gives you a big-picture view of your money, so you can make informed spending and saving decisions.'
# def find_first_tip(tip):
#     for index, each in enumerate(list_of_paragraph):
#         if (tip in each):
#             return index
#         else:
#             continue

# index_of_first_tip = find_first_tip(first_tip)
# # print(index_of_first_tip)
# # 6
# actual_content = list_of_paragraph[6:]

# for second link
for part in all_paragraph_text:
    text_to_include = part.text.strip()
    if (len(text_to_include) > 0):
        if (re.match('^[A-Z]', text_to_include[0])):
            list_of_paragraph.append(text_to_include)

actual_content = list_of_paragraph[5:-3]
print(actual_content)

# # write data in a file. 
# with open("store.txt","w") as file:
#     file.writelines(actual_content) 

# connecting to firebase
cred = credentials.Certificate("pearlopoly-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

education_ref = db.collection('education')

for ind, each in enumerate(actual_content):
    education_ref.add({
        'tip': each,
    })
    