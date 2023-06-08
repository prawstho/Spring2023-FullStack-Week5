const folders = ['models', 'views', 'routes', 'public', 'json'];

const configjson = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'myapp.js',
    superuser: 'adm1n',
    database: 'exampledb'
};

const tokenjson = [{
    created: '1969-01-31 12:30:00',
    username: 'username',
    email: 'user@example.com',
    phone: '5556597890',
    token: 'token',
    expires: '1969-02-03 12:30:00',
    confirmed: 'tbd'
}];

const usagetxt = `

myapp <command> <option>

Usage:

myapp --help                            displays help
myapp init --all                        creates the folder structure and config file
myapp init --mk                         creates the folder structure
myapp init --cat                        creates the config file with default settings
myapp init --help
myapp config --show                     displays a list of the current config settings
myapp config --reset                    resets the config file with default settings
myapp config --set                      sets a specific config setting
myapp config --help
myapp token --count                     displays a count of the tokens created
myapp token --list                      list all the usernames with tokens
myapp token --new <username>            generates a token for a given username, saves tokens to the json file
myapp token --upd p <username> <phone>  updates the json entry with phone number
myapp token --upd e <username> <email>  updates the json entry with email
myapp token --fetch <username>          fetches a user record for a given username
myapp token --search u <username>       searches a token for a given username
myapp token --search e <email>          searches a token for a given email
myapp token --search p <phone>          searches a token for a given phone number
myapp token --help

`;

const inittxt = `

myapp init <command> <option>

Usage:

myapp init --all          creates the folder structure and config file
myapp init --mk           creates the folder structure
myapp init --cat          creates the config file with default settings
myapp init --help

`;

const configtxt = `

myapp <command> <option>

Usage:

myapp config --show     displays a list of the current config settings
myapp config --reset    resets the config file with default settings
myapp config --set      sets a specific config setting
myapp config --help

`;

const tokentxt = `

myapp <command> <option>

Usage:

myapp token --count                     displays a count of the tokens created
myapp token --list                      list all the usernames with tokens
myapp token --new <username>            generates a token for a given username, saves tokens to the json file
myapp token --upd p <username> <phone>  updates the json entry with phone number
myapp token --upd e <username> <email>  updates the json entry with email
myapp token --fetch <username>          fetches a user record for a given username
myapp token --search u <username>       searches a token for a given username
myapp token --search e <email>          searches a token for a given email
myapp token --search p <phone>          searches a token for a given phone number
myapp token --help

`;

module.exports = {
    folders,
    configjson,
    tokenjson,
    usagetxt,
    inittxt,
    configtxt,
    tokentxt,
};