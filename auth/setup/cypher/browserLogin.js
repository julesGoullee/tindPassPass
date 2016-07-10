const hexEncode = function(str){

  return Array.from(str)
    .map( (char) => parseInt(char, 10) == char ? (parseInt(char, 10) + 48).toString(16) : char.charCodeAt(char).toString(16) )
    .reduce( (acc, hex) => acc + ('000'+ hex).slice(-4), '');

};

const email = prompt('Enter fb email');
const password = prompt('Enter password');

document.body.innerHTML = `<div>
    <div style="text-align: center; -webkit-user-select: text;" id="content">
        <div>Email: ${hexEncode(email)}</div>
        <div>Password: ${hexEncode(password)}</div>
    </div>
</div>`;

document.getElementById('content');
