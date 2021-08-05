// front-end

const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open",()=>{
    console.log('connected to the server');

});

 socket.addEventListener('message', (message) => {
    const li = document.createElement('li');
    li.innerText=message.data;
    messageList.append(li);
  });

socket.addEventListener('close',()=>{
    console.log('the server is disconnected.');
});

/*setTimeout(()=>{
    socket.send("hello from the browser");
},5000); */

function makeMessage(type,payload){
    const msg = {
        type,
        payload
    };
    return JSON.stringify(msg);
}

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage("new message",input.value));
    input.value=""; // 메세지가 전송되었으면 form을 비워준다.
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMessage("nickname",input.value));
    //input.innerText="";
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit',handleNickSubmit);