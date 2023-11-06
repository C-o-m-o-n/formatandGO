const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand(
        'formatandgo.formatGoCode',
        formatGoCode
    );
    context.subscriptions.push(disposable);
}

function formatGoCode() {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const fileName = document.fileName;

        // Create a new terminal
        const terminal = vscode.window.createTerminal('Go Terminal');

        // Send the go fmt command for the currently opened Go file to the terminal
        terminal.sendText(`go fmt "${fileName}"`);

        // Show the terminal to the user
        terminal.show();

        // Handle any future terminal output if needed
        // terminal.processId.onData((data) => {
        //     // Process and handle the data if necessary
        // });
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
