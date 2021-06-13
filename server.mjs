import http from 'http';
import qs from 'querystringify';
import fs from 'fs';

const messagesString = fs.readFileSync('messages.json', { encoding: 'UTF-8' });
const messages = JSON.parse(messagesString);

const server = http.createServer(
    (request, response) => {
        const queryString = request.url.replace('/', '');
        const params = qs.parse(queryString);

        if (params.message && params.name) {
            messages.push({ massage: params.message, name: params.name });
            fs.writeFileSync(
                'messages.json',
                JSON.stringify(messages), { encoding: 'UTF-8' }
            );
        }

        const messagesList = messages.map(item => `<li>${item.massage} ${item.name}</li>`).join('');
        console.log(messages);
        console.log(messagesList);
        let HTMLString = fs.readFileSync('index.html', { encoding: 'UTF-8' });
        HTMLString = HTMLString.replace('REPLACE_ME', messagesList);

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(HTMLString);
        response.end();
    }
);

server.listen(8080);

console.log('Listening on: http://localhost:8080');

// Statefull - A server with a running living state
// Stateless - A server without a running state,
//             state is saved in an external resource