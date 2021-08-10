// front-end

const socket = io();

const myFace = document.querySelector('#myFace');

const muteButton = document.querySelector('#mute');
const cameraButton = document.querySelector('#camera');
const camerasSelect = document.querySelector('#cameras');
const welcome = document.querySelector('#welcome');
const call = document.querySelector('#call');

let myStream;
let muted=false; // 음소거 되었는지 여부
let cameraOff=false; // 비디오 중지 여부
let roomName;
let myPeerConnection;


call.hidden = true;

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

//getMedia();

muteButton.addEventListener('click', handleMuteClick);
cameraButton.addEventListener('click',handleCameraClick);
camerasSelect.addEventListener('input',handleCameraChange);

const welcomeForm = welcome.querySelector('form');

async function startMedia(){
    welcome.hidden=true;
    call.hidden=false;
    await getMedia();
    makeConnection();
}

function handleWelcomeSubmit(event){
    event.preventDefault();
    const input = welcome.querySelector('input');
    socket.emit('join_room',input.value, startMedia);
    roomName = input.value;
    input.value = "";
}

welcomeForm.addEventListener('submit',handleWelcomeSubmit);

// 방 참가

socket.on('welcome', async ()=>{
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit('offer',offer,roomName);
});

socket.on('offer', (offer)=>{
    console.log(offer);
});

// RTC

function makeConnection(){
    myPeerConnection = new RTCPeerConnection();
    myStream.getTracks().forEach((track)=>{
        myPeerConnection.addTrack(track,myStream);
    });
}