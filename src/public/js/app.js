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
    if(myPeerConnection){
        // myPeerConnection이 존재
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection.getSenders()
        .find((sender)=>sender.track.kind === 'video');
        videoSender.replaceTrack(videoTrack);
    }
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

async function initCall(){
    welcome.hidden=true;
    call.hidden=false;
    await getMedia();
    makeConnection();
}

async function handleWelcomeSubmit(event){
    event.preventDefault();
    const input = welcome.querySelector('input');
    await initCall();
    socket.emit('join_room',input.value);
    roomName = input.value;
    input.value = "";
}

welcomeForm.addEventListener('submit',handleWelcomeSubmit);

// 방 참가

// 이미 입장해 있는 참가자들이 실행
socket.on('welcome', async ()=>{
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit('offer',offer,roomName);
});

// 최신 참가자한테 실행
socket.on('offer', async (offer)=>{
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit('answer',answer, roomName);
});

socket.on('answer',(answer)=>{
    myPeerConnection.setLocalDescription(answer);
});

socket.on('ice',(ice)=>{
    myPeerConnection.addIceCandidate(ice);
});

// RTC

function makeConnection(){
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
              ],
            },
          ],
    });
    myPeerConnection.addEventListener('icecandidate',handleIce);
    myPeerConnection.addEventListener('addstream',handleAddStream);
    myStream.getTracks().forEach((track)=>{
        myPeerConnection.addTrack(track,myStream);
    });
}

function handleIce(data){
    socket.emit('ice',data.candidate, roomName);
}

function handleAddStream(data){
    const peersStream = document.querySelector('#peersStream');
    peersStream.srcObject=data.stream;
}