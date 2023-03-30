var socket = io('http://localhost:8080');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".part1");

// const name=prompt("Enter Nsme :");


const append=(message, position)=>{
    const messageElement= document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('Submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value=''
})
const userName=prompt("Enter your name to join");
socket.emit('new-user-joined',userName);
socket.on('user-joined',data=>
{
append(`${userName} joined the chat`, 'right')
}
)
socket.on('receive',data=>
{
append(`${data.name} :${data.message}`, 'left')
}
)
socket.on('left',name=>
{
append(`${name} left the chat`, 'left')
}
)