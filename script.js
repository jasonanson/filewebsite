const users = {
    admin: 'anson1105',
    anson: 'anson1105'
};

function login() {
    const usernameInput = document.getElementById('usernameInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    if (users[usernameInput] && users[usernameInput] === passwordInput) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        document.getElementById('cloud').style.display = 'block';
        if (usernameInput === 'admin') {
            document.getElementById('admin').style.display = 'block';
        }
        loadData();
    } else {
        alert('帳號或密碼錯誤');
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = `<span>${userInput.value}</span><span class="sender">${getUsername()}</span>
    <div class="actions">
        <button onclick="editMessage(this)">編輯</button>
        <button onclick="deleteMessage(this)">刪除</button>
    </div>`;
    messages.appendChild(message);
    saveData();
    userInput.value = '';
}

function getUsername() {
    return document.getElementById('usernameInput').value;
}

function editMessage(button) {
    const message = button.closest('.message');
    const messageText = message.querySelector('span').textContent;
    const newMessage = prompt('編輯訊息', messageText);
    if (newMessage !== null) {
        message.querySelector('span').textContent = newMessage;
        saveData();
    }
}

function deleteMessage(button) {
    const message = button.closest('.message');
    message.remove();
    saveData();
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `${file.name} <span class="uploader">${getUsername()}</span>
        <div class="actions">
            <button onclick="downloadFile('${file.name}', '${fileContent}')">下載</button>
            <button onclick="deleteFile(this)">刪除</button>
        </div>`;
        fileList.appendChild(fileItem);
        saveData();
    };
    reader.readAsDataURL(file);
}

function downloadFile(fileName, fileContent) {
    const a = document.createElement('a');
    a.href = fileContent;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function deleteFile(button) {
    const fileItem = button.closest('.file-item');
    fileItem.remove();
    saveData();
}

function saveData() {
    const messages = document.getElementById('messages').innerHTML;
    const files = document.getElementById('fileList').innerHTML;
    localStorage.setItem('messages', messages);
    localStorage.setItem('files', files);
}

function loadData() {
    const messages = localStorage.getItem('messages');
    const files = localStorage.getItem('files');
    if (messages) {
        document.getElementById('messages').innerHTML = messages;
    }
    if (files) {
        document.getElementById('fileList').innerHTML = files;
    }
}

function clearData() {
    localStorage.removeItem('messages');
    localStorage.removeItem('files');
    document.getElementById('messages').innerHTML = '';
    document.getElementById('fileList').innerHTML = '';
}
