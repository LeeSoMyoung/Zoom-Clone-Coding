// front-end

const socket = io(); // 자동적으로 서버가 돌아가는 것을 캐치한다.

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room', 
    {
        payload:input.value
    },
    ()=>{
        console.log('콜백 함수');
    }
    );
    input.value = "";
}

form.addEventListener('submit',handleRoomSubmit);