

https://github.com/user-attachments/assets/6443b9d1-aa5d-4612-9966-725214dc738e

# how to start
1) first clone the repo using git clone https://github.com/gunasekharsai/mern-chat-app.git

2) change mongo url in .env in backned folder to you moongodb connection url

3) cd backend in terminal run this command npm run dev
4) cd frontend in other terminal run npm run dev 


# feautures added
1) login/signup stored all users details in moongodb
2) added search functionality for users to chat (name/email) (topleft)
3) added userdetails and logout functionality(top right)
4) users can send messagesin realtime thanks to socket.io
5) added latestmessages field under the chatname
6) users can delete messages (delete for all functionality)
