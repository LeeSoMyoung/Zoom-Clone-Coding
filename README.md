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
  
  (2) 2021-08-06
  ```
 npm install socket.io
  ```
  socket.io를 설치한다. 설치 후, http://localhost:3000/socket.io/socket.io.js 를 실행하면
  ![image](https://user-images.githubusercontent.com/47571973/128518050-cf57d4d3-492a-4efe-809f-94c1d7e518f6.png)

  다음과 같이 된다. socket.io를 사용하여 실시간으로 업데이트 되게 할 예정이다.
  
  다만, 이전에 만들었던것들은 채팅창이고, 채팅창이 있는 회의실을 만들어야 한다. 따라서, 다음과 같이 pug를 수정해주었다.
  ![image](https://user-images.githubusercontent.com/47571973/128521189-42fc19ac-c8c5-40ff-94d0-afa5765bf2a5.png)

  그리고, socket.io에서 콜백함수와 회의실 이름을 받아오도록 하였는데, socket.io에 대한 이해가 부족하여 나머지는 더 공부 후 만들 예정이다.
  
  
  (3) 2021-08-07
  
  회의실에 입장한 후, 회의실 내부 채팅창에서 채팅을 할 수 있어야한다. 즉, 화면의 순서는 회의실 입장 -> 채팅이 되어야 한다.
  ![image](https://user-images.githubusercontent.com/47571973/128590740-82729e89-83d9-4131-8a56-1794ca1fc7b1.png)

  가장 먼저 서버를 실행하면 다음과 같이 입장할 회의실을 입력하는 화면이 뜬다. 그 후, 입장할 회의실을 입력하면 
  ![image](https://user-images.githubusercontent.com/47571973/128590759-9048b039-2117-4574-b421-66115d543c38.png)

  다음과 같이 채팅창이 뜨도록 햇다. 또한, 회의실에 다른 사람이 참여하면, 참여했다는 문구가 뜨도록 한다. 이때, 회의실 참여 후, 자신의 닉네임을 바꿀 수 있도록 한다.   
  ![image](https://user-images.githubusercontent.com/47571973/128602418-940100ed-5453-4f14-a286-c562f6573018.png)

    크롬 브라우저의 창은 크롬으로 닉네임을 설정하고, 웨일 브라우저의 닉네임은 웨일로 설정하고 채팅을 쳐보았다.
![image](https://user-images.githubusercontent.com/47571973/128602456-aa077285-f086-4730-88da-768a44185681.png)
![image](https://user-images.githubusercontent.com/47571973/128602458-96e4f5dc-71d9-4d99-a174-cc607fc4d675.png)
![image](https://user-images.githubusercontent.com/47571973/128602478-0a821e43-9a91-4b21-9324-95b95879620a.png)

  그리고, 다른 유저가 회의실을 나갈 때도 그 유저가 나갔다는 표시가 되도록 했다.
  ![image](https://user-images.githubusercontent.com/47571973/128602493-763a63f4-545b-443c-9d95-1978ff1fa23e.png)

  (4) 2021-08-08
  
  회의실 생성 뿐만 아니라, 이미 생성되어 있는 방도 표시할 수 있도록 하였다.
  ![image](https://user-images.githubusercontent.com/47571973/128634113-3e92008e-d5e5-4621-8a8b-9b2553e5780b.png)

  크롬과 웨일 브라우저가 각각 있고, 웨일에서 '테스트'라는 회의실을 만들면 크롬에서 이미 존재하는 회의실 리스트에 '테스트' 회의실이 뜬다.
  ![image](https://user-images.githubusercontent.com/47571973/128634143-fb87fb3f-155e-41cf-a24c-8126521dac26.png)

  그리고, 회의실 내부 인원 수 역시 뜰 수 있도록 했다. 이를 테스트하기 위해 크롬, 웨일을 사용했다.
  ![image](https://user-images.githubusercontent.com/47571973/128635049-82a277c9-57c4-4479-95d9-262ac3299365.png)
![image](https://user-images.githubusercontent.com/47571973/128635082-63b2a148-ebe7-4e30-8d3e-2a6348d72557.png)

  위와 같이 잘 업데이트 됨을 알 수 있다. 
  
  
  그리고, admin ui를 설정하였다. 밑과 같은 상황일 때, 
  ![image](https://user-images.githubusercontent.com/47571973/128635161-14a774dc-ecb8-455a-a786-37631813a859.png)
  
  admin ui에서는 여러 정보들을 확인할 수 있다.
  ![image](https://user-images.githubusercontent.com/47571973/128635220-ee13baab-6dde-4206-9062-08848cc4e906.png)
  ![image](https://user-images.githubusercontent.com/47571973/128635199-bb78ed9f-bfe1-41ac-8303-9151e5a68fdb.png)
  ![image](https://user-images.githubusercontent.com/47571973/128635203-fe90f553-4b1d-4791-bcbc-acd90dd43a48.png)
![image](https://user-images.githubusercontent.com/47571973/128635206-31a30a5a-32d4-4f71-b209-707faca5f722.png)
  
  (5) 2021-08-11
  
  localtunnel을 이용해 전세계 서버와 연결할 수 있도록 한다.
  ![image](https://user-images.githubusercontent.com/47571973/128997999-05a46f77-68bb-421f-9638-af951ddb5b75.png)

  또한, 웹캠을 설정할 수 있도록하고, 음소거/ 비디오 중지를 설정했다.
  ![image](https://user-images.githubusercontent.com/47571973/128998170-36a5c9b3-6489-42d7-a3d9-fa50072df52d.png)


</div>
