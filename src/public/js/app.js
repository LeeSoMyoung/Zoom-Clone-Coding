// front-end

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

socket.on('welcome', (user) => {
    console.log(user);
    addMessage(`${user}님이 입장하셨습니다.`);
});

socket.on('bye', (left) => {
    addMessage(`${left}님이 퇴장하셨습니다.`);
});

socket.on('new_message', (msg) => {
    addMessage(msg);
});