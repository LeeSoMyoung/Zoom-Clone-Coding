// front-end

const socket = io();

const myFace = document.querySelector('#myFace');

const muteButton = document.querySelector('#mute');
const cameraButton = document.querySelector('#camera');
const camerasSelect = document.querySelector('#cameras');

let myStream;
let muted=false; // 음소거 되었는지 여부
let cameraOff=false; // 비디오 중지 여부


async function getCameras(){
    try{
        const devices = navigator.mediaDevices.enumerateDevices();
        const cameras = (await devices).filter((device) => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach((camera)=>{
            const option = document.createElement('option');
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if(currentCamera.label === camera.label){
                option.selected=true;
            }
            camerasSelect.appendChild(option);
        });
    }catch(e){
        console.log(e);
    }
}

async function getMedia(deviceId){
    // 유저의 스트림을 가져온다.

    const initialConstrains = {
        audio:true,
        video:{facingMode:'user'}
    };
    const cameraConstraints = {
        audio:true,
        video:{
            deviceId:{
                exact: deviceId
            }
        }
    }
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId? cameraConstraints:initialConstrains
        );
        myFace.srcObject = myStream;
        if(!deviceId){
            await getCameras();
        }
        await getCameras();
    }catch(e){
        console.log(e);
    }
}

async function handleCameraChange(){
    await getMedia(camerasSelect.value);
}

function handleMuteClick(){
    myStream.getAudioTracks().forEach((track)=>{
        track.enabled = !track.enabled;
    });
    if(muted){
        muteButton.innerText="음소거";
        muted = false;
    }
    else{
        muteButton.innerText="음소거 해제";
        muted = true;
    }
}

function handleCameraClick(){
    myStream.getVideoTracks()
    .forEach((track)=>{
        track.enabled = !track.enabled;
    });
    if(cameraOff){
        cameraButton.innerText="비디오 중지";
        cameraOff = false;
    }
    else{
        cameraButton.innerText="비디오 시작";
        cameraOff = true;
    }
}

getMedia();

muteButton.addEventListener('click', handleMuteClick);
cameraButton.addEventListener('click',handleCameraClick);
camerasSelect.addEventListener('input',handleCameraChange);

/*
const socket = io(); // 자동적으로 서버가 돌아가는 것을 캐치한다.

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;

let roomName = "";

function addMessage(msg) {
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = msg;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const roomInput = room.querySelector('#msg input');
    const value = roomInput.value;
    socket.emit('new_message', roomInput.value, roomName, () => {
        addMessage(`나: ${value}`);
    });
    roomInput.value="";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const nameInput = room.querySelector('#nickname input');
    socket.emit('nickname',nameInput.value);
    nameInput.value="";
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `회의실 ${roomName}`;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#nickname');
    msgForm.addEventListener('submit', handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room',
        input.value,
        showRoom
    );
    roomName = input.value;
    input.value = "";
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
    const h3 = room.querySelector('h3');
    h3.innerText = `회의실 ${roomName} (${newCount})`;
    addMessage(`${user}님이 입장하셨습니다.`);
});

socket.on('bye', (left, newCount) => {
    const h3 = room.querySelector('h3');
    h3.innerText = `회의실 ${roomName} (${newCount})`;
    addMessage(`${left}님이 퇴장하셨습니다.`);
});

socket.on('new_message', (msg) => {
    addMessage(msg);
});

socket.on('room_change', (rooms)=>{
    const roomList = welcome.querySelector('ul');
    roomList.innerHTML="";
    if(rooms.length === 0){
        return;
    }
    rooms.forEach((room)=>{
        const li = document.createElement('li');
        li.innerText=room;
        roomList.appendChild(li);
    });
});
*/