<div align="center">
  
# Zoom Clone Coding
**줌 클론 코딩**

# 🛠 Tech Stack
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=Pug&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">


# 👀 Dev log
  
**(1) 2021-08-05**
![image](https://user-images.githubusercontent.com/47571973/128314083-6d86470a-ba94-4317-960a-1c1668aec1e8.png)
Web socket에 연결하고 서로 다른 두 유저(naver whale, chrome)가 상호작용하는 것이 console에 찍히게 한다.

![image](https://user-images.githubusercontent.com/47571973/128314217-34e467e3-a507-4dd6-8f4c-be33ca3042bf.png)
Whale에서 ㅎㅇ라고 메세지를 보내면, (오른쪽 창)
  
![image](https://user-images.githubusercontent.com/47571973/128314317-58cc3d56-82ac-462f-b0d9-08420a42a0a2.png)
크롬과 웨일에서 모두 **실시간으로** 메세지를 볼 수 있도록 했다. 즉, 한 명이 보낸 메세지를 양쪽에서 볼 수 있는 것이다.
  
  ![image](https://user-images.githubusercontent.com/47571973/128314614-a8542ae2-63ab-46b2-9075-aba1d8bb8051.png)
크롬에서 메세지를 작성해서 보내도
  
  ![image](https://user-images.githubusercontent.com/47571973/128314686-63b10855-942e-486a-8da9-a821a5fdc459.png)
양쪽에 다 뜬다. 하지만, console에서 보는 것은 불편하므로 front-end에 대화 내용이 뜨도록 했다.
  
  ![image](https://user-images.githubusercontent.com/47571973/128315270-e43cebcd-4229-472a-82c6-a94a83fa2dec.png)
whale 브라우저에서 메세지를 보내고 엔터를 치면, 
  
  ![image](https://user-images.githubusercontent.com/47571973/128315337-608d2462-031a-42e8-b676-37bec9be6d15.png)
보다시피 chrome과 whale 모두에게 **실시간으로** 뜨도록 했다. 하지만, 이렇게되면 누가 누군지 구분 안 되므로 닉네임을 받고, 누가 메세지를 입력했는지 알 수 있도록 한다.
  
  ![image](https://user-images.githubusercontent.com/47571973/128333342-837c1963-18da-4cd2-92bb-de6f68e9d410.png)
크롬 브라우저는 크롬으로 닉네임을 정하고, 웨일 브라우저는 닉네임을 정하지 않는다. 그리고, 메세지 보내기를 해보면 다음과 같이 된다.
  
  ![image](https://user-images.githubusercontent.com/47571973/128333433-335ca8d5-2257-4f95-b55a-9758380e25a5.png)
기본값은 익명(Anon)이므로 웨일에서 보낸 메세지는 Anon이 되고, 크롬에서 보낸 메세지의 발신자는 크롬이 된다.
</div>
